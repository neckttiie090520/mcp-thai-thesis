---
description: Generate or update ISO 29110 documents that support a thesis-linked software project.
agent: iso-auditor
---

# /iso-docs

Generate `$ARGUMENTS`.

## Instructions

1. Identify which ISO 29110 document the user wants to create or update.
2. Match the request to one of the baseline documents below:
   - `01-project-plan`
   - `02-srs`
   - `03-sdd`
   - `04-test-plan`
   - `05-test-record`
   - `06-traceability-record`
   - `07-change-request`
   - `08-progress-status-record`
   - `09-configuration-plan`
   - `10-user-manual`
3. Ask for missing project facts only when they are necessary to avoid inventing content.
4. Draft the document in the language mode implied by the user's request:
   - Thai
   - English
   - bilingual Thai-English
5. Keep the document aligned with thesis usage, especially when it will support Chapter 3, Chapter 4, or Chapter 5.
6. If any project fact is unknown, keep a placeholder such as `[TBD]` or `[VERIFY REQUIRED]` instead of guessing.
7. After generating the document, also report:
   - document purpose
   - required upstream inputs
   - likely downstream documents affected
   - thesis chapters that can reference this document

## Baseline mapping

### 01 Project Plan
Use for:
- project scope
- objectives
- milestones
- resources
- risks
- schedule

### 02 Software Requirements Specification
Use for:
- functional requirements
- non-functional requirements
- assumptions
- constraints
- acceptance criteria

### 03 Software Design Description
Use for:
- architecture
- module design
- data design
- interfaces
- deployment logic

### 04 Test Plan
Use for:
- test scope
- environment
- test levels
- pass/fail criteria
- responsibilities
- schedule

### 05 Test Record
Use for:
- executed tests
- actual results
- defects found
- retest evidence
- test conclusion

### 06 Traceability Record
Use for:
- requirement-to-design mapping
- requirement-to-test mapping
- implementation trace links
- verification status

### 07 Change Request
Use for:
- change proposal
- rationale
- impact analysis
- approval state
- implementation status

### 08 Progress Status Record
Use for:
- completed work
- current progress
- blockers
- risks
- next actions

### 09 Configuration Management Plan
Use for:
- controlled items
- versioning rules
- baselines
- release handling
- change control process

### 10 User Manual
Use for:
- installation or access guidance
- user workflows
- troubleshooting
- limitations
- operational guidance

## Output format

Structure the response in this order:

### Part 1 — Selected ISO Document
- document name
- document ID
- reason for selection

### Part 2 — Draft Document
Write the full document content in a clean markdown structure suitable for saving as a standalone file.

### Part 3 — Cross-Reference Impact
List:
- upstream inputs needed
- downstream documents that may need updates
- thesis chapters supported by this document

### Part 4 — Open Items
List all unresolved items using:
- `[TBD]` for missing project-specific data
- `[VERIFY REQUIRED]` for facts that require confirmation

## Guardrails

- Do not fabricate requirements, test evidence, approvals, stakeholders, or metrics.
- Do not claim ISO compliance unless the provided evidence supports that claim.
- Do not silently convert assumptions into facts.
- Do not rewrite unrelated documents when only one document is requested.
- Keep terminology consistent with the user's project context.
- Prefer direct and verifiable wording over polished but vague prose.

## Suggested thesis integration

Use this mapping when helpful:

| Thesis area | Related ISO 29110 documents |
|---|---|
| Chapter 1 objectives and scope | Project Plan |
| Chapter 2 requirement context and related work linkage | SRS, Traceability Record |
| Chapter 3 methodology and implementation | SDD, Configuration Management Plan, Change Request |
| Chapter 4 validation and testing | Test Plan, Test Record |
| Chapter 5 operational summary and practical outcome | Progress Status Record, User Manual |

## Completion check

Before finishing, verify:
- the correct ISO document type was selected
- unknown information is marked instead of guessed
- the draft is internally consistent
- cross-reference impact is listed
- the document can be reused as thesis evidence
