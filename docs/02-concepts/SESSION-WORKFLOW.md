# คู่มือการใช้งาน MCP Thai Thesis: การเขียนวิทยานิพนธ์แบบครบวงจร

> เอกสารนี้อธิบายวิธีการใช้งานระบบ MCP Thai Thesis สำหรับการเขียนวิทยานิพนธ์ตั้งแต่ต้นจนจบ
> สร้างจากประสบการณ์การทำงานจริงกับโครงการ ClutchG PC Optimizer

---

## 1. ภาพรวมระบบ (System Overview)

### 1.1 สามชั้นของระบบ

ระบบ MCP Thai Thesis ทำงานแบบ 3 ชั้นที่ประสานกัน:

```
┌─────────────────────────────────────────────────────────────────────┐
│                      1. Skills (ชั้นบนสุด)                          │
│   โหลดกฎและ workflow สำหรับงานเฉพาะ                               │
│   - thai-thesis-writing: เขียนวิทยานิพนธ์                           │
│   - thai-de-ai: ตรวจและลบ AI patterns                              │
│   - thai-citation-manager: จัดการ APA นาม-ปี                        │
│   - iso29110-docs: สร้างเอกสาร ISO 29110                           │
│   - thesis-quality-gate: ตรวจ 8-gate ก่อนส่ง                        │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   2. Commands (ชั้นกลาง)                             │
│   Slash commands สำหรับเรียกใช้ workflow                          │
│   - /thesis-init, /thesis-chapter, /thesis-deai                   │
│   - /thesis-review, /thesis-score, /thesis-audit                   │
│   - /thesis-format, /thesis-rewrite, /iso-docs                      │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                 3. MCP Tools (ชั้นประมวลผล)                          │
│   16 thesis tools + 5 paper search tools                            │
│   รันใน mcp-server (Node.js)                                        │
│   - thai_deai, thai_citation, thai_format                          │
│   - thesis_audit, thesis_score, thesis_consistency                 │
│   - iso_document, paper-search-mcp_*                                │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 วิธีข้อมูลไหลผ่านระบบ

```
ผู้ใช้ (เขียน prompt)
    │
    ▼
OpenCode CLI / Claude Desktop
    │
    ├── โหลด Skill ที่เกี่ยวข้อง (optional)
    │
    ├── เรียก Command (slash command)
    │       หรือ
    ├── เรียก MCP Tool โดยตรง
    │
    ▼
MCP Server (server.ts)
    │
    ├── Parse request
    ├── Call utility functions (pure functions)
    │
    ▼
JSON Response → แสดงผลให้ผู้ใช้
```

---

## 2. MCP Tools ทั้งหมด

### 2.1 Thesis Tools (16 ตัว)

| Tool | หน้าที่ | ตัวอย่างการใช้ |
|------|--------|----------------|
| `thai_thesis_init` | สร้างโปรเจคใหม่ | `university=chiangmai title="..." author="..."` |
| `thai_thesis_chapter` | เขียน/แก้ไขบท | `chapter=2 mode=generate` |
| `thai_deai` | ตรวจจับ AI patterns | `text="..." mode=detect language=both` |
| `thai_citation` | จัดการอ้างอิง | `action=cite source={...} year_system=phc` |
| `thai_format` | จัดรูปแบบมหาวิทยาลัย | `format_type=chapter university=chiangmai` |
| `iso_document` | สร้าง ISO 29110 | `document_type=srs language=bilingual` |
| `thesis_review` | ตรวจคุณภาพ | `perspective=advisor text="..."` |
| `thesis_audit` | ตรวจครบถ้วน | `scope=full` |
| `thesis_score` | ให้คะแนน 6 มิติ | `text="..." university=chiangmai` |
| `thesis_consistency` | ตรวจความสอดคล้อง | `documents=[...] check_types=[numbers]` |
| `thesis_traceability` | สร้าง traceability matrix | `requirements=[...]` |
| `win_opt_validate` | ตรวจสอบ tweak | `command_or_name="DiagTrack" tweak_type=service` |
| `win_opt_profile` | สร้างโปรไฟล์ | `profile=safe include_commands=true` |
| `win_opt_checklist` | สร้าง checklist | `language=bilingual` |
| `win_opt_service` | ตรวจสอบ service | `service_name=WSearch` |
| `win_opt_myth` | ตรวจสอบ myth | `tweak_name="Disable prefetcher"` |

### 2.2 Paper Search Tools (5 ตัว)

| Tool | หน้าที่ |
|------|--------|
| `search_semantic` | ค้นหาจาก Semantic Scholar |
| `search_google_scholar` | ค้นหาจาก Google Scholar |
| `search_arxiv` | ค้นหาจาก arXiv |
| `download_semantic` | ดาวน์โหลด PDF |
| `get_crossref_paper_by_doi` | ดึงข้อมูลจาก DOI |

---

## 3. Skills ที่มีอยู่

### 3.1 Skills หลัก (5 ตัว)

| Skill | ไฟล์ | หน้าที่ |
|-------|------|--------|
| `thai-thesis-writing` | `skills/thai-thesis-writing/SKILL.md` | End-to-end workflow, 10-stage, 5-7 บท model |
| `thai-de-ai` | `skills/thai-de-ai/SKILL.md` | 30-pattern framework, CV ≥ 30%, 3 โหมด |
| `thai-citation-manager` | `skills/thai-citation-manager/SKILL.md` | APA นาม-ปี, พ.ศ./ค.ศ., bibliography |
| `iso29110-docs` | `skills/iso29110-docs/SKILL.md` | 10 เอกสาร, bilingual, cross-ref validation |
| `thesis-quality-gate` | `skills/thesis-quality-gate/SKILL.md` | 8-gate assessment, 6-dimension scoring |

### 3.2 วิธีเรียกใช้

```bash
/skill thai-thesis-writing
```

เมื่อเรียกใช้ Skill ระบบจะโหลดกฎและ workflow เข้ามาใน context ของ AI

---

## 4. Commands (Slash Commands)

### 4.1 Commands ทั้งหมด (9 ตัว)

| Command | หน้าที่ | ตัวอย่าง |
|---------|--------|---------|
| `/thesis-init` | สร้างโปรเจค | `university=chiangmai title="..."` |
| `/thesis-chapter` | เขียน/แก้ไขบท | `chapter=3 mode=generate` |
| `/thesis-deai` | ตรวจ AI patterns | `mode=detect` |
| `/thesis-review` | ตรวจคุณภาพ | `perspective=advisor` |
| `/thesis-score` | ให้คะแนน | `chapter=2` |
| `/thesis-audit` | ตรวจครบถ้วน | `scope=full` |
| `/thesis-format` | จัดรูปแบบ | `university=chiangmai` |
| `/thesis-rewrite` | เขียนใหม่ | `mode=standard` |
| `/iso-docs` | สร้าง ISO | `document_type=srs` |

### 4.2 ตัวอย่างการใช้งานจริง

```bash
# เริ่มโปรเจค
/thesis-init university=chiangmai title="ชื่อวิทยานิพนธ์" author="ชื่อผู้วิจัย" advisor="ชื่ออาจารย์"

# เขียนบท
/thesis-chapter chapter=2 mode=generate

# ตรวจ AI
/thesis-deai text="เนื้อหาที่ต้องการตรวจ" mode=detect language=both

# ตรวจคุณภาพ
/thesis-audit scope=full
/thesis-score text="เนื้อหาบท" university=chiangmai
```

---

## 5. โครงสร้าง Master Prompt

### 5.1 หลักการ

ระบบใช้ **master prompt** เป็น self-contained oneshot ที่รวมทุกอย่างไว้ใน prompt เดียว:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Master Prompt (bat/prompt.md)                    │
├─────────────────────────────────────────────────────────────────────┤
│ Section  1: ข้อมูลนักศึกษา/สถาบัน                                │
│ Section  2: กฎการเขียน (ภาษา, APA, De-AI)                          │
│ Section  3: โครงสร้างวิทยานิพนธ์ (7 บท)                            │
│ Section  4: ข้อมูลโครงการ (technical specs)                        │
│ Section  5: ข้อมูลการวิจัย (experiments, data)                     │
│ Section  6: แผนการทดลอง                                            │
│ Section  7: ISO 29110 docs (file references)                       │
│ Section  8: Reference files                                        │
│ Section  9: เคล็ดลับการเขียนแต่ละบท                                │
│ Section 10: ข้อมูลที่มี vs [TBD]                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 Section ที่สำคัญ

**Section 2: กฎการเขียน**
```markdown
## กฎการเขียน

### ภาษาและรูปแบบ
- ภาษาไทยวิชาการ ตามหลัก ราชบัณฑิตยสถาน
- สรรพนาม: "ผู้วิจัย" (ไม่ใช้ "ผม", "ฉัน", "เรา")
- Formal academic register

### การอ้างอิง
- รูปแบบ: APA นาม-ปี
- ระบบปี: พ.ศ. (เช่น 2566)
- ห้ามปลอมแปลง — ใช้ [CITATION NEEDED]

### กฎ De-AI
- CV >= 30% (Burstiness)
- ไม่มี banned patterns (30 Thai + 30 English)
- หลีกเลี่ยง: นอกจากนี้, ก้าวสำคัญ, พลิกโฉม
```

---

## 6. Workflow การเขียนวิทยานิพนธ์

### 6.1 Waterfall ต่อบท

```
┌─────────────────────────────────────────────────────────────────────┐
│                 Write → De-AI → Review → Rewrite                   │
│                                                                       │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│  │  Write   │───▶│  De-AI   │───▶│  Review  │───▶│ Rewrite  │     │
│  │ (Draft)  │    │ (Check)  │    │ (Advisor)│    │ (Final)  │     │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘     │
│       │              │               │               │              │
│       ▼              ▼               ▼               ▼              │
│  thai_thesis   thai_deai      thesis_review   thai_deai         │
│  _chapter      mode=detect    perspective=    mode=rewrite      │
│                                advisor                            │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Pipeline หลัก 7 แบบ

**Pipeline A: Thesis Init**
```
/thesis-init → thai_thesis_init → university profile → project config
```

**Pipeline B: Chapter Writing**
```
/thesis-chapter → thai-thesis-writing skill → thai_thesis_chapter → thai_format
```

**Pipeline C: De-AI (4 ขั้นตอน)**
```
/thesis-deai → thai-de-ai skill → thai_deai tool
    │
    ├── Stage 1: Banned Pattern Scan (30 Thai + 30 English)
    ├── Stage 2: Burstiness Analysis (CV >= 30)
    ├── Stage 3: Register Check
    └── Stage 4: Typography Check
```

**Pipeline D: Citation**
```
/thai_citation → thai-citation-manager skill → thai_citation tool
    │
    ├── cite → in-text citation
    ├── bibliography → full bibliography
    ├── audit → check consistency
    └── validate → validate metadata
```

**Pipeline E: ISO 29110**
```
/iso-docs → iso29110-docs skill → iso_document
    │
    └── 10 document types: project-plan, srs, sdd, test-plan, etc.
```

**Pipeline F: Quality Audit**
```
/thesis-audit → thesis_audit → 8 gates + thesis_score (6 dimensions)
```

**Pipeline G: Consistency**
```
thesis_consistency → numbers, terminology, facts, versions, dates
```

---

## 7. การใช้งาน MCP Server

### 7.1 การตั้งค่า

แก้ไขไฟล์ `opencode.json`:

```json
{
  "mcp": {
    "thai-thesis-mcp": {
      "type": "local",
      "command": ["node", "C:\\path\\to\\mcp-server\\dist\\server.js"],
      "environment": {}
    }
  }
}
```

### 7.2 การรัน

```bash
cd mcp-server
npm install
npm run build
npm run dev   # development
npm start     # production
```

---

## 8. ตัวอย่างการใช้งานจริง

### 8.1 การค้นหาอ้างอิง

```bash
# ค้นหาจาก Semantic Scholar
paper-search-mcp_search_semantic query="latency online games" max_results=10

# ดึงข้อมูลจาก DOI
paper-search-mcp_get_crossref_paper_by_doi doi="10.1145/1167838.1167860"

# ดาวน์โหลด PDF
paper-search-mcp_download_semantic paper_id="semantic_xxx" save_path="./output/papers"
```

### 8.2 การสร้าง ISO เอกสาร

```bash
iso_document document_type=project-plan language=bilingual project_info="{...}"
iso_document document_type=srs language=bilingual project_info="{...}"
iso_document document_type=sdd language=bilingual project_info="{...}"
iso_document document_type=test-plan language=bilingual project_info="{...}"
iso_document document_type=test-record language=bilingual project_info="{...}"
```

---

## 9. 6-Dimension Scoring (100 คะแนน)

| มิติ | คะแนนสูงสุด | เกณฑ์ |
|------|-------------|-------|
| เนื้อหาและการโต้แย้ง | 25 | ความลึก, เหตุผล |
| อ้างอิงวิชาการ | 20 | APA, ความเพียงพอ |
| ภาษาไทย | 20 | ราชบัณฑิตยสถาน, register |
| โครงสร้างและรูปแบบ | 15 | ครบถ้วน, ตรง template |
| ความสอดคล้องของข้อมูล | 10 | ตัวเลข, ศัพท์ |
| De-AI Score | 10 | CV >= 30, 0 banned |

**เกรด:** A=90-100, B=80-89, C+=70-79, C=60-69

---

## 10. สรุป Workflow แบบย่อ

```
1. INIT:      /thesis-init
2. WRITE:     thai_thesis_chapter (ทีละบท)
3. DE-AI:     thai_deai mode=detect → edit → rewrite
4. REVIEW:    thesis_review perspective=advisor
5. SCORE:     thesis_score
6. CONSIST:   thesis_consistency
7. ISO:       iso_document (10 types)
8. AUDIT:     thesis_audit scope=full
9. SUBMIT!
```

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
