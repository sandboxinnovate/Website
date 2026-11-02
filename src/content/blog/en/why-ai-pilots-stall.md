---
title: "Why AI pilots stall, and the five decisions that get them to production"
description: "Why AI pilots stall after a good demo, what the failure research really says, and five decisions to make before building. Includes a one-page pre-pilot checklist."
dek: "The demo worked. Three months later the team still does it the old way. Pilot purgatory is rarely a model problem: it comes from decisions nobody made before the build started."
date: 2026-11-02
lang: en
translationKey: why-ai-pilots-stall
unit: consulting
tags:
  - ai strategy
  - ai pilots
  - change management
readingMinutes: 8
takeaways:
  - "Most stalled pilots don't fail; they just never replace anything. The causes are organizational more often than technical."
  - "Widely shared failure rates (80%, 95%) come with real caveats. Read the method before you repeat the number."
  - "Make five decisions before building: one owner, one number, real data and permissions, a designed exception path and a switch-over date."
  - "A pilot without a date when the old way stops is an experiment with no end, and it competes with the old way forever."
  - "If you can't fill in the one-page checklist below, you're not ready to build. You're ready for an audit."
faq:
  - q: "How long should an AI pilot run before we decide?"
    a: "Long enough to see real volume, short enough that nobody forgets why it started. For a single process we plan one or two weeks of setup on real data and about two weeks in shadow mode, so a first agent is typically live in three to five weeks. Then give it a month at full volume against the baseline. If the number hasn't moved by then, the problem is usually the metric or the volume, and more weeks won't fix it."
  - q: "Should we restart a stalled pilot or kill it?"
    a: "Run it through the five decisions. If you can name an owner, a baseline number and a switch-over date today, restart it with those in place; most of the build is often reusable. If nobody will own it, or the number it would move doesn't matter to anyone in leadership, kill it on purpose and say why. A clean stop costs less than a pilot that lingers for a year."
  - q: "Do we need to clean up our data before any AI pilot?"
    a: "Usually not as a separate project. Messy data is normal: duplicate customers, product codes typed three ways, PDFs that are really photos. Handling that is part of the build, and the exception queue catches what the rules miss. Clean up only what blocks the one process you are piloting. A months-long cleanup before anyone sees a result is one of the most reliable ways to stall."
author: sandbox
---

The demo goes well. Someone forwards a messy customer email, and thirty seconds later the AI has pulled out the order, matched the products and drafted a reply. People in the room lean forward. The COO says "let's pilot it."

Twelve weeks later the pilot is still running, and so is the old process. The coordinator checks every AI output, then types the order into the ERP herself because the integration "is coming." Nobody has cancelled anything. Nothing has shipped either.

This is pilot purgatory, and it's the most common way we see AI projects end at mid-size companies: not with a failure anyone can point to, but with a slow fade. The causes are predictable. Most of them are settled, or left unsettled, before anyone writes a prompt.

## What the research says, and what it doesn't

You've probably seen the headline numbers. Read them carefully before repeating them in a board meeting.

A [2024 RAND report](https://www.rand.org/pubs/research_reports/RRA2680-1.html) based on interviews with 65 experienced data scientists and engineers opens by noting that, by some estimates, more than 80% of AI projects fail. That figure is cited from other estimates, not measured by RAND. The interviews themselves are the useful part. Three of the five root causes the authors identify have nothing to do with model capability: leaders misunderstanding or miscommunicating the problem, organizations lacking the data to do it well, and teams chasing the latest technology instead of solving a real problem for the people who will use it.

In 2025, a report from MIT's Project NANDA spread widely with the claim that 95% of organizations are getting zero return from generative AI. The report itself is more modest. It is labeled preliminary findings, and its method is interviews with people at 52 organizations, a survey of 153 leaders at four industry conferences and a review of more than 300 publicly disclosed initiatives. "Success" means users or executives reported a marked, sustained productivity or P&L impact, and the authors call their figures directionally accurate, based on interviews rather than company reporting. That's a narrow definition and a small sample. It's a signal, not a census.

Gartner, for its part, [predicted in July 2024](https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025) that at least 30% of generative AI projects would be abandoned after proof of concept by the end of 2025, citing poor data quality, inadequate risk controls, escalating costs or unclear business value. That's a forecast, not a count.

Past the percentages, the causes these sources name are the useful part: unclear problems, missing data, unclear value, risk nobody planned for, tools that don't fit how work actually happens. Very few of them are about whether the model could do the task. Projects stall in the space between the demo and the daily workflow.

## How a working demo dies

When we look at a stalled pilot, we usually find some combination of these six causes. They tend to show up at predictable moments.

| Cause | What it looks like in week 8 |
|---|---|
| No owner with authority | The project has a champion who liked the demo, but nobody who can change how the team works. Decisions wait for a meeting. |
| No baseline number | Everyone agrees it "seems helpful." Nobody can say whether it beat the old process, so nobody can justify the next step. |
| Toy data | It was built on 40 hand-picked examples. Real inputs include scanned PDFs, forwarded threads and customers who write in three languages. |
| Not wired into the workflow | Outputs land in a separate tool. People copy and paste, which adds a step instead of removing one. |
| No exception design | The first strange case goes wrong, someone screenshots it, and trust drops faster than any accuracy chart can rebuild it. |
| No change management | The old way still works and nobody was told when it would stop, so the team keeps using it. |

Notice that only one of the six is about data, and none is about which model you chose.

## Five decisions to make before anyone builds

Each cause above maps to a decision. Make them in writing, before the build, and the pilot has a path to production. Skip them and you're running a demo with a longer shelf life.

### 1. One owner, with authority over the workflow

Not a committee and not the person who found the tool. The owner is the manager who runs the process today: the one who can change the team's routine, approve the rules the AI follows and answer "is this good enough?" without escalating.

> **Rule of thumb:** If the owner can't change who does what on Monday morning, they're a sponsor, not an owner. You need both, but the pilot lives or dies with the owner.

### 2. A number agreed up front

Pick one primary metric, measure its baseline before you start, and write down the target. Add one guardrail metric that must not get worse. "Time saved" is fine only if you actually measured the time; otherwise use something the system already records, like time from request to response, touches per order or error rate. We go deeper on this in [measuring AI ROI without fooling yourself](/blog/measuring-ai-roi/).

Also write the kill criterion. "If by week four the AI handles fewer than half of cases without a correction, we stop or rescope." A pilot that can't fail can't succeed either.

### 3. Real data and real permissions from day one

Build on the real inbox, the real documents and a real connection to the system of record, with the access rights it will have in production. The security and IT review happens now, not after the demo. In our experience, data that takes three months to reach is the most common reason a 4-week pilot becomes a 6-month one.

### 4. The exception path, designed

Decide what the AI should do when it isn't sure, and who receives it. Every exception goes to a named queue with the reason attached ("unknown product code," "price differs from the price list"), so the person who handles it can act in seconds. Decide which actions always need human approval, at least at first. Exceptions aren't a sign the system failed. They are a part of the system, and you design them like one.

### 5. A date when it replaces the old way

This is the decision teams skip most often, and the one that matters most. Set the date when the old process stops: the inbox rule changes, the manual form goes away, the team's role shifts to reviewing exceptions. Tell the team early, explain what changes for them, and train them on the new routine before the date, not after.

Until that date exists, the pilot is competing with the old way, and the old way has years of habit on its side.

## A worked example: the order desk

> **Example:** A hypothetical 30-person distributor. All numbers are illustrative.

The order desk receives about 350 orders a week by email, as PDFs, spreadsheets and plain text. Three coordinators read each one and key it into the ERP, at around 7 minutes per order. That's roughly 41 hours a week. About 1 in 40 orders needs a correction after entry.

Here is how the five decisions look for this desk:

- **Owner:** the operations manager who supervises the three coordinators. Not the IT lead, not the owner of the company.
- **Number:** primary metric, the share of orders entered with no human touch, from a baseline of zero to a target of 70% in the first month after switch-over. Guardrail: the correction rate stays at or below 1 in 40.
- **Data:** the real shared inbox and a write connection to the ERP's order module, approved by IT in week one. Tested on the last three months of real orders, including the ugly ones.
- **Exceptions:** unknown product code, price mismatch, new customer or credit hold go to a coordinator queue with the reason and the original email attached. New customers always need approval.
- **Date:** two weeks in shadow mode (the AI drafts, coordinators compare), then on a fixed Monday in week five new orders flow through the AI by default.

If the target holds, 245 orders a week enter without a touch. The other 105 still need a person, but the AI has already done most of the reading, so say 4 minutes each: about 7 hours. The desk goes from around 41 hours of keying to around 7 hours of exception handling. The coordinators don't disappear; their job becomes the cases that need judgment, plus the customers they never had time to call back.

The numbers are invented. The structure is the point: every one of them was written down before the build started, so a month after switch-over nobody has to argue about whether it worked.

## The one-page pre-pilot checklist

Copy this into a doc and fill it in with the process owner. If any line stays blank, that's the work to do before building, not during.

```text
PRE-PILOT CHECKLIST

Process: ______________________________________________
Owner (runs this process today): ______________________
Executive sponsor: ____________________________________

THE NUMBER
Primary metric: _______________________________________
Baseline (measured, with date): _______________________
Target and by when: ___________________________________
Guardrail metric that must not get worse: ____________
Kill / rescope criterion: _____________________________

DATA AND ACCESS
Real inputs used for testing (source, how many): ______
Systems it reads from: ________________________________
Systems it writes to: _________________________________
Access approved by (name, date): ______________________

EXCEPTIONS
Cases the AI must hand to a person: __________________
Who receives them, in which queue: ___________________
Actions that always need human approval: _____________

SWITCH-OVER
Shadow-mode period (dates): ___________________________
Date the old process stops: ___________________________
Team trained by (date): _______________________________
Who reviews results each week: ________________________
```

It fits on one page on purpose. If filling it in takes more than an hour with the right people in the room, the process isn't ready to be a pilot yet.

## Where we'd start

If you already have a stalled pilot, fill in the checklist with the process owner before anyone touches the prompts or the integration. The blank lines are your restart plan, and they are usually owner, number or switch-over date, not anything technical.

If you're choosing what to pilot, start with the process, not the tool. Our guide to [choosing the first process to hand to an AI agent](/blog/choosing-your-first-ai-agent/) has a scorecard for that.

This is also how our [consulting engagements](/services/consulting/) are built. The AI Opportunity Audit takes 2–3 weeks: interviews with leadership and 6–12 team members, a map of how work actually flows, a data readiness and security review, and a 90-day roadmap with the first three projects scoped. Our bar for "scoped" is this checklist filled in for each one. The Implementation Sprint then takes 4–8 weeks to automate two or three of those processes end to end, with before-and-after metrics for each and a handover playbook so your team runs them afterward.

If you'd like a second opinion on a pilot that's been "almost ready" for a while, [book a call](/contact/) and bring the checklist, even half filled in.
