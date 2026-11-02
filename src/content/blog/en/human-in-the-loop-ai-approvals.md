---
title: "Human in the loop, by design: where an AI agent should ask permission"
description: "How to design human approval for AI agents: five autonomy tiers, a decision matrix for each task, what approvers need to see, and the numbers that justify more autonomy."
dek: "Approval is not the brake on an AI agent. It is how the agent earns trust, one reviewed case at a time. Here is how to decide where a person signs off, and when they can stop."
date: 2026-11-02
lang: en
translationKey: human-in-the-loop-ai-approvals
unit: brains
tags:
  - ai agents
  - human in the loop
  - ai governance
readingMinutes: 8
takeaways:
  - "Use five tiers per task: never automate, suggest only, draft then approve, act and notify with an undo window, and act alone with an audit log."
  - "Place each step of a process by three questions: can it be undone, what does a mistake cost, and will a customer see it."
  - "An approval should take seconds: context, sources, the proposed action as a diff, and one tap to approve, edit or reject."
  - "Promote a task only on evidence, such as 200+ cases with 95% approved unchanged and no serious errors, and demote it the moment that stops being true."
  - "Write the never-automate list before you build anything. It is the shortest document in the project and the one people remember."
faq:
  - q: "Doesn't requiring approval cancel out the time an agent saves?"
    a: "Much less than people expect. The slow part of most tasks is gathering context: finding the order, reading the policy, checking history, writing the reply. The agent does all of that before the approver sees anything. Reviewing a prepared case with sources attached takes seconds, not minutes. And as tasks prove themselves, they move to tiers where nobody approves each one, so the review load shrinks over time."
  - q: "Who should be the approver?"
    a: "The person who owns that decision today, by name, with a named backup. If a team lead approves refunds now, the team lead approves the agent's refunds. Don't route everything to one manager or to a shared queue nobody owns. Set approval limits that match the authority people already have, so the agent never gives anyone more power than their role does."
  - q: "Does the agent learn from rejections on its own?"
    a: "Not by itself, and you wouldn't want it to. The model isn't retrained on your approvals. Rejection reasons are logged and reviewed, usually weekly, and they become specific changes: a missing policy added to the knowledge base, an instruction clarified, a new case sent to a person by default. A person decides each change, and the evaluation set is rerun before it goes live."
author: sandbox
---

It is 11:40 on a Sunday night and a customer writes in: the blender arrived cracked, here is a photo, can I get my money back. Your support agent has already read the message, found the order, checked the delivery date and pulled the relevant clause from your refund policy. It has access to the store admin. It could issue the refund right now.

The question isn't whether it can. It's whether it should, alone, at this hour, for this amount, for this customer.

Most teams answer that question in one of two bad ways. Some make a person approve everything, and within a month the approval queue is a second inbox that people clear by clicking "approve" without reading. Others approve nothing, and the first wrong refund or the first odd email to a key account ends the project. Both come from treating approval as an on/off switch. It works better as a design decision you make per task, and revisit with data.

## Approval is how an agent earns trust

Think of approvals as the agent's probation period. Every case a person reviews produces a labeled example: approved as is, edited, or rejected with a reason. Collect a few hundred of those and you no longer have to guess whether the agent handles refunds well. You know, for that kind of refund, with that policy, at that volume.

Approval is also a security control. The [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) names "excessive agency" (giving a system more functions, permissions or autonomy than it needs) as a top risk, and one of its recommended mitigations is human-in-the-loop control: a person approves high-impact actions before they are taken. A model can be wrong, and it can be manipulated by text hidden in an email or a document it reads. An approval step limits what either failure can do.

And whatever the agent says or does, your company owns it. In February 2024, British Columbia's Civil Resolution Tribunal held Air Canada responsible for what its website chatbot told a customer about bereavement fares, rejecting the argument that the chatbot was responsible for its own words ([Moffatt v. Air Canada, 2024 BCCRT 149](https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do)). That was a chatbot giving information. An agent that acts carries more weight, not less. (This is context, not legal advice.)

## Five tiers of autonomy

We assign every step of a process to one of five tiers. The tier belongs to the step, not to the agent: the same agent can look up orders on its own and still need a signature to send money.

| Tier | What the agent does | What the person does | Typical examples |
|---|---|---|---|
| 0. Never automate | Nothing, or routes it to a person | Owns it entirely | Legal threats, regulator requests, hiring and firing, changes to bank details |
| 1. Suggest only | Recommends; takes no action | Decides and acts | Which account to prioritize, how to answer a complaint from a top client |
| 2. Draft, then approve | Prepares the action in full | Approves, edits or rejects before it runs | Customer replies, refunds above a limit, CRM updates on key accounts |
| 3. Act and notify | Acts, tells a person, keeps an undo window | Reviews after the fact, can reverse | Small refunds within policy, rescheduling a meeting, tagging tickets |
| 4. Act with an audit log | Acts; every step is logged | Samples the log on a schedule | Looking up records, summarizing a thread, filing a document |

Tier 3 deserves a closer look because it is the one most teams skip. "Act and notify" only works if the undo is real. A refund that settles the moment it is issued has nothing to undo unless you deliberately hold it for a few minutes first; a message already in the customer's inbox can't be recalled. If you can't build a genuine undo window, the step belongs in tier 2.

Write the tier 0 list first, before anything is built, and keep it short and specific. Ours usually starts with: anything that creates a legal or contractual commitment, anything that changes who has access to what, payments to a new or changed bank account, replies to regulators or lawyers, and decisions about a person's job. Your list will add items from your own industry.

## Three questions that place a task in a tier

For each step, ask three things.

1. **Can it be undone?** Fully, partly, or not at all. A draft can be deleted. A sent email cannot.
2. **What does a mistake cost?** Money, time to fix, and the harder number: a relationship.
3. **Will a customer see it?** Internal mistakes get fixed quietly. External ones become screenshots.

Then use a simple rule: the worst answer sets the tier.

| Reversible? | Cost of an error | Customer sees it? | Starting tier |
|---|---|---|---|
| Yes | Low | No | 4 |
| Yes | Low | Yes | 3 |
| Partly | Medium | Either | 2 |
| No | Low | Yes | 2 |
| No | High | Either | 1 or 0 |

> **Rule of thumb:** Start every step that writes, sends or spends one tier lower than the matrix suggests. Promotion is cheap and comes with data. Demotion after an incident comes with an apology.

## Walk-through: the cracked blender

Back to Sunday night. Here is how a well-designed support agent would split that refund request, in a hypothetical store whose policy says damaged-on-arrival items get a full refund without a return. The refund is a small amount, below the limit the support lead approves on their own today.

- **Read and classify the message:** tier 4. Nothing leaves the building.
- **Find the order and the customer's history:** tier 4. Read-only.
- **Match the case to the policy clause:** tier 4, but the clause is cited so the approver can check it.
- **Issue the refund:** tier 2 at launch. A candidate for tier 3 later, for amounts under the limit.
- **Reply to the customer:** tier 2 at launch.
- **Refund on an order with an open chargeback:** tier 0. Routed to a person with a note.

What the approver receives on Monday morning, in the helpdesk or team chat they already use, looks like this:

```
REFUND REQUEST · Order 10482 · Customer since 2023, 4 orders, no prior refunds
Request:   Item damaged on arrival (photo attached)
Policy:    Returns & refunds v3, section 2: "Damaged on arrival: full refund,
           no return required"  [open source]
Checks:    Delivered 2 days ago: yes · Within 30-day window: yes · Below approver limit: yes
Proposed:  Refund full item amount to original payment method
Reply:     "Sorry about the blender. We've refunded the full amount to your card;
           you'll see it in 3–5 business days. No need to send it back."
Why asked: Refunds are tier 2 until this task is promoted.

[ Approve ]   [ Edit ]   [ Reject: wrong policy · needs more info · other ]
```

The approver reads it in ten seconds and taps once. The customer got an acknowledgment overnight saying a person would confirm the refund in the morning, which is honest and usually enough.

## What makes an approval take seconds, not minutes

If approving is slower than doing the task by hand, people will route around the agent. The design details decide this.

**Show the work, not just the conclusion.** The approver needs the request, the sources the agent used, the checks it ran, and the exact action it proposes. For changes to a record, show a diff: the old value, the new value, nothing else.

**Say why it's asking.** "Tier 2 task" and "amount above limit" are different reasons, and the second one deserves more attention. If the agent is unsure, it should say what it is unsure about.

**One tap for each outcome.** Approve, edit, or reject. Rejection takes a reason from a short list plus optional free text, because those reasons are what you will improve the agent with.

**Timeouts escalate, they never approve.** If nobody acts within a set window (say two business hours for a refund), the request goes to a named backup. If that also lapses, it lands with the process owner. An unanswered approval should never turn into a yes by default.

**Log everything.** What the agent proposed, what the person changed, who approved, when, and what finally ran. When something goes wrong three weeks later, that log is the difference between a ten-minute answer and a week of guessing. It's also one of the [questions to ask any AI vendor](/blog/ai-vendor-security-questions/) before their system touches your data.

## When a task earns a promotion

Promotion should be a decision with numbers behind it, made by the process owner, not something that drifts. We track three figures per task:

- **Approval rate unchanged:** the share of proposals approved exactly as drafted.
- **Edit rate:** how often a person changed something, and whether the edits were cosmetic or substantive.
- **Error rate:** mistakes found later, including ones that slipped through approval.

A reasonable bar for moving refunds under the limit from tier 2 to tier 3: at least 200 cases across four or more weeks, 95% or more approved unchanged, edits that are tone rather than substance, and zero serious errors.

> **Example:** In a hypothetical first month, the agent drafts 240 refunds under the limit. 229 are approved unchanged (95.4%), 9 are edited for tone and 2 are rejected. Both rejections trace to the same gap: the policy says nothing about items bought on sale. The team writes the missing clause, adds both cases to the evaluation set and keeps the task at tier 2 for two more weeks to confirm the fix. Then it promotes.

Promotion is not permanent. Demote a task immediately after a serious error, when the policy behind it changes, when you change the model or a connected tool, or when the edit rate starts creeping up. After promotion, keep sampling: reviewing a slice of tier 3 and 4 actions each week costs little and catches drift early.

Watch for one quiet failure: an approval rate of 100% with an average review time of two seconds. That may mean the agent is perfect. More often it means people stopped reading. Look at the review times next to the approval rate, and occasionally check a few approved cases yourself.

## Where we'd start

Pick one process and write three things before anyone builds: the never-automate list, the name of the approver and their backup, and the tier for every step. Start everything that only reads at tier 4 and everything that writes, sends or spends at tier 2. Agree on the promotion bar in advance, so the decision to give the agent more room is a check against numbers rather than a debate.

This is the Design step of how we build [brains and agents](/services/brains/): we define what the agent decides alone, what it asks about and what it never touches, and you approve that blueprint before we write code. A first agent is typically live in 3–5 weeks, with approvals in place from day one. If you want the bigger picture first, read [what a company brain is](/blog/what-is-a-company-brain/).

If there's a process you'd hand over tomorrow if you could trust it, [tell us which one](/contact/) and we'll sketch where the approvals would go.
