# Docs Relationship Map / แผนผังความสัมพันธ์เอกสาร

> แผนผังแสดงความสัมพันธ์และลำดับการอ่านของเอกสารทั้งหมดในโฟลเดอร์ `docs/`

---

## Folder Structure Overview

```
docs/
├── 01-getting-started/     ← เริ่มต้นที่นี่
├── 02-concepts/            ← เข้าใจระบบ
├── 03-tools/               ← เครื่องมือทั้งหมด
├── 04-skills/              ← Skills
├── 05-prompts/             ← แม่แบบ Prompt
├── 06-best-practices/      ← แนวปฏิบัติ
├── 07-workshop/            ← สอนทำทีละขั้นตอน
├── 08-examples/            ← ตัวอย่าง
├── 09-reference/           ← อ้างอิง/แก้ปัญหา
└── 10-meta/                ← เกี่ยวกับโปรเจค
```

---

## Learning Path / ลำดับการเรียนรู้

### Path 1: เริ่มต้น → ลองใช้ (สำหรับมือใหม่)

```
1. 01-getting-started/
   └── GETTING-STARTED.md      → วิธีติดตั้ง
   └── QUICKSTART.md           → ลองใช้เร็ว

2. 02-concepts/
   └── SESSION-WORKFLOW.md     → เข้าใจระบบคร่าวๆ

3. 07-workshop/
   └── 01-setup.md             → เริ่มทำตาม

4. 07-workshop/
   └── 02-init-project.md      → สร้างโปรเจค
```

### Path 2: เข้าใจลึก → ใช้เป็น (สำหรับผู้ใช้ทั่วไป)

```
1. 02-concepts/
   └── ARCHITECTURE.md         → เข้าใจโครงสร้าง
   └── WORKFLOW.md             → เข้าใจ pipeline

2. 03-tools/
   └── MCP-TOOLS.md            → รู้จักเครื่องมือ
   └── PAPER-SEARCH.md         → วิธีค้นหาอ้างอิง

3. 04-skills/
   └── SKILLS-OVERVIEW.md      → รู้จัก skills
```

### Path 3: เขียนวิทยานิพนธ์จริง (สำหรับผู้ที่จะเขียนจริง)

```
1. 05-prompts/
   └── MASTER-PROMPT.md        → ต้นแบบ master prompt
   
2. 06-best-practices/
   └── BEST-PRACTICES.md       → แนวปฏิบัติที่ดี
   └── DE-AI-GUIDE.md          → วิธีลบ AI patterns

3. 07-workshop/
   └── 03-chapter-writing.md   → เขียนบท
   └── 04-deai-check.md        → ตรวจ De-AI
   └── 05-citation.md          → จัดการอ้างอิง
   └── 06-review-score.md      → ตรวจคุณภาพ
   └── 07-iso-docs.md          → สร้าง ISO
   └── 08-consistency.md       → ตรวจความสอดคล้อง
   └── 09-audit.md             → ตรวจรวบยอด
   └── 10-final-check.md       → Check ก่อนส่ง
```

### Path 4: อ้างอิงเพิ่มเติม (ตอนแก้ปัญหา)

```
1. 09-reference/
   └── TROUBLESHOOTING.md      → แก้ปัญหา
   └── OPENCODE-AGENTS.md      → ข้อมูล agents

2. 08-examples/
   └── CASE-STUDY.md           → ดูตัวอย่างจริง
```

---

## Document Relationships / ความสัมพันธ์ระหว่างเอกสาร

### Core Documents (เอกสารหลัก)

| เอกสาร | อธิบาย | เอกสารที่เกี่ยวข้อง |
|--------|--------|---------------------|
| `SESSION-WORKFLOW.md` | ภาพรวมการใช้งาน | `WORKFLOW.md`, `ARCHITECTURE.md` |
| `BEST-PRACTICES.md` | แนวปฏิบัติ | `DE-AI-GUIDE.md`, `CITATION-GUIDE.md` |
| `PROMPTS.md` | แม่แบบ prompt | `MASTER-PROMPT.md`, `CHAPTER-PROMPTS.md` |
| `WORKFLOW.md` | Pipeline แบบละเอียด | `SESSION-WORKFLOW.md` |

### Workshop Series (ชุด Workshop)

| ขั้นตอน | เอกสาร | เป้าหมาย |
|---------|--------|----------|
| 1 | `07-workshop/01-setup.md` | ตั้งค่า�ระบบ |
| 2 | `07-workshop/02-init-project.md` | สร้างโปรเจค |
| 3 | `07-workshop/03-chapter-writing.md` | เขียนบท |
| 4 | `07-workshop/04-deai-check.md` | ลบ AI patterns |
| 5 | `07-workshop/05-citation.md` | จัดการอ้างอิง |
| 6 | `07-workshop/06-review-score.md` | ตรวจคุณภาพ |
| 7 | `07-workshop/07-iso-docs.md` | สร้าง ISO |
| 8 | `07-workshop/08-consistency.md` | ตรวจความสอดคล้อง |
| 9 | `07-workshop/09-audit.md` | ตรวจรวบยอด |
| 10 | `07-workshop/10-final-check.md` | Check ก่อนส่ง |

---

## Tools → Skills → Workflow Mapping

### Tools ที่ใช้ในแต่ละขั้นตอน

```
Setup:        (ไม่มี tool เฉพาะ)

Init:         → thai_thesis_init
               → /thesis-init command

Chapter:      → thai_thesis_chapter
               → /thesis-chapter command
               → thai_format

De-AI:        → thai_deai
               → /thesis-deai command

Citation:     → thai_citation
               → paper-search-mcp_* (ค้นหา)
               → /thai_citation command

Review:       → thesis_review
               → thesis_score
               → /thesis-review command

ISO:          → iso_document
               → /iso-docs command

Consistency:  → thesis_consistency

Audit:        → thesis_audit
               → /thesis-audit command
```

### Skills ที่โหลดในแต่ละขั้นตอน

```
เขียนบท:         → thai-thesis-writing
ลบ AI patterns:  → thai-de-ai
จัดการอ้างอิง:   → thai-citation-manager
สร้าง ISO:       → iso29110-docs
ตรวจคุณภาพ:      → thesis-quality-gate
```

---

## Quick Reference / สรุปเร็ว

### ต้องการทำอะไร?

| ต้องการ | ไปที่ |
|---------|-------|
| ติดตั้งระบบ | `01-getting-started/GETTING-STARTED.md` |
| ลองใช้เร็ว | `01-getting-started/QUICKSTART.md` |
| เข้าใจระบบ | `02-concepts/SESSION-WORKFLOW.md` |
| ดู pipeline | `02-concepts/WORKFLOW.md` |
| ดูเครื่องมือ | `03-tools/MCP-TOOLS.md` |
| ดู skills | `04-skills/SKILLS-OVERVIEW.md` |
| หา prompt | `05-prompts/PROMPTS.md` |
| หา best practices | `06-best-practices/BEST-PRACTICES.md` |
| ทำตามทีละขั้น | `07-workshop/README.md` |
| แก้ปัญหา | `09-reference/TROUBLESHOOTING.md` |
| ดูตัวอย่าง | `08-examples/CASE-STUDY.md` |

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
