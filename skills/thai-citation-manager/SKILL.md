---
name: thai-citation-manager
description: >
  Manage APA นาม-ปี citations for Thai thesis workflows, including Thai and English
  author handling, year-system control, bibliography generation, and consistency checks.
tags: [Thai, Citation, APA, Bibliography, Thesis]
version: 0.1.0
---

# Thai Citation Manager Skill

This skill standardizes citation work for Thai thesis writing workflows that use
author-year references. It supports Thai and English sources, bilingual
bibliographies, and university-dependent year conventions.

## 1. Purpose

Use this skill when the task involves:

- formatting in-text citations in Thai academic prose
- generating or cleaning a bibliography
- checking citation-to-reference consistency
- handling Thai author names and English author names together
- managing พ.ศ. and ค.ศ. display rules
- preparing references for final thesis submission

This skill is designed to work with `thai-thesis-writing`,
`documentation-writer`, and university profiles stored in
`config/university.yaml`.

## 2. Core responsibilities

1. Format in-text citations consistently
2. Preserve author names in the correct language form
3. Apply the correct year system for the target institution
4. Generate bibliography entries from verified source metadata
5. Audit mismatches between citations and references
6. Flag unresolved style questions as `[VERIFY REQUIRED]`

## 3. Citation model

Default model: **APA นาม-ปี** adapted for Thai thesis writing.

Baseline assumptions:

- narrative citation: `ผู้แต่ง (ปี)`
- parenthetical citation: `(ผู้แต่ง, ปี)`
- Thai prose may contain English author names when the source is English
- bibliography may contain both Thai and English entries
- institutional overrides may change ordering or separator details

If the university profile conflicts with the baseline, follow the confirmed
profile and record the deviation.

## 4. Input requirements

Before applying this skill, collect:

1. target university or formatting profile
2. thesis language mode: Thai-only, bilingual, or Thai with English technical terms
3. source metadata for each reference
4. target year system: พ.ศ. or ค.ศ.
5. bibliography ordering rule if already defined
6. whether transliteration is required by the university handbook

If any institutional rule is uncertain, do not guess. Mark it
`[VERIFY REQUIRED]`.

## 5. In-text citation rules

### 5.1 Single author

- Thai source, narrative: `สมชาย (2566)`
- Thai source, parenthetical: `(สมชาย, 2566)`
- English source, narrative: `Smith (2023)`
- English source, parenthetical: `(Smith, 2023)`

### 5.2 Two authors

- Thai source, narrative: `สมชาย และสุภาวดี (2566)`
- Thai source, parenthetical: `(สมชาย และสุภาวดี, 2566)`
- English source, narrative: `Smith and Jones (2023)` if the target guide uses English conjunction in running English text
- English source in Thai text: `Smith และ Jones (2023)` only if the local writing convention explicitly permits mixed-form rendering

Default preference in Thai narrative prose:
- keep English author names in source form
- keep Thai connective words around them only if the department already uses that style consistently

### 5.3 Three or more authors

Use the university rule if known.

If no confirmed rule is available, use this conservative baseline:

- first mention: include all names when practical
- repeated mention: shorten only if the local guide clearly permits it
- if shortening is allowed in Thai prose: `สมชาย และคณะ (2566)`
- if shortening is allowed for English source: `Smith et al. (2023)`

If the shortening rule is uncertain, mark `[VERIFY REQUIRED]`.

### 5.4 Organization as author

Use the official organization name consistently.

Examples:
- `สำนักงานพัฒนารัฐบาลดิจิทัล (2565)`
- `(World Health Organization, 2022)`

Do not alternate between abbreviated and full names unless a clear first-use
rule is defined.

### 5.5 Multiple citations in one location

Order citations consistently according to the active profile.

If no local rule exists, use one of these and stay consistent throughout the
document:

- chronological order
- alphabetical order by first author

When no institutional preference is confirmed, record:
`[VERIFY REQUIRED] Confirm multi-citation ordering rule.`

## 6. Author-name handling

### 6.1 Thai authors

- Preserve Thai names in Thai form
- Do not romanize by default
- Use the exact form found in the verified source when possible
- Keep surname/given-name ordering consistent with the selected style

### 6.2 English authors

- Preserve English names in source language
- Do not translate personal names into Thai unless the institution explicitly requires it
- Keep initials and punctuation consistent in the bibliography

### 6.3 Mixed-language bibliography

For mixed Thai-English reference lists:

- preserve each entry in its source language form
- sort according to the university rule
- if no rule exists, use a stable documented convention such as:
  - Thai entries first, then English entries
  - alphabetical sorting within each language block

### 6.4 Transliteration policy

Do not transliterate names unless one of the following is true:

1. the university handbook requires it
2. the department style guide requires it
3. the user provides an explicit institutional rule

If transliteration is required, document the rule source before applying it.

## 7. Year-system management

### 7.1 Default behavior

Use the year system required by the selected university profile.

### 7.2 Storage rule

Always preserve the source publication year exactly as verified in metadata.

### 7.3 Display rule

Convert the displayed year only when the target style requires it.

Examples:

- source metadata: `2023`
- displayed in พ.ศ. system: `2566`

### 7.4 Conversion safeguards

- never convert silently if the document mixes systems
- never mix พ.ศ. and ค.ศ. randomly within one section
- if conversion is applied, do it consistently across in-text citations and bibliography where required
- if the handbook is unclear, mark `[VERIFY REQUIRED]`

## 8. Bibliography workflow

Follow this sequence:

1. Verify source existence and core metadata
2. Normalize author names
3. Normalize year display according to profile
4. Standardize title casing only if required by the selected style
5. Group or sort entries according to the active bibliography rule
6. Check one-to-one coverage between in-text citations and bibliography
7. Flag incomplete entries before final output

## 9. Minimum metadata checklist

Each bibliography entry should be checked for:

- author or organization name
- publication year
- title
- source or venue
- publisher, journal, conference, or institution when applicable
- DOI or URL when available and relevant
- access date only when required for web resources

If any required field is missing, do not invent it. Mark it as incomplete.

## 10. Output modes

### 10.1 `cite`

Use when the task is to create or normalize in-text citations.

Output:
1. normalized citation form
2. note about applied rule
3. unresolved issues if any

### 10.2 `bibliography`

Use when the task is to generate or clean a bibliography.

Output:
1. formatted bibliography entries
2. sorting or grouping rule used
3. incomplete metadata warnings

### 10.3 `audit`

Use when the task is to compare thesis text against the bibliography.

Output:
1. citations missing from bibliography
2. bibliography entries not cited in text
3. inconsistent author-year patterns
4. year-system inconsistencies
5. items marked `[VERIFY REQUIRED]`

## 11. Common audit findings

Look for these problems:

- missing year
- author spelling mismatch across chapters
- one source cited with multiple year formats
- Thai name rendered differently in different places
- bibliography entry exists but never appears in text
- in-text citation appears but reference entry is missing
- mixed พ.ศ. and ค.ศ. without rule basis
- transliteration applied inconsistently
- organization names shortened without first-use definition

## 12. Decision rules

When ambiguity appears, use this priority order:

1. explicit university handbook
2. department or graduate-school guide
3. confirmed project configuration
4. stable internal baseline in this skill
5. `[VERIFY REQUIRED]` if none of the above resolves the issue

## 13. Guardrails

- Do not invent missing page numbers, DOI values, publishers, or URLs
- Do not translate or transliterate names without a rule source
- Do not claim APA compliance if local formatting is only approximate
- Do not silently mix Thai and English formatting logic
- Do not override verified metadata to make an entry look cleaner

## 14. Integration notes

Use together with:

- `thai-thesis-writing` for chapter-level drafting
- `documentation-writer` for Thai academic prose quality
- `thai-de-ai` after citation content is stable
- `config/university.yaml` for institution-specific overrides

## 15. Recommended output template

When this skill is applied, structure the response as:

### Part 1 — Citation Output
The normalized citation text or bibliography entries

### Part 2 — Applied Rules
- active university/profile
- year system used
- ordering rule used
- any author-name handling decision

### Part 3 — Issues Requiring Verification
List all unresolved items marked `[VERIFY REQUIRED]`

## 16. Final quality check

Before finishing, confirm:

- every citation has a matching reference or an explicit placeholder
- author names are consistent across the document
- the selected year system is applied consistently
- no institutional rule has been guessed
- unresolved style questions are clearly marked
