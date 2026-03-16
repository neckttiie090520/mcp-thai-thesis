# Capabilities Reference / รายละเอียดความสามารถ

Complete reference for all 11 MCP tools, 7 skills, 9 commands, and 9 resources.

---

## MCP Tools (11)

### Thesis Writing Tools

#### `thai_thesis_init`
Initialize a new thesis project with university-specific configuration.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `university` | string | yes | chulalongkorn, kasetsart, kmutt, chiangmai, generic |
| `title` | string | yes | Thesis title (Thai) |
| `author` | string | yes | Author name |
| `advisor` | string | no | Advisor name |
| `title_en` | string | no | English title |

Returns: project config, chapter roadmap, citation policy, format rules.

#### `thai_thesis_chapter`
Generate or revise a thesis chapter.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `chapter` | integer (1-5) | yes | Chapter number |
| `mode` | enum | yes | generate, revise, expand, condense |
| `content` | string | no | Current content or outline |
| `university` | string | no | Target university |

Modes:
- **generate**: Create chapter structure and content from outline
- **revise**: Edit existing content for clarity and academic register
- **expand**: Add depth to brief content
- **condense**: Tighten verbose prose

#### `thai_format`
Format text according to university standards.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `university` | string | yes | Target university |
| `text` | string | no | Text to format |
| `format_type` | enum | no | chapter, abstract, bibliography, full |

Handles: Thai typography (เว้นวรรค), number formats, heading hierarchy, citation formatting.

---

### Quality Assurance Tools

#### `thai_deai`
De-AI processing with 30-pattern framework.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | yes | Text to analyze |
| `mode` | enum | yes | detect, edit, rewrite |
| `language` | enum | no | thai, english, both |

**Thai patterns (30):**

| Category | Examples | Count |
|----------|----------|-------|
| Overused connectors | นอกจากนี้, ยิ่งไปกว่านั้น, อีกทั้ง | 5 |
| Promotional language | ก้าวสำคัญ, พลิกโฉม, ล้ำสมัย | 8 |
| Empty closers | จะส่งผลดีต่ออนาคต, มีศักยภาพสูง | 4 |
| Generic praise | มีประสิทธิภาพสูง, ทันสมัย | 5 |
| AI vocabulary | ครอบคลุมทุกมิติ, ครบถ้วนสมบูรณ์ | 8 |

**Burstiness analysis:**
- Measures Coefficient of Variation (CV) of sentence lengths
- CV >= 30 → human-like writing
- CV < 30 → likely AI-generated
- Also checks: paragraph variation, word frequency entropy

#### `thai_citation`
APA นาม-ปี citation management.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `action` | enum | yes | cite, bibliography, audit, validate |
| `source` | object | no | Source metadata (for cite) |
| `sources` | array | no | Array of sources (for bibliography) |
| `cited_keys` | array | no | Keys found in text (for audit) |
| `year_system` | enum | no | phc (พ.ศ.) or ce (ค.ศ.) |

**Citation forms supported:**
- Narrative: `ผู้แต่ง (ปี)` / `Author (Year)`
- Parenthetical: `(ผู้แต่ง, ปี)` / `(Author, Year)`
- With page: `(ผู้แต่ง, ปี, หน้า xx)`
- Multiple authors: `(ผู้แต่ง1 และ ผู้แต่ง2, ปี)`
- Organization: `(ชื่อองค์กร, ปี)`

**Audit checks:** format compliance, year system consistency, bibliography matching, DOI/URL validation.

#### `thesis_review`
Quality review from different perspectives.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | yes | Content to review |
| `chapter` | integer | no | Chapter number |
| `perspective` | enum | no | advisor, committee, iso_auditor |

Each perspective focuses on different aspects:
- **advisor**: methodology, literature depth, writing quality
- **committee**: technical correctness, innovation, defense readiness
- **iso_auditor**: document completeness, traceability, version control

#### `thesis_audit`
Full thesis quality audit with 8-gate system.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | enum | yes | full, chapter, iso, consistency |
| `text` | string | no | Content to audit |
| `chapter` | integer | no | Chapter number (if scope=chapter) |
| `university` | string | no | Target university |

**8 Quality Gates:**

| Gate | Check | Pass criteria |
|------|-------|---------------|
| 1 | Structural completeness | All required chapters/sections present |
| 2 | Content quality | Problem statement clear, methodology sound |
| 3 | Citation integrity | APA format correct, bibliography complete |
| 4 | Thai language quality | Register appropriate, เว้นวรรค correct |
| 5 | De-AI compliance | CV >= 30, no banned patterns |
| 6 | Data consistency | Numbers/terms match across chapters |
| 7 | Formatting compliance | University template followed |
| 8 | ISO 29110 compliance | Documents complete (software theses) |

#### `thesis_score`
Quick 6-dimension scoring.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | yes | Content to score |
| `chapter` | integer | no | Chapter number |
| `university` | string | no | Target university |

**Scoring dimensions (100 points):**

| Dimension | Weight | What it measures |
|-----------|--------|-----------------|
| Structure | 15% | Chapter organization, required sections |
| Content | 25% | Depth, analysis, contribution |
| Language | 15% | Grammar, register, formatting |
| Citations | 15% | APA compliance, source quality |
| ISO compliance | 15% | Document completeness |
| Consistency | 15% | Cross-chapter coherence |

#### `thesis_consistency`
Cross-document consistency check.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `documents` | array | yes | Array of {name, content} |
| `check_types` | array | no | numbers, terminology, facts, versions, dates |

Compares data across multiple documents to find contradictions.

#### `thesis_traceability`
Requirements traceability matrix generation.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `requirements` | array | yes | Array of requirement objects |
| `include_coverage` | boolean | no | Include coverage metrics (default: true) |

Each requirement object: `{id, description, design_ref, impl_ref, test_ref, test_result}`

---

### ISO 29110 Tools

#### `iso_document`
Generate ISO 29110 documentation.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `document_type` | enum | yes | See table below |
| `language` | enum | no | thai, english, bilingual |
| `project_info` | object | no | Project metadata |

**10 document types:**

| Type | Thai name | Purpose |
|------|-----------|---------|
| `project-plan` | แผนการดำเนินงาน | Scope, schedule, resources |
| `srs` | ข้อกำหนดความต้องการ | Functional & non-functional requirements |
| `sdd` | คำอธิบายการออกแบบ | Architecture & detailed design |
| `test-plan` | แผนทดสอบ | Testing strategy & procedures |
| `test-record` | รายงานการทดสอบ | Test execution results |
| `traceability` | ตารางการติดตาม | Requirements-to-test mapping |
| `change-request` | คำร้องขอเปลี่ยนแปลง | Change management |
| `progress` | รายงานความคืบหน้า | Status reporting |
| `config-plan` | แผนจัดการโครงแบบ | Configuration management |
| `user-manual` | คู่มือผู้ใช้ | End-user documentation |

All documents support bilingual output (Thai + English headers and content).

---

## Skills (7)

| Skill | Lines | Purpose |
|-------|-------|---------|
| `documentation-writer` | 1,235 | Thai academic prose, ISO docs, bilingual specs |
| `thai-thesis-writing` | 625 | End-to-end chapter drafting workflow |
| `iso29110-docs` | 425 | ISO 29110 document structure and rules |
| `thesis-orchestrator` | 356 | Pipeline routing, agent coordination |
| `thai-de-ai` | 326 | 30-pattern de-AI framework |
| `thai-citation-manager` | 309 | APA นาม-ปี citation rules |
| `thesis-quality-gate` | 264 | 8-gate pre-submission checklist |

See [SKILLS-GUIDE.md](SKILLS-GUIDE.md) for detailed documentation of each skill.

---

## Commands (9)

| Command | Description |
|---------|-------------|
| `/thesis-init` | Initialize thesis project with university config |
| `/thesis-chapter` | Write or revise a specific chapter |
| `/thesis-audit` | Full quality audit (8 gates) |
| `/thesis-review` | Review from advisor/committee perspective |
| `/thesis-deai` | Scan/edit/rewrite AI patterns |
| `/thesis-score` | Quick 6-dimension scoring |
| `/thesis-format` | Apply university formatting |
| `/thesis-rewrite` | Full chapter rewrite |
| `/iso-docs` | Generate ISO 29110 documents |

---

## Resources (9)

MCP resources are read-only data the client can access:

| URI | Content |
|-----|---------|
| `templates://chulalongkorn` | Chulalongkorn thesis template |
| `templates://kasetsart` | Kasetsart thesis template |
| `templates://kmutt` | KMUTT thesis template |
| `templates://chiangmai` | Chiang Mai thesis template |
| `templates://generic` | Generic Thai thesis template |
| `patterns://deai-thai` | 30 Thai de-AI banned patterns |
| `patterns://deai-english` | English de-AI patterns |
| `scoring://rubric` | 6-dimension scoring rubric |
| `scoring://quality-gate` | 8-gate quality checklist |

---

## University Profiles (5)

| Code | University | Status |
|------|-----------|--------|
| `chulalongkorn` | จุฬาลงกรณ์มหาวิทยาลัย | Verified |
| `kasetsart` | มหาวิทยาลัยเกษตรศาสตร์ | Verified |
| `kmutt` | มจธ. (พระจอมเกล้าธนบุรี) | Verified |
| `chiangmai` | มหาวิทยาลัยเชียงใหม่ | Verified (tested with real thesis) |
| `generic` | Generic template | Default fallback |

Each profile defines: font, font size, line spacing, margins, chapter naming convention, citation style, year system.

Adding a new university requires editing `config/university.yaml` and optionally adding a template resource. See [CONTRIBUTING.md](CONTRIBUTING.md).
