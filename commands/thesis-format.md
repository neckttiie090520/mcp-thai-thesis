---
description: Align a thesis draft with the selected university formatting profile and template notes.
agent: thesis-orchestrator
---

# /thesis-format

Format `$ARGUMENTS`.

## Instructions

1. Parse the user input into:
   - target university
   - target file, chapter, or section
   - optional formatting scope such as full thesis, front matter, bibliography, or appendices

2. Read and apply the configuration from:
   - `config/university.yaml`
   - `templates/{university}/format-rules.yaml`
   - `templates/generic/format-rules.yaml` as fallback when a university-specific rule is missing

3. If the requested university profile is marked as provisional or incomplete:
   - inherit the generic Thai thesis baseline
   - keep all unresolved institutional rules visible
   - mark each unresolved item as `[VERIFY REQUIRED]`

4. Review formatting across the following areas as relevant:
   - cover page
   - approval page
   - Thai abstract
   - English abstract
   - table of contents
   - list of tables
   - list of figures
   - chapter headings
   - body text
   - citations and bibliography
   - appendices
   - biography or other back matter

5. Check the target against the active profile for:
   - font family
   - font size
   - line spacing
   - margin assumptions
   - heading hierarchy
   - page numbering
   - year format
   - bibliography title and placement
   - appendix naming convention

6. Do not invent university rules.
   - If a rule is not confirmed in the active profile or template, do not guess.
   - Use the generic baseline only as a temporary fallback.
   - Mark handbook-dependent items `[VERIFY REQUIRED]`.

7. Produce the output in this structure:

   ### Part 1 — Active Formatting Profile
   - selected university
   - profile status
   - fallback rules used
   - unresolved institutional items

   ### Part 2 — Formatting Checklist
   Group findings by:
   - front matter
   - main chapters
   - citations and bibliography
   - back matter

   For each item, label it as:
   - `OK`
   - `Needs Update`
   - `[VERIFY REQUIRED]`

   ### Part 3 — Required Revisions
   Provide a concise action list of what must be changed.

   ### Part 4 — Final Verification Notes
   Include:
   - assumptions made
   - files or sections that still require handbook confirmation
   - whether the result is safe for internal drafting only or ready for submission review

8. If the host CLI does not support slash-command execution, treat this file as a reusable workflow prompt and carry out the same process manually.

## Guardrails

- Do not rewrite thesis content unless formatting changes require it.
- Do not alter citations semantically while fixing format.
- Do not convert provisional rules into final claims.
- Prefer minimal, targeted formatting guidance over broad rewriting.
