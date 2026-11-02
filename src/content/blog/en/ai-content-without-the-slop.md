---
title: "AI content without the slop: a system that still sounds like you"
description: "How to use AI for content without generic slop: start from interviews and real sources, keep a voice and claims guide, and edit every draft against a checklist."
dek: "AI drafts sound like everyone else when they start from nothing. Here is the system we use instead: source material first, a voice and claims guide, human editing with a checklist, and a short list of things we never automate."
date: 2026-11-02
lang: en
translationKey: ai-content-without-the-slop
unit: growth
tags:
  - ai content
  - brand voice
  - content marketing
readingMinutes: 9
takeaways:
  - "Generic AI content is a sourcing problem, not a model problem. A prompt with nothing behind it returns the average of the internet."
  - "Build a source library first: founder interviews, sales-call notes, support tickets and your own data. The model drafts from those, not from memory."
  - "A one-page voice and claims guide (what we say, what we never say, what proof we can show) does more for quality than any prompt trick."
  - "Google judges content on quality and usefulness, not on how it was produced. Mass-producing pages without adding value is what its spam policy targets."
  - "Keep the opinion, the final fact check and the decision to publish with a named person. Automate the drafting and the reformatting."
faq:
  - q: "Should we tell readers that AI helped write our content?"
    a: "Google's own guidance suggests disclosure where a reader would reasonably ask how something was made. For an article built from your founder's interview and edited by your team, the authorship that matters is whose expertise it is, and that should be clear. For anything largely automated, like product descriptions generated at volume, a short note is the honest choice. Decide once, write it into your policy and apply it the same way everywhere."
  - q: "Can't we just train a model on our old blog posts and let it write?"
    a: "Old posts teach a model how you sound, which helps. They don't give it anything new to say. Without fresh source material, a voice-tuned model produces confident, on-brand paraphrases of what you already published. Use your best past pieces as style examples inside the voice guide, and keep feeding the system new interviews, calls and data. Voice without substance is still slop, just slop with your accent."
  - q: "How many pieces a week is realistic for a small team?"
    a: "It depends on how much source material you capture, not on how fast the model writes. A useful starting rhythm is one recorded conversation a week turned into one article plus the pieces that come out of it. Once editing that set feels routine, add a second source. Teams that raise volume before the review step is steady usually end up publishing pieces nobody has properly checked."
author: sandbox
---

A marketing lead opens a chat window and types: "Write a 1,500-word blog post about choosing a logistics partner." Forty seconds later she has it. It's grammatical, well structured and has headings. It would also fit on the website of every competitor she has, because it contains nothing only her company knows.

That is slop, and the machine isn't the reason. The post was written from nothing. A language model asked to produce text with no material behind it does exactly what it was built to do: it returns the most plausible version of what has already been said about the topic. Plausible and average are close relatives.

A better prompt won't fix that, and neither will a different tool. What fixes it is a system where the model never starts from a blank page. Below is the one we use and teach, step by step, with a worked example and the parts we would never hand to a machine.

## Why AI drafts all sound the same

When you give a model a topic and nothing else, it fills the gaps with the safest, most common phrasing it can find. You get balanced lists of tips, hedged advice, and examples so general they could be about any company. The model isn't lazy. It simply has no access to your sales calls, your margins or the argument your founder keeps having with customers.

Readers spot the result quickly, even when they can't say why. These are the signs we look for when we review a draft:

- **No one could disagree with it.** Every claim is so safe that it carries no information.
- **Examples without names, numbers or places.** "A company improved its efficiency" instead of a specific situation with specific figures.
- **Symmetry everywhere.** Every list has three items, every section the same length, every paragraph ends on a tidy line.
- **Stock vocabulary.** "Leverage", "robust", "in an ever-changing market" and their cousins.
- **Definitions as openers.** The first paragraph explains what a term means to a reader who searched for it.
- **Statistics with no source,** or a source that turns out not to say what the sentence claims.
- **A conclusion that repeats the introduction** instead of telling the reader what to do next.

If a draft has three or more of these, the problem is almost never the wording. The draft had nothing to say, and no amount of editing will add it.

## What Google actually says about AI content

Many teams hold back because they fear a search penalty for "AI content". Google's position is more specific than that. In its [2023 guidance on AI-generated content](https://developers.google.com/search/blog/2023/02/google-search-and-ai-content), Google says its ranking systems aim to reward original, high-quality content however it is produced, and that "appropriate use of AI or automation is not against our guidelines." Its current documentation still says the same.

The line it draws is about purpose and value. Its [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) define scaled content abuse as generating many pages primarily to manipulate rankings, and list "using generative AI tools or other similar tools to generate many pages without adding value for users" as an example. Its [guidance on using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) goes further: review and fact-check all AI-generated content before publishing, including metadata like title elements, meta descriptions, structured data and image alt text.

In practice, Google is not checking who typed the sentence. It is checking whether the page deserved to exist. A system built on your own source material passes that test by design. A system built to publish a hundred near-identical pages a week fails it, whoever writes them.

The same reasoning applies to AI assistants deciding what to cite, which we cover in our [guide to generative engine optimization](/blog/generative-engine-optimization-guide/). Assistants quote sources that contain something specific. Paraphrases of the consensus give them nothing to quote.

## Step one: build the source library before you prompt

Every piece of content should trace back to raw material that only your company has. We sort it into four drawers:

1. **Expert interviews.** A 30-minute recorded conversation with a founder, partner or senior practitioner, driven by questions customers actually ask. This is the richest source and the most neglected.
2. **Sales-call notes and recordings.** The objections, comparisons and "how do you handle…" questions that come up every week. These are your best topics, already worded the way buyers word them.
3. **Support tickets and onboarding questions.** Where customers get confused tells you what to explain, and in what order.
4. **Your own data.** Anonymized patterns from projects, timelines, before-and-after process maps. Even a simple internal count beats a borrowed statistic.

Store these in one place with a short label per item: who said it, when, and whether it can be quoted publicly. The model drafts only from what is in the library for that piece. If a section needs a fact that isn't there, the draft says so with a placeholder rather than inventing one.

> **Rule of thumb:** If you can't point to the source line behind a paragraph, the paragraph is either opinion (fine, if it's yours and labeled as such) or filler (cut it).

## Step two: write a voice and claims guide

Most "brand voice" documents describe adjectives: friendly, expert, approachable. A model can't do much with adjectives. What it can follow is concrete rules, and the most useful rules are about claims, not tone.

Keep it to one page, in three columns:

| We say | We never say | Proof we can show |
|---|---|---|
| "A first version is usually live in a few weeks" | "Instant results" or any guarantee | The process page and timeline we publish |
| Short sentences, plain verbs, specific numbers | "Leading", "best-in-class", "world-class" | Named methods, public documentation |
| "We'd start with X, because…" | "It depends" without saying on what | Worked examples, labeled as examples |

Then add a short style block the model receives with every draft:

```text
VOICE
- Write like a senior operator explaining to a peer. Direct, calm, specific.
- Short paragraphs (1 to 4 sentences). Vary sentence length.
- Take a position and give the reason.

CLAIMS
- Use only facts from the attached sources. Mark missing facts as [SOURCE NEEDED].
- No statistics without a linked primary source.
- No client names, results or quotes unless the source marks them as approved.

NEVER
- Openers that define the topic. Closing summaries that repeat the intro.
- Words: leverage, robust, best-in-class, world-class, "in an ever-changing market".

EXAMPLES OF OUR BEST WORK
- [paste two or three paragraphs you are proud of]
```

The "proof we can show" column matters more than it looks. It stops the most damaging kind of slop: confident claims your company can't back up when a buyer asks.

## Step three: draft against the sources, then edit like an editor

With a source library and a guide, the drafting step is the least interesting part. Give the model the sources for one piece, the guide, a one-paragraph brief stating the reader and the single point the piece must make, and ask for an outline first. Fix the outline before any prose exists. It's far cheaper to move a section than to rewrite one.

Then a person edits the draft with a checklist. Ours looks like this:

- Does the opening put the reader in a real situation or make a claim they could argue with?
- Can every factual statement be traced to a source in the library or a linked primary source?
- Is there at least one thing in here a competitor couldn't publish?
- Did we cut every sentence that would survive unchanged on another company's site?
- Are examples specific (people, numbers, sequences) and labeled when hypothetical?
- Would the expert we interviewed sign it as theirs?

That last question carries most of the weight. If the founder reads the article and says "I'd never put it that way", the voice is wrong, regardless of what the style guide says.

## A worked example: one interview, a week of content

Here is how a single conversation becomes a week of distribution. The company and the timings are hypothetical, but the sequence is the one we follow. Steps marked **[human]** stay with a person.

Imagine a 40-person accounting firm. The marketing lead books 30 minutes with a partner and asks the six questions prospects raised most often on sales calls that month.

| Step | Who | Output |
|---|---|---|
| 1. Choose the questions from sales notes | **[human]** marketing lead | Six questions, ranked |
| 2. Record the interview | **[human]** partner + lead | 30-minute recording |
| 3. Transcribe and tag claims, stories and opinions | AI | Tagged transcript |
| 4. Outline one article around the strongest answer | AI, then **[human]** approves | Outline with source lines |
| 5. Draft the article against transcript and guide | AI | Draft of about 1,500 words |
| 6. Edit with the checklist, fact-check, add data | **[human]** editor | Final article |
| 7. Partner reads and signs off | **[human]** partner | Approval |
| 8. Cut four LinkedIn posts from the other answers | AI drafts, **[human]** edits | Four posts in the partner's voice |
| 9. Write the newsletter section linking the article | AI drafts, **[human]** edits | One newsletter block |
| 10. Pick three 45-60 second clips from the recording | AI suggests, **[human]** chooses | Three short clips with captions |

In this example, the partner spends about 30 minutes talking and 15 reading. The marketing lead spends a few hours on selection and editing rather than days on writing. The model does what it's good at: transcription, structure, first drafts and reformatting. Every claim in every piece traces back to something the partner said on the recording.

> **Note:** The clips and posts come from answers the article didn't use. Repurposing works best when each format gets a different slice of the source, not the same paragraph rewritten five times.

## What we'd never automate

Some parts of content work look like tasks but are really judgment. These stay with a named person in every system we build, and they belong in your [AI usage policy](/blog/ai-usage-policy-template/) as well:

- **The point of view.** What your company believes and is willing to argue in public. A model can phrase an opinion; it can't hold one for you.
- **The final fact check.** Numbers, names, regulations and dates get checked against the primary source by a person before publishing.
- **Anything about a specific customer.** Case details, results and quotes need the customer's explicit approval, and a model shouldn't be the one asking.
- **Replies to real people.** Comments, complaints and journalist questions get answered by someone who can be accountable for the answer.
- **The decision to publish.** Someone signs off on every piece, by name.

## Where we'd start

We wouldn't start with a tool. We'd start with one recorded interview this week and the sales-call questions from last month. Write the one-page voice and claims guide in an afternoon. Run the worked example above once, end to end, and time each human step.

After two or three cycles you'll know where your real bottleneck is. Expect it to be capturing source material, not writing. That's the part worth systematizing first, and it's how we set up the AI Content Engine in our [Growth practice](/services/growth/): your team's expertise as the input, drafts in your voice as the output, and a person approving every piece before it goes out.
