# Workshop: เขียนวิทยานิพนธ์ด้วย MCP Thai Thesis

> คู่มือ workshop แบบละเอียด สอนทำทีละขั้นตอน ตั้งแต่ติดตั้งจนส่งวิทยานิพนธ์

---

## ภาพรวม Workshop

Workshop นี้จะสอนคุณ **ทุกอย่างที่จำเป็น** เพื่อเขียนวิทยานิพนธ์ฉบับสมบูรณ์:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WORKFLOW 10 ขั้นตอน                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  1. Setup        → ตั้งค่า OpenCode + MCP Server                     │
│  2. Init        → สร้างโปรเจควิทยานิพนธ์                           │
│  3. Chapter     → เขียนแต่ละบท                                     │
│  4. De-AI       → ลบ AI patterns                                    │
│  5. Citation    → จัดการอ้างอิง                                     │
│  6. Review      → ตรวจคุณภาพ                                        │
│  7. ISO         → สร้างเอกสาร ISO 29110                            │
│  8. Consistency → ตรวจความสอดคล้อง                                  │
│  9. Audit       → ตรวจรวบยอด                                        │
│  10. Final      → Check ก่อนส่ง                                     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## สิ่งที่คุณจะได้เรียนรู้

### เครื่องมือทั้งหมดที่จะใช้

| ประเภท | เครื่องมือ | หน้าที่ |
|---------|------------|----------|
| **MCP Tools** | `thai_thesis_init` | สร้างโปรเจค |
| | `thai_thesis_chapter` | เขียน/แก้ไขบท |
| | `thai_deai` | ตรวจ/ลบ AI patterns |
| | `thai_citation` | จัดการอ้างอิง |
| | `thai_format` | จัดรูปแบบ |
| | `thesis_review` | ตรวจคุณภาพ |
| | `thesis_score` | ให้คะแนน |
| | `thesis_consistency` | ตรวจความสอดคล้อง |
| | `thesis_audit` | ตรวจรวบยอด |
| | `iso_document` | สร้าง ISO เอกสาร |
| **Paper Search** | `search_semantic` | ค้นหาอ้างอิง |
| | `get_crossref_paper_by_doi` | ดึงข้อมูลจาก DOI |
| | `download_semantic` | ดาวน์โหลด PDF |

### Skills ที่จะโหลด

| Skill | ใช้ตอน |
|-------|---------|
| `thai-thesis-writing` | เขียนบท |
| `thai-de-ai` | ลบ AI patterns |
| `thai-citation-manager` | จัดการอ้างอิง |
| `iso29110-docs` | สร้าง ISO |
| `thesis-quality-gate` | ตรวจคุณภาพ |

### Commands ที่จะใช้

| Command | หน้าที่ |
|---------|--------|
| `/thesis-init` | สร้างโปรเจค |
| `/thesis-chapter` | เขียนบท |
| `/thesis-deai` | ลบ AI patterns |
| `/thesis-review` | ตรวจคุณภาพ |
| `/thesis-score` | ให้คะแนน |
| `/thesis-audit` | ตรวจรวบยอด |
| `/iso-docs` | สร้าง ISO |

---

## ก่อนเริ่ม Workshop

### สิ่งที่ต้องมี

1. **OpenCode** ติดตั้งแล้ว
2. **Node.js** >= 18.0.0
3. **MCP Server** ถูกตั้งค่าใน `opencode.json`
4. **ข้อมูลวิทยานิพนธ์**:
   - ชื่อวิทยานิพนธ์ (ไทย + อังกฤษ)
   - ชื่อนักศึกษา
   - ชื่ออาจารย์ที่ปรึกษา
   - มหาวิทยาลัย
   - ระดับปริญญา
   - สาขาวิชา
   - ข้อมูลโครงการ (project specs)
   - ข้อมูลการวิจัย (experiments, data)

### ทำความเข้าใจระบบก่อน

```
┌─────────────────────────────────────────────────────────────────────┐
│                    3-LAYER SYSTEM                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   Layer 1: Skills                                                     │
│   └─ กฎและ workflow สำหรับงาน                                     │
│       → โหลดเมื่อต้องการทำงานเฉพาะทาง                              │
│                                                                       │
│   Layer 2: Commands                                                  │
│   └─ Slash commands สำหรับเรียกใช้ workflow                        │
│       → /thesis-*, /iso-docs                                          │
│                                                                       │
│   Layer 3: MCP Tools                                                 │
│   └─ เครื่องมือประมวลผลจริง                                         │
│       → thai_deai, thai_citation, thesis_score, etc.                │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Workshop Modules

### Module 1: Setup
📁 `07-workshop/01-setup.md`  
⚙️ ตั้งค่า OpenCode + MCP Server

### Module 2: Init Project  
📁 `07-workshop/02-init-project.md`  
📋 สร้างโปรเจควิทยานิพนธ์

### Module 3: Chapter Writing
📁 `07-workshop/03-chapter-writing.md`  
✏️ เขียนแต่ละบท

### Module 4: De-AI Check
📁 `07-workshop/04-deai-check.md`  
🤖 ลบ AI Writing Patterns

### Module 5: Citation
📁 `07-workshop/05-citation.md`  
📚 จัดการอ้างอิง APA นาม-ปี

### Module 6: Review & Score
📁 `07-workshop/06-review-score.md`  
✅ ตรวจคุณภาพ + ให้คะแนน

### Module 7: ISO Docs
📁 `07-workshop/07-iso-docs.md`  
📄 สร้างเอกสาร ISO 29110

### Module 8: Consistency
📁 `07-workshop/08-consistency.md`  
🔗 ตรวจความสอดคล้องข้ามเอกสาร

### Module 9: Audit
📁 `07-workshop/09-audit.md`  
🔍 ตรวจรวบยอด 8-Gate

### Module 10: Final Check
📁 `07-workshop/10-final-check.md`  
🎯 Check ก่อนส่งวิทยานิพนธ์

---

## หลักการสำคัญที่จะใช้ตลอด Workshop

### 1. Waterfall Model ต่อบท
```
เขียน → De-AI → Review → Rewrite → Score → ต่อบทถัดไป
```

### 2. De-AI ก่อน Review
- รัน De-AI scan เสมอ ก่อนส่งให้ advisor review
- แก้ไข banned patterns ก่อน

### 3. [CITATION NEEDED]
- ห้ามสมมติอ้างอิง
- ใช้ [CITATION NEEDED] แล้วค้นหาทีหลัง

### 4. CV >= 30%
- ค่า Coefficient of Variation ของความยาวประโยค
- < 30% = likely AI, >= 30% = human-like

### 5. APA นาม-ปี พ.ศ.
- รูปแบบ: (ผู้แต่ง, พ.ศ.)
- ระบบปี: พ.ศ. (เช่น 2566)

---

## Quick Start

ถ้ารีบ ให้ไปที่:

1. **`07-workshop/01-setup.md`** → ตั้งค่าระบบ
2. **`07-workshop/02-init-project.md`** → สร้างโปรเจค
3. **`07-workshop/03-chapter-writing.md`** → เขียนบท
4. **`07-workshop/04-deai-check.md`** → ลบ AI patterns
5. **`07-workshop/10-final-check.md`** → Check ก่อนส่ง

---

## Reference Documents

ถ้าต้องการอ่านเพิ่ม:

- **`02-concepts/SESSION-WORKFLOW.md`** → ภาพรวมระบบ
- **`03-tools/MCP-TOOLS.md`** → รายละเอียดเครื่องมือ
- **`06-best-practices/BEST-PRACTICES.md`** → แนวปฏิบัติ
- **`05-prompts/PROMPTS.md`** → แม่แบบ Prompt

---

**เริ่มต้นที่:** `07-workshop/01-setup.md`

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
