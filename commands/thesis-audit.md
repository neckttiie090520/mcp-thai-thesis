---
description: Run a full-thesis quality audit with cross-document consistency checks, quantitative scoring, gap detection, and a prioritized action plan.
agent: thesis-auditor
subtask: true
---

# /thesis-audit

Run a comprehensive quality audit on $ARGUMENTS.

## Purpose

This command performs quantitative quality assessment of thesis documents. Unlike `/thesis-review` (which gives qualitative feedback from multiple reviewer perspectives), `/thesis-audit` produces measurable scores, consistency matrices, and gap registries with exact locations.

## Execution Workflow

### Step 1: Determine Audit Scope

Parse the arguments to determine scope:

| Argument | Scope |
|----------|-------|
| `full` | All chapters + bibliography + appendices + ISO documents |
| `chapter-N` | Single chapter deep audit (N = 1-7) |
| `iso` | ISO 29110 documents only |
| `consistency` | Cross-document consistency check only (no scoring) |

If no argument is provided, default to `full`.

If a university is specified, load the university profile from `config/university.yaml`.

### Step 2: Load the Thesis Content

Read all documents in scope. For a full audit, this includes:

1. All thesis chapter files
2. All ISO 29110 documents
3. The bibliography file
4. Appendix files

### Step 3: Build the Fact Registry

Extract all quantitative claims from all documents:

- test case counts
- code statistics (LOC, files, modules)
- coverage percentages
- feature counts
- requirement counts
- participant numbers
- version identifiers
- dates and milestones

Create a cross-reference matrix showing where each fact appears and whether values match.

### Step 4: Score Each Chapter

Apply the thesis-auditor scoring rubric (100 points per chapter):

| Dimension | Weight |
|-----------|--------|
| Content & Argument Quality | 25 |
| Academic References | 20 |
| Thai Language Quality | 20 |
| Formatting & Structure | 15 |
| Data Consistency | 10 |
| De-AI Score | 10 |
| **Total** | **100** |

Score each chapter independently. Calculate the thesis-wide average.

### Step 5: Detect Gaps

Scan all documents for:

- `[TBD]` markers
- `[VERIFY REQUIRED]` markers
- `[CITATION NEEDED]` markers
- Missing sections (referenced but not present)
- Empty or placeholder content
- Figures/tables referenced but not included

### Step 6: Check Consistency

Cross-check the fact registry for conflicts. For each conflict:

- list all document locations
- identify the most likely authoritative value
- classify severity (High if it affects a thesis claim, Medium if it affects internal documents only, Low if cosmetic)

### Step 7: Generate the Audit Report

Deliver a structured report with all findings.

## Output Format

### Part 1 — Audit Summary

- **Scope**: what was reviewed
- **Documents analyzed**: count and list
- **Overall status**: `Submission Ready` / `Near Ready` / `Needs Revision` / `Major Issues`
- **Overall score**: X/100 (thesis-wide average)

### Part 2 — Chapter Score Dashboard

| Chapter | Content /25 | Refs /20 | Language /20 | Format /15 | Consistency /10 | De-AI /10 | Total /100 | Grade |
|---------|-----------|---------|------------|----------|---------------|---------|----------|-------|
| Abstract | | | | | | | | |
| Ch1 | | | | | | | | |
| Ch2 | | | | | | | | |
| Ch3 | | | | | | | | |
| Ch4 | | | | | | | | |
| Ch5 | | | | | | | | |
| Ch6 | | | | | | | | |
| Ch7 | | | | | | | | |
| **Average** | | | | | | | | |

### Part 3 — Critical Findings

Numbered list of blocking issues:

For each:
1. **Issue**: what is wrong
2. **Location**: exact file and section
3. **Evidence**: what was found vs. what was expected
4. **Impact**: how it affects submission readiness
5. **Fix**: concrete action to resolve

### Part 4 — Consistency Matrix

| Fact | Source 1 | Source 2 | Source 3 | Status |
|------|----------|----------|----------|--------|
| Total test cases | Ch6: 346 | Ch7: 158 | ISO Test Record: 372 | CONFLICT |

### Part 5 — Gap Registry

| # | Type | Location | Severity | Description | Status |
|---|------|----------|----------|-------------|--------|
| 1 | [TBD] | Ch6, abstract | High | Player testing results missing | Open |

### Part 6 — Action Plan

Numbered, prioritized actions ordered by impact:

1. [Most impactful fix first]
2. [Second most impactful]
3. ...

Each action includes:
- what to do
- which chapter/document to change
- expected score impact (estimated points gained)

## Guardrails

- Do not fabricate scores. Apply the rubric honestly.
- Do not invent data to fill gaps. Report gaps as-is.
- Do not soften critical findings.
- Do not re-score previous assessments — produce new independent scores.
- If a chapter cannot be scored on a dimension (e.g., no Thai text to evaluate for language quality), mark it `[N/A]` and explain.
- Preserve all existing markers.
- When presenting the consistency matrix, show exact values from each source, not summaries.

## Relationship to Other Commands

| Command | Relationship |
|---------|-------------|
| `/thesis-review` | Qualitative multi-perspective review. `/thesis-audit` is quantitative. Use both for complete assessment. |
| `/thesis-score` | Lightweight scoring-only variant. `/thesis-audit` includes scoring plus consistency checks and gap detection. |
| `/thesis-format` | Format-only check. `/thesis-audit` includes formatting as one dimension of scoring. |
| `/thesis-deai` | De-AI scan and fix. `/thesis-audit` includes de-AI as one scoring dimension but does not fix. |

If the host CLI does not support slash-command execution, treat this file as a reusable workflow prompt and execute the same process manually.
