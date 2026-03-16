# Capabilities Reference / รายละเอียดความสามารถ

> Complete reference for all **11 MCP tools**, **7 skills**, **9 commands**, and **9 resources** — with customization guides, extension points, and Thai language knowledge.

Every section below follows this structure:
- **What it does** — core functionality
- **Parameters** — inputs and options
- **What you can customize** — where to edit, what to change
- **How to extend** — development pathways for contributors

---

## Table of Contents

1. [MCP Tools (11)](#mcp-tools-11)
   - [Thesis Writing Tools](#thesis-writing-tools)
   - [Quality Assurance Tools](#quality-assurance-tools)
   - [ISO 29110 Tools](#iso-29110-tools)
2. [Skills (7)](#skills-7)
3. [Commands (9)](#commands-9)
4. [Resources (9)](#resources-9)
5. [University Profiles (5)](#university-profiles-5)
6. [Thai Academic Writing Knowledge](#thai-academic-writing-knowledge)
   - [Sentence Patterns](#sentence-patterns-รูปแบบประโยค)
   - [Academic Register](#academic-register-ทะเบียนภาษาวิชาการ)
   - [Typography Rules](#thai-typography-rules-กฎการพิมพ์ไทย)
   - [De-AI Pattern Framework](#de-ai-pattern-framework-30-patterns)
7. [Extension & Development Guide](#extension--development-guide)

---

## MCP Tools (11)

### Thesis Writing Tools

---

#### `thai_thesis_init`

Initialize a new thesis project with university-specific configuration.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `university` | string | yes | chulalongkorn, kasetsart, kmutt, chiangmai, generic |
| `title` | string | yes | Thesis title (Thai) |
| `author` | string | yes | Author name |
| `advisor` | string | no | Advisor name |
| `title_en` | string | no | English title |

**Returns:** project config, chapter roadmap, citation policy, format rules.

<details>
<summary>🔧 Customization & Extension</summary>

| What to change | Where | How |
|---------------|-------|-----|
| Add university | `config/university.yaml` | Add new profile block (see [University Profiles](#university-profiles-5)) |
| Add name aliases | `mcp-server/src/utils/thai-text.ts` → `normalizeUniversityName()` | Add alias → canonical key mapping |
| Change chapter roadmap | `mcp-server/src/server.ts` → `thai_thesis_init` handler | Edit chapter structure array |
| Modify citation policy | `config/university.yaml` → `citation_style` field | Change per-university defaults |

**Development pathway:** To support non-thesis academic formats (IS projects, term papers), add a `project_type` parameter and create format profiles in `config/`.

</details>

---

#### `thai_thesis_chapter`

Generate or revise a thesis chapter.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `chapter` | integer (1-5) | yes | Chapter number |
| `mode` | enum | yes | generate, revise, expand, condense |
| `content` | string | no | Current content or outline |
| `university` | string | no | Target university |

**Modes:**
- **generate** — Create chapter structure and content from outline
- **revise** — Edit existing content for clarity and academic register
- **expand** — Add depth to brief content
- **condense** — Tighten verbose prose

<details>
<summary>🔧 Customization & Extension</summary>

| What to change | Where | How |
|---------------|-------|-----|
| Chapter structures | `mcp-server/src/server.ts` → chapter handler | Edit required sections per chapter |
| Support 7-chapter format | Same handler | Add chapter 6-7 definitions for SE theses |
| Add new mode | `ListToolsRequestSchema` → enum list | Add mode + handler logic |
| Change section prompts | Handler code | Edit the generation templates |

**Development pathway:** Add `mode=outline` for quick skeleton generation, or `mode=translate` for Thai↔English chapter translation.

</details>

---

#### `thai_format`

Format text according to university standards.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `university` | string | yes | Target university |
| `text` | string | no | Text to format |
| `format_type` | enum | no | chapter, abstract, bibliography, full |

**Handles:** Thai typography (เว้นวรรค), number formats, heading hierarchy, citation formatting.

<details>
<summary>🔧 Customization & Extension</summary>

| What to change | Where | How |
|---------------|-------|-----|
| Font/margin/spacing | `config/university.yaml` | Modify per-university format values |
| Typography rules | `thai-text.ts` → `checkThaiTypography()` | Add/modify rules |
| Number format | Handler code | Edit number normalization logic |

**Development pathway:** Add `format_type=table` for table formatting, or `format_type=figure` for figure caption standards.

</details>

---

### Quality Assurance Tools

---

#### `thai_deai`

De-AI processing with 30-pattern framework — detect, edit, or rewrite AI-generated text.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | yes | Text to analyze |
| `mode` | enum | yes | detect, edit, rewrite |
| `language` | enum | no | thai, english, both |

**4-stage analysis pipeline:**

| Stage | Function | What it measures |
|-------|----------|-----------------|
| 1 | `detectThaBannedPatterns()` | 30+ Thai banned patterns (5 categories) |
| 2 | `analyzeSentenceLengths()` | Burstiness — CV ≥ 30 = human-like |
| 3 | `analyzeRegister()` | Formal vs informal Thai register |
| 4 | `checkThaiTypography()` | Thai typography correctness |

**See [De-AI Pattern Framework](#de-ai-pattern-framework-30-patterns) for full pattern catalog.**

<details>
<summary>🔧 Customization & Extension</summary>

| What to change | Where | How |
|---------------|-------|-----|
| Add banned pattern | `thai-text.ts` → `THAI_BANNED_PATTERNS` array | Add `{regex, description, category, replacement}` |
| Adjust CV threshold | `thai-text.ts` → `analyzeSentenceLengths()` | Change the `>= 30` check |
| Add English patterns | `thai-text.ts` | Add to English banned patterns array |
| Add new category | Same file | Define new category letter (F, G, ...) |

**Development pathway:** Add field-specific pattern sets (medical, engineering, humanities), or integrate with external AI detection APIs.

</details>

---

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

| Form | Thai | English |
|------|------|---------|
| Narrative | ผู้แต่ง (ปี) | Author (Year) |
| Parenthetical | (ผู้แต่ง, ปี) | (Author, Year) |
| With page | (ผู้แต่ง, ปี, หน้า xx) | (Author, Year, p. xx) |
| Multiple authors | ผู้แต่ง1 และ ผู้แต่ง2 (ปี) | Author1 & Author2 (Year) |
| 3+ authors | ผู้แต่ง1 และคณะ (ปี) | Author1 et al. (Year) |
| Organization | (ชื่อองค์กร, ปี) | (Organization, Year) |

**7 source types:** book, journal, conference, thesis, website, report, other

**Audit checks:** format compliance, year system consistency, bibliography matching, DOI/URL validation.

<details>
<summary>🔧 Customization & Extension</summary>

| What to change | Where | How |
|---------------|-------|-----|
| Add source type | `citation.ts` → `formatBibEntry()` | Add new case + formatter |
| Change sort order | `citation.ts` → `formatBibliography()` | Modify sort function |
| Add citation style | New utility function | Implement alongside APA (e.g., Vancouver) |
| Year system rules | `citation.ts` → `displayYear()` | Modify conversion logic |

**Development pathway:** Add `action=search` to find potential sources, or `action=doi_lookup` to auto-fill metadata from DOI.

</details>

---

#### `thesis_review`

Quality review from different academic perspectives.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | yes | Content to review |
| `chapter` | integer | no | Chapter number |
| `perspective` | enum | no | advisor, committee, iso_auditor |

| Perspective | Focus areas |
|-------------|-------------|
| **advisor** | methodology, literature depth, writing quality |
| **committee** | technical correctness, innovation, defense readiness |
| **iso_auditor** | document completeness, traceability, version control |

<details>
<summary>🔧 Customization & Extension</summary>

Add new perspectives (e.g., `external_reviewer`, `language_editor`) in the handler's switch block in `server.ts`. Each perspective is a set of review criteria — no utility code needed, just structured prompts.

</details>

---

#### `thesis_audit`

Full thesis quality audit with 8-gate system.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | enum | yes | full, chapter, iso, consistency |
| `text` | string | no | Content to audit |
| `chapter` | integer | no | Chapter number (if scope=chapter) |
| `university` | string | no | Target university |

**8 Quality Gates:**

| Gate | Check | Pass criteria | Customizable? |
|------|-------|---------------|---------------|
| 1 | Structural completeness | All required chapters/sections present | ✅ Edit section lists |
| 2 | Content quality | Problem statement clear, methodology sound | ✅ Adjust scoring rubric |
| 3 | Citation integrity | APA format correct, bibliography complete | ✅ Add citation rules |
| 4 | Thai language quality | Register appropriate, เว้นวรรค correct | ✅ Add register rules |
| 5 | De-AI compliance | CV ≥ 30, no banned patterns | ✅ Adjust threshold |
| 6 | Data consistency | Numbers/terms match across chapters | ✅ Add check types |
| 7 | Formatting compliance | University template followed | ✅ Per-university config |
| 8 | ISO 29110 compliance | Documents complete (software theses) | ✅ Document list |

<details>
<summary>🔧 Customization & Extension</summary>

- **Add gate:** Define new gate criteria in the audit handler
- **Change pass/fail thresholds:** Edit gate evaluation logic in `server.ts`
- **Skip gates:** Use `scope=chapter` or `scope=iso` to run subsets

**Development pathway:** Add `scope=pre-defense` that runs gates 1-6 with stricter thresholds, or `scope=advisor-review` that generates a report in advisor-friendly format.

</details>

---

#### `thesis_score`

Quick 6-dimension quantitative scoring (100 points).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | yes | Content to score |
| `chapter` | integer | no | Chapter number |
| `university` | string | no | Target university |

**Scoring dimensions:**

| Dimension | Weight | Measures |
|-----------|--------|----------|
| Structure | 15% | Chapter organization, required sections |
| Content | 25% | Depth, analysis, contribution |
| Language | 15% | Grammar, register, formatting |
| Citations | 15% | APA compliance, source quality |
| ISO compliance | 15% | Document completeness |
| Consistency | 15% | Cross-chapter coherence |

<details>
<summary>🔧 Customization & Extension</summary>

- **Adjust weights:** Edit scoring dimension weights in `server.ts` handler
- **Add dimensions:** Define new scoring criteria (e.g., `Originality`, `Methodology`)
- **Change scale:** Modify from 100-point to letter grades or pass/fail
- **Resource:** Full rubric available at `scoring://rubric`

</details>

---

#### `thesis_consistency`

Cross-document consistency check.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `documents` | array | yes | Array of `{name, content}` |
| `check_types` | array | no | numbers, terminology, facts, versions, dates |

<details>
<summary>🔧 Customization & Extension</summary>

Add new check types by extending the `check_types` enum and adding comparison logic. Example: add `abbreviations` to verify all abbreviations are defined on first use.

</details>

---

#### `thesis_traceability`

Requirements traceability matrix generation.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `requirements` | array | yes | Array of requirement objects |
| `include_coverage` | boolean | no | Include coverage metrics (default: true) |

Each requirement: `{id, description, design_ref, impl_ref, test_ref, test_result}`

---

### ISO 29110 Tools

---

#### `iso_document`

Generate ISO 29110 documentation (10 types, bilingual support).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `document_type` | enum | yes | See table below |
| `language` | enum | no | thai, english, bilingual |
| `project_info` | object | no | Project metadata |

**10 document types:**

| Type | Thai name | Purpose |
|------|-----------|---------
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

<details>
<summary>🔧 Customization & Extension</summary>

| What to change | Where | How |
|---------------|-------|-----|
| Template sections | `mcp-server/templates/iso/` | Edit template markdown files |
| Add document type | `server.ts` + `templates/iso/` | Add enum value + template file |
| Bilingual headers | Template files | Edit Thai/English section headers |
| Metadata fields | Handler code | Add fields to project_info schema |

**Development pathway:** Add `document_type=meeting-minutes` or `document_type=risk-register` for more comprehensive ISO coverage.

</details>

---

## Skills (7)

Skills are **knowledge files** that teach AI agents domain-specific behaviors. They don't run code — they provide **judgment, rules, and workflows** that the agent uses to orchestrate MCP tools intelligently.

| # | Skill | Lines | Purpose | Customizable at |
|---|-------|-------|---------|----------------|
| 1 | `thai-thesis-writing` | 625 | End-to-end chapter drafting workflow | `skills/thai-thesis-writing/SKILL.md` |
| 2 | `documentation-writer` | 1,235 | Thai academic prose + 30-pattern de-AI framework | `skills/documentation-writer/SKILL.md` |
| 3 | `thesis-orchestrator` | 356 | Multi-agent pipeline routing (7 patterns A-G) | `skills/thesis-orchestrator/SKILL.md` |
| 4 | `iso29110-docs` | 425 | ISO 29110 document generation (10 types) | `skills/iso29110-docs/SKILL.md` |
| 5 | `thai-de-ai` | 326 | 30-pattern AI fingerprint detection & removal | `skills/thai-de-ai/SKILL.md` |
| 6 | `thai-citation-manager` | 309 | APA นาม-ปี citation management | `skills/thai-citation-manager/SKILL.md` |
| 7 | `thesis-quality-gate` | 264 | 8-gate pre-submission quality checklist | `skills/thesis-quality-gate/SKILL.md` |

> **How to customize a skill:** Skills are plain Markdown files. Edit them directly to change rules, add domain knowledge, or modify workflows. No compilation needed — changes take effect on next skill load.

> **How to add a skill:** Create `skills/<skill-name>/SKILL.md` following the existing format. See [SKILLS-GUIDE.md](SKILLS-GUIDE.md) for detailed documentation.

---

## Commands (9)

Slash commands are the **user interface** — they load the right skills and call the right tools.

| Command | Description | Skills loaded | Tools called |
|---------|-------------|---------------|-------------|
| `/thesis-init` | Initialize thesis project | thai-thesis-writing | thai_thesis_init |
| `/thesis-chapter` | Write or revise chapter | thai-thesis-writing, documentation-writer | thai_thesis_chapter, thai_format |
| `/thesis-audit` | Full quality audit (8 gates) | thesis-quality-gate, thesis-orchestrator | thesis_audit, thesis_score |
| `/thesis-review` | Review from advisor/committee | thesis-quality-gate | thesis_review |
| `/thesis-deai` | Scan/edit/rewrite AI patterns | thai-de-ai | thai_deai |
| `/thesis-score` | Quick 6-dimension scoring | — | thesis_score |
| `/thesis-format` | Apply university formatting | — | thai_format |
| `/thesis-rewrite` | Full chapter rewrite | documentation-writer, thai-de-ai | thai_thesis_chapter, thai_deai |
| `/iso-docs` | Generate ISO 29110 documents | iso29110-docs | iso_document |

> **How to customize:** Edit command files in `commands/<command-name>.md`. Each file defines the step-by-step flow the agent follows.

> **How to add a command:** Create `commands/<new-command>.md` with YAML frontmatter (`description`, `agent`) and numbered execution steps.

---

## Resources (9)

MCP resources are **read-only data endpoints** that any MCP client can query at runtime.

| URI | Content | Customizable at |
|-----|---------|----------------|
| `templates://chulalongkorn` | Chulalongkorn thesis template | `mcp-server/templates/universities/` |
| `templates://kasetsart` | Kasetsart thesis template | Same |
| `templates://kmutt` | KMUTT thesis template | Same |
| `templates://chiangmai` | Chiang Mai thesis template | Same |
| `templates://generic` | Generic Thai thesis template | Same |
| `patterns://deai-thai` | 30 Thai de-AI banned patterns | `mcp-server/src/utils/thai-text.ts` |
| `patterns://deai-english` | English de-AI patterns (3 tiers) | Same |
| `scoring://rubric` | 6-dimension scoring rubric | `server.ts` resource handler |
| `scoring://quality-gate` | 8-gate quality checklist | Same |

> **How to add a resource:** Define new URI in the `ListResourcesRequestSchema` handler, then add the response in `ReadResourceRequestSchema` handler in `server.ts`.

---

## University Profiles (5)

| Code | University | Year system | Status |
|------|-----------|-------------|--------|
| `chulalongkorn` | จุฬาลงกรณ์มหาวิทยาลัย | พ.ศ. | Verified |
| `kasetsart` | มหาวิทยาลัยเกษตรศาสตร์ | พ.ศ. | Verified |
| `kmutt` | มจธ. (พระจอมเกล้าธนบุรี) | พ.ศ. | Verified |
| `chiangmai` | มหาวิทยาลัยเชียงใหม่ | พ.ศ. | Verified (tested with real thesis) |
| `generic` | Generic template | พ.ศ. | Default fallback |

Each profile defines: **font**, **font size**, **line spacing**, **margins**, **chapter naming**, **citation style**, **year system**.

<details>
<summary>🔧 Adding a New University (step-by-step)</summary>

1. **Add profile** in `config/university.yaml`:
   ```yaml
   mahidol:
     name_th: "มหาวิทยาลัยมหิดล"
     name_en: "Mahidol University"
     citation_style: "apa_name_year"
     year_system: "phc"
     font: "TH Sarabun New"
     font_size: 16
     line_spacing: 1.5
     margins: { top: 1.5, bottom: 1.0, left: 1.5, right: 1.0 }
   ```
2. **Add aliases** in `thai-text.ts` → `normalizeUniversityName()`:
   ```ts
   case "มหิดล": case "mahidol": case "mu": return "mahidol";
   ```
3. **Create template** in `mcp-server/templates/universities/mahidol.md`
4. **Add resource URI** in server resource handler
5. **Run** `npm run typecheck` to verify

</details>

---

## Thai Academic Writing Knowledge

> 📚 **This section is the Thai language knowledge base** — sentence patterns, register rules, typography, and de-AI patterns that power the system's Thai writing capabilities.

### Sentence Patterns / รูปแบบประโยค

The system recognizes and can generate these Thai academic sentence structures:

#### 1. ประโยคนำเสนอข้อเท็จจริง (Factual Statement)
```
[สิ่งที่ศึกษา] + [กริยา] + [ข้อเท็จจริง/ผลลัพธ์]
```
- ระบบปฏิบัติการ Windows **มี**ค่าความหน่วงเริ่มต้นที่ไม่เหมาะสมสำหรับการเล่นเกม
- การศึกษาครั้งนี้**พบว่า**ค่า DPC latency ลดลงร้อยละ 23

#### 2. ประโยคเชิงเหตุผล (Causal)
```
[เหตุ] + ส่งผลให้/ทำให้/จึง + [ผล]
เนื่องจาก/เพราะ + [เหตุ] + [ผล]
```
- การปิดบริการ telemetry **ส่งผลให้**ค่าความหน่วงของระบบลดลง
- **เนื่องจาก**เกม FPS ต้องการความเร็วในการตอบสนองสูง ค่าความหน่วงจึงมีผลต่อผลการแข่งขัน

#### 3. ประโยคเปรียบเทียบ (Comparative)
```
[A] + มากกว่า/น้อยกว่า/สูงกว่า/ต่ำกว่า + [B]
[A] + เมื่อเทียบกับ/เปรียบเทียบกับ + [B]
```
- ค่า frametime ของกลุ่มทดลอง**ต่ำกว่า**กลุ่มควบคุมอย่างมีนัยสำคัญทางสถิติ
- ผลลัพธ์ของโปรไฟล์ COMPETITIVE **เมื่อเทียบกับ** baseline แสดงให้เห็นว่า...

#### 4. ประโยคอ้างอิง (Citation-integrated)
```
[ผู้แต่ง] ([ปี]) + [กริยารายงาน] + ว่า + [เนื้อหา]     ← narrative
[เนื้อหา] + ([ผู้แต่ง], [ปี])                              ← parenthetical
```
- สมชาย (2566) **กล่าวว่า**การปรับแต่ง Windows สามารถลดค่า latency ได้
- การลดค่า latency มีผลต่อประสิทธิภาพการเล่นเกม (Smith, 2023)

**กริยารายงาน (reporting verbs) ที่ใช้ในงานวิชาการ:**

| กลุ่ม | คำกริยา |
|------|--------|
| นำเสนอ | กล่าวว่า, รายงานว่า, ระบุว่า, นำเสนอว่า, แสดงให้เห็นว่า |
| วิเคราะห์ | วิเคราะห์, ศึกษา, ตรวจสอบ, สำรวจ, ค้นคว้า |
| สรุป | สรุปว่า, ชี้ให้เห็นว่า, ยืนยันว่า, เสนอว่า |
| โต้แย้ง | โต้แย้งว่า, ตั้งคำถามว่า, วิพากษ์ว่า |
| ค้นพบ | พบว่า, ค้นพบว่า, เผยว่า, บ่งชี้ว่า |

#### 5. ประโยคนิยาม (Definition)
```
[คำศัพท์] + หมายถึง/คือ/หมายความว่า + [คำนิยาม]
[คำศัพท์] + เป็น + [การจัดหมวดหมู่] + ที่ + [คุณสมบัติ]
```
- ค่าความหน่วง (latency) **หมายถึง**ระยะเวลาที่ข้อมูลใช้ในการเดินทางจากจุดหนึ่งไปยังอีกจุดหนึ่ง
- เกมยิงมุมมองบุคคลที่หนึ่ง (FPS) **เป็น**ประเภทเกม**ที่**ผู้เล่นต้องอาศัยความเร็วในการตอบสนอง

#### 6. ประโยคแสดงวัตถุประสงค์ (Purpose/Objective)
```
เพื่อ + [กริยา] + [สิ่งที่ต้องการ]
มีวัตถุประสงค์ + เพื่อ + [กริยา]
โดยมีเป้าหมาย + เพื่อ + [กริยา]
```
- **เพื่อ**พัฒนาซอฟต์แวร์ปรับแต่งระบบปฏิบัติการ Windows
- งานวิจัยนี้**มีวัตถุประสงค์เพื่อ**ศึกษาผลกระทบของการปรับแต่ง Windows

#### 7. ประโยคแสดงขอบเขต (Scope)
```
งานวิจัยนี้ + มุ่งเน้น/จำกัดขอบเขต + [ขอบเขต]
การศึกษาครั้งนี้ + ครอบคลุม/ไม่ครอบคลุม + [สิ่งที่รวม/ไม่รวม]
```
- งานวิจัยนี้**มุ่งเน้น**การปรับแต่งระดับ OS เท่านั้น ไม่รวมการปรับแต่งระดับ hardware
- การศึกษาครั้งนี้**ครอบคลุม**ระบบปฏิบัติการ Windows 10 และ 11

#### 8. ประโยคแสดงสมมติฐาน (Hypothesis)
```
H[n]: [ตัวแปรต้น] + มี/ส่งผล/ทำให้ + [ตัวแปรตาม] + อย่างมีนัยสำคัญทางสถิติ
```
- H1: ผู้เล่นที่ใช้โปรไฟล์ COMPETITIVE **มี**ค่า frametime **ต่ำกว่า**กลุ่ม baseline อย่างมีนัยสำคัญทางสถิติ (α = 0.05)

#### 9. ประโยคเชื่อมโยงระหว่างย่อหน้า (Transitional)
```
จากที่กล่าวมาข้างต้น / ดังที่ได้กล่าวไว้ / ในส่วนถัดไป
ทั้งนี้ / อย่างไรก็ตาม / กล่าวอีกนัยหนึ่ง
```

> ⚠️ **หลีกเลี่ยง:** ใช้ "นอกจากนี้" ทุกย่อหน้า (AI pattern), ใช้ "ยิ่งไปกว่านั้น" ซ้ำ, เปิดย่อหน้าด้วยรูปแบบเดิมซ้ำๆ

#### 10. ประโยคสรุป (Conclusion)
```
ผลการศึกษา + แสดงให้เห็นว่า/บ่งชี้ว่า/ยืนยันว่า + [สรุป]
จากผลการวิจัย + สามารถสรุปได้ว่า + [สรุป]
```

> ⚠️ **หลีกเลี่ยง:** "ซึ่งจะเป็นประโยชน์ต่อไปในอนาคต" (AI pattern — empty closer)

---

### Academic Register / ทะเบียนภาษาวิชาการ

The system enforces Thai academic register through `analyzeRegister()`:

#### สรรพนาม (Pronouns)

| ❌ ห้ามใช้ | ✅ ใช้แทน |
|-----------|----------|
| ผม, ฉัน, ดิฉัน | ผู้วิจัย, ผู้ศึกษา |
| เรา | ผู้วิจัยและคณะ |
| คุณ, ท่าน (ถามผู้อ่าน) | ผู้อ่าน, ผู้ใช้งาน |
| เขา, เธอ (กล่าวถึงผู้แต่ง) | [ชื่อผู้แต่ง], ผู้วิจัย (ของงานนั้น) |

#### ระดับภาษา (Register Levels)

| Register | ใช้ใน | ตัวอย่าง |
|----------|-------|---------|
| ทางการสูง | บทคัดย่อ, คำนำ | "มีวัตถุประสงค์เพื่อ", "ดำเนินการศึกษา" |
| ทางการ | เนื้อหาบท 1-5 | "ทำการทดสอบ", "พบว่า" |
| กึ่งทางการ | อภิปรายผล | "ผลลัพธ์ชี้ให้เห็นว่า" |
| ❌ ภาษาพูด | ห้ามใช้ | "เจ๋ง", "โคตร", "แจ่ม" |
| ❌ ภาษาการตลาด | ห้ามใช้ | "ล้ำสมัย", "พลิกโฉม", "ปฏิวัติวงการ" |

#### คำเชื่อมต่อที่เหมาะสม (Appropriate Connectors)

| ประเภท | คำที่แนะนำ |
|--------|-----------|
| เพิ่มเติม | นอกจากนี้ (ใช้ไม่เกิน 1 ครั้ง/หน้า), รวมทั้ง, และ, ตลอดจน |
| ขัดแย้ง | อย่างไรก็ตาม, แต่, ในทางกลับกัน, ขณะที่ |
| เหตุผล | เนื่องจาก, เพราะ, ด้วยเหตุนี้, จึง, ดังนั้น |
| ลำดับ | ประการแรก...ประการที่สอง, ขั้นตอนแรก...ขั้นตอนถัดไป |
| ตัวอย่าง | ตัวอย่างเช่น, เช่น, กล่าวคือ, ได้แก่ |

---

### Thai Typography Rules / กฎการพิมพ์ไทย

Checked by `checkThaiTypography()` — 5 rule categories:

| Rule | ✅ Correct | ❌ Wrong |
|------|-----------|---------|
| เว้นวรรค before ๆ | ทำเรื่อย ๆ | ทำเรื่อยๆ |
| No space between Thai words | ข้อมูล | ข้อ มูล |
| Space between Thai-English | ระบบ Windows | ระบบWindows |
| Thai numerals vs Arabic | Use Arabic in academic text | — |
| No period in Thai | จบด้วยข้อความ | จบด้วยข้อความ. |

> **Extension:** Add new typography rules in `thai-text.ts` → `checkThaiTypography()`. Each rule is a regex + description + fix suggestion.

---

### De-AI Pattern Framework (30 Patterns)

The full 30-pattern catalog used by `thai_deai` tool and `thai-de-ai` skill:

#### Category A: Content Patterns (P1–P8)

| # | Pattern | Thai Example | Why it's AI |
|---|---------|-------------|------------|
| P1 | Significance inflation | ก้าวสำคัญ, นับเป็นสิ่งสำคัญยิ่ง | AI overvalues importance |
| P2 | Promotional language | พลิกโฉม, ปฏิวัติวงการ | Marketing tone |
| P3 | Universal claims | ครอบคลุมทุกมิติ, ครบถ้วนสมบูรณ์ | Overgeneralization |
| P4 | Future benefit | จะเป็นประโยชน์ต่อไปในอนาคต | Vague optimistic closer |
| P5 | Cutting-edge | ล้ำสมัย, ทันสมัย, เทคโนโลยีขั้นสูง | Generic modernity claim |
| P6 | Efficiency praise | มีประสิทธิภาพสูง, ประสิทธิผลเป็นเลิศ | Unsupported quality claim |
| P7 | Completeness claim | ครบวงจร, ทุกขั้นตอน | Absolute completeness |
| P8 | Impact exaggeration | ส่งผลกระทบอย่างใหญ่หลวง | Inflated impact |

#### Category B: Language/Style Patterns (P9–P18)

| # | Pattern | Description |
|---|---------|-------------|
| P9 | Repetitive connectors | "นอกจากนี้" opening every paragraph |
| P10 | Parallel structure abuse | Same sentence structure 3+ times in a row |
| P11 | Synonym cycling | Rotating near-synonyms unnaturally |
| P12 | List inflation | Adding items to lists for length, not meaning |
| P13 | Hedge stacking | "อาจจะเป็นไปได้ว่า" — triple hedging |
| P14 | Generic transitions | Always using "ยิ่งไปกว่านั้น" between ideas |
| P15 | Conclusion echo | Restating the intro verbatim in the conclusion |
| P16 | Filler phrases | "ในยุคปัจจุบัน", "ในโลกยุคดิจิทัล" |
| P17 | Uniform sentence length | All sentences within 5 words of each other |
| P18 | Vocabulary monotony | Low word-frequency entropy |

#### Category C: Chatbot Artifacts (P19–P21)

| # | Pattern | Example |
|---|---------|---------|
| P19 | Service language | "ขอให้โชคดีครับ", "ยินดีช่วยเหลือ" |
| P20 | Self-referencing | "ในฐานะ AI", "ตามที่ได้รับคำสั่ง" |
| P21 | Meta-commentary | "ข้อความข้างต้นแสดงให้เห็นว่า" (commenting on its own output) |

#### Category D: Filler/Hedging (P22–P24)

| # | Pattern | Example |
|---|---------|---------|
| P22 | Empty adverbs | "อย่างแท้จริง", "อย่างยิ่งยวด" |
| P23 | Unnecessary qualifiers | "ค่อนข้าง", "เกือบจะ" (when data is clear) |
| P24 | Weak closers | "ซึ่งเป็นสิ่งที่น่าสนใจ" — says nothing |

#### Category E: Structural Tells (P25–P30)

| # | Pattern | Detection method |
|---|---------|-----------------|
| P25 | Uniform paragraph length | All paragraphs ±20% of mean length |
| P26 | Low burstiness | CV < 30 for sentence lengths |
| P27 | Predictable structure | Intro→Point→Evidence→Conclusion in every ¶ |
| P28 | Missing voice | No opinion, no argument, only description |
| P29 | Mechanical enumeration | "ประการที่หนึ่ง...ประการที่สอง" in every section |
| P30 | Template artifacts | Repeated structural scaffolding across chapters |

#### Burstiness Measurement

```
CV (Coefficient of Variation) = (StdDev of sentence lengths / Mean) × 100

CV ≥ 30  → Human-like writing ✅
CV < 30  → Likely AI-generated ❌
```

Additional checks: paragraph length variation, word frequency entropy.

> **Extension:** Add patterns to `THAI_BANNED_PATTERNS` array in `thai-text.ts`. Each entry needs: `{regex, description, category, replacement}`.

---

## Extension & Development Guide

### Quick Reference: Where to Edit

| I want to... | Edit this file |
|--------------|---------------|
| Add university profile | `config/university.yaml` + `thai-text.ts` |
| Add banned AI pattern | `mcp-server/src/utils/thai-text.ts` |
| Add citation source type | `mcp-server/src/utils/citation.ts` |
| Add MCP tool | `mcp-server/src/server.ts` (schema + handler) |
| Add skill | `skills/<name>/SKILL.md` |
| Add command | `commands/<name>.md` |
| Add resource | `server.ts` resource handlers |
| Add ISO document type | `server.ts` + `templates/iso/` |
| Change scoring rubric | `server.ts` → `thesis_score` handler |
| Change quality gate | `server.ts` → `thesis_audit` handler |

### Adding a New MCP Tool (step-by-step)

1. **Define schema** in `ListToolsRequestSchema` handler in `server.ts`
2. **Add case** in `CallToolRequestSchema` handler
3. **Implement logic** in `src/utils/` (new file or existing)
4. **Run** `npm run typecheck`
5. **Test** via MCP client tool call

### Development Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features including:
- **Short-term (v1.1):** More university profiles, improved patterns, test suite
- **Mid-term (v1.5):** Thai spell checker tool, server.ts refactoring, CI/CD
- **Long-term (v2.0):** Plugin system, GUI dashboard, Word/PDF export

### Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the 3-layer system design (UI → Knowledge → Processing).

---

## See Also

| Document | Content |
|----------|---------|
| [SKILLS-GUIDE.md](SKILLS-GUIDE.md) | Detailed documentation of each skill |
| [WORKFLOW.md](WORKFLOW.md) | 7 pipeline diagrams (A–G) |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 3-layer system architecture |
| [EXAMPLES.md](EXAMPLES.md) | Real outputs from thesis project |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute |
| [ROADMAP.md](ROADMAP.md) | Future development plans |
| [GETTING-STARTED.md](GETTING-STARTED.md) | Installation & first steps |
