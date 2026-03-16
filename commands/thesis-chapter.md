---
description: Draft or revise a thesis chapter using the Thai thesis workflow, university profile, citation rules, and verification safeguards.
agent: thesis-orchestrator
---

# /thesis-chapter

Draft or revise the requested thesis chapter for `$ARGUMENTS`.

## Purpose

Use this command to generate chapter-ready Thai thesis content that is:

- aligned with the standard 5-chapter Thai thesis structure
- aware of the selected university profile
- consistent with APA นาม-ปี citation practice
- compatible with de-AI review and ISO 29110 integration when relevant
- safe against invented formatting rules or unsupported claims

## Execution Instructions

Follow these steps in order.

### Step 1 — Parse the request

Extract from `$ARGUMENTS`:

1. chapter number
2. chapter topic, subsection, or writing goal
3. target university, if provided explicitly
4. whether the user wants:
   - outline only
   - full draft
   - revision of existing text
   - bilingual support
   - software-project methodology support

If any of these are unclear, ask concise follow-up questions before drafting.

### Step 2 — Determine chapter intent

Map the chapter number to the standard thesis function.

- Chapter 1: background, problem, objectives, scope, benefits, key definitions
- Chapter 2: related literature, theories, prior studies, gap analysis
- Chapter 3: methodology, system design, implementation process, tools, evaluation plan
- Chapter 4: results, analysis, interpretation, comparison against objectives or baselines
- Chapter 5: conclusion, discussion, limitations, recommendations, future work

If the requested structure differs from the standard 5-chapter model, follow the user's structure but note the deviation clearly.

### Step 3 — Apply the university profile safely

When a university is specified:

1. use the university-specific profile if confirmed
2. inherit the generic Thai thesis baseline for any missing rules
3. mark unresolved institution-dependent requirements as `[VERIFY REQUIRED]`

Typical items that may require verification:

- title-page wording
- heading hierarchy
- font requirements
- line spacing
- page numbering rules
- abstract ordering
- bibliography placement
- appendix naming
- year-system requirement

Never present an unverified institutional rule as confirmed.

### Step 4 — Plan before drafting

Before generating prose, create a mini plan containing:

1. chapter objective
2. subsection structure
3. key arguments or content blocks
4. required evidence or citations
5. open risks or verification points

If the user asked for an outline only, stop after producing the structured outline and checklist.

### Step 5 — Draft the chapter content

Use the following writing rules:

- write in modern formal Thai unless the user requests another register
- prefer `ผู้วิจัย`, `งานวิจัยนี้`, or the project name over first-person pronouns
- keep technical English terms when they are standard in Thai academic writing
- use direct, evidence-based language
- avoid promotional wording, exaggerated significance, and generic filler
- keep argument flow coherent from paragraph to paragraph
- do not turn every section into bullet lists unless the content is genuinely list-like

### Step 6 — Handle citations

Apply APA นาม-ปี baseline conventions unless the university profile overrides them.

Default forms:

- narrative: `ผู้แต่ง (ปี)`
- parenthetical: `(ผู้แต่ง, ปี)`
- English source in Thai text: `Smith (2023)` or `(Smith, 2023)`

Citation rules:

- add citations where claims, prior work, or evidence require support
- if metadata is missing, use `[CITATION NEEDED]`
- never invent author names, years, DOI values, or publishers
- if citation formatting depends on an unverified university rule, mark it `[VERIFY REQUIRED]`

### Step 7 — Integrate ISO 29110 when relevant

If the chapter is related to a software-development thesis, connect the content to relevant ISO 29110 artifacts.

Suggested mapping:

- Chapter 1 → Project Plan
- Chapter 2 → SRS, Traceability Record
- Chapter 3 → SDD, Configuration Plan, Change Request
- Chapter 4 → Test Plan, Test Record
- Chapter 5 → Progress Status Record, User Manual

Use ISO references to strengthen methodology and traceability. Do not let them replace the thesis narrative.

### Step 8 — Prepare output in four parts

Always structure the response as follows.

#### Part 1 — Chapter Plan

Provide:

- chapter purpose
- suggested subsection structure
- key points to cover

#### Part 2 — Draft Content

Provide the actual draft or revised chapter text.

If the user requested outline-only mode, write:
`Not generated because outline-only mode was requested.`

#### Part 3 — Citation / Evidence Checklist

Provide:

- claims needing citation
- data or evidence still needed
- source gaps
- ISO artifact links if applicable

#### Part 4 — Format / Verification Notes

Provide:

- active university profile used
- inherited generic assumptions
- all `[VERIFY REQUIRED]` items
- any unresolved structural risks
- recommended next step

## Style Guardrails

Do not do the following:

- invent university formatting requirements
- fabricate citations, statistics, or results
- use exaggerated phrases such as "ก้าวสำคัญ", "พลิกโฉม", or "ล้ำสมัย" unless directly quoting a source
- overuse connectors such as "นอกจากนี้", "อีกทั้ง", and "ทั้งนี้"
- end paragraphs with empty optimistic filler
- replace precise technical terms with vague synonyms
- silently mix พ.ศ. and ค.ศ. without a documented reason

## Mode Variants

### Outline Mode

Use when the user is still planning.

Output:

- detailed chapter structure
- subsection notes
- evidence checklist
- no full prose unless explicitly requested

### Draft Mode

Use when the user wants chapter text from scratch.

Output:

- plan
- full draft
- citation checklist
- verification notes

### Revision Mode

Use when the user provides existing content.

Output:

- brief diagnosis of issues
- revised text
- citation or logic gaps
- verification notes

## Completion Checklist

Before finishing, confirm mentally that:

- the requested chapter goal is clear
- the structure matches the thesis stage
- the prose uses formal Thai academic register
- unsupported claims are flagged
- citation needs are visible
- unverified university rules are marked
- the next step for the user is clear
