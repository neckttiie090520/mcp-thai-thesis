---
description: Initialize a Thai thesis workflow with university profile, chapter roadmap, citation policy, and ISO 29110 hooks.
agent: thesis-orchestrator
---

# /thesis-init

Initialize a new Thai thesis workflow for `$ARGUMENTS`.

## Instructions

1. Parse the user input into:
   - thesis topic or working title
   - target university
   - degree level
   - optional thesis type or discipline

2. Load the university configuration from `config/university.yaml`.

3. Match the requested university to the closest supported profile:
   - `chulalongkorn`
   - `kasetsart`
   - `kmutt`
   - `chiangmai`
   - `generic`

4. If the requested university profile is marked as provisional or incomplete:
   - inherit the `generic` baseline
   - keep the selected university as the target profile
   - mark all unresolved institutional requirements as `[VERIFY REQUIRED]`

5. Produce a thesis initialization brief with the following sections:

   ### Part 1 — Project Summary
   Include:
   - working thesis title
   - target university
   - degree level
   - language mode
   - thesis type or domain
   - whether the profile is confirmed or provisional

   ### Part 2 — Chapter Roadmap
   Build a default 5-chapter roadmap:
   1. บทที่ 1 บทนำ
   2. บทที่ 2 เอกสารและงานวิจัยที่เกี่ยวข้อง
   3. บทที่ 3 วิธีดำเนินการวิจัย
   4. บทที่ 4 ผลการวิจัย
   5. บทที่ 5 สรุป อภิปรายผล และข้อเสนอแนะ

   For each chapter, provide:
   - objective
   - expected inputs
   - expected outputs

   ### Part 3 — Citation Policy
   Define the default citation workflow:
   - citation style: APA นาม-ปี
   - in-text format: `ผู้แต่ง (ปี)` or `(ผู้แต่ง, ปี)`
   - bibliography handling rule
   - year-system assumption from the selected profile
   - unresolved citation-rule items marked `[VERIFY REQUIRED]` when needed

   ### Part 4 — University Format Notes
   Summarize:
   - known formatting assumptions from the selected profile
   - inherited generic defaults
   - unresolved university-specific items such as margin, font, abstract order, page numbering, bibliography title, or appendix naming

   ### Part 5 — ISO 29110 Applicability
   Decide whether ISO 29110 support is relevant.

   If the thesis is software-oriented, include:
   - applicable ISO 29110 document set
   - likely mapping between thesis chapters and project documents
   - recommended next document to prepare

   If not applicable, state that ISO 29110 integration is optional.

   ### Part 6 — Recommended Skills and Agents
   Recommend the next components to use:
   - `thai-thesis-writing`
   - `thai-citation-manager`
   - `thai-de-ai`
   - `iso29110-docs` when relevant

   ### Part 7 — Immediate Next Steps
   Give a short action list for what the user should do next, such as:
   - confirm university handbook
   - confirm thesis title
   - start Chapter 1 planning
   - gather references
   - identify whether the thesis includes a software project

6. Use these safety rules throughout:
   - do not invent official university regulations
   - do not fabricate citations, requirements, or project artifacts
   - do not assume ISO 29110 is required unless the thesis context suggests it
   - clearly label every unresolved institutional item as `[VERIFY REQUIRED]`

7. If the host CLI does not support slash-command execution, treat this file as a reusable workflow prompt and execute the same initialization logic manually.

## Output Format

Always structure the response as:

- `Part 1 — Project Summary`
- `Part 2 — Chapter Roadmap`
- `Part 3 — Citation Policy`
- `Part 4 — University Format Notes`
- `Part 5 — ISO 29110 Applicability`
- `Part 6 — Recommended Skills and Agents`
- `Part 7 — Immediate Next Steps`

## Completion Standard

The command is complete only when the user receives:
- a usable thesis setup brief
- a clear university-profile status
- a default chapter plan
- citation and formatting assumptions
- explicit verification flags for unresolved requirements
- a concrete next step
