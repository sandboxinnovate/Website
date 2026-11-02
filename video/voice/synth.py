#!/usr/bin/env python3
"""Voice-over synthesis for the unit explainer videos (Kokoro-82M, offline).

Usage (venv python):
  . /home/user/tts/venv/bin/activate
  python video/voice/synth.py <name> <en|es> [--check] [--no-cache]

<name> is the stem of video/voice/<name>.json (e.g. "brains", or "_sample" for throwaway tests).
The JSON's "unit" field says which video it belongs to (used for the duration and storyboard).

Writes video/out/voice/<name>-<lang>.wav (48 kHz mono, ~-16 LUFS, TP -1.5 dBTP),
<name>-<lang>.vtt (captions) and <name>-<lang>.report.json. Exit code 1 if any ERROR.
See video/voice/README.md.
"""
import argparse
import hashlib
import json
import math
import os
import re
import subprocess
import sys
import tempfile
import unicodedata
from difflib import SequenceMatcher

import numpy as np
import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
VIDEO_DIR = os.path.dirname(HERE)
ROOT = os.path.dirname(VIDEO_DIR)
CACHE = os.path.join(HERE, '.cache')
OUT = os.path.join(VIDEO_DIR, 'out', 'voice')

MODEL = '/home/user/tts/kokoro-v1.0.onnx'
VOICES = '/home/user/tts/voices-v1.0.bin'
LANG_CODE = {'en': 'en-us', 'es': 'es-419'}   # never plain "es" (Castilian)
DEFAULT_VOICE = {'en': 'af_heart', 'es': 'ef_dora'}

# Built-in readings (TTS input only; captions keep the written form). Measured with Kokoro v1.0 +
# faster-whisper, see README. A unit JSON "pronounce" map is merged on top (same key wins);
# map a key to itself to switch a default off.
DEFAULT_PRONOUNCE = {
    'en': {
        'sandboxinnovate.com': 'sandbox innovate dot com',
    },
    'es': {
        'brain': 'bréin', 'brains': 'bréins', 'Brain': 'Bréin', 'Brains': 'Bréins',
        'Sandbox': 'Sándbox',
        'leads': 'lids', 'lead': 'lid',
        'tickets': 'tíkets', 'ticket': 'tíket',
        'sandboxinnovate.com': 'sándbox innóveit punto com',
    },
}

MAX_SPEED = 1.10
SPEED_STEPS = [1.0, 1.03, 1.06, 1.08, 1.10]
GAP_BEFORE_NEXT = 0.25      # a line must end this long before the next line's "at"
TAIL_MARGIN = 0.6           # ... and this long before the end of the video
SENTENCE_PAUSE = 0.30       # silence between sentences inside one line
FADE_IN, FADE_OUT = 0.008, 0.035
SR_OUT = 48000
TARGET_I, TARGET_TP, TARGET_LRA = -16.0, -1.5, 11.0
CAPTION_CHARS, CAPTION_LINES = 42, 2

# Same hard rules as video/lib/common.mjs, plus narration-only ones.
RULES = [
    (r'[\u2014\u2013]', 'em/en dash (write "three to five" / "de tres a cinco")', 'ERROR'),
    (r'(?i)symphony|autoclient', 'client-specific name', 'ERROR'),
    (r'(?i)(?<![\w{])\$\s?\d|\d\s?\$|€|£|\bUSD\b|\bEUR\b|\bMXN\b|\bUS\$|\bd[oó]lares\b|\bdollars?\b|\beuros?\b', 'price or money', 'ERROR'),
    (r'(?i)\bunlock|supercharg|revolutioni[sz]|seamless|game[- ]?changer|potenci(ar|a|amos|e)\b|desbloque|revolucion(ar|a|amos)\b|sin precedentes|en la era de|cutting[- ]edge|next[- ]level|harness the power|unleash', 'AI cliché', 'ERROR'),
    (r'(?i)\bvosotros\b|\bvuestr[oa]s?\b|\b(pod|ten|quer|hab|sab|hac|dec|pens)éis\b|\bsois\b', 'vosotros form (use tú)', 'ERROR'),
    (r'(?i)\b(quer|pod|ten|sab|hac|dec|pens|sent|necesit|ven)és\b|\bvos\b|\bmirá(?![a-z])|\bhacé(?![a-z])|\bdecí(?![a-z])|\bcontanos\b|\bescribinos\b|\bagendá(?![a-z])', 'voseo (use tú)', 'ERROR'),
    (r'\d', 'digit in narration: spell numbers the way they are spoken ("three to five weeks")', 'WARN'),
    (r'\w-\w', 'hyphen between words: check how it is read, or rewrite', 'WARN'),
]


def log(*a):
    print(*a, flush=True)


def run(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if r.returncode != 0:
        sys.exit(f'command failed: {" ".join(cmd)}\n{r.stderr[-2000:]}')
    return r


def video_duration(unit, lang):
    for p in (os.path.join(VIDEO_DIR, 'out', 'silent', f'{unit}-{lang}.mp4'),
              os.path.join(ROOT, 'public', 'video', f'{unit}-{lang}.mp4')):
        if os.path.exists(p):
            r = run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries',
                     'stream=duration:format=duration', '-of', 'json', p])
            j = json.loads(r.stdout)
            d = (j.get('streams') or [{}])[0].get('duration') or j['format']['duration']
            return float(d)
    sb = load_storyboard(unit)
    if sb and sb.get('durationSec'):
        return float(sb['durationSec'])
    sys.exit(f'cannot find the duration of {unit}-{lang}')


def load_storyboard(unit):
    p = os.path.join(VIDEO_DIR, 'storyboards', f'{unit}.json')
    return json.load(open(p, encoding='utf8')) if os.path.exists(p) else None


# ------------------------------------------------------------------ text helpers
def split_sentences(text):
    """Sentence split on . ? ! (keeps the mark). '¿' and '¡' stay with their sentence."""
    parts = re.split(r'(?<=[.?!])\s+(?=[¿¡"“A-ZÁÉÍÓÚÑ0-9a-z])', text.strip())
    return [p.strip() for p in parts if p.strip()]


def apply_pronounce(text, mapping):
    """Whole-word, case-sensitive replacements, longest key first. TTS input only."""
    for k in sorted(mapping, key=len, reverse=True):
        text = re.sub(r'(?<![\w])' + re.escape(k) + r'(?![\w])', mapping[k], text)
    return text


def wrap_caption(text, width=CAPTION_CHARS):
    words, lines, cur = text.split(), [], ''
    for w in words:
        if cur and len(cur) + 1 + len(w) > width:
            lines.append(cur)
            cur = w
        else:
            cur = f'{cur} {w}' if cur else w
    if cur:
        lines.append(cur)
    return lines


def caption_chunks(sentence):
    """Split a sentence into cues of at most 2 lines x ~42 chars, preferring commas."""
    if len(wrap_caption(sentence)) <= CAPTION_LINES:
        return [sentence]
    # try clause boundaries first
    clauses = re.split(r'(?<=[,;:])\s+', sentence)
    chunks, cur = [], ''
    for c in clauses:
        cand = f'{cur} {c}' if cur else c
        if len(wrap_caption(cand)) <= CAPTION_LINES:
            cur = cand
        else:
            if cur:
                chunks.append(cur)
            cur = c
    if cur:
        chunks.append(cur)
    out = []
    for c in chunks:  # a single clause can still be too long: cut by words
        lines = wrap_caption(c)
        while len(lines) > CAPTION_LINES:
            out.append(' '.join(lines[:CAPTION_LINES]))
            lines = lines[CAPTION_LINES:]
        out.append(' '.join(lines))
    return out


def norm_words(text):
    text = text.replace('’', "'").replace('“', ' ').replace('”', ' ')
    text = unicodedata.normalize('NFKD', text)
    text = ''.join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower()
    text = re.sub(r'(?<=\b[a-z])\.(?=[a-z]\.)', '', text)  # a.i. -> ai
    text = re.sub(r"[^a-z0-9' ]+", ' ', text)
    return [w.strip("'") for w in text.split() if w.strip("'")]


def lint(text):
    out = []
    for pat, why, lvl in RULES:
        m = re.search(pat, text)
        if m:
            out.append((lvl, f'{why}: "{m.group(0)}"'))
    return out


# ------------------------------------------------------------------ audio helpers
_kokoro = None


def kokoro():
    global _kokoro
    if _kokoro is None:
        from kokoro_onnx import Kokoro
        _kokoro = Kokoro(MODEL, VOICES)
    return _kokoro


def synth_sentence(text, voice, lang, speed, use_cache=True):
    key = hashlib.sha1(json.dumps([text, voice, LANG_CODE[lang], round(speed, 3), os.path.getsize(MODEL)]).encode()).hexdigest()[:20]
    path = os.path.join(CACHE, f'{key}.wav')
    if use_cache and os.path.exists(path):
        a, sr = sf.read(path, dtype='float32')
        return a, sr
    a, sr = kokoro().create(text, voice=voice, speed=speed, lang=LANG_CODE[lang])
    a = trim_silence(np.asarray(a, dtype='float32'), sr)
    os.makedirs(CACHE, exist_ok=True)
    sf.write(path, a, sr, subtype='FLOAT')
    return a, sr


def trim_silence(a, sr, thresh_db=-42.0, pad=0.02):
    if a.size == 0:
        return a
    peak = float(np.max(np.abs(a))) or 1.0
    win = max(1, int(sr * 0.01))
    env = np.sqrt(np.convolve(a * a, np.ones(win) / win, mode='same'))
    idx = np.where(env > peak * 10 ** (thresh_db / 20))[0]
    if idx.size == 0:
        return a
    s = max(0, idx[0] - int(pad * sr))
    e = min(a.size, idx[-1] + int(pad * sr))
    return a[s:e]


def fade(a, sr):
    a = a.copy()
    n_in, n_out = min(a.size, int(FADE_IN * sr)), min(a.size, int(FADE_OUT * sr))
    if n_in:
        a[:n_in] *= np.linspace(0, 1, n_in, dtype='float32')
    if n_out:
        a[-n_out:] *= np.linspace(1, 0, n_out, dtype='float32')
    return a


def render_line(line, voice, lang, speed, pron, use_cache):
    """Synthesize a line sentence by sentence. Returns (audio, sr, sentences[{text, start, end}])."""
    sents = split_sentences(line['text'])
    say = line.get('say')  # optional full TTS override for the whole line (rare)
    say_sents = split_sentences(say) if say else [apply_pronounce(s, pron) for s in sents]
    if len(say_sents) != len(sents):
        say_sents = [' '.join(say_sents)]
        sents = [' '.join(sents)]
    pieces, info, t, sr = [], [], 0.0, 24000
    for i, (cap, tts) in enumerate(zip(sents, say_sents)):
        a, sr = synth_sentence(tts, voice, lang, speed, use_cache)
        a = fade(a, sr)
        if i:
            pieces.append(np.zeros(int(SENTENCE_PAUSE * sr), dtype='float32'))
            t += SENTENCE_PAUSE
        d = a.size / sr
        info.append({'text': cap, 'tts': tts, 'start': t, 'end': t + d})
        pieces.append(a)
        t += d
    return np.concatenate(pieces) if pieces else np.zeros(0, 'float32'), sr, info


def _loud_json(stderr):
    return json.loads(stderr[stderr.rindex('{'):stderr.rindex('}') + 1])


def measure(path):
    r = run(['ffmpeg', '-hide_banner', '-nostats', '-i', path, '-af',
             f'loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}:print_format=json', '-f', 'null', '-'])
    return _loud_json(r.stderr)


def loudnorm(src, dst):
    """Two-pass loudnorm in linear mode. Speech tracks are mostly silence, so the gain needed for
    -16 LUFS usually pushes peaks past -1.5 dBTP; in that case the peaks are first tamed by a
    gentle limiter at 4x oversampling (so linear mode still applies and the voice is not pumped)."""
    flt = f'loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}'
    m = measure(src)
    src_i, src_tp = float(m['input_i']), float(m['input_tp'])
    work, limited = src, False
    if src_tp + (TARGET_I - src_i) > TARGET_TP - 0.2:
        gain = TARGET_I - src_i + 0.6   # overshoot a little: the linear pass then only attenuates
        work = src + '.lim.wav'
        lim = 10 ** ((TARGET_TP - 1.0) / 20)
        run(['ffmpeg', '-hide_banner', '-nostats', '-y', '-i', src, '-af',
             f'volume={gain:.2f}dB,aresample=192000,alimiter=limit={lim:.4f}:attack=2:release=60:level=disabled,aresample={SR_OUT}',
             '-c:a', 'pcm_f32le', work])
        m = measure(work)
        limited = True
    flt2 = (f'{flt}:measured_I={m["input_i"]}:measured_TP={m["input_tp"]}:measured_LRA={m["input_lra"]}'
            f':measured_thresh={m["input_thresh"]}:offset={m["target_offset"]}:linear=true:print_format=json')
    r = run(['ffmpeg', '-hide_banner', '-nostats', '-y', '-i', work, '-af', flt2, '-ar', str(SR_OUT), '-ac', '1',
             '-c:a', 'pcm_s16le', dst])
    m2 = _loud_json(r.stderr)
    m3 = measure(dst)  # the file actually written
    return {'input_i': src_i, 'input_tp': src_tp, 'limited': limited, 'mode': m2.get('normalization_type'),
            'output_i': float(m3['input_i']), 'output_tp': float(m3['input_tp'])}


def fmt_ts(t):
    t = max(0.0, t)
    h, rem = divmod(t, 3600)
    mnt, s = divmod(rem, 60)
    return f'{int(h):02d}:{int(mnt):02d}:{s:06.3f}'


# ------------------------------------------------------------------ check (faster-whisper)
def check(wav, lang, lines_out):
    from faster_whisper import WhisperModel
    with tempfile.TemporaryDirectory() as td:
        w16 = os.path.join(td, 'a16.wav')
        run(['ffmpeg', '-hide_banner', '-y', '-i', wav, '-ar', '16000', '-ac', '1', w16])
        audio, _ = sf.read(w16, dtype='float32')
    model = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=4)
    segs, _ = model.transcribe(audio, language=lang, beam_size=5, word_timestamps=True,
                               vad_filter=True, condition_on_previous_text=False)
    hyp = []  # (word, start)
    for s in segs:
        for w in s.words or []:
            for nw in norm_words(w.word):
                hyp.append((nw, w.start))
    # global alignment of the whole script against the whole transcript, then map back to lines
    ref, owner = [], []
    for i, ln in enumerate(lines_out):
        for w in norm_words(ln['text']):
            ref.append(w)
            owner.append(i)
    hw = [w for w, _ in hyp]
    sm = SequenceMatcher(a=ref, b=hw, autojunk=False)
    per = [{'i': i, 'at': ln['at'], 'ref': len(norm_words(ln['text'])), 'err': 0, 'heard': [], 'diffs': []}
           for i, ln in enumerate(lines_out)]
    ops = []
    for op, a0, a1, b0, b1 in sm.get_opcodes():
        if op == 'equal':
            ops += [('equal', a0 + k, a0 + k + 1, b0 + k, b0 + k + 1) for k in range(a1 - a0)]
        else:
            ops.append((op, a0, a1, b0, b1))
    for op, a0, a1, b0, b1 in ops:
        if a1 > a0:
            li = owner[a0]
        else:  # pure insertion: attach to the line that owns the previous script word
            li = owner[a0 - 1] if a0 > 0 else 0
            if a0 < len(owner) and b0 < len(hyp) and hyp[b0][1] >= lines_out[owner[a0]]['at'] - 0.3:
                li = owner[a0]
        per[li]['heard'] += hw[b0:b1]
        if op == 'equal':
            continue
        per[li]['err'] += max(a1 - a0, b1 - b0)
        t = hyp[b0][1] if b1 > b0 else None
        per[li]['diffs'].append({'op': op, 'script': ' '.join(ref[a0:a1]), 'heard': ' '.join(hw[b0:b1]),
                                 'time': round(t, 2) if t is not None else None})
    total_err = sum(p['err'] for p in per)
    out = [{'i': p['i'], 'at': p['at'], 'heard': ' '.join(p['heard']), 'wer': round(p['err'] / max(1, p['ref']), 3),
            'diffs': p['diffs']} for p in per]
    return {'wer': round(total_err / max(1, len(ref)), 3), 'transcript': ' '.join(hw), 'lines': out}


# ------------------------------------------------------------------ main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('name')
    ap.add_argument('lang', choices=['en', 'es'])
    ap.add_argument('--check', action='store_true', help='transcribe with faster-whisper and compare to the script')
    ap.add_argument('--no-cache', action='store_true')
    args = ap.parse_args()
    lang = args.lang

    spec_path = os.path.join(HERE, f'{args.name}.json')
    spec = json.load(open(spec_path, encoding='utf8'))
    unit = spec.get('unit') or args.name
    voice = (spec.get('voices') or {}).get(lang, DEFAULT_VOICE[lang])
    pron = {**DEFAULT_PRONOUNCE[lang], **(spec.get('pronounce') or {}).get(lang, {})}
    lines = sorted(spec['lines'][lang], key=lambda l: float(l['at']))
    dur = video_duration(unit, lang)
    sb = load_storyboard(unit)
    scenes = {s['id']: s for s in (sb or {}).get('scenes', [])}

    errors, warns, out_lines = [], [], []
    track_sr = 24000
    placed = []
    for i, ln in enumerate(lines):
        at = float(ln['at'])
        tag = f'[{lang} #{i} {ln.get("scene", "?")} @{at:g}s]'
        for lvl, msg in lint(ln['text']):
            (errors if lvl == 'ERROR' else warns).append(f'{tag} {msg}')
        if ln.get('scene') and scenes and ln['scene'] not in scenes:
            warns.append(f'{tag} scene "{ln["scene"]}" is not in the storyboard')
        nxt = float(lines[i + 1]['at']) if i + 1 < len(lines) else None
        limit = min(nxt - GAP_BEFORE_NEXT if nxt is not None else 1e9, dur - TAIL_MARGIN)
        base = float(ln.get('speed', 1.0))
        steps = [s for s in SPEED_STEPS if s >= base] or [min(base, MAX_SPEED)]
        if base > MAX_SPEED:
            errors.append(f'{tag} speed {base} is above the {MAX_SPEED} limit')
        for sp in steps:
            audio, sr, sents = render_line(ln, voice, lang, sp, pron, not args.no_cache)
            d = audio.size / sr
            if at + d <= limit:
                break
        track_sr = sr
        end = at + d
        rec = {'i': i, 'scene': ln.get('scene'), 'at': round(at, 3), 'duration': round(d, 3), 'end': round(end, 3),
               'speed': sp, 'limit': round(limit, 3), 'slack': round(limit - end, 3),
               'gap_to_next': round(nxt - end, 3) if nxt is not None else None,
               'words': len(norm_words(ln['text'])), 'wps': round(len(norm_words(ln['text'])) / max(d, 1e-6), 2),
               'text': ln['text'], 'sentences': [{**s, 'start': round(at + s['start'], 3), 'end': round(at + s['end'], 3)} for s in sents]}
        if end > limit:
            errors.append(f'{tag} overruns by {end - limit:.2f}s even at speed {sp} (ends {end:.2f}s, must end by {limit:.2f}s): shorten the text or move "at"')
        sc = scenes.get(ln.get('scene'))
        if sc:
            if at < sc['start'] - 0.01:
                warns.append(f'{tag} starts before its scene window ({sc["start"]}-{sc["end"]}s)')
            if end > sc['end'] + 0.5:
                warns.append(f'{tag} ends at {end:.2f}s, past its scene window end {sc["end"]}s')
        if i and at < out_lines[-1]['end']:
            errors.append(f'{tag} starts before the previous line ends ({out_lines[-1]["end"]:.2f}s)')
        out_lines.append(rec)
        placed.append((at, audio))

    # build the track at the Kokoro rate, resample to 48 kHz inside the loudnorm pass
    n = int(math.ceil(dur * track_sr))
    track = np.zeros(n, dtype='float32')
    for at, a in placed:
        s = int(round(at * track_sr))
        e = min(n, s + a.size)
        if e > s:
            track[s:e] += a[:e - s]

    os.makedirs(OUT, exist_ok=True)
    base_out = os.path.join(OUT, f'{args.name}-{lang}')
    with tempfile.TemporaryDirectory() as td:
        raw = os.path.join(td, 'raw.wav')
        sf.write(raw, track, track_sr, subtype='FLOAT')
        loud = loudnorm(raw, base_out + '.wav')
    if loud['mode'] != 'linear':
        warns.append(f'loudnorm ran in {loud["mode"]} mode; output {loud["output_i"]} LUFS')
    if abs(loud['output_i'] - TARGET_I) > 1.0 or loud['output_tp'] > TARGET_TP + 0.3:
        warns.append(f'loudness off target: {loud["output_i"]} LUFS, {loud["output_tp"]} dBTP')

    # captions: one cue per sentence (split further when it needs more than 2 x 42 chars)
    cues = []
    for rec in out_lines:
        for s in rec['sentences']:
            chunks = caption_chunks(s['text'])
            total = sum(len(c) for c in chunks)
            t = s['start']
            for c in chunks:
                d = (s['end'] - s['start']) * len(c) / total
                cues.append((t, t + d, c))
                t += d
    with open(base_out + '.vtt', 'w', encoding='utf8') as f:
        f.write('WEBVTT\n\n')
        for k, (a, b, c) in enumerate(cues, 1):
            b = max(a + 0.3, min(b + 0.15, cues[k][0] if k < len(cues) else dur))  # small hold, no overlap
            f.write(f'{k}\n{fmt_ts(a)} --> {fmt_ts(b)}\n' + '\n'.join(wrap_caption(c)) + '\n\n')

    total_words = sum(r['words'] for r in out_lines)
    speech = sum(r['duration'] for r in out_lines)
    report = {'name': args.name, 'unit': unit, 'lang': lang, 'voice': voice, 'langCode': LANG_CODE[lang],
              'videoDuration': dur, 'loudness': loud, 'words': total_words, 'speechSeconds': round(speech, 2),
              'wordsPerSecond': round(total_words / max(speech, 1e-6), 2), 'lines': out_lines,
              'errors': errors, 'warnings': warns}

    log(f'{args.name} {lang}  voice {voice} ({LANG_CODE[lang]})  video {dur:.2f}s  lines {len(out_lines)}')
    log(f'{"#":>2} {"scene":<16} {"at":>6} {"dur":>5} {"end":>6} {"limit":>6} {"slack":>6} {"spd":>4} {"w/s":>4}  text')
    for r in out_lines:
        log(f'{r["i"]:>2} {str(r["scene"])[:16]:<16} {r["at"]:6.2f} {r["duration"]:5.2f} {r["end"]:6.2f} {r["limit"]:6.2f} '
            f'{r["slack"]:6.2f} {r["speed"]:4.2f} {r["wps"]:4.2f}  {r["text"][:70]}')
    log(f'speech {speech:.1f}s, {total_words} words, {report["wordsPerSecond"]} w/s; loudness {loud["output_i"]} LUFS, TP {loud["output_tp"]} dBTP ({loud["mode"]}{", peak-limited" if loud["limited"] else ""})')

    if args.check:
        log('checking with faster-whisper small ...')
        ck = check(base_out + '.wav', lang, out_lines)
        report['check'] = ck
        log(f'WER {ck["wer"]:.1%}')
        for l in ck['lines']:
            if l['diffs']:
                log(f'  #{l["i"]} @{l["at"]:g}s heard: "{l["heard"]}"')
                for d in l['diffs']:
                    log(f'      {d["op"]:<8} script "{d["script"]}"  ->  heard "{d["heard"]}"')

    json.dump(report, open(base_out + '.report.json', 'w', encoding='utf8'), ensure_ascii=False, indent=2)
    for w in warns:
        log('WARN ', w)
    for e in errors:
        log('ERROR', e)
    log(f'wrote {os.path.relpath(base_out, ROOT)}.wav .vtt .report.json')
    sys.exit(1 if errors else 0)


if __name__ == '__main__':
    main()
