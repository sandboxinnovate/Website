---
title: "How to choose the first process to hand to an AI agent"
description: "A scorecard for choosing your first AI agent: five criteria scored 1 to 5, two gates, a worked example with six candidate processes, red flags and what done looks like."
dek: "Your first agent becomes the team's verdict on AI. Score the candidates on five criteria, apply two gates and pick the process that can prove itself in five weeks."
date: 2026-11-02
lang: en
translationKey: choosing-your-first-ai-agent
unit: brains
tags:
  - ai agents
  - process automation
  - ai strategy
readingMinutes: 9
takeaways:
  - "Score each candidate process 1 to 5 on volume, rules vs judgment, data access, risk and reversibility, and how measurable the outcome is."
  - "Treat risk and measurability as gates: a process below 3 on either is not a first agent, whatever its total."
  - "In our hypothetical 40-person example, inbound lead qualification wins: frequent, rule-based, recoverable mistakes and a metric the CRM already tracks."
  - "CV screening is a poor first pick. Hiring tools are high-risk under the EU AI Act and need bias audits in New York City, and an unfair rejection goes unnoticed."
  - "A first agent is done when it has one owner, one metric with a baseline, written approvals and a log of every run. That typically takes 3 to 5 weeks."
faq:
  - q: "How many processes should we score before choosing?"
    a: "Enough to have a real choice, usually eight to fifteen. Ask the people who do the work, not only managers: they know which tasks repeat, which ones get dropped on busy days and where the data actually lives. Once the group has scored the first two together, the rest go quickly. Keep the full list, because the runners-up become your roadmap for agents two and three."
  - q: "What if the team that owns the best candidate doesn't want an agent?"
    a: "Take it seriously. An owner who doesn't want the agent won't review its log or fix its rules. Find out what the objection is: often it is fear of being measured or replaced, or a bad experience with a chatbot. Shadow mode helps, because the team sees the agent's drafts for weeks before anything goes out on its own. If the resistance holds, start with the runner-up."
  - q: "Should the first agent be customer-facing or internal?"
    a: "Either can work. Internal agents are easier to approve, but their results are usually felt by one or two people, so they change fewer minds. Customer-facing agents move numbers the whole company sees. We favor them when a mistake is cheap to correct and every outbound message can be approved during the first weeks. Let the risk score decide, not the category."
author: sandbox
---

Six weeks after a first AI agent goes live, someone in the Monday meeting asks how it's going. If the answer is a number ("median reply time went from next morning to eight minutes"), the next question is which process goes second. If the answer is a story about the wrong price it sent a good customer, every AI idea after that gets the same reply: remember last time.

That is why the first pick matters more than the model or the vendor. The first agent isn't judged as one project; it becomes the team's verdict on AI.

Gartner [predicts that over 40% of agentic AI projects will be canceled by the end of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), citing escalating costs, unclear business value or inadequate risk controls. Two of those three are largely decided before anyone writes code, at the moment you choose the process. Here is the scorecard we use to choose.

## Five criteria, scored 1 to 5

Score every candidate on the same five questions. A 5 is always the good end, so a higher total is better.

| Criterion | The question | A 5 looks like | A 1 looks like |
|---|---|---|---|
| Volume and frequency | How often does this happen? | Dozens of times a week | A few times a month |
| Rules vs judgment | Could you write the rules down? | One page, and two people would apply them the same way | Mostly experience, taste or negotiation |
| Data access | Can the agent reach what it needs? | It sits in tools with an API or export, and access takes days | It lives in one person's head |
| Risk and reversibility | What does the worst realistic mistake cost? | Internal, caught in review, fixed in minutes | Touches someone's job, money, health or legal standing; irreversible |
| Measurable outcome | Will you know if it worked? | A tracked metric with a baseline that moves within weeks | Success is a matter of opinion |

Three of these get scored wrong all the time.

**Rules vs judgment has a twist.** If both the rules and the input are clean (fixed form fields, a status change), an automation tool will do the job more cheaply and predictably than an agent. Agents earn their keep where clear rules meet messy input: free-text emails, PDFs, half-filled forms. Score the rules, not the input.

**Data access is about reach, not cleanliness.** Messy data is normal, and organizing it is part of the build. What kills a first agent is data it can't reach: a vendor that won't grant API access, a spreadsheet on one laptop, qualification criteria only the sales lead knows. If access will take more than the first week or two, it isn't your first agent.

**Score risk on the worst realistic mistake, before approvals.** Approvals reduce risk, but they cost time. If a person must review every output forever, you've built an expensive draft generator. Ask who would see the mistake, what it would cost and whether you could undo it by Friday.

Then apply two gates. **A first agent needs at least a 3 on risk and at least a 3 on measurability, whatever its total.** A process you can't measure produces an argument, not a verdict. A process with a 2 on risk produces exactly the story you don't want told on Monday. If two candidates tie, pick the one with the better risk score.

## A worked example: six candidates at a 40-person company

> **Example:** A hypothetical 40-person company that installs and maintains commercial HVAC systems. The owner, the operations manager and the office coordinator spend an hour scoring six candidate processes. All volumes and times are illustrative.

| Candidate | Volume | Rules | Data | Risk | Metric | Total | Gates |
|---|---|---|---|---|---|---|---|
| Inbound lead qualification | 4 | 4 | 4 | 4 | 5 | **21** | Pass |
| First reply to support tickets | 5 | 3 | 3 | 3 | 4 | 18 | Pass |
| Weekly operations report | 2 | 5 | 3 | 5 | 3 | 18 | Pass |
| Invoice matching | 4 | 5 | 3 | 2 | 4 | 18 | Fails risk |
| Proposal first drafts | 3 | 2 | 2 | 3 | 2 | 12 | Fails metric |
| CV screening | 3 | 2 | 4 | 1 | 2 | 12 | Fails both |

How they got there:

- **Inbound lead qualification.** Around 40 quote requests a week arrive by web form and email. The criteria fit on a page: service area, building type, system size, timeline and whether the person asking can sign. The CRM already timestamps every inquiry and first reply, so the baseline exists. The worst realistic mistake, a clumsy reply or a good lead marked as a poor fit, is visible and fixable with a phone call.
- **First reply to support tickets.** The highest volume, about 150 service requests a week. But the urgency rules have exceptions only senior technicians know, contract terms sit in PDFs, and a misrouted emergency (a clinic without cooling in July) is expensive.
- **Weekly operations report.** The safest candidate: internal, and checked by whoever reads it. But it runs once a week, part of it is plain automation, and it saves a few hours of one person's time.
- **Invoice matching.** About 300 supplier invoices a month, matched against purchase orders and delivery receipts. Crisp rules and messy input (PDFs, photos from the field) are good agent territory. But the failure mode is money leaving the building for the wrong amount.
- **Proposal first drafts.** Impressive in a demo. In practice, pricing and scope depend on the estimator's judgment, past proposals are scattered across folders, and win rate takes months to move.
- **CV screening.** See the next section.

### Why lead qualification goes first

The total is highest, but the reasons behind it matter more.

The metric is one the owner already cares about. Say the coordinator spends six minutes per inquiry: reading it, checking the service area, replying and logging it in the CRM. At 40 a week, that is four hours, and replies wait until she gets to them, often the next morning. An agent that replies within minutes, asks for missing details and books qualified leads into the estimator's calendar moves two numbers the team can see: time to first reply, and qualified site visits booked per week. Measuring that honestly is its own discipline: see [measuring AI ROI without fooling yourself](/blog/measuring-ai-roi/).

Mistakes surface fast. A bad reply shows up in the log the same day, and a rejected lead goes to a review queue instead of disappearing.

And it builds what agent number two needs. The service area map, building types, services catalog and inbox connection are most of what a support-reply agent will reuse. On the tie-break alone, the weekly report would rank second. We'd still build support next, because it reuses most of what the lead agent built and moves a number customers feel. It goes second once contract terms are in the knowledge base and the team has watched one agent work for a month. Invoice matching comes later, with approval on every payment. One agent at a time is how a [company brain](/blog/what-is-a-company-brain/) gets built.

If the owner isn't ready for anything customer-facing, the weekly report is the defensible alternative. It's low stakes and quick to ship; it just won't change many minds.

## Why CV screening is a poor first agent

On paper, hiring looks like a strong candidate: volume in bursts, a clear pain, data already in an applicant tracking system. We still wouldn't make it anyone's first agent.

Regulators treat it as high-risk. The EU AI Act lists AI systems used to recruit or select people, including to analyze and filter job applications, as [high-risk in Annex III](https://eur-lex.europa.eu/eli/reg/2024/1689/oj), and after the 2026 amendments those rules [apply from 2 December 2027](https://eprs.europarl.europa.eu/EPRS_ATA%282025%29772906). In New York City, [Local Law 144](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page) bars employers from using an automated employment decision tool unless it has had a bias audit within the past year, a summary of the results is public and candidates receive notice. Anti-discrimination law applies whatever tool you use. This is not legal advice; if you hire with AI, involve employment counsel.

The failure is silent. When a lead agent writes a bad reply, someone notices. When a screening agent rejects a qualified candidate for the wrong reason, that person simply never hears back, and nothing in your metrics flags it. Reuters [reported in 2018](https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G) that Amazon's experimental recruiting engine, trained mostly on résumés from men, learned to penalize the word "women's", and the project was dropped. Amazon said its recruiters never used it to evaluate candidates.

And a 40-person company rarely has enough applications to tell a biased pattern from noise.

There is lower-risk hiring work for AI later, such as scheduling interviews or answering candidates' questions about the role. Ranking people is a different job, and not the one to learn on.

## Red flags the scores won't show

If any of these is true, fix it first or pick another process.

- **Nobody agrees on how the process works.** If three people handle it three ways, the agent will automate the argument.
- **The owner is a committee.** "Sales and ops share it" usually means nobody reviews the log or decides when the rules change.
- **It was chosen for the demo.** The most impressive use case is rarely the most measurable one. Proposal writers make great videos and poor verdicts.
- **The win depends on access you don't have.** If getting data out of a system needs a vendor negotiation, start that in parallel and choose something else to build first.
- **It only works if the agent does everything.** If the plan can't tolerate a person approving outputs for the first weeks, the plan is wrong.

## What done looks like in 3 to 5 weeks

A first agent is typically live in 3 to 5 weeks. "Live" needs a definition, or the project drifts into an endless pilot. Here is how the lead-qualification example would run:

- **Week 1:** map the process with the coordinator, write the rules on one page, collect 40 past inquiries as test cases, connect the inbox, CRM and calendar.
- **Week 2:** write the spec: what triggers the agent, what it decides alone (acknowledge, ask for missing details, classify), what it asks about (anything outside the service area) and what it never does (quote prices, promise install dates).
- **Weeks 3 and 4:** build and test against the past cases, then run in shadow mode: the agent drafts every reply, the coordinator decides what goes out.
- **Week 5:** live, with every outbound reply approved at first. Each reply type goes out on its own once the log shows it approved unchanged for a few weeks.

The definition of done we hold any first agent to:

- **One owner.** A named person who reviews the log weekly and decides rule changes.
- **One metric, with a baseline.** Measured on the old process before launch, with a target agreed up front.
- **Approvals written down.** Which actions wait for a person, and what evidence would let each one run on its own. More in [where an AI agent should ask permission](/blog/human-in-the-loop-ai-approvals/).
- **A log of every run.** Inputs, steps, decisions and approvals, readable without an engineer.
- **A clear "I don't know".** When unsure, the agent hands off to a person with a summary, not a guess.
- **An off switch.** The team can pause the agent and fall back to the old process the same day.

## Where we'd start

Put the owner and two people who do the work in a room for an hour. List every process repetitive enough to annoy someone, and score each one:

```text
FIRST AGENT SCORECARD  (1-5, 5 = better)

Process:
Owner (one name):

Volume and frequency     __  How many times a week?
Rules vs judgment        __  Do the rules fit on one page?
Data access              __  Can the agent reach it within two weeks?
Risk and reversibility   __  Worst realistic mistake? Undo it by Friday?
Measurable outcome       __  Which metric? What's the baseline today?

Total (out of 25):       __
Gates: risk >= 3 and outcome >= 3?   yes / no
Red flags:
```

Take the top two that pass the gates, check them against the red flags, then pick one. Not both: the second agent goes faster once the first has built the knowledge, the connections and the team's approval habits.

For an outside view first, the [AI Diagnostic](/diagnostic/) takes three minutes and scores your readiness by dimension. Or bring your top candidate to a call and we'll sketch the agent with you; the [Brains page](/services/brains/) shows how a Single Agent build is scoped.
