# Voice-over for the unit videos

Offline narration with Kokoro-82M (Apache-2.0, fine for commercial use), checked with faster-whisper, muxed onto
the existing silent videos without re-encoding the picture. Outputs go to `video/out/` (git-ignored).

```
video/voice/
  <unit>.json        narration script per unit (both languages)
  _sample.json       throwaway test script (brains); never published
  synth.py           script -> 48 kHz voice track + WebVTT captions + timing report (+ whisper check)
  mux.mjs            voice track + silent video -> voiced mp4/webm (video stream copied)
  .cache/            synthesized sentences, keyed by text + voice + speed (git-ignored)
```

## Commands

```bash
. /home/user/tts/venv/bin/activate
python video/voice/synth.py brains en            # -> video/out/voice/brains-en.wav, .vtt, .report.json
python video/voice/synth.py brains en --check    # same + transcribe with whisper, WER and word diffs per line
node video/voice/mux.mjs brains en               # -> video/out/voiced/brains-en.mp4 + .webm
node video/voice/mux.mjs brains en --publish     # + copy mp4, webm and vtt over public/video/brains-en.*
```

`synth.py` exits 1 when there is any ERROR; `mux.mjs` refuses to run while the last report has errors.
A 64 s track takes about 10 s to synthesize the first time (cached after that) and about 20 s more for `--check`.
Run jobs one at a time (4 CPUs).

## Script format: `video/voice/<unit>.json`

```json
{
  "unit": "brains",
  "voices": { "en": "af_heart", "es": "ef_dora" },
  "pronounce": {
    "en": {},
    "es": { "GEO": "ge e o" }
  },
  "lines": {
    "en": [
      { "scene": "hook", "at": 0.6, "text": "Most teams already have the answers. They're just stuck in a few people's heads." },
      { "scene": "promise", "at": 8.6, "text": "So we build one brain for your company, and an agent for each process." }
    ],
    "es": [
      { "scene": "hook", "at": 0.6, "text": "..." }
    ]
  }
}
```

- `scene`: storyboard scene id (`video/storyboards/<unit>.json`). Used for warnings only.
- `at`: seconds into the video where the line starts. Absolute, not relative to the scene.
- `text`: what is said, written exactly as the caption should read. One line can hold several sentences;
  each sentence becomes its own caption cue.
- Optional per line: `"speed": 1.05` (starting speed, never above 1.10) and `"say": "..."` (full TTS text for
  that line when a pronunciation map is not enough; captions still use `text`).
- `pronounce`: whole-word, case-sensitive replacements applied to the TTS input only, never to captions.
  They are merged on top of the built-in defaults in `synth.py` (`DEFAULT_PRONOUNCE`). Map a key to itself to
  switch a default off.
- `voices`: keep `af_heart` (EN) and `ef_dora` (ES). Spanish always uses `lang="es-419"` (Latin American:
  seseo, yeísmo); plain `es` gives Castilian θ and is never used.

## Fit rule and what synth.py does

1. Each sentence is synthesized separately (cached), leading and trailing silence trimmed, short fades;
   sentences in one line are joined with a 0.30 s pause.
2. A line must end before the next line's `at` minus 0.25 s, and before the end of the video minus 0.6 s.
   If it overruns, it is retried at speed 1.03, 1.06, 1.08, 1.10. Still too long: **ERROR**, so shorten the
   text or move `at`. Speed 1.10 only buys about 6 %, so write for speed 1.0.
3. Lines are placed at their `at` on a silent track as long as the video, then loudness-normalized to
   -16 LUFS integrated, true peak below -1.5 dBTP (gentle 4x oversampled peak limiter, then two-pass
   `loudnorm` in linear mode), written as 48 kHz mono 16-bit WAV.
4. Captions: one cue per sentence, timed from the real audio; sentences longer than 2 lines x 42 chars are
   split at commas (then by words) with time shared by length.
5. Report (`.report.json` and the table on stdout): per line `at`, `duration`, `end`, `limit`, `slack`,
   `speed`, `gap_to_next`, words per second, sentence times; plus loudness and the check results.
6. Lint, same rules as the scene lint plus narration rules. ERROR: em or en dashes, Symphony or autoclient,
   currency, AI clichés (unlock, supercharge, seamless, potenciar, desbloquear, revolucionar, sin precedentes,
   en la era de...), voseo, vosotros. WARN: digits (spell numbers as spoken), hyphens between words,
   a line that starts before its scene or ends more than 0.5 s after it.

`--check` transcribes the final track with faster-whisper `small` (CPU, int8, VAD on), aligns the whole
transcript against the whole script (accents and punctuation ignored) and prints the WER and every differing
word per line. Read the diffs with judgment: whisper writes digits for spoken numbers ("3" for "tres"), and
some differences are whisper's, not Kokoro's (see below). Anything else is a real misreading: fix it with
`pronounce`, then re-run.

## Sizing lines

Measured on narration-style text at speed 1.0, including the pauses between sentences:

| voice | lang | words/s at 1.0 | words/s at 1.10 |
|---|---|---|---|
| af_heart | en-us | 3.25 | 3.45 |
| ef_dora | es-419 | 2.96 | 3.12 |

Usable time for a line = next `at` - 0.25 - this `at`. Budget about **3 words per second in English and
2.7 in Spanish** for a calm read with room to breathe (the hard ceiling is about 3.3 and 3.0). Examples:
a 6 s window holds about 18 EN words or 16 ES words; a full 8 s scene starting 0.4 s in holds about
22 EN words or 19 ES words. Spanish runs about 10 % longer for the same idea, so write it shorter, not
translated.

## Pronunciation notes (Kokoro v1.0, measured)

Built-in defaults already applied (`DEFAULT_PRONOUNCE` in synth.py):

| written | lang | Kokoro by default | fix applied |
|---|---|---|---|
| brain / brains | es | /bɾaɪn/, rhymes with "Bryan"; whisper heard "brime" in context | `bréin` / `bréins` -> /bɾein/ |
| Sandbox | es | stress on the last syllable (sand-BOX) | `Sándbox` -> SÁND-box |
| leads | es | /le'ads/, two syllables | `lids` |
| tickets | es | stress on the last syllable | `tíkets` |
| sandboxinnovate.com | es | run together | `sándbox innóveit punto com` |
| sandboxinnovate.com | en | "sandbicks-innovate dot com" | `sandbox innovate dot com` |

Fine as written, no override needed:

- EN: `AI` is read "A I" (letters), `CRM` "C R M", `ROI` "R O I", `Sandbox` and `brain` natural.
  `GEO` is read as a word, "jee-oh"; if you want letters write it in `pronounce` as `"GEO": "G E O"`.
- ES: `IA` is read "i a" (letters), `CRM` "ce erre eme", numbers written as words read well
  ("de tres a cinco semanas"). `GEO` is spelled "je e o" (letters); `"GEO": "Geo"` would read "jeo".
- ES `ROI` is read "erre o i" and is hard to follow (whisper heard "LRI"); `Roi` reads "roi" but sounds like
  the name Roy. Avoid it in Spanish narration.

Known whisper false positives (the audio is right, the transcript is not): ES "un agente" comes back as
"una gente" (same sounds in natural speech), and "lids" can come back as "lights". Ignore those two diffs.

## Writing rules (hard)

- Never mention Symphony or autoclient. No prices or money. No invented facts, stats, clients or results.
  Timelines only as the site states them (`src/i18n/units/<unit>.ts`), spoken in words: "three to five
  weeks", "de tres a cinco semanas".
- No em or en dashes anywhere. Numbers spelled the way they are spoken.
- Spanish: neutral Latin American with "tú" (no voseo, no vosotros, no Spain-only words), natural, not a
  literal translation of the English.
- No AI clichés. Calm, confident, human: short sentences, plain words, contractions in English.
- Complement the on-screen text (other words, or the "why"); never read every on-screen line verbatim and
  never contradict it. Keep "brain" as the site uses it (ES "un brain"); "Book a call" / "Agendar una llamada".
- Leave the last 0.6 s of the video silent, and leave room before the CTA card so it can breathe.

## Mux details

`mux.mjs` copies the video stream (`-c:v copy`), encodes the voice as AAC 128k 48 kHz (`+faststart`) for mp4
and Opus 96k 48 kHz for webm (each steps up to a higher bitrate when the decoded true peak would exceed
-1 dBTP; Opus at 96k overshot to -0.8 dBTP on partners-es), pads the audio with silence to the exact video length and trims anything past it,
then verifies with ffprobe: one video + one audio stream, video codec and duration unchanged, audio duration
within 0.1 s of the video. Whenever `public/video/<unit>-<lang>.*` is silent (the first run, or right after
`render.mjs --publish` re-rendered the picture) it is copied to `video/out/silent/`, and that backup is always
the source, so re-running is safe and picks up new renders. If a public file already has audio and there is no
backup, it stops (re-render the silent video with `node video/render.mjs <unit> <lang> --publish`). Names
starting with `_` cannot be published.

After publishing, run `node video/site-data.mjs --no-copy` so the transcripts in `src/data/videos.json` match the
narration, and bump `VIDEO_UPLOAD_DATE` in `src/data/videos.ts` (the `?v=` cache token). The player
(`src/components/unit/UnitVideo.astro`) loads `/video/<unit>-<lang>.vtt` as an optional captions track.

Spanish always uses Kokoro `lang="es-419"` (Latin American). Never use `lang="es"`: it is Castilian.
