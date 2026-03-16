---
description: Quick quantitative scoring of a thesis chapter or full thesis using the 6-dimension rubric. Lightweight alternative to /thesis-audit when you only need scores.
agent: thesis-auditor
subtask: true
---

# /thesis-score

Score $ARGUMENTS using the 6-dimension quality rubric.

## Purpose

This command provides fast, quantitative scoring without the full consistency matrix and gap registry of `/thesis-audit`. Use it when you want a quick quality check, progress tracking, or before/after comparison.

## Execution Workflow

### Step 1: Determine Scope

| Argument | Action |
|----------|--------|
| `chapter-N` | Score a single chapter (N = 1-7, or `abstract`) |
| `full` | Score all chapters and compute thesis average |
| `compare` | Compare current scores against previous assessment scores |

If a university is specified, factor university template compliance into the Formatting score.

### Step 2: Read Target Content

Load the chapter file(s).

### Step 3: Apply the Scoring Rubric

Score each chapter on the 6-dimension rubric:

| Dimension | Max | What to Evaluate |
|-----------|-----|------------------|
| Content & Argument Quality | 25 | Logical flow, evidence backing, claim support, originality, depth |
| Academic References | 20 | Citation count, recency, relevance, APA correctness, bibliography completeness |
| Thai Language Quality | 20 | Register, naturalness, sentence rhythm, vocabulary range, filler-free |
| Formatting & Structure | 15 | Heading hierarchy, figure/table format, section organization, template compliance |
| Data Consistency | 10 | Numbers consistent, terminology stable, facts aligned with other chapters |
| De-AI Score | 10 | Natural transitions, varied structure, no AI buzzwords, burstiness present |
| **Total** | **100** | |

### Step 4: Grade and Rank

Apply grades:

| Score | Grade |
|-------|-------|
| 90-100 | A |
| 80-89 | B |
| 70-79 | C+ |
| 60-69 | C |
| 50-59 | D |
| <50 | F |

Rank chapters from strongest to weakest.

### Step 5: Identify Quick Wins

For each chapter, identify the single highest-impact improvement:
- Which dimension has the most room for improvement?
- What specific action would gain the most points?
- Estimated points recoverable

## Output Format

### For Single Chapter

#### Score Breakdown

| Dimension | Score | Max | Notes |
|-----------|-------|-----|-------|
| Content & Argument | | 25 | |
| Academic References | | 20 | |
| Thai Language Quality | | 20 | |
| Formatting & Structure | | 15 | |
| Data Consistency | | 10 | |
| De-AI Score | | 10 | |
| **Total** | | **100** | |

**Grade**: X
**Quick Win**: [single most impactful improvement, est. +N points]

### For Full Thesis

#### Chapter Dashboard

| Chapter | Content | Refs | Language | Format | Consistency | De-AI | Total | Grade | Rank |
|---------|---------|------|----------|--------|-------------|-------|-------|-------|------|
| Abstract | | | | | | | | | |
| Ch1 | | | | | | | | | |
| Ch2 | | | | | | | | | |
| Ch3 | | | | | | | | | |
| Ch4 | | | | | | | | | |
| Ch5 | | | | | | | | | |
| Ch6 | | | | | | | | | |
| Ch7 | | | | | | | | | |
| **Avg** | | | | | | | | | |

#### Dimension Averages

| Dimension | Average | Weakest Chapter | Strongest Chapter |
|-----------|---------|-----------------|-------------------|
| Content | | | |
| References | | | |
| Language | | | |
| Format | | | |
| Consistency | | | |
| De-AI | | | |

#### Top 5 Quick Wins

1. [Chapter X, Dimension Y: action, est. +N points]
2. ...

#### Overall Assessment

- Thesis average: X/100 (Grade Y)
- Submission readiness: Ready / Near Ready / Needs Work / Not Ready
- Estimated effort to reach B average (80+): [brief assessment]

### For Compare Mode

#### Score Comparison

| Chapter | Previous | Current | Delta | Direction |
|---------|----------|---------|-------|-----------|
| Ch1 | | | | |
| ... | | | | |
| **Avg** | | | | |

#### Dimension Trends

| Dimension | Previous Avg | Current Avg | Delta | Trend |
|-----------|-------------|-------------|-------|-------|
| Content | | | | |
| ... | | | | |

#### Progress Assessment

- Overall improvement: +/- N points
- Chapters that improved most: [list]
- Chapters that regressed: [list]
- Dimensions that improved most: [list]
- Dimensions that need more work: [list]

## Guardrails

- Apply the rubric consistently. Do not inflate or deflate scores.
- If a dimension cannot be assessed (e.g., no Thai text in an English-only section), mark `[N/A]`.
- When comparing to previous assessments, note that previous scores used a different rubric if applicable.
- Do not provide detailed findings or rewrite suggestions — that is the job of `/thesis-audit` and `/thesis-rewrite`.
- Keep output concise. The point of `/thesis-score` is speed.

If the host CLI does not support slash-command execution, treat this file as a reusable workflow prompt and execute the same process manually.
