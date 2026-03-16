---
name: iso29110-docs
description: >
  Create, maintain, and review ISO 29110 document sets for thesis-linked software
  projects with bilingual Thai-English support, version control conventions,
  cross-reference validation, and chapter-level integration guidance.
tags: [ISO29110, Documentation, Thesis, Bilingual, Software Engineering]
version: 0.1.0
---

# ISO 29110 Docs Skill

This skill supports software-oriented theses that need ISO 29110-aligned
documentation as part of the research and development workflow. It is designed
for markdown-first AI CLI environments and can be used as a reusable operating
guide for generating, updating, and auditing project documents that support
thesis Chapters 3 to 5.

## 1. Primary objective

Produce ISO 29110 document sets that are:

- structurally consistent across the project lifecycle
- aligned with the actual software project evidence
- usable in both thesis writing and project audit contexts
- traceable across requirements, design, implementation, testing, and release
- safe for bilingual Thai-English academic and professional documentation

## 2. When to use this skill

Use this skill when the task involves:

- creating one of the 10 baseline ISO 29110 documents
- updating an existing document after a project change
- checking whether documents are internally consistent
- mapping thesis content to software engineering work products
- generating Thai, English, or bilingual project documentation
- reviewing whether project records are complete enough for an academic defense
- preparing evidence for Chapter 3, Chapter 4, or Chapter 5 of a thesis

## 3. Required inputs

Before drafting, gather the following where available:

1. Project name
2. Document name or target deliverable
3. Current project scope and objectives
4. Relevant source artifacts such as requirements notes, architecture notes,
   test evidence, issue logs, screenshots, or user workflows
5. Current version or revision history
6. Target language mode:
   - Thai
   - English
   - bilingual Thai-English
7. Thesis mapping context, if the document will be cited in a chapter
8. Verification status for any unknown or incomplete project facts

If any required information is missing, preserve a placeholder such as `[TBD]`
or `[VERIFY REQUIRED]` rather than inventing details.

## 4. Baseline document set

The standard working set contains 10 documents:

1. Project Plan
2. Software Requirements Specification
3. Software Design Description
4. Test Plan
5. Test Record
6. Traceability Record
7. Change Request
8. Progress Status Record
9. Configuration Management Plan
10. User Manual

## 5. Recommended filenames

Use stable filenames so the document set remains predictable across tools and
repositories:

- `01-project-plan.md`
- `02-srs.md`
- `03-sdd.md`
- `04-test-plan.md`
- `05-test-record.md`
- `06-traceability-record.md`
- `07-change-request.md`
- `08-progress-status-record.md`
- `09-configuration-plan.md`
- `10-user-manual.md`

## 6. Recommended directory layout

A practical structure is:

- `docs/iso29110/`
  - `01-project-plan.md`
  - `02-srs.md`
  - `03-sdd.md`
  - `04-test-plan.md`
  - `05-test-record.md`
  - `06-traceability-record.md`
  - `07-change-request.md`
  - `08-progress-status-record.md`
  - `09-configuration-plan.md`
  - `10-user-manual.md`

If the repository already has a document structure, reuse it instead of forcing
a new layout.

## 7. Bilingual documentation policy

This skill supports three language modes.

### 7.1 Thai mode

Use modern formal Thai suitable for academic software documentation.

### 7.2 English mode

Use clear technical English with concise wording and stable terminology.

### 7.3 Bilingual mode

Use one of these approaches consistently:

- Thai heading followed by English equivalent in parentheses
- Thai section first, then English section
- English technical term introduced once after the Thai term, then reused
  consistently

Rules:

- Do not mix Thai and English randomly within the same sentence unless a term is
  genuinely standard in English.
- Keep requirement IDs, test IDs, version IDs, and configuration names stable
  across both languages.
- Prefer clarity over literal translation.

## 8. Version management rules

Every document should record version and maintenance metadata.

Minimum fields:

- Document ID
- Document title
- Version
- Status
- Effective date
- Owner or maintainer
- Related documents
- Change summary

Suggested status values:

- draft
- in-review
- approved
- superseded

Suggested versioning style:

- major updates: `v2.0`
- minor updates: `v1.1`
- small corrections: `v1.0.1`

If the project already uses another versioning convention, preserve it.

## 9. Document-specific guidance

### 9.1 Project Plan

Purpose:
- define project scope, objectives, resources, schedule, risks, and milestones

Typical sections:
- purpose
- project scope
- objectives
- stakeholders
- deliverables
- schedule and milestones
- resource plan
- risk management
- communication plan

### 9.2 Software Requirements Specification

Purpose:
- define what the system must do and what constraints apply

Typical sections:
- introduction
- system overview
- functional requirements
- non-functional requirements
- assumptions and constraints
- acceptance criteria

Rules:
- requirements should be testable
- avoid vague statements such as "user-friendly" without measurable criteria

### 9.3 Software Design Description

Purpose:
- describe architecture, modules, data structures, workflows, and interfaces

Typical sections:
- architecture overview
- component design
- data design
- interface design
- security or control considerations
- deployment considerations

Rules:
- design elements should map back to requirements where possible
- use stable identifiers for modules and components

### 9.4 Test Plan

Purpose:
- define what will be tested, how it will be tested, and success criteria

Typical sections:
- scope of testing
- test levels
- test environment
- test cases summary
- pass or fail criteria
- schedule
- responsibilities

Rules:
- each planned test should map to a requirement, risk, or feature

### 9.5 Test Record

Purpose:
- capture actual execution evidence and outcomes

Typical sections:
- test execution summary
- executed test cases
- actual results
- defects found
- retest results
- conclusion

Rules:
- never report tests that were not actually executed
- distinguish clearly between planned and executed testing

### 9.6 Traceability Record

Purpose:
- connect requirements, design, implementation, and testing

Typical sections:
- requirement ID
- design reference
- implementation reference
- test case reference
- verification status

Rules:
- use one row per traceable item
- preserve identifiers exactly

### 9.7 Change Request

Purpose:
- record requested changes and their impact

Typical sections:
- change ID
- requestor
- description of change
- rationale
- impacted documents or modules
- approval decision
- implementation status

Rules:
- use for scope changes, requirement changes, and major corrections
- do not silently edit baseline documents when change tracking is required

### 9.8 Progress Status Record

Purpose:
- summarize current progress, blockers, completed work, and next actions

Typical sections:
- reporting period
- completed work
- in-progress work
- blockers and risks
- mitigation actions
- next steps

Rules:
- keep it factual
- avoid inflated progress claims

### 9.9 Configuration Management Plan

Purpose:
- define how versions, baselines, releases, and controlled artifacts are managed

Typical sections:
- scope of configuration management
- configuration items
- naming convention
- versioning rules
- baseline rules
- change control process
- backup or recovery approach

Rules:
- configuration items should be concrete and identifiable
- release labels and branch naming should match actual practice if documented

### 9.10 User Manual

Purpose:
- explain how the user operates the delivered system

Typical sections:
- introduction
- system requirements
- installation or access
- main workflows
- troubleshooting
- limitations
- contact or support notes

Rules:
- write for actual users, not developers only
- keep screenshots or UI descriptions aligned with the current version

## 10. Cross-reference validation

Before finalizing any document, validate the following relationships.

### 10.1 Requirements to design

- each major requirement should map to one or more design elements
- no major design block should exist without a documented need

### 10.2 Requirements to testing

- each testable requirement should map to at least one test case
- failed or partial coverage should be visible, not hidden

### 10.3 Design to implementation evidence

- implementation notes, module names, or configuration items should match the
  design description where applicable

### 10.4 Change control impact

- approved changes should update affected baseline documents
- rejected changes should remain recorded but not silently applied

### 10.5 Release and configuration alignment

- release identifiers, version labels, and controlled artifacts should align
  with the configuration plan

## 11. Thesis integration map

Use the ISO 29110 set to strengthen thesis evidence, not replace thesis writing.

Suggested mapping:

| Thesis area | ISO 29110 support |
|---|---|
| Chapter 1 objectives and project scope | Project Plan |
| Chapter 2 system needs and requirement context | SRS, Traceability Record |
| Chapter 3 methodology and implementation | SDD, Configuration Management Plan, Change Request |
| Chapter 4 validation and testing | Test Plan, Test Record |
| Chapter 5 operational outcome and practical use | Progress Status Record, User Manual |

## 12. Writing rules

- Use direct, verifiable language.
- Prefer concrete nouns and actions over vague abstractions.
- Keep terminology stable across all documents.
- Do not exaggerate project maturity or performance.
- If a metric is unknown, mark it `[TBD]`.
- If a fact is uncertain, mark it `[VERIFY REQUIRED]`.
- Preserve alignment between document content and real project evidence.

## 13. Output contract

Every generation or update task should provide:

1. the requested ISO document draft
2. upstream or downstream documents that may be affected
3. unresolved items marked `[TBD]` or `[VERIFY REQUIRED]`
4. a short note describing assumptions used during drafting

## 14. Review checklist

Before final delivery, confirm:

- the target document has all required sections
- version metadata is present
- terminology is consistent
- IDs are stable and reusable
- cross-document references are valid
- thesis-related claims are supported by project records
- no unsupported detail was invented
- unresolved items are clearly flagged

## 15. Explicit guardrails

- Do not fabricate requirements, test results, stakeholders, or approvals.
- Do not invent compliance claims.
- Do not claim traceability unless the links are actually present.
- Do not convert draft assumptions into final facts.
- Do not rewrite the entire document set when only one document needs updating.
- Do not use promotional or marketing language in formal project records.
