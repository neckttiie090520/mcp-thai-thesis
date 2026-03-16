---
description: Run Thai and English de-AI analysis on thesis prose and produce a cleaned version with risk notes.
agent: thesis-thai-editor
---

# /thesis-deai

Process `$ARGUMENTS` using the thesis de-AI workflow.

## Instructions

1. Determine the input scope:
   - a chapter
   - a section
   - a paragraph
   - pasted thesis text
   - abstract or conclusion text

2. Use the `thai-de-ai` skill as the primary workflow.

3. Reuse the 30-pattern anti-AI framework from `documentation-writer`.

4. Preserve all of the following unless the user explicitly requests substantive revision:
   - facts
   - citations
   - numeric values
   - claims supported by evidence
   - technical terminology
   - Thai academic register appropriate to the thesis

5. Select the operating mode based on text quality:
   - `scan` when the user wants diagnosis only
   - `edit` when the draft is mostly sound but contains AI-like phrasing
   - `rewrite` when the passage is structurally formulaic or strongly machine-like

6. Scan for Thai-specific risk signals, including:
   - inflated significance language
   - marketing-style wording
   - filler phrases
   - repetitive paragraph openers
   - hedging overload
   - generic conclusion sentences with no concrete information

7. Scan for English-specific risk signals when English appears in the thesis, including:
   - banned high-frequency AI words
   - repetitive transitions such as `Moreover` or `Furthermore`
   - em dash usage
   - uniform sentence rhythm
   - empty academic padding

8. Evaluate rhythm and burstiness:
   - identify paragraphs where sentence lengths are too uniform
   - vary sentence structure only when needed
   - do not make the prose informal or dramatic

9. Produce the result in this structure:

   ### Part 1 — Detection Summary
   Include:
   - selected mode
   - scope reviewed
   - main AI-signal categories found
   - severity level: low, medium, or high

   ### Part 2 — Revised Text
   Provide the cleaned thesis text with:
   - meaning preserved
   - citations preserved
   - terminology preserved
   - Thai academic tone preserved

   ### Part 3 — Residual Risks
   List issues that still need manual review, such as:
   - unsupported claims
   - unclear evidence
   - citation verification concerns
   - wording that still sounds generic
   - items marked `[VERIFY REQUIRED]`

10. If a passage contains uncertainty that cannot be resolved safely, do not invent specificity. Keep the wording conservative and explicitly flag the problem.

11. If the host CLI does not support command invocation, treat this file as a reusable workflow prompt and execute the process manually.
