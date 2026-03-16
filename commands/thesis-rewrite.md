---
description: Targeted rewrite of thesis text combining structural improvement, formal Thai register polish, and de-AI cleanup in a single pass. Produces before/after scoring.
agent: thesis-thai-editor
---

# /thesis-rewrite

Rewrite $ARGUMENTS with combined structural, language, and de-AI improvement.

## Purpose

This command performs a coordinated rewrite that addresses multiple quality dimensions simultaneously. Unlike using `/thesis-deai` (de-AI only) or invoking the `thesis-thai-editor` agent (language only) separately, `/thesis-rewrite` orchestrates a multi-pass rewrite that improves structure, language, and naturalness together.

## Execution Workflow

### Step 1: Parse Arguments

Determine:

- **Target**: which chapter, section, or text block to rewrite
- **Mode**: `light`, `standard`, or `deep`
- **Focus areas** (optional): comma-separated list from `structure`, `register`, `deai`, `clarity`, `evidence`, `transitions`, `rhythm`

| Mode | What It Does |
|------|-------------|
| `light` | Targeted fixes only. Preserves most original text. Fixes the worst AI signals and register violations. Minimal structural change. |
| `standard` | Moderate revision. Restructures paragraphs where needed, improves register throughout, removes AI patterns, strengthens transitions. Preserves meaning and citations. |
| `deep` | Full rewrite. Reconstructs paragraphs from scratch while preserving all facts, evidence, citations, and technical content. Produces text that reads as if written by a skilled Thai academic. |

If no mode is specified, default to `standard`.

### Step 2: Baseline Analysis

Before any rewriting, analyze the current text:

#### A. Structure Analysis (thesis-advisor perspective)
- Is the section logically organized?
- Are there argument gaps or logical jumps?
- Is the evidence placement appropriate?
- Are transitions between paragraphs functional?

#### B. Language Analysis (thai-editor perspective)
- Is the register consistently formal Thai?
- Are there filler phrases or redundancies?
- Is sentence rhythm varied (burstiness check)?
- Are there nominalizations that should be direct verbs?
- Are technical terms used consistently?

#### C. De-AI Analysis (thai-de-ai perspective)
- Which AI patterns are present? (from the 30-pattern framework)
- What is the estimated AI-signal level? (Low / Medium / High)
- Which specific passages have the strongest AI fingerprint?

#### D. Citation Safety Check (citation-checker perspective)
- List all citations in the target text
- Mark each as "must preserve exactly" during rewrite

#### E. Baseline Score
Score the current text using the 6-dimension rubric:
- Content /25, References /20, Language /20, Format /15, Consistency /10, De-AI /10 = Total /100

### Step 3: Rewrite Plan

Based on the analysis, create a rewrite plan:

1. List structural changes needed (paragraph reordering, merging, splitting)
2. List language changes needed (register fixes, filler removal, rhythm variation)
3. List de-AI changes needed (pattern-specific fixes)
4. Identify sentences/phrases that must NOT change (citations, data, evidence statements)
5. Define the rewrite order: structure first, then language, then de-AI polish

### Step 4: Execute Rewrite

Apply the rewrite according to mode:

#### For `light` mode:
- Fix only Critical and High-severity issues
- Change minimum number of sentences
- Preserve paragraph structure
- Focus on the 3-5 most obvious AI patterns

#### For `standard` mode:
- Fix Critical, High, and Medium issues
- Allow paragraph restructuring where needed
- Vary sentence rhythm across the section
- Remove all detected AI patterns
- Strengthen topic sentences and transitions
- Reduce filler to zero

#### For `deep` mode:
- Reconstruct every paragraph from its core meaning
- Build natural Thai academic prose from scratch
- Ensure burstiness (mix of short punchy sentences and longer complex ones)
- Eliminate all AI fingerprints
- Create natural, varied transitions
- Add personality where the subject matter allows (idiomatic Thai academic phrases)
- Result should pass as written by an experienced Thai researcher

### Step 5: Post-Rewrite Verification

After rewriting:

1. **Citation integrity check**: Verify every citation from Step 2D is still present and correctly placed
2. **Fact integrity check**: Verify all numbers, dates, names, and technical claims are preserved
3. **Register check**: Confirm formal Thai register is maintained throughout
4. **De-AI rescan**: Run the 30-pattern framework again on the rewritten text
5. **Score the rewrite**: Apply the same 6-dimension rubric

### Step 6: Deliver Results

Present the rewrite with before/after comparison.

## Output Format

### Part 1 — Analysis Summary

- Target: what was analyzed
- Mode: light / standard / deep
- Focus areas: all or specific
- Baseline AI-signal level: Low / Medium / High
- Baseline score: X/100
- Issues found: N critical, N important, N optional

### Part 2 — Rewrite Plan

Brief summary of planned changes:
- Structural changes: [list]
- Language changes: [list]
- De-AI changes: [list]
- Protected elements: [list of citations and data that must not change]

### Part 3 — Rewritten Text

The full rewritten text, ready to replace the original.

### Part 4 — Change Summary

| Category | Changes Made |
|----------|-------------|
| Paragraphs restructured | N |
| Sentences rewritten | N |
| Filler phrases removed | N |
| AI patterns eliminated | N |
| Register corrections | N |
| Transitions improved | N |

### Part 5 — Score Comparison

| Dimension | Before | After | Delta |
|-----------|--------|-------|-------|
| Content & Argument | /25 | /25 | |
| Academic References | /20 | /20 | |
| Thai Language Quality | /20 | /20 | |
| Formatting & Structure | /15 | /15 | |
| Data Consistency | /10 | /10 | |
| De-AI Score | /10 | /10 | |
| **Total** | **/100** | **/100** | |

### Part 6 — Residual Issues

Items that remain after rewriting:
- `[VERIFY REQUIRED]` items
- Citations that need human verification
- Claims that need additional evidence
- Areas where deeper rewrite may help but was outside scope

## Rewrite Principles

### Thai Academic Register Rules

Enforce during rewrite:

- Use `ผู้วิจัย` or `งานวิจัยนี้` instead of first-person
- Prefer direct verbs over nominalizations: `วิเคราะห์` over `ทำการวิเคราะห์`
- Remove filler: `จะเห็นได้ว่า`, `ดังที่ได้กล่าวมาแล้ว`, `เป็นที่ทราบกันดีว่า`
- Remove inflated significance: `ก้าวสำคัญ`, `พลิกโฉม`, `ปฏิวัติวงการ`
- Vary paragraph openings (never start 3+ consecutive paragraphs the same way)
- Mix sentence lengths (target burstiness: 30-70% variation in sentence length within a paragraph)

### De-AI Patterns to Eliminate

Thai-specific:
1. Uniform paragraph structure (problem→solution→benefit in every paragraph)
2. Repetitive transition words at paragraph starts
3. Hedging overload (`อาจจะ`, `ค่อนข้าง`, `น่าจะ` in clusters)
4. Generic concluding sentences that add no information
5. Marketing-style wording in academic context
6. Perfectly balanced sentence lengths (too uniform = AI)

English-specific (for bilingual sections):
1. Banned words: delve, tapestry, leverage, multifaceted, holistic, robust, comprehensive, pivotal, transformative, groundbreaking
2. Repetitive transitions: Moreover, Furthermore, Additionally, In addition
3. Excessive em dashes
4. Uniform sentence rhythm

### Citation Safety Rules

During rewrite, citations are sacred:
- Never remove a citation
- Never change what a citation supports
- Never move a citation to support a different claim
- If a sentence with a citation needs restructuring, keep the citation attached to its original claim
- If a citation format needs fixing, only fix format, not content

## Guardrails

- Never invent new content. Rewrite only what exists.
- Never add claims not present in the original.
- Never remove evidence or data.
- If the original text has an unsupported claim, keep the claim and add `[CITATION NEEDED]` — do not fabricate support.
- If a passage is unclear and cannot be safely rewritten, flag it as `[VERIFY REQUIRED — original meaning unclear]`.
- Do not change technical terminology unless correcting an obvious error.
- The rewrite must be shorter or equal in length to the original (eliminate padding, do not add it).
- Never convert formal Thai to informal Thai or vice versa unintentionally.

If the host CLI does not support slash-command execution, treat this file as a reusable workflow prompt and execute the same process manually.
