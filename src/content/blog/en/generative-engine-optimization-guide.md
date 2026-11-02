---
title: "GEO: how to get your business recommended by AI assistants"
description: "A practical GEO guide: how ChatGPT, Gemini, Perplexity and Copilot choose which businesses to mention and cite, what to fix first, and how to measure it monthly."
dek: "More buyers now ask an assistant which company to hire, and you can't see what it tells them. How these systems pick names, what actually moves them, and how to track it without guessing."
date: 2026-11-02
lang: en
translationKey: generative-engine-optimization-guide
unit: growth
tags:
  - geo
  - ai search
  - seo
featured: true
readingMinutes: 9
takeaways:
  - "Assistants that browse pull from search indexes. If you're weak in search, you're weak in AI answers, so GEO starts with SEO basics."
  - "Be one clear entity: the same name, description and facts on your site, profiles and directories. Inconsistency makes you easy to skip."
  - "Third-party mentions carry more weight than anything you say about yourself. Reviews, lists, press and communities are the work."
  - "Check robots.txt before anything else. Search crawlers and training crawlers are separate, and blocking the wrong one removes you from answers."
  - "Measure a fixed set of buyer prompts every month for mention, citation, position and sentiment. Expect movement over quarters, not weeks."
faq:
  - q: "How long does GEO take to show results?"
    a: "Technical fixes such as unblocking a search crawler can show up within weeks, once the assistant's index refreshes. Changes that depend on other sites, like new reviews, directory listings or press, take longer because those pages must be published, crawled and weighed. Plan to judge progress over a quarter, with a monthly measurement of the same prompts so you can see which questions moved and which did not."
  - q: "Should we block GPTBot and other AI training crawlers?"
    a: "That is a content-licensing decision, not a visibility one. For OpenAI, blocking GPTBot opts you out of model training, while OAI-SearchBot controls whether you can appear in ChatGPT search answers. Many businesses whose goal is to be recommended allow the search crawlers and decide on training crawlers separately. Make the choice deliberately and document it, because one-switch bot blocking in some CDN and hosting settings can block more than you expect."
  - q: "Does schema markup get us cited by AI assistants?"
    a: "Structured data helps machines read facts like your name, address, hours and services, and it supports rich results in regular search. Google says no special schema is needed to appear in its AI features, and no provider has said markup earns citations by itself. Treat it as hygiene: accurate, matching the visible page, and kept up to date when facts change."
author: sandbox
---

A plant manager in Ohio needs a new maintenance contractor. She doesn't open a search engine. She types into ChatGPT: "Which industrial maintenance companies near Columbus handle conveyor systems and can respond within 24 hours?" She gets three names, a sentence on each, and a couple of links. She calls two of them.

If you were the fourth option, you never find out. There is no lost click in your analytics, no impression in a dashboard. The decision happened inside an answer you didn't see.

Generative engine optimization (GEO) is the work of getting into that answer. It attracts more confident claims than it deserves, so here is what's documented, what we'd fix first and how to measure it honestly.

## How an assistant decides who to mention

An assistant can answer from two places. The first is what the model absorbed in training: a compressed, dated memory of the web. The second is live retrieval: the assistant runs searches, reads a handful of pages and writes an answer grounded in them, usually with citations.

For "who should I hire" questions, retrieval matters most, and retrieval runs on search indexes. ChatGPT search combines OpenAI's own search crawler with third-party search providers, Perplexity crawls for its own results, Microsoft's Copilot grounds web answers in Bing, and Google's AI Overviews and AI Mode draw on Google Search. Google describes a ["query fan-out" technique](https://developers.google.com/search/docs/appearance/ai-features): the system runs several related searches across subtopics and assembles supporting pages from all of them.

From there, a few things decide whether your name survives into the final answer:

- **Entity clarity.** The system has to understand that your brand name, your legal name and your domain are the same business, and what that business does.
- **Consensus across sources.** A company described the same way on its own site, in two directories, in a trade association list and in reviews looks safer to recommend than one that only describes itself.
- **Answerable content.** Pages that state specifics plainly (service area, response times, industries, what's included) are easy to lift into an answer. Pages built of slogans are not.
- **Freshness.** For anything time-sensitive, recently updated pages and recent reviews tend to win over stale ones.

No major provider publishes a ranking formula for this; anyone who claims to have one is guessing. What is documented is the plumbing: crawlers, indexes and retrieval.

## GEO is mostly SEO with a different scoreboard

The uncomfortable truth for anyone selling GEO as a separate discipline: Google states plainly that there are [no additional requirements or special optimizations](https://developers.google.com/search/docs/appearance/ai-features) to appear in AI Overviews or AI Mode. A page has to be indexed and eligible to show a snippet in regular Search. The same fundamentals apply: crawlable pages, internal links, important content in text, structured data that matches what's visible.

So if your SEO is weak, fix that first. But three things genuinely change:

| | Classic SEO | GEO |
|---|---|---|
| Unit of work | Keywords | Full buyer questions, often long and specific |
| What counts as a win | A ranking and a click | Being named, cited and described accurately in the answer |
| Whose content matters | Mostly yours | Yours plus every third-party page the assistant reads about you |

The third row is where most of the new work lives. An assistant answering "best maintenance contractor near Columbus" may cite a directory, an association page and a review site, never your homepage, and decide from those whether to mention you.

## Be one clear entity

Start with an inventory of every place your company is described: your site, Google Business Profile, LinkedIn, Bing Places, industry directories, association listings, review platforms. Then compare them.

> **Example:** A hypothetical 40-person firm finds five versions of itself. The website says "industrial maintenance and automation." LinkedIn says "engineering services." One directory lists an old address; another lists only HVAC. An assistant reading these has no stable picture of what the company does or where, so it recommends a competitor whose descriptions agree.

The fix is unglamorous and it works:

1. Write one canonical description: legal name, brand name, one-sentence summary, services, industries, service area, founding year, contact details.
2. Make your About page and homepage state those facts in plain text.
3. Update every profile to match, starting with the ones that rank for your brand name.
4. Add Organization or LocalBusiness structured data that mirrors the visible facts, with `sameAs` links to your official profiles.
5. Put a recurring check on the calendar. Directories drift.

## Write pages an assistant can quote

Assistants answer questions, so pages that are shaped like answers get used. Compare two versions of a services page:

> **Example:** Version A: "We deliver world-class maintenance solutions tailored to your unique needs." Version B: "We maintain conveyor, packaging and palletizing systems for food and beverage plants within 150 miles of Columbus. Emergency response is on site within 24 hours; planned maintenance is scheduled monthly or quarterly."

Version B can be quoted in an answer to the plant manager's question. Version A can't be quoted in an answer to anything.

What we'd build, in this order:

- **One page per core service** that answers who it's for, what's included, where you operate and how it works, in the first two paragraphs.
- **Comparison pages** for the choices buyers actually weigh: in-house versus outsourced, your approach versus the common alternative. Be fair. A comparison that only flatters you reads like an ad, to people and to models.
- **A real FAQ** built from questions your sales team hears every week, answered in three or four sentences each.
- **Specifics everywhere.** Numbers you can stand behind, named industries, named locations, concrete timelines. Academic work points the same way: in the [original GEO paper](https://arxiv.org/abs/2311.09735), researchers from Princeton and IIT Delhi rewrote pages on a benchmark of queries and found that citing sources, adding quotations and adding statistics were the most effective changes for visibility in generated answers. It's a lab setting, not a guarantee, but the direction is clear: specific beats vague.

The trap is producing hundreds of thin pages aimed at every possible question. That's the content farm playbook, and it fails in AI answers for the same reason it fails in search. If you're scaling content with AI, the system matters more than the volume; we wrote about that in [AI content without the slop](/blog/ai-content-without-the-slop/).

## Earn the mentions you can't write yourself

This is the slowest part, and it separates the businesses assistants recommend from the ones they ignore. Your own site is one vote. Where we'd put the effort, in the order we'd usually tackle it:

- **Reviews on the platforms your category uses.** Google for local services, G2 or Capterra for software, industry-specific sites where they exist. Ask every happy client, consistently. Volume and recency both matter.
- **Lists and directories that rank for your category.** Search your top buyer questions and look at which third-party pages appear. Those are the pages assistants are likely reading. Getting listed, accurately, is often a form and an email.
- **Trade press and associations.** A quoted opinion in an industry publication, a talk at an association event, a member listing.
- **Communities.** Forums, Reddit threads and professional groups where buyers ask for recommendations. Participate as a person with expertise, not a brand dropping links, or it backfires.

## Technical access: let the right crawlers in

Before any content work, check your robots.txt and your CDN or firewall bot settings. Some CDNs and hosting platforms offer one-switch blocking of AI bots, and it's easy to turn on without realizing it also removes you from AI answers.

The key point: providers separate crawlers by purpose. Blocking training doesn't have to mean disappearing from answers.

| Provider | Search / answers | Model training | User-triggered fetches |
|---|---|---|---|
| OpenAI | OAI-SearchBot | GPTBot | ChatGPT-User |
| Anthropic | Claude-SearchBot | ClaudeBot | Claude-User |
| Perplexity | PerplexityBot | (not used for training) | Perplexity-User |
| Google | Googlebot (Search, AI Overviews, AI Mode) | Google-Extended (a robots.txt token) | - |

Per [OpenAI's documentation](https://developers.openai.com/api/docs/bots), sites that block OAI-SearchBot won't be shown in ChatGPT search answers (they can still appear as plain navigational links), while disallowing GPTBot signals that content shouldn't be used for training. [Anthropic](https://support.claude.com/en/articles/8896518) documents the same split, and Perplexity says PerplexityBot isn't used to crawl content for training foundation models. User-triggered fetchers are different: OpenAI and Perplexity both note that robots.txt may not apply when a person asks the assistant to open a page. Google states that [Google-Extended](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) does not affect inclusion or ranking in Google Search; it governs use of your content for Gemini models and grounding outside Search.

A robots.txt for a business that wants to be recommended but opts out of training might look like this:

```text
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /
```

Whether to block training is a business decision; make it on purpose. OpenAI and Perplexity say changes can take up to about 24 hours to register. Also make sure key content is in the HTML, not only rendered by scripts or locked in PDFs, and keep your sitemap current.

> **Note:** You'll hear that every site needs an llms.txt file. It's a [proposal](https://llmstxt.org/) from 2024 for a Markdown file that points AI tools to a site's key content. It's cheap to add and can help tools that read it, but it's a community convention, not a standard, and Google says no special AI text files are needed for its AI features. Add it if you like. Don't expect it to move recommendations.

## Measure with a fixed set of buyer prompts

You can't manage what you only check when someone forwards a screenshot. The method we use: a fixed question set, asked the same way every month.

Build 20 to 40 prompts from real buyer language: sales call notes, support tickets, Search Console queries. Mix three types: category questions ("best X for Y"), comparisons ("X versus Y"), and problem questions where your service is one possible answer. Then run each prompt on the assistants your buyers use and record four things:

```text
Prompt: Which industrial maintenance companies near Columbus handle conveyors?
Assistant: ChatGPT (search on) | Date: 2026-11-02 | Run: 1 of 3
Mentioned:   yes / no
Cited:       yes / no   (which URL: ours / directory / review site / other)
Position:    1st, 2nd, 3rd… among companies named
Sentiment:   positive / neutral / negative / inaccurate
Sources the answer cited: ...
```

Answers vary between runs, so ask each prompt more than once and use logged-out or clean sessions where possible. Track the share of prompts where you're mentioned, not single answers, and take the first run before you change anything, for the reason we give in [measuring AI ROI without fooling yourself](/blog/measuring-ai-roi/): without a before, every after is an opinion. And read the cited sources every time: they are your to-do list. If a directory you're missing keeps showing up, that's next week's task.

This is the same logic as the simulation on our homepage, which shows [how an assistant reads sources and picks names](/#geo). Bing Webmaster Tools also has an AI Performance report (in public preview since February 2026) that counts how often your pages are cited in Copilot and Bing's AI summaries. It's free and worth connecting if your buyers live in Microsoft products.

## Where we'd start

If we had one month and a company with decent SEO but no AI visibility, this is the order:

1. **Week 1:** Fix crawler access and write the canonical entity description. Run the first measurement of the prompt set as a baseline.
2. **Week 2:** Update every profile and directory to match. Add structured data that mirrors the visible facts.
3. **Week 3:** Rewrite the core service pages and FAQ to answer the top buyer questions directly. Fix one comparison page.
4. **Week 4:** Start the third-party plan: a review request process, the five most-cited directories you're missing, one trade publication pitch.

Then measure monthly and let the cited sources tell you what's next. Nobody can guarantee a citation; assistants change how they answer without notice. What you control is whether you're crawlable, consistent, quotable and mentioned by others. That's where most of the work is. If you run an agency and want to offer this to your own clients, we cover the delivery model in [how agencies can sell AI services without building an AI team](/blog/white-label-ai-for-agencies/).

If you'd like a baseline for your own category, that's how our [AI Search Visibility (GEO)](/services/growth/) work starts: a question set built from your buyers' real questions and a measured picture of where you stand today.
