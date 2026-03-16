---
name: thesis-quality-gate
description: >
  Pre-submission quality checklist and readiness assessment for Thai graduate theses
  with software engineering projects. Provides an 8-gate quality assurance framework
  covering structural completeness, content quality, citation integrity, Thai language
  quality, de-AI compliance, data consistency, formatting compliance, and ISO 29110
  compliance.
---

# Thesis Quality Gate

Pre-submission quality checklist and readiness assessment for Thai graduate theses with software engineering projects.

## When to Use This Skill

Load this skill when:
- Preparing a thesis for final submission
- Checking readiness before advisor review
- Running a pre-defense quality check
- Assessing whether all required components are present
- Tracking completion status of thesis deliverables

## Skill Overview

This skill provides a structured 8-gate quality assurance framework. Each gate must pass before the thesis can proceed to the next stage. Gates are evaluated in order — later gates assume earlier gates have passed.

## Gate Framework

### Gate 1: Structural Completeness

All required thesis components must exist:

#### Minimum Thesis Structure (Thai University Standard)

| Component | Required | Check |
|-----------|----------|-------|
| Thai abstract (บทคัดย่อภาษาไทย) | Yes | |
| English abstract | Yes | |
| Acknowledgements (กิตติกรรมประกาศ) | Yes | |
| Table of contents (สารบัญ) | Yes | |
| List of figures (สารบัญภาพ) | If figures exist | |
| List of tables (สารบัญตาราง) | If tables exist | |
| Chapter 1: Introduction (บทนำ) | Yes | |
| Chapter 2: Literature Review (ทบทวนวรรณกรรม) | Yes | |
| Chapter 3: Methodology (วิธีดำเนินการวิจัย) | Yes | |
| Chapter 4: Results (ผลการวิจัย) | Yes | |
| Chapter 5: Discussion/Conclusion (สรุป อภิปราย ข้อเสนอแนะ) | Yes | |
| Bibliography (บรรณานุกรม) | Yes | |
| Appendices (ภาคผนวก) | If referenced | |
| Biography (ประวัติผู้เขียน) | Yes | |

Note: Some universities use a 5-chapter model, some use 6-7 chapters. Check the university template.

#### For Software Engineering Theses (Additional)

| Component | Required | Check |
|-----------|----------|-------|
| System design chapter or section | Yes | |
| Implementation chapter or section | Yes | |
| Testing results chapter or section | Yes | |
| User manual (appendix or standalone) | Yes | |
| Source code listing or repository reference | Yes | |

**Pass criteria**: All required components exist with substantive content (not just headers).

### Gate 2: Content Quality Threshold

Every chapter must meet minimum quality standards:

| Requirement | Threshold |
|-------------|-----------|
| Thesis-auditor score per chapter | >= 60/100 (Grade C) |
| Thesis-auditor average across all chapters | >= 70/100 (Grade C+) |
| No chapter below | 50/100 (Grade D) |
| No `[TBD]` markers in main chapters | 0 |
| No `[CITATION NEEDED]` markers remaining | 0 |

**Pass criteria**: All thresholds met. `[VERIFY REQUIRED]` markers are acceptable if documented.

### Gate 3: Citation and Bibliography Integrity

| Requirement | Check |
|-------------|-------|
| Every in-text citation has a bibliography entry | |
| Every bibliography entry is cited at least once | |
| APA name-year format consistent (or university-required format) | |
| Year system consistent (all พ.ศ. or all ค.ศ., not mixed) | |
| No citation-to-reference mismatches (name spelling, year) | |
| Minimum citation density per chapter | >= 5 citations per chapter (Ch1-Ch5) |
| Recent sources included | >= 30% from last 5 years |
| Thai sources included | >= 3 Thai-language sources |

**Pass criteria**: Zero citation-reference mismatches, all density thresholds met.

### Gate 4: Thai Language Quality

| Requirement | Check |
|-------------|-------|
| Formal Thai register throughout | |
| No informal or colloquial Thai | |
| No marketing-style language (ก้าวสำคัญ, พลิกโฉม, etc.) | |
| No excessive filler phrases | |
| Consistent terminology (same Thai term for same concept) | |
| Proper Thai typography (correct quotes, no orphaned particles) | |
| Thai-English mixed text follows conventions | |
| Section headers in proper formal Thai | |

**Pass criteria**: Thai-editor review returns zero Critical issues.

### Gate 5: De-AI Compliance

| Requirement | Check |
|-------------|-------|
| De-AI scan completed on all chapters | |
| AI-signal level per chapter | Low (acceptable) or Medium with justification |
| No chapter has High AI-signal level | |
| Sentence rhythm varies (burstiness present) | |
| No banned English AI words in English sections | |
| No formulaic paragraph structures detected | |
| Paragraph openers are varied | |

**Pass criteria**: All chapters score >= 7/10 on De-AI dimension.

### Gate 6: Data Consistency

| Requirement | Check |
|-------------|-------|
| All numbers consistent across documents | |
| Test case counts match everywhere | |
| Code statistics match everywhere | |
| Version identifiers consistent | |
| Timeline dates consistent | |
| Abstract accurately reflects thesis content | |
| Conclusion accurately reflects results | |

**Pass criteria**: Zero conflicts in the consistency matrix.

### Gate 7: Formatting Compliance

| Requirement | Check |
|-------------|-------|
| University template loaded and applied | |
| Page margins correct | |
| Font and size correct | |
| Heading hierarchy correct | |
| Page numbering correct (Roman for front matter, Arabic for body) | |
| Figure numbering sequential and correct | |
| Table numbering sequential and correct | |
| Caption format correct | |
| Bibliography format per university handbook | |
| Appendix format correct | |

**Pass criteria**: Format check returns zero Critical formatting issues.

### Gate 8: ISO 29110 Compliance (Software Theses Only)

| Requirement | Check |
|-------------|-------|
| All 10 baseline documents exist | |
| Project Plan complete | |
| SRS complete with traceable requirements | |
| SDD complete with design rationale | |
| Test Plan covers all requirement categories | |
| Test Record has evidence for all test cases | |
| Traceability Record links requirements → design → tests → results | |
| Change Requests documented | |
| Progress Status current | |
| Configuration Management Plan current | |
| User Manual complete | |
| Thesis chapters reference ISO documents appropriately | |

**Pass criteria**: ISO-auditor review returns `sufficiently supported` or `partially supported` (not `high-risk gaps present`).

## Gate Execution Procedure

### Quick Check (5-minute assessment)

For each gate, scan for the most obvious failures:

1. **Gate 1**: Do all required files exist? Any empty chapters?
2. **Gate 2**: Skim each chapter for `[TBD]` and `[CITATION NEEDED]` markers
3. **Gate 3**: Does the bibliography section exist? Are citations visible in each chapter?
4. **Gate 4**: Read the first paragraph of each chapter — is register formal?
5. **Gate 5**: Read any 3 random paragraphs — do they sound natural?
6. **Gate 6**: Check one number (e.g., test count) across 3 documents
7. **Gate 7**: Check page 1 formatting against university template
8. **Gate 8**: Do ISO document files exist? (if applicable)

### Full Check (30-60 minute assessment)

Run each gate thoroughly using the appropriate specialist:

1. **Gate 1**: File inventory + section inventory
2. **Gate 2**: Run `/thesis-score full`
3. **Gate 3**: Run `thesis-reviewer` citation audit on each chapter
4. **Gate 4**: Run `thai-writer` language review on each chapter
5. **Gate 5**: Run `/thesis-deai scan` on each chapter
6. **Gate 6**: Run `/thesis-audit consistency`
7. **Gate 7**: Run `/thesis-format` with university profile
8. **Gate 8**: Run `thesis-reviewer` ISO 29110 full audit

## Output Format

### Gate Status Dashboard

| Gate | Name | Status | Blockers | Priority |
|------|------|--------|----------|----------|
| 1 | Structural Completeness | PASS / FAIL / PARTIAL | N issues | |
| 2 | Content Quality | PASS / FAIL / PARTIAL | N issues | |
| 3 | Citation Integrity | PASS / FAIL / PARTIAL | N issues | |
| 4 | Thai Language Quality | PASS / FAIL / PARTIAL | N issues | |
| 5 | De-AI Compliance | PASS / FAIL / PARTIAL | N issues | |
| 6 | Data Consistency | PASS / FAIL / PARTIAL | N issues | |
| 7 | Formatting Compliance | PASS / FAIL / PARTIAL | N issues | |
| 8 | ISO 29110 Compliance | PASS / FAIL / PARTIAL / N/A | N issues | |

### Overall Readiness

| Metric | Value |
|--------|-------|
| Gates passed | X / 8 |
| Gates with blockers | X |
| Total blocking issues | N |
| Estimated effort to clear | [hours/days assessment] |
| Recommendation | `Submit` / `Submit with minor revisions` / `Revise and recheck` / `Major revision needed` |

### Blocker List (Prioritized)

1. [Gate X] Issue description — impact — fix action — effort estimate
2. ...

### Recommended Fix Sequence

Ordered list of actions to clear all blockers, sequenced for efficiency:

1. Fix data consistency issues first (affects scoring of other gates)
2. Fix content gaps (affects citation and language quality)
3. Run de-AI on fixed content
4. Fix citations
5. Fix language
6. Fix formatting last

## Integration with Other Components

This skill works with:

| Component | How It Integrates |
|-----------|-------------------|
| `thesis-orchestrator` agent | Orchestrator invokes this skill for submission readiness checks |
| `thesis-reviewer` agent | Provides scoring data for Gate 2, consistency data for Gate 6, citation integrity for Gate 3, and ISO compliance for Gate 8 |
| `thai-writer` agent | Provides language quality assessment for Gate 4 and prose drafting for remediation |
| `/thesis-audit` command | Covers Gates 2, 3, 6 in detail |
| `/thesis-score` command | Quick Gate 2 check |
| `/thesis-deai` command | Gate 5 check |
| `/thesis-format` command | Gate 7 check |

## Guardrails

- Do not pass a gate if there are known blockers, even if the overall thesis looks good
- Do not fabricate gate results. If assessment data is unavailable, mark the gate as `[Not Assessed]`
- Do not conflate gates. Each gate tests a specific quality dimension
- Record the date of each gate check so progress can be tracked over time
- If a gate was previously PASS and content has changed since, mark it as `[Re-check Required]`
