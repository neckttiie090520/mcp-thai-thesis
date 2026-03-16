# MCP Thai Thesis

**เครื่องมือ MCP Server + AI Skills สำหรับเขียนวิทยานิพนธ์ภาษาไทยระดับบัณฑิตศึกษา**

Open-source Model Context Protocol (MCP) server และ skill ecosystem สำหรับการเขียนวิทยานิพนธ์ภาษาไทยระดับบัณฑิตศึกษา สร้างจากประสบการณ์การเขียนวิทยานิพนธ์จริง และผ่านการทดสอบกับมาตรฐานการส่งมหาวิทยาลัยจริง

---

## เครื่องมือนี้ทำอะไร

MCP Thai Thesis เป็นชุดเครื่องมือ AI ที่ช่วยนักศึกษ์บัณฑิตศึกษาไทย **ตรวจสอบ ทบทวน และปรับปรุง** การเขียนวิทยานิพนธ์ ไม่ใช่ตัวสร้างวิทยานิพนธ์ -- แต่เป็น pipeline ประกันคุณภาพที่ทำงานร่วมกับการเขียนของมนุษย์

**เครื่องมือนี้ทำอะไร:**

| หมวด | สิ่งที่ทำได้ |
|-------|-------------|
| **Citation** | ตรวจสอบ APA นาม-ปี, สร้าง bibliography, audit ความสอดคล้อง, รองรับ พ.ศ./ค.ศ., ผู้แต่งไทย/อังกฤษ, ตรวจ metadata |
| **De-AI** | ตรวจจับ 30+ AI patterns ไทย/อังกฤษ, burstiness analysis, register scoring, typography check, แก้ไข/เขียนใหม่ |
| **Quality** | ให้คะแนน 6 มิติ (100 คะแนน), audit เต็มรูปแบบ, quality gate 8 ขั้นตอน, review จากมุมมอง advisor/committee |
| **Consistency** | ตรวจตัวเลข/ศัพท์/ข้อเท็จจริง/versions/dates ข้ามเอกสาร |
| **ISO 29110** | สร้างเอกสาร 10 ประเภท (project-plan, srs, sdd, test-plan, test-record, traceability, change-request, progress, config-plan, user-manual) แบบ bilingual |
| **Format** | ตรวจ Thai typography (ราชบัณฑิตยสถาน), register, รูปแบบตามมหาวิทยาลัย (5 มหาวิทยาลัย) |
| **Structure** | วิเคราะห์โครงสร้างวิทยานิพนธ์, สร้าง traceability matrix, ตรวจ chapter organization |
| **Thesis Init** | สร้างโปรเจกต์ใหม่, กำหนดมหาวิทยาลัย, ใส่ชื่อผู้วิจัย/อาจารย์ที่ปรึกษา/หัวข้อ |

**รวม:** ตรวจสอบ → ทบทวน → ให้คะแนน → รายงานปัญหา → แนะนำการแก้ไข

**เครื่องมือนี้ไม่ได้ทำอะไร:**
- ไม่เขียนวิทยานิพนธ์ให้คุณ
- ไม่สร้างข้อมูลวิจัยปลอม
- ไม่สร้าง citation ที่ไม่มีอยู่จริง (ต้องหาเองด้วย paper-search-mcp)
- ไม่รับประกันว่าจะผ่านการสอบป้องกัน
- ไม่ตรวจ plagiarism
- ไม่เป็นทนายความด้านลิขสิทธิ์

---

## ทำไมถึงสร้างสิ่งนี้

โปรเจกต์นี้เกิดจากปัญหาจริง ระหว่างเขียนวิทยานิพนธ์ปริญญาโท สาขาวิศวกรรมซอฟต์แวร์ มหาวิทยาลัยเชียงใหม่ ผู้พัฒนาพบว่าการเขียนวิทยานิพนธ์ภาษาไทยมีกฎเกณฑ์เข้มงวด (APA citations ในพุทธศักราช, ระดับภาษาที่เป็นทางการ, รูปแบบเฉพาะของแต่ละมหาวิทยาลัย, ความสอดคล้องกับ ISO 29110 สำหรับโปรเจกต์ซอฟต์แวร์) แต่มีเครื่องมือช่วยตรวจสอบความถูกต้องน้อยมาก

หลังจากสร้างเครื่องมือเหล่านี้ใช้เองและพบว่าช่วยตรวจจับปัญหาได้หลายร้อยจุดใน 7 บทวิทยานิพนธ์ 6 ภาคผนวก และ 10 เอกสาร ISO ผู้พัฒนาจึงตัดสินใจเปิดให้ใช้งานฟรีเพื่อให้นักศึกษ์บัณฑิตศึกษาไทยคนอื่นๆ สามารถใช้ประโยชน์ได้

---

## เริ่มต้นใช้งาน

### ความต้องการ

- **Node.js** >= 18.0.0
- **OpenCode** CLI ([opencode.ai](https://opencode.ai)) หรือ MCP client อื่นๆ
- เนื้อหาวิทยานิพนธ์ในรูปแบบ markdown หรือ text

### ติดตั้ง

```bash
git clone https://github.com/nextzus/mcp-thai-thesis.git
cd mcp-thai-thesis/mcp-server
npm install
npm run build
```

### ตั้งค่า MCP Client

เพิ่มใน `opencode.json` (หรือ config MCP ที่ใช้):

```json
{
  "mcpServers": {
    "thai-thesis": {
      "command": "node",
      "args": ["path/to/mcp-thai-thesis/mcp-server/dist/server.js"]
    }
  }
}
```

### เริ่มใช้งาน

```
/thesis-init --university chiangmai --author "ชื่อ นามสกุล" --title "ชื่อวิทยานิพนธ์"
```

คำสั่งนี้จะคืนค่าโปรไฟล์รูปแบบของมหาวิทยาลัยที่เลือก (แบบอักษร, ขอบ, การตั้งชื่อบท, ระบบปี) เพื่อให้คุณรู้ว่าต้องปฏิบัติตามมาตรฐานใด

> **คู่มือการติดตั้งฉบับเต็ม:** [docs/GETTING-STARTED.md](docs/GETTING-STARTED.md)

---

## Prompt สำหรับเริ่มใช้งาน (Copy & ใช้ได้เลย)

### 🚀 ติดตั้ง MCP Server

```
ฉันต้องการตั้งค่า MCP Thai Thesis server กรุณาช่วย:
1. Clone https://github.com/neckttiie090520/mcp-thai-thesis
2. รัน npm install และ npm run build ในโฟลเดอร์ mcp-server
3. เพิ่ม MCP server นี้ใน OpenCode/Claude Desktop config:

{
  "mcpServers": {
    "thai-thesis": {
      "command": "node",
      "args": ["path/to/mcp-thai-thesis/mcp-server/dist/server.js"]
    }
  }
}

4. ตรวจสอบว่า server ทำงานได้โดยเรียก thai_thesis_init
```

### 📦 ติดตั้ง Skills

```
กรุณาติดตั้ง skills เหล่านี้ให้ AI agent จาก https://github.com/neckttiie090520/mcp-thai-thesis:

Skills ที่ต้องการติดตั้ง:
1. thai-thesis-writing - Workflow การเขียนวิทยานิพนธ์ตั้งแต่ต้นจนจบ
2. documentation-writer - การสร้างงานเขียนภาษาไทยระดับวิชาการ
3. thai-de-ai - ลบลายนิ้วมือ AI (30+ patterns)
4. thai-citation-manager - การจัดการ citation และ bibliography
5. iso29110-docs - การสร้างเอกสาร ISO 29110
6. thesis-quality-gate - Checklist ก่อนส่งวิทยานิพนธ์
7. thesis-orchestrator - การประสานงานหลาย agents

คัดลอกโฟลเดอร์ skills/ ไปยัง ~/.claude/skills/ หรือตำแหน่งที่เหมาะสม
```

### 🤖 ระบบ Agent ของ OpenCode

OpenCode มีระบบ **Agent แบบลำดับชั้น** ที่เหมาะมากสำหรับ workflow วิทยานิพนธ์:

| คุณสมบัติ | คำอธิบาย |
|-----------|----------|
| **Agent → Subagent** | Agent หลักสามารถมอบหมายให้ Subagent ทำงานเฉพาะทางได้ |
| **เลือก Model** | เลือก Model ต่างกันสำหรับงานต่างกัน (Haiku=เร็ว, Sonnet=คุณภาพ) |
| **Permission Control** | ควบคุมว่า Agent ทำอะไรได้/ไม่ได้ |
| **Temperature** | ปรับความสร้างสรรค์ (0.0=แม่น, 1.0=สร้างสรรค์) |

**ทำไมต้อง OpenCode?**
- ใช้ Haiku สำหรับงานเร็ว (ค้นหา, วางแผน)
- ใช้ Sonnet สำหรับงานคุณภาพ (เขียน, ตรวจสอบ)
- ใช้ Opus สำหรับงานซับซ้อน (debug)

**เรียนรู้เพิ่มเติม:** [docs/OPENCODE-AGENTS.th.md](docs/OPENCODE-AGENTS.th.md)

### 📚 Workflow การหา Citation ที่ขาด

```
ฉันต้องการหา citation ที่ขาดหายไปในวิทยานิพนธ์ กรุณาช่วย:

1. ก่อนอื่น รัน thesis_consistency เพื่อหา citation ที่ขาดในวิทยานิพนธ์
   - ตรวจสอบ: numbers, terminology, facts, versions, dates

2. จากนั้นใช้ paper-search-mcp (https://github.com/openags/paper-search-mcp) เพื่อหางานวิจัยแต่ละชิ้นที่ขาด:
   - search_semantic(query="หัวข้อ", max_results=5)
   - search_arxiv(query="หัวข้อ", max_results=5)
   - search_google_scholar(query="หัวข้อ", max_results=5)

3. สุดท้าย ใช้ thai_citation เพื่อสร้าง bibliography entry แบบ APA:
   thai_citation(action="bibliography", sources=[{title, authors, year, doi, venue}])
```

### ✍️ การใช้ Skill เฉพาะ

**เริ่มโปรเจกต์วิทยานิพนธ์ใหม่:**
```
ใช้ thai-thesis-writing skill เพื่อช่วยเริ่มวิทยานิพนธ์ใหม่:
- มหาวิทยาลัย: chiangmai (หรือ chulalongkorn/kasetsart/kmutt/generic)
- ผู้เขียน: [ชื่อ-นามสกุล]
- หัวข้อ: [ชื่อวิทยานิพนธ์]
- อาจารย์ที่ปรึกษา: [ชื่ออาจารย์]
- ระบบปี: phc (พ.ศ.) หรือ ce (ค.ศ.)
```

**ตรวจจับลายนิ้วมือ AI:**
```
ใช้ thai-deai skill เพื่อวิเคราะห์ข้อความนี้ว่ามีรูปแบบการเขียนของ AI หรือไม่:
- ภาษา: thai (หรือ english/both)
- โหมด: detect (หรือ edit/rewrite)
- ข้อความ: [วางข้อความวิทยานิพนธ์ที่นี่]
```

**จัดการ citations:**
```
ใช้ thai-citation-manager skill เพื่อตรวจสอบ citations:
- การดำเนินการ: audit
- Citation keys: [รายการ citation keys ที่พบในข้อความ]
- ระบบปี: phc (พ.ศ.) สำหรับมหาวิทยาลัยไทย
```

**สร้างเอกสาร ISO 29110:**
```
ใช้ iso29110-docs skill เพื่อสร้างเอกสาร ISO:
- ประเภทเอกสาร: project-plan (หรือ srs/sdd/test-plan/test-record/traceability/change-request/progress/config-plan/user-manual)
- ภาษา: bilingual (หรือ thai/english)
- ข้อมูลโปรเจกต์: [รายละเอียดโปรเจกต์ของคุณ]
```

**ตรวจสอบความพร้อมก่อนส่ง:**
```
ใช้ thesis-quality-gate skill เพื่อตรวจสอบความพร้อมของวิทยานิพนธ์:
- ขอบเขต: full (หรือ chapter/iso/consistency)
- มหาวิทยาลัย: chiangmai
```

### 📖 Slash Commands

```
ใช้ slash commands เหล่านี้ใน OpenCode/Claude Code:

/thesis-init --university chiangmai --author "ชื่อ นามสกุล" --title "ชื่อวิทยานิพนธ์"
/thesis-chapter --chapter 1 --mode generate
/thesis-audit --scope full
/thesis-review --perspective advisor
/thesis-deai --language thai --mode detect
/thesis-score --chapter 1
/thesis-format --university chiangmai
/iso-docs --document-type srs
```

---

## สิ่งที่คุณได้รับ

### 11 MCP Tools

| เครื่องมือ | สิ่งที่ทำ |
|---|---|
| `thai_thesis_init` | เริ่มต้นโปรเจกต์วิทยานิพนธ์ตามมหาวิทยาลัยที่เลือก |
| `thai_thesis_chapter` | สร้างโครงสร้างบท ส่วน และแนวทางการเขียน |
| `thai_deai` | ตรวจจับลายนิ้วมือ AI ด้วย 30+ patterns |
| `thai_citation` | จัดรูปแบบ APA citations, สร้าง bibliography, ตรวจสอบความสอดคล้อง |
| `thai_format` | ส่งคืนข้อกำหนดรูปแบบของมหาวิทยาลัย |
| `iso_document` | สร้างเอกสาร ISO/IEC 29110 (10 ประเภท, สองภาษา) |
| `thesis_review` | ทบทวนคุณภาพจากมุมมองอาจารย์ที่ปรึกษา/กรรมการ/ISO auditor |
| `thesis_audit` | ตรวจสอบวิทยานิพนธ์เต็มรูปแบบ พร้อมคะแนน 6 มิติ |
| `thesis_score` | ให้คะแนนอย่างรวดเร็ว (100 คะแนน, 6 มิติ) |
| `thesis_consistency` | ตรวจสอบความสอดคล้องข้ามเอกสาร |
| `thesis_traceability` | สร้าง traceability matrix สำหรับ requirements |

### 7 AI Skills

Skills คือชุดคำสั่งที่ช่วย AI agents ผ่าน workflow ที่ซับซ้อน:

| Skill | หน้าที่ |
|---|---|
| `thai-thesis-writing` | Workflow การเขียนวิทยานิพนธ์ตั้งแต่ต้นจนจบ |
| `documentation-writer` | การสร้างงานเขียนภาษาไทยระดับวิชาการพร้อม de-AI 30 patterns |
| `thai-de-ai` | การประมวลผลหลังเขียนเพื่อลบสัญญาณการเขียนของ AI |
| `thai-citation-manager` | การจัดการ citation APA และการตรวจสอบ bibliography |
| `iso29110-docs` | การสร้างและตรวจสอบเอกสาร ISO/IEC 29110 |
| `thesis-quality-gate` | Checklist 8 ขั้นตอนก่อนส่งวิทยานิพนธ์ |
| `thesis-orchestrator` | การประสานงาน workflow หลาย agents |

### 9 Slash Commands

| Command | สิ่งที่ทำ |
|---|---|
| `/thesis-init` | เริ่มโปรเจกต์วิทยานิพนธ์ใหม่ |
| `/thesis-chapter` | เขียนหรือแก้ไขบท |
| `/thesis-audit` | ตรวจสอบคุณภาพเต็มรูปแบบ |
| `/thesis-review` | ทบทวนจากหลายมุมมอง |
| `/thesis-deai` | วิเคราะห์การลบลายนิ้วมือ AI |
| `/thesis-score` | ให้คะแนนอย่างรวดเร็ว |
| `/thesis-format` | ตรวจสอบรูปแบบมหาวิทยาลัย |
| `/thesis-rewrite` | เขียนใหม่ทั้งโครงสร้างและภาษา |
| `/iso-docs` | สร้างเอกสาร ISO |

### 5 โปรไฟล์มหาวิทยาลัย

| มหาวิทยาลัย | Key | ชื่ออื่นๆ |
|---|---|---|
| จุฬาลงกรณ์มหาวิทยาลัย | `chulalongkorn` | จุฬา, chula, cu |
| มหาวิทยาลัยเกษตรศาสตร์ | `kasetsart` | เกษตร, มก, ku |
| มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี | `kmutt` | มจธ, บางมด |
| มหาวิทยาลัยเชียงใหม่ | `chiangmai` | มช, cmu |
| Generic Template | `generic` | ทั่วไป, default |

---

## เอกสาร

### เอกสารหลัก

| เอกสาร | รายละเอียด |
|---|---|
| [Getting Started](docs/GETTING-STARTED.md) | การติดตั้งและการตั้งค่า |
| [Architecture](docs/ARCHITECTURE.md) | การออกแบบระบบและความสัมพันธ์ของ components |
| [Workflow](docs/WORKFLOW.md) | Pipeline workflows พร้อมแผนภาพ |

### เครื่องมือและ Skills

| เอกสาร | รายละเอียด |
|---|---|
| [Capabilities](docs/CAPABILITIES.md) | คู่มือเครื่องมือ (11) และ skills (7) ฉบับเต็ม |
| [Skills Guide](docs/SKILLS-GUIDE.md) | วิธีใช้แต่ละ skill |
| [Commands](commands/) | คำสั่ง slash commands (9 คำสั่ง) |

### คุณภาพและมาตรฐาน

| เอกสาร | รายละเอียด |
|---|---|
| [ISO 29110 Report](docs/ISO29110-REPORT.md) | การวิเคราะห์ความสอดคล้อง ISO |
| [Examples](docs/EXAMPLES.md) | ตัวอย่างผลลัพธ์จริง |

### การพัฒนาและการมีส่วนร่วม

| เอกสาร | รายละเอียด |
|---|---|
| [Development Journey](docs/DEVELOPMENT-JOURNEY.md) | เรื่องราวการพัฒนาโปรเจกต์ |
| [Roadmap](docs/ROADMAP.md) | แผนการพัฒนาในอนาคต |
| [Contributing](docs/CONTRIBUTING.md) | วิธีมีส่วนร่วม |

### ขั้นสูง

| เอกสาร | รายละเอียด |
|---|---|
| [Use Cases](docs/USE-CASES.th.md) | ไอเดียการใช้งาน 10+ กรณี |
| [OpenCode Agents](docs/OPENCODE-AGENTS.th.md) | ระบบ Agent และการเลือก Model |

### คู่อ้างอิงเร็ว

| ประเภท | ไฟล์ |
|--------|-------|
| **Skills** | [skills/](skills/) — 7 skills (thai-thesis-writing, documentation-writer, thai-de-ai, thai-citation-manager, iso29110-docs, thesis-quality-gate, thesis-orchestrator) |
| **Commands** | [commands/](commands/) — 9 slash commands (thesis-init, thesis-chapter, thesis-audit, thesis-review, thesis-deai, thesis-score, thesis-format, thesis-rewrite, iso-docs) |
| **Agents** | [agents/](agents/) — thesis-reviewer agent |
| **Templates** | [mcp-server/templates/](mcp-server/templates/) — มหาวิทยาลัย (5), ISO (6), De-AI patterns |
| **MCP Server** | [mcp-server/src/](mcp-server/src/) — TypeScript source code |

---

## พัฒนา

```bash
cd mcp-server
npm install          # ติดตั้ง dependencies
npm run build       # Compile TypeScript
npm run typecheck   # ตรวจสอบ types เท่านั้น (เร็วกว่า)
npm run watch       # โหมด watch สำหรับพัฒนา
npm run clean       # ลบ build output
npm run rebuild     # Clean + build
```

---

## License

MIT License -- see [LICENSE](LICENSE)

---

## แรงบันดาลใจและโปรเจกต์ที่เกี่ยวข้อง

โปรเจกต์นี้ได้รับแรงบันดาลใจและสร้างต่อยอดจากโปรเจกต์ที่ยอดเยี่ยมเหล่านี้:

| โปรเจกต์ | URL | สิ่งที่เรียนรู้ |
|-----------|-----|------------------|
| **awesome-ai-research-writing** | [Leey21/awesome-ai-research-writing](https://github.com/Leey21/awesome-ai-research-writing) | Prompts คุณภาพสูงสำหรับเขียน paper ภาษาอังกฤษ, LaTeX formatting, de-AI patterns |
| **claude-scholar** | [Galaxy-Dawn/claude-scholar](https://github.com/Galaxy-Dawn/claude-scholar) | ระบบ agent เต็มรูปแบบ (32 skills, 14 agents), การรวม Zotero MCP, hooks อัตโนมัติ |
| **thesis-writer** | [ccam80/thesis-writer](https://github.com/ccam80/thesis-writer) | Workflow เขียนวิทยานิพนธ์แบบ plan-driven, document-planner → writer → reviewer |
| **opendraft** | [federicodeponte/opendraft](https://github.com/federicodeponte/opendraft) | 19-agent pipeline สำหรับสร้างวิทยานิพนธ์, verified citations กับ CrossRef/OpenAlex |
| **academic-ai-prompt** | [bohyy/academic-ai-prompt](https://github.com/bohyy/academic-ai-prompt) | 89+ prompts ภาษาจีนสำหรับ workflow วิทยานิพนธ์ |

### อะไรที่ทำให้ MCP Thai Thesis แตกต่าง

ในขณะที่โปรเจกต์ข้างต้นเน้นที่การเขียน paper ภาษาอังกฤษ MCP Thai Thesis ออกแบบมาเฉพาะสำหรับ:
- **ภาษาไทย** พร้อม typography ที่ถูกต้อง (มาตรฐานราชบัณฑิตยสถาน)
- **มหาวิทยาลัยไทย** (จุฬา, เกษตร, KMUTT, มช) พร้อมรูปแบบเฉพาะของแต่ละมหาวิทยาลัย
- **APA นาม-ปี** พร้อมระบบปี พ.ศ./ค.ศ.
- **ISO 29110** documents สำหรับวิทยานิพนธ์วิศวกรรมซอฟต์แวร์
- **การตรวจจับ De-AI** สำหรับข้อความภาษาไทย (30+ patterns)

---

**สร้างจากประสบการณ์เขียนวิทยานิพนธ์จริง ผ่านการทดสอบกับมาตรฐานมหาวิทยาลัยจริง**
