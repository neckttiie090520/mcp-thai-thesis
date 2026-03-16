---
description: Review a Thai thesis draft from advisor, editor, citation, formatting, and ISO 29110 perspectives.
agent: thesis-orchestrator
subtask: true
---

# /thesis-review

Review `$ARGUMENTS` as a Thai thesis draft.

## Primary goal

Produce a review report that helps the user improve thesis quality before advisor submission, committee review, or final formatting.

## Instructions

1. Identify the review target from `$ARGUMENTS`.
   - This may be a whole thesis, one chapter, one section, an abstract, or a supporting document.
   - If the scope is unclear, infer the narrowest reasonable review scope and state that assumption.

2. Review the draft from five perspectives:
   - **Thesis advisor**: argument quality, scope control, research logic, chapter coherence
   - **Thai editor**: formal Thai register, natural phrasing, clarity, paragraph flow, de-AI issues
   - **Citation checker**: APA นาม-ปี consistency, citation coverage, bibliography alignment, missing support
   - **Format reviewer**: university-profile alignment, front matter/back matter expectations, unresolved format risks
   - **ISO reviewer**: only if the thesis is software-oriented or explicitly linked to ISO 29110

3. Structure the review around these criteria:
   - topic and objective clarity
   - chapter-level logical flow
   - adequacy of evidence and citations
   - consistency of terminology
   - Thai academic tone
   - de-AI risk signals
   - formatting and university-specific assumptions
   - methodology traceability for software/system theses

4. If the review target appears to be tied to a specific university:
   - apply that profile if already known
   - if the rule is not confirmed, mark it `[VERIFY REQUIRED]`
   - do not present unverified formatting assumptions as official rules

5. If the draft is software-oriented, add ISO 29110 review comments for:
   - requirement traceability
   - methodology completeness
   - testing evidence
   - document cross-reference needs
   - deployment or user-facing documentation support

6. Detect common high-risk thesis problems:
   - vague research gap
   - objectives not matching results
   - literature review that only summarizes sources without synthesis
   - unsupported claims
   - repetitive AI-sounding transitions
   - inflated significance language
   - inconsistent citation form
   - unclear chapter boundaries
   - conclusion repeating earlier text without adding interpretation
   - unverified university formatting assumptions

7. Classify findings into three levels:
   - **Critical issues**: must fix before submission or advisor review
   - **Important revisions**: should fix to improve academic quality
   - **Optional improvements**: useful polish, but not blocking

8. For every issue you report, include:
   - the problem
   - why it matters
   - a concrete revision direction

9. If the draft contains missing evidence, citation gaps, or format uncertainty, use these markers:
   - `[CITATION NEEDED]`
   - `[VERIFY REQUIRED]`
   - `[TBD]`

10. End with a prioritized next-step plan containing:
    - what to fix first
    - what to review next
    - which supporting skill or agent perspective is most relevant

## Output format

Use this structure exactly:

### Part 1 — Review Scope
- target reviewed
- assumed chapter or section scope
- university profile used, if any
- ISO 29110 relevance: yes/no

### Part 2 — Critical Issues
List only blocking or high-risk issues.

### Part 3 — Important Revisions
List substantial academic, structural, citation, or language improvements.

### Part 4 — Optional Improvements
List stylistic, clarity, and polish suggestions.

### Part 5 — Verification Notes
List all `[VERIFY REQUIRED]`, `[CITATION NEEDED]`, and `[TBD]` items.

### Part 6 — Recommended Next Steps
Provide a short ordered action plan.

## Review principles

- Be direct and academically rigorous.
- Prefer specific feedback over generic praise.
- Do not invent missing facts, citations, or institutional rules.
- Do not rewrite the entire thesis unless the user explicitly asks for rewriting.
- Focus on the most valuable corrections first.
- Preserve the user's research intent while improving defensibility.

## Special note

If the user asks to review only one chapter, prioritize:
- **Chapter 1**: problem statement, objectives, scope, significance
- **Chapter 2**: synthesis quality, gap clarity, citation density
- **Chapter 3**: reproducibility, method clarity, process traceability
- **Chapter 4**: evidence presentation, result interpretation, no overclaiming
- **Chapter 5**: conclusion integrity, limitation honesty, realistic recommendations
