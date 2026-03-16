# Skills Guide | คู่มือ Skills

> คำแนะนำการใช้งาน AI Skills ทั้ง 7 ตัวที่ช่วยเขียนวิทยานิพนธ์ไทย
> Guide to the 7 AI skills that power Thai thesis writing workflows.

Skills คือไฟล์คำสั่ง Markdown ที่สอน AI agent ให้ทำงานเฉพาะด้าน เช่น เขียนร้อยแก้ว ตรวจ citation หรือลบลายนิ้วมือ AI ออกจากข้อความ

Skills are Markdown instruction files that teach AI agents domain-specific behaviors — writing prose, checking citations, or removing AI fingerprints from text.

---

## สารบัญ | Table of Contents

| # | Skill | หน้าที่หลัก | Lines |
|---|-------|------------|-------|
| 1 | [thai-thesis-writing](#1-thai-thesis-writing) | เขียนวิทยานิพนธ์ครบวงจร | 625 |
| 2 | [documentation-writer](#2-documentation-writer) | ร้อยแก้วระดับวิชาการ + de-AI framework | 1,235 |
| 3 | [thesis-orchestrator](#3-thesis-orchestrator) | ประสานงาน agent หลายตัว | 356 |
| 4 | [iso29110-docs](#4-iso29110-docs) | เอกสาร ISO 29110 สองภาษา | 425 |
| 5 | [thai-de-ai](#5-thai-de-ai) | ลบลายนิ้วมือ AI | 326 |
| 6 | [thai-citation-manager](#6-thai-citation-manager) | จัดการ APA นาม-ปี | 309 |
| 7 | [thesis-quality-gate](#7-thesis-quality-gate) | ตรวจคุณภาพ 8 ด่าน | 264 |

---

## 1. thai-thesis-writing

**ไฟล์:** `skills/thai-thesis-writing/SKILL.md` (625 บรรทัด)
**หน้าที่:** Skill หลักสำหรับเขียนวิทยานิพนธ์ตั้งแต่วางแผนบทจนถึงส่งงาน

### ความสามารถหลัก

- รองรับทั้งแบบ 5 บท (มาตรฐาน) และ 7 บท (วิศวกรรมซอฟต์แวร์)
- วางแผนแต่ละบท: เป้าหมาย → หัวข้อย่อย → แผนที่หลักฐาน → ร่าง → ทำให้เป็นมาตรฐาน → de-AI
- 10 ขั้นตอนการทำงาน ตั้งแต่ Research Init ถึง Formatting
- นโยบาย register ภาษาไทยวิชาการ: ใช้ "ผู้วิจัย" แทนสรรพนามบุรุษที่ 1
- เชื่อมต่อกับ citation manager และ ISO 29110

### ทำงานร่วมกับ MCP Tools

```
thai_thesis_init  → เริ่มต้นโปรเจกต์ใหม่
thai_thesis_chapter → สร้าง/แก้ไขบท
thai_format → จัดรูปแบบตามมหาวิทยาลัย
thesis_score → ให้คะแนนเร็ว 6 มิติ
```

### เหมาะสำหรับ

- เริ่มเขียนวิทยานิพนธ์ใหม่
- วางแผนโครงสร้างบท
- ร่างเนื้อหาบทที่ 1-5 (หรือ 1-7)

---

## 2. documentation-writer

**ไฟล์:** `skills/documentation-writer/SKILL.md` (1,235 บรรทัด)
**หน้าที่:** Skill ใหญ่ที่สุด — เขียนร้อยแก้วไทย/อังกฤษระดับวิชาการ และเป็นแหล่ง 30-Pattern De-AI Framework

### ความสามารถหลัก

- **30-Pattern Anti-AI Framework** — ตรวจจับลายเขียน AI 5 หมวด:
  - A (P1-P8): Content patterns — สรรเสริญเกินจริง, ภาษาการตลาด
  - B (P9-P18): Language/style — parallel structure ซ้ำ, synonym cycling
  - C (P19-P21): Chatbot artifacts — ภาษาพนักงานบริการ
  - D (P22-P24): Filler/hedging — คำเติมเต็มว่างเปล่า
  - E (P25-P30): Structural tells — ความยาวประโยคสม่ำเสมอเกินไป
- **English banned words** — 3 ระดับ (เช่น "delve" ใช้เกิน 700x, "tapestry" 500x)
- **Thai banned patterns** — 10 หมวดย่อย (เช่น "ก้าวสำคัญ", "พลิกโฉม", "ล้ำสมัย")
- **13 writing workflows** — polish, translate, de-AI, condense, expand, logic check, etc.
- **Thai typography rules** — เว้นวรรค, ไม้ยมก, ตัวเลข, ฟอนต์

### ทำงานร่วมกับ MCP Tools

```
thai_deai → ลบลายนิ้วมือ AI อัตโนมัติ
thai_citation → จัดการ citation
thai_format → จัดรูปแบบ
iso_document → สร้างเอกสาร ISO
```

### เหมาะสำหรับ

- ขัดเกลาร้อยแก้วภาษาไทย/อังกฤษ
- แปลไทย↔อังกฤษ ในบริบทวิชาการ
- ลบลายนิ้วมือ AI จากข้อความ
- เขียนเอกสาร ISO 29110

---

## 3. thesis-orchestrator

**ไฟล์:** `skills/thesis-orchestrator/SKILL.md` (356 บรรทัด)
**หน้าที่:** ประสานงานระหว่าง agent และ skill หลายตัว — ไม่เขียนเนื้อหาเอง

### ความสามารถหลัก

- **7 Execution Patterns (A-G):**
  - A: Chapter Review (audit → review → edit → review → synthesize)
  - B: Chapter Write (write → review → iterate if <70 → deliver)
  - C: Chapter Rewrite (baseline → rewrite → rescore → deliver with delta)
  - D: Full Thesis Audit (parallel review → quality-gate → synthesize)
  - E: Submission Readiness Check (quality-gate → parallel checks → dashboard)
  - F: Software Feature Development (explore → code → test → document)
  - G: Research and Literature Review (write → review → iterate)
- **6 Task Types:** micro-task, sequential pipeline, parallel fan-out, iterative refinement, research+write, software dev
- **Synthesis Rules:** priority ordering, deduplication, conflict resolution authority

### Agent Routing

```
thesis-reviewer → โครงสร้าง, citation, ISO, ตัวเลข
documentation-writer → ร้อยแก้วไทย, register
dev → โค้ด, engineering
```

### เหมาะสำหรับ

- งานที่ต้องใช้หลาย agent ร่วมกัน
- ตรวจวิทยานิพนธ์ทั้งเล่ม
- เตรียมส่งงาน (submission readiness)

---

## 4. iso29110-docs

**ไฟล์:** `skills/iso29110-docs/SKILL.md` (425 บรรทัด)
**หน้าที่:** สร้างและดูแลชุดเอกสาร ISO/IEC 29110 สำหรับโปรเจกต์ซอฟต์แวร์ในวิทยานิพนธ์

### ความสามารถหลัก

- **10 Baseline Documents:**
  1. Project Plan
  2. Software Requirements Specification (SRS)
  3. Software Design Description (SDD)
  4. Test Plan
  5. Test Record
  6. Traceability Record
  7. Change Request
  8. Progress Status Record
  9. Configuration Management Plan
  10. User Manual
- **Bilingual policy** — 3 โหมด: Thai, English, Bilingual
- **Version management** — 8 metadata fields, 4 status values
- **Cross-reference validation** — 5 มิติ (requirements→design→test→implementation→release)
- **Thesis integration map** — แมพเอกสาร ISO กับบทวิทยานิพนธ์

### แมพ ISO → บทวิทยานิพนธ์

```
Project Plan        → บทที่ 1 (บทนำ)
SRS + Traceability  → บทที่ 2 (ทบทวนวรรณกรรม)
SDD + Config + CR   → บทที่ 3 (ระเบียบวิธี)
Test Plan + Record  → บทที่ 4 (ผลการทดลอง)
Progress + Manual   → บทที่ 5 (สรุป)
```

### เหมาะสำหรับ

- วิทยานิพนธ์สายวิศวกรรมซอฟต์แวร์ที่ต้องใช้ ISO 29110
- สร้างเอกสาร ISO ชุดใหม่
- ตรวจสอบ cross-reference ระหว่างเอกสาร

---

## 5. thai-de-ai

**ไฟล์:** `skills/thai-de-ai/SKILL.md` (326 บรรทัด)
**หน้าที่:** ตรวจจับและกำจัดลายเขียน AI ออกจากข้อความไทยและอังกฤษ

### ความสามารถหลัก

- **3 โหมด:**
  - `scan` — วินิจฉัยอย่างเดียว ไม่แก้ไข
  - `edit` — แก้ไขระดับประโยค ทำเครื่องหมายจุดที่แก้
  - `rewrite` — เขียนใหม่ทั้งย่อหน้า พร้อมเหตุผล
- **Thai-specific checklist** — 6 หมวด:
  1. ภาษาสรรเสริญเกินจริง (เช่น "ก้าวสำคัญ")
  2. น้ำเสียงการตลาด (เช่น "พลิกโฉม")
  3. คำเติมเต็มว่างเปล่า (เช่น "ในยุคปัจจุบัน")
  4. เปิดย่อหน้าซ้ำรูปแบบ (เช่น "นอกจากนี้" ทุกย่อหน้า)
  5. ภาษาอ้อมค้อมเกินไป
  6. ลงท้ายย่อหน้าแบบสรุปซ้ำ
- **Burstiness control** — CV > 30% ต่อย่อหน้า, ห้ามประโยคยาวเท่ากัน 3+ ติดกัน
- **Soul injection** — 10 เทคนิคคืนความเป็นมนุษย์ให้ข้อความ

### ทำงานร่วมกับ MCP Tools

```
thai_deai → ตรวจจับอัตโนมัติด้วย 30 patterns
            + วัด burstiness
            + สแกน banned patterns ไทย
```

### เหมาะสำหรับ

- ตรวจร่างวิทยานิพนธ์ก่อนส่งอาจารย์
- แก้ไขข้อความที่ถูกตั้งค่าสถานะว่าเป็น AI
- ปรับปรุงความเป็นธรรมชาติของร้อยแก้ว

---

## 6. thai-citation-manager

**ไฟล์:** `skills/thai-citation-manager/SKILL.md` (309 บรรทัด)
**หน้าที่:** จัดการ citation แบบ APA นาม-ปี สำหรับวิทยานิพนธ์ไทย

### ความสามารถหลัก

- **รูปแบบ citation:**
  - Narrative: `สมชาย (2566)` / `Smith (2023)`
  - Parenthetical: `(สมชาย, 2566)` / `(Smith, 2023)`
  - ผู้แต่ง 3+ คน: `สมชาย และคณะ (2566)` / `Smith et al. (2023)`
- **ระบบปี:** พ.ศ. (default) หรือ ค.ศ. ตามมหาวิทยาลัย
- **3 โหมดทำงาน:**
  - `cite` — สร้าง in-text citation
  - `bibliography` — สร้างบรรณานุกรม (ไทยก่อน, อังกฤษตาม)
  - `audit` — ตรวจสอบ citation ↔ bibliography ให้ตรงกัน
- **5-level decision priority:** คู่มือมหาวิทยาลัย > คู่มือภาควิชา > config โปรเจกต์ > baseline > `[VERIFY REQUIRED]`

### ทำงานร่วมกับ MCP Tools

```
thai_citation → cite, bibliography, audit, validate
```

### เหมาะสำหรับ

- สร้าง citation ในเนื้อหาวิทยานิพนธ์
- สร้างหน้าบรรณานุกรม
- ตรวจสอบว่า citation ทุกตัวมีอยู่ในบรรณานุกรม

---

## 7. thesis-quality-gate

**ไฟล์:** `skills/thesis-quality-gate/SKILL.md` (264 บรรทัด)
**หน้าที่:** ตรวจสอบความพร้อมก่อนส่งวิทยานิพนธ์ด้วย 8 ด่านคุณภาพ

### 8 ด่านคุณภาพ (Quality Gates)

| Gate | ชื่อ | เกณฑ์ผ่าน |
|------|------|----------|
| 1 | Structural Completeness | มีทุกส่วนประกอบ (14 รายการ + 5 สำหรับ SE) |
| 2 | Content Quality | คะแนนรายบท >= 60, เฉลี่ย >= 70, ไม่มี [TBD] |
| 3 | Citation Integrity | citation ↔ bibliography ตรงกัน, >= 5 ต่อบท |
| 4 | Thai Language Quality | register ถูกต้อง, ไม่มีภาษาการตลาด |
| 5 | De-AI Compliance | ทุกบท >= 7/10, ไม่มี High AI-signal |
| 6 | Data Consistency | ตัวเลขตรงกันข้ามเอกสาร |
| 7 | Formatting Compliance | ตรงตาม template มหาวิทยาลัย |
| 8 | ISO 29110 Compliance | 10 เอกสารครบ (เฉพาะวิทยานิพนธ์ SE) |

### 2 โหมดตรวจ

- **Quick Check** (5 นาที) — สแกนเร็ว 8 ด่าน
- **Full Check** (30-60 นาที) — ตรวจละเอียดด้วย tools เฉพาะแต่ละด่าน

### ลำดับแก้ไขที่แนะนำ

```
1. Data Consistency (Gate 6) — แก้ตัวเลขก่อน
2. Content Gaps (Gate 2) — เติมเนื้อหาที่ขาด
3. De-AI (Gate 5) — ลบลายนิ้วมือ AI
4. Citations (Gate 3) — จัดการ citation
5. Language (Gate 4) — ขัดเกลาภาษา
6. Formatting (Gate 7) — จัดรูปแบบสุดท้าย
```

### เหมาะสำหรับ

- ตรวจวิทยานิพนธ์ก่อนส่งอาจารย์ที่ปรึกษา
- ตรวจก่อนสอบป้องกัน
- ติดตามความคืบหน้าระหว่างเขียน

---

## Skill Interaction Map | แผนผังความสัมพันธ์

```
                    thesis-orchestrator
                    (ประสานงาน, ไม่เขียนเอง)
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
     thai-thesis-writing   │    thesis-quality-gate
     (วางแผน+ร่างบท)       │    (ตรวจ 8 ด่าน)
              │            │            │
              ▼            ▼            ▼
     documentation-writer ◄──► thai-de-ai
     (ร้อยแก้ว+30 patterns)   (ลบลาย AI)
              │
       ┌──────┴──────┐
       ▼             ▼
thai-citation    iso29110-docs
-manager         (เอกสาร ISO)
(APA นาม-ปี)
```

**ลำดับการทำงานทั่วไป:**
1. `thai-thesis-writing` วางแผนและร่างบท
2. `documentation-writer` ขัดเกลาร้อยแก้ว
3. `thai-citation-manager` จัดการ citation
4. `thai-de-ai` ตรวจ + ลบลายนิ้วมือ AI
5. `iso29110-docs` สร้างเอกสาร ISO (ถ้าต้องการ)
6. `thesis-quality-gate` ตรวจคุณภาพรวม

---

## วิธีโหลด Skill | How to Load a Skill

ใน OpenCode ให้เรียก skill ผ่าน slash command ที่เกี่ยวข้อง:

```bash
/thesis-init      → โหลด thai-thesis-writing
/thesis-chapter   → โหลด thai-thesis-writing + documentation-writer
/thesis-deai      → โหลด thai-de-ai
/thesis-review    → โหลด thesis-quality-gate
/thesis-audit     → โหลด thesis-quality-gate + thesis-orchestrator
/iso-docs         → โหลด iso29110-docs
```

หรือโหลดตรงผ่าน skill tool:

```
skill: thai-thesis-writing
skill: documentation-writer
skill: thai-de-ai
```

---

## ดูเพิ่มเติม | See Also

- [CAPABILITIES.md](CAPABILITIES.md) — รายการ tools, skills, commands, resources ทั้งหมด
- [WORKFLOW.md](WORKFLOW.md) — 7 pipelines (A-G) ที่ orchestrator ใช้
- [ARCHITECTURE.md](ARCHITECTURE.md) — สถาปัตยกรรม 3 ชั้น
- [EXAMPLES.md](EXAMPLES.md) — ตัวอย่างผลลัพธ์จริง
