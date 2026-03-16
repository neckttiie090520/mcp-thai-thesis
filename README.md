# MCP Thai Thesis

**Open-source MCP server + AI skills สำหรับเขียนวิทยานิพนธ์ภาษาไทยระดับบัณฑิตศึกษา**

An open-source Model Context Protocol (MCP) server and skill ecosystem for Thai graduate thesis writing. Built from real thesis production experience, tested against actual university submission standards.

---

**Language / ภาษา:** [English](README.md) | [ภาษาไทย](README.th.md)

---

## What This Is

MCP Thai Thesis is a set of AI-powered tools that help Thai graduate students **check, review, and improve** their thesis writing. It is not a thesis generator -- it is a quality assurance pipeline that works alongside human writing.

Think of it this way: you write your thesis, then run it through this system. The system checks your citations, detects AI-writing patterns, validates ISO 29110 compliance, scores your chapters, and reports back what needs fixing.

**เครื่องมือนี้ทำอะไร:**

| หมวด | สิ่งที่ทำได้ |
|-------|-------------|
| **Citation** | ตรวจสอบ APA นาม-ปี, สร้าง bibliography, audit ความสอดคล้อง, รองรับ พ.ศ./ค.ศ., ผู้แต่งไทย/อังกฤษ, ตรวจ metadata |
| **De-AI** | ตรวจจับ 30+ AI patterns ไทย/อังกฤษ, burstiness analysis, register scoring, typography check, แก้ไข/เขียนใหม่ |
| **Quality** | ให้คะแนน 6 มิติ (100 คะแนน), audit เต็มรูปแบบ, quality gate 8 ขั้นตอน, review จากมุมมอง advisor/committee |
| **Consistency** | ตรวจตัวเลข/ศัพท์/ข้อเท็จจริง/versions/dates ข้ามเอกสาร |
| **ISO 29110** | ตรวจสอบความสอดคล้อง 10 ประเภท (project-plan, srs, sdd, test-plan, test-record, traceability, change-request, progress, config-plan, user-manual), ให้คำแนะนำ bilingual |
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

## Why This Exists

This project was born from a real problem. While writing an M.Sc. thesis at Chiang Mai University, the author faced a common challenge: Thai thesis writing has strict rules (APA citations in Buddhist Era, formal register requirements, university-specific formatting, ISO 29110 compliance for software projects) but very few tools to help verify compliance.

After building these tools for personal use and seeing them catch hundreds of issues across 7 thesis chapters, 6 appendices, and 10 ISO documents, we decided to open-source them so other Thai graduate students can benefit.

**ทำไมถึงสร้างสิ่งนี้:** ในระหว่างเขียนวิทยานิพนธ์ปริญญาโท สาขาวิศวกรรมซอฟต์แวร์ มหาวิทยาลัยเชียงใหม่ ผู้พัฒนาพบว่าการตรวจสอบคุณภาพวิทยานิพนธ์ภาษาไทยยังขาดเครื่องมือที่ดี จึงสร้างระบบนี้ขึ้นมาและทดสอบกับงานจริง ก่อนเปิดให้ใช้งานฟรี

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **OpenCode** CLI ([opencode.ai](https://opencode.ai) | [GitHub](https://github.com/anomalyco/opencode)) or any MCP-compatible client
- Your thesis content in markdown or text format

### Install

```bash
git clone https://github.com/nextzus/mcp-thai-thesis.git
cd mcp-thai-thesis/mcp-server
npm install
npm run build
```

### Configure Your MCP Client

Add to your `opencode.json` (or equivalent MCP config):

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

### First Run

```
/thesis-init --university chiangmai --author "ชื่อ นามสกุล" --title "ชื่อวิทยานิพนธ์"
```

This returns your university's formatting profile (fonts, margins, chapter naming conventions, year system) so you know exactly what standards to follow.

> **Full setup guide:** [docs/GETTING-STARTED.md](docs/GETTING-STARTED.md)

---

## Quick Prompts (Copy & Use)

Copy these prompts to get started quickly with your AI agent:

### 🚀 Install MCP Server

```
I want to set up the MCP Thai Thesis server. Please:
1. Clone https://github.com/neckttiie090520/mcp-thai-thesis
2. Run npm install and npm run build in the mcp-server folder
3. Add this MCP server to my OpenCode/Claude Desktop config:

{
  "mcpServers": {
    "thai-thesis": {
      "command": "node",
      "args": ["path/to/mcp-thai-thesis/mcp-server/dist/server.js"]
    }
  }
}

4. Verify the server is running by calling thai_thesis_init
```

### 📦 Install Skills

```
Please install these skills for my AI agent from https://github.com/neckttiie090520/mcp-thai-thesis:

Skills to install:
1. thai-thesis-writing - End-to-end thesis drafting workflow
2. documentation-writer - Thai academic prose generation
3. thai-de-ai - Remove AI writing patterns (30+ patterns)
4. thai-citation-manager - APA citation management
5. iso29110-docs - ISO 29110 document creation
6. thesis-quality-gate - Pre-submission checklist
7. thesis-orchestrator - Multi-agent coordination

Copy the skills/ folder to my ~/.claude/skills/ or equivalent location.
```

### 🤖 OpenCode Agent System

OpenCode has a powerful **hierarchical agent system** perfect for thesis workflows:

| Feature | Description |
|---------|-------------|
| **Agent → Subagent** | Primary agents can delegate to specialized subagents |
| **Model Selection** | Choose different models for different tasks (Haiku=fast, Sonnet=quality) |
| **Permission Control** | Control what each agent can/can't do |
| **Temperature** | Adjust creativity (0.0=precise, 1.0=creative) |

**Why OpenCode?**
- Use Haiku for fast tasks (search, planning)
- Use Sonnet for quality tasks (writing, review)
- Use Opus for complex reasoning (debugging)

**Learn more:** [docs/OPENCODE-AGENTS.md](docs/OPENCODE-AGENTS.md)

### 📚 Citation Finder Workflow

```
I need to find missing citations for my thesis. Please help me:

1. First, run thesis_consistency to find missing citations in my thesis
   - Check: numbers, terminology, facts, versions, dates

2. Then use paper-search-mcp (https://github.com/openags/paper-search-mcp) to find each missing paper:
   - search_semantic(query="topic", max_results=5)
   - search_arxiv(query="topic", max_results=5)
   - search_google_scholar(query="topic", max_results=5)

3. Finally, use thai_citation to create proper APA bibliography entries:
   thai_citation(action="bibliography", sources=[{title, authors, year, doi, venue}])
```

### ✍️ Use Specific Skills

**Start a new thesis project:**
```
Use the thai-thesis-writing skill to help me start a new thesis:
- University: chiangmai (or chulalongkorn/kasetsart/kmutt/generic)
- Author: [Your Name]
- Title: [Thesis Title]
- Advisor: [Advisor Name]
- Year system: phc (พ.ศ.) or ce (ค.ศ.)
```

**Check for AI writing patterns:**
```
Use the thai-de-ai skill to analyze this text for AI writing patterns:
- Language: thai (or english/both)
- Mode: detect (or edit/rewrite)
- Text: [paste your thesis text here]
```

**Manage citations:**
```
Use the thai-citation-manager skill to audit my citations:
- Action: audit
- Cited keys: [list citation keys found in your text]
- Year system: phc (พ.ศ.) for Thai universities
```

**Generate ISO 29110 documents:**
```
Use the iso29110-docs skill to generate an ISO document:
- Document type: project-plan (or srs/sdd/test-plan/test-record/traceability/change-request/progress/config-plan/user-manual)
- Language: bilingual (or thai/english)
- Project info: [your project details]
```

**Quality check before submission:**
```
Use the thesis-quality-gate skill to check my thesis readiness:
- Scope: full (or chapter/iso/consistency)
- University: chiangmai
```

### 📖 Slash Commands

```
Use these slash commands in OpenCode/Claude Code:

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

## What You Get

### 11 MCP Tools

| Tool | What It Does |
|------|-------------|
| `thai_thesis_init` | Initialize thesis project with university-specific config |
| `thai_thesis_chapter` | Get chapter structure, sections, and writing guidelines |
| `thai_deai` | Detect AI-writing patterns using 30+ pattern framework |
| `thai_citation` | Format APA citations, generate bibliography, audit consistency |
| `thai_format` | Return university formatting specifications |
| `iso_document` | Generate ISO/IEC 29110 documents (10 types, bilingual) |
| `thesis_review` | Quality review from advisor/committee/ISO auditor perspective |
| `thesis_audit` | Full thesis audit with 6-dimension scoring and gap detection |
| `thesis_score` | Quick quantitative scoring (100 points, 6 dimensions) |
| `thesis_consistency` | Cross-document consistency check (numbers, terms, facts) |
| `thesis_traceability` | Generate requirements traceability matrix |

### 7 AI Skills

Skills are detailed instruction sets that guide AI agents through complex thesis workflows:

| Skill | Purpose |
|-------|---------|
| `thai-thesis-writing` | End-to-end thesis drafting workflow with chapter-by-chapter guidance |
| `documentation-writer` | Thai academic prose generation with 30-pattern de-AI framework |
| `thai-de-ai` | Post-processing to remove AI-writing signals |
| `thai-citation-manager` | APA citation management and bibliography audit |
| `iso29110-docs` | ISO/IEC 29110 document creation and validation |
| `thesis-quality-gate` | 8-gate pre-submission quality checklist |
| `thesis-orchestrator` | Multi-agent workflow coordination |

### 9 Slash Commands

| Command | What It Does |
|---------|-------------|
| `/thesis-init` | Start a new thesis project |
| `/thesis-chapter` | Draft or revise a chapter |
| `/thesis-audit` | Full quality audit |
| `/thesis-review` | Multi-perspective review |
| `/thesis-deai` | De-AI analysis |
| `/thesis-score` | Quick scoring |
| `/thesis-format` | University formatting check |
| `/thesis-rewrite` | Structural + language rewrite |
| `/iso-docs` | Generate ISO documents |

### 5 University Profiles

| University | Key | Aliases |
|-----------|-----|---------|
| จุฬาลงกรณ์มหาวิทยาลัย | `chulalongkorn` | จุฬา, chula, cu |
| มหาวิทยาลัยเกษตรศาสตร์ | `kasetsart` | เกษตร, มก, ku |
| มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี | `kmutt` | มจธ, บางมด |
| มหาวิทยาลัยเชียงใหม่ | `chiangmai` | มช, cmu |
| Generic Template | `generic` | ทั่วไป, default |

### Citation Finder Integration

การหา citation ที่ขาดหายไปเป็นปัญหาสำคัญ ระบบนี้แนะนำให้ใช้ร่วมกับ **[paper-search-mcp](https://github.com/openags/paper-search-mcp)** ซึ่งเป็น MCP server สำหรับค้นหางานวิจัยจากฐานข้อมูลต่างๆ

> **ดู workflow ละเอียด:** [Use Cases - Citation Finder](docs/USE-CASES.md#2-workflow-การหา-citation-ที่ขาด)

| Database | Use Case |
|----------|----------|
| **Semantic Scholar** | ค้นหาทั่วไป, ได้ citation count |
| **arXiv** | preprint ใหม่ๆ |
| **PubMed** | งานวิจัยด้านการแพทย์/ชีววิทยา |
| **Google Scholar** | ค้นหางานวิจัยทั่วไป |
| **CrossRef** | ค้นหาจาก DOI |
| **bioRxiv/medRxiv** | preprint ด้านวิทยาศาสตร์สุขภาพ |

**วิธีใช้ร่วมกัน:**

1. ใช้ `thesis_consistency` หา citation ที่ขาด
2. ใช้ paper-search-mcp ค้นหางานวิจัยที่ต้องการ
3. ใช้ `thai_citation` สร้าง bibliography entry จาก metadata ที่ได้
4. ใช้ `thai_citation` audit ตรวจสอบความสมบูรณ์

**ตัวอย่าง:**

```
// 1. หาว่าขาด citation อะไร
thai_citation(action="audit", cited_keys=["claypool2010", "gpower2021"])

// 2. ค้นหาด้วย paper-search-mcp
search_semantic(query="Claypool latency online games", max_results=3)

// 3. สร้าง bibliography entry
thai_citation(action="bibliography", sources=[{title: "...", authors: "...", year: 2023, doi: "..."}])
```

---

## How It Works

The system operates as a **verification pipeline**, not a content generator:

```
                    Your Thesis (markdown/text)
                              |
                              v
                 +------------------------+
                 |     MCP Thai Thesis    |
                 |                        |
           +-----+-----+-----+-----+-----+
           |     |     |     |     |     |
           v     v     v     v     v     v
        De-AI Citation ISO  Score Format Review
        Check  Audit  Check      Check  Check
           |     |     |     |     |     |
           +-----+-----+-----+-----+-----+
                              |
                              v
                   Structured Report
                 (issues, scores, fixes)
                              |
                              v
                     You Fix Your Work
```

### The Workflow in Practice

**Step 1: You write** -- Draft your thesis chapters in any text editor.

**Step 2: You check** -- Run tools against your content:
- `thai_deai` scans for AI-writing fingerprints (30+ patterns in Thai, 27 in English)
- `thai_citation` audits your references against your bibliography
- `thesis_score` gives you a 100-point breakdown across 6 dimensions
- `thesis_consistency` cross-checks numbers between your chapters and appendices

**Step 3: You get a report** -- Each tool returns a structured report telling you exactly what to fix.

**Step 4: You fix** -- You revise your work based on the report.

**Step 5: You re-check** -- Run the tools again until everything passes.

> **Detailed workflow guide:** [docs/WORKFLOW.md](docs/WORKFLOW.md)

---

## Real Example: De-AI Detection

Feed a paragraph of Thai thesis text to `thai_deai`:

**Input:**
> นอกจากนี้ การวิจัยครั้งนี้นับเป็นก้าวสำคัญที่จะนำไปสู่การพัฒนาซอฟต์แวร์ที่ล้ำสมัย ซึ่งจะช่วยพลิกโฉมวงการเกมในประเทศไทย

**Output:**
```
De-AI Analysis Report
=====================

Banned Patterns Found: 4
  [filler]     "นอกจากนี้" → ลบออก หรือเชื่อมประโยคด้วยเนื้อหาจริง
  [inflation]  "ก้าวสำคัญ" → ระบุความสำคัญด้วยข้อเท็จจริง
  [marketing]  "ล้ำสมัย" → ระบุคุณลักษณะเฉพาะแทน
  [marketing]  "พลิกโฉม" → ระบุผลกระทบที่วัดได้จริง

Burstiness: CV = 12.3% (FAIL - target >= 30%)
  All sentences are similar length. Human writing varies more.

Register: INFORMAL detected
  Found "การวิจัยครั้งนี้" - consider using "งานวิจัยนี้" instead

Typography: 1 issue
  Missing space before ๆ

Recommendation: REWRITE needed - multiple AI signals detected
```

> **More examples:** [docs/EXAMPLES.md](docs/EXAMPLES.md)

---

## Quality Scoring System

The 6-dimension rubric (100 points total):

| Dimension | Points | What It Measures |
|-----------|--------|-----------------|
| Content & Argument | 25 | Logical structure, evidence quality, coherent reasoning |
| Academic References | 20 | Citation density, recency, format consistency |
| Thai Language Quality | 20 | Register, typography, spelling, formal conventions |
| Formatting & Structure | 15 | University template compliance, heading hierarchy |
| Data Consistency | 10 | Numbers match across chapters, no contradictions |
| De-AI Score | 10 | Absence of AI-writing patterns, natural burstiness |

**Grading Scale:**

| Grade | Score | Meaning |
|-------|-------|---------|
| A | 90-100 | Submission-ready |
| B | 80-89 | Minor revisions needed |
| C+ | 70-79 | Moderate revisions |
| C | 60-69 | Significant revisions |
| D | 50-59 | Major problems |
| F | < 50 | Fundamental restructuring needed |

---

## ISO/IEC 29110 Support

For software engineering theses, the system generates and validates **10 ISO/IEC 29110 document types**:

| # | Document | Thai Name |
|---|----------|-----------|
| 1 | Project Plan | แผนโครงการ |
| 2 | Software Requirements Specification | ข้อกำหนดความต้องการซอฟต์แวร์ |
| 3 | Software Design Description | รายละเอียดการออกแบบซอฟต์แวร์ |
| 4 | Test Plan | แผนการทดสอบ |
| 5 | Test Record | บันทึกผลการทดสอบ |
| 6 | Traceability Record | บันทึกความสามารถสอบกลับ |
| 7 | Change Request | คำร้องขอเปลี่ยนแปลง |
| 8 | Progress Status Record | บันทึกสถานะความก้าวหน้า |
| 9 | Configuration Management Plan | แผนจัดการโครงแบบ |
| 10 | User Manual | คู่มือผู้ใช้ |

Each document can be generated in Thai, English, or bilingual format. Templates follow ISO/IEC 29110-5-1-2 (Basic Profile for Very Small Entities).

> **ISO 29110 accuracy report:** [docs/ISO29110-REPORT.md](docs/ISO29110-REPORT.md)

---

## Project Structure

```
mcp-thai-thesis/
├── mcp-server/                    # MCP Server (TypeScript)
│   ├── src/
│   │   ├── server.ts              # Main server: tool definitions + handlers
│   │   └── utils/
│   │       ├── thai-text.ts       # Thai text analysis (674 lines)
│   │       │                        burstiness, 30+ banned patterns,
│   │       │                        register analysis, typography,
│   │       │                        year system conversion
│   │       └── citation.ts        # APA citation engine (685 lines)
│   │                                formatting, bibliography, audit,
│   │                                validation, Thai/English sorting
│   ├── templates/
│   │   ├── universities/          # 5 university formatting profiles
│   │   ├── iso/                   # 6 ISO 29110 document templates
│   │   └── deai/                  # De-AI pattern reference files
│   ├── package.json
│   └── tsconfig.json
│
├── skills/                         # OpenCode AI Skills
│   ├── thai-thesis-writing/       # End-to-end thesis writing workflow
│   ├── documentation-writer/      # Thai academic prose + de-AI master
│   ├── thai-de-ai/                # De-AI detection and rewriting
│   ├── thai-citation-manager/     # APA citation management
│   ├── iso29110-docs/             # ISO document generation
│   ├── thesis-quality-gate/       # 8-gate quality assurance
│   └── thesis-orchestrator/       # Multi-agent coordination
│
├── commands/                       # Slash commands for OpenCode
│   ├── thesis-init.md
│   ├── thesis-chapter.md
│   ├── thesis-audit.md
│   ├── thesis-review.md
│   ├── thesis-deai.md
│   ├── thesis-score.md
│   ├── thesis-format.md
│   ├── thesis-rewrite.md
│   └── iso-docs.md
│
├── agents/                         # Agent definitions
│   └── thesis-reviewer.md         # Review + audit agent
│
├── config/
│   └── university.yaml            # University profile configuration
│
└── docs/                           # Documentation
    ├── GETTING-STARTED.md          # Installation and setup
    ├── ARCHITECTURE.md             # System architecture
    ├── WORKFLOW.md                 # Pipeline workflows
    ├── CAPABILITIES.md             # Complete capability reference
    ├── SKILLS-GUIDE.md             # Skill documentation
    ├── ISO29110-REPORT.md          # ISO compliance report
    ├── EXAMPLES.md                 # Real output examples
    ├── DEVELOPMENT-JOURNEY.md      # How this was built
    ├── ROADMAP.md                  # Future plans
    └── CONTRIBUTING.md             # Contribution guide
```

---

## Supported Thesis Structures

### Standard 5-Chapter (Most Universities)

| Chapter | Thai Name | Content |
|---------|----------|---------|
| 1 | บทนำ | Problem, objectives, scope, significance |
| 2 | เอกสารและงานวิจัยที่เกี่ยวข้อง | Literature review, theoretical framework |
| 3 | วิธีดำเนินการวิจัย | Research methodology, tools, analysis |
| 4 | ผลการวิจัย | Results, data analysis |
| 5 | สรุป อภิปราย และข้อเสนอแนะ | Conclusion, discussion, recommendations |

### Extended 7-Chapter (Software Engineering)

| Chapter | Thai Name | Content |
|---------|----------|---------|
| 1 | บทนำ | Problem, objectives, scope |
| 2 | ทฤษฎีและงานวิจัยที่เกี่ยวข้อง | Literature, theory, related work |
| 3 | วิธีดำเนินการวิจัย | Research methodology |
| 4 | การวิเคราะห์และออกแบบระบบ | System analysis and design |
| 5 | การพัฒนาซอฟต์แวร์ | Software development |
| 6 | การทดสอบและผลการวิจัย | Testing and results |
| 7 | บทสรุป | Conclusion, discussion, recommendations |

---

## Technical Details

### MCP Server

- **Runtime**: Node.js >= 18 (ES Modules)
- **Language**: TypeScript 5.4+ with strict mode
- **Transport**: Stdio (subprocess)
- **Dependency**: `@modelcontextprotocol/sdk` only
- **Lines of Code**: ~2,200 (server + utils, excluding Windows optimizer)
- **Zero external dependencies** beyond the MCP SDK

### Thai Text Analysis Engine (`thai-text.ts`)

- **30+ banned AI patterns** across 6 categories: filler, significance inflation, marketing language, generic AI endings, stacked hedging, repetitive openers
- **Burstiness analysis**: Coefficient of Variation on sentence lengths; CV >= 30% indicates human-like writing
- **Register checking**: Detects informal pronouns, marketing language, filler phrases
- **Typography checking**: 5 common Thai typography errors (missing space before ๆ, periods in Thai sentences, em dashes, bold mid-paragraph, curly quotes)
- **Year system detection**: Catches mixed พ.ศ./ค.ศ. usage

### Citation Engine (`citation.ts`)

- **APA 7th Edition** adapted for Thai conventions
- **7 source types**: book, journal, conference, thesis, website, report, other
- **Bilingual sorting**: Thai entries first (alphabetical), then English
- **Audit capabilities**: Orphan citations, orphan bibliography entries, author spelling drift, incomplete metadata, DOI validation
- **Year systems**: Buddhist Era (พ.ศ.) and Common Era (ค.ศ.) with conversion

---

## Who This Is For

- **Thai graduate students** writing thesis/dissertation in any field
- **Software engineering students** who need ISO/IEC 29110 documentation
- **Thesis advisors** who want automated quality checking tools
- **Anyone** writing formal Thai academic prose

### University Support

The system currently has profiles for 5 Thai universities. All share the same core formatting (TH Sarabun New 16pt, 1.5 line spacing, APA citations) but differ in chapter naming conventions and specific requirements. The `generic` profile works as a safe default.

Adding your university is straightforward -- see [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

---

## Documentation

### Core Docs

| Document | Description |
|----------|-------------|
| [Getting Started](docs/GETTING-STARTED.md) | Installation, configuration, first run |
| [Architecture](docs/ARCHITECTURE.md) | System design, component relationships |
| [Workflow](docs/WORKFLOW.md) | Pipeline workflows with diagrams |

### Tools & Skills

| Document | Description |
|----------|-------------|
| [Capabilities](docs/CAPABILITIES.md) | Complete tool (11) and skill (7) reference |
| [Skills Guide](docs/SKILLS-GUIDE.md) | How each skill works |
| [Commands](commands/) | Slash commands reference (9 commands) |

### Quality & Compliance

| Document | Description |
|----------|-------------|
| [ISO 29110 Report](docs/ISO29110-REPORT.md) | ISO compliance analysis |
| [Examples](docs/EXAMPLES.md) | Real output examples |

### Development & Contribution

| Document | Description |
|----------|-------------|
| [Development Journey](docs/DEVELOPMENT-JOURNEY.md) | How this project was built |
| [Roadmap](docs/ROADMAP.md) | Future development plans |
| [Contributing](docs/CONTRIBUTING.md) | How to contribute |

### Advanced

| Document | Description |
|----------|-------------|
| [Use Cases](docs/USE-CASES.md) | 10+ creative use cases |
| [OpenCode Agents](docs/OPENCODE-AGENTS.md) | Agent system & model selection |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Common issues and solutions |

### Quick Reference

| Type | Files |
|------|-------|
| **Skills** | [skills/](skills/) — 7 skills (thai-thesis-writing, documentation-writer, thai-de-ai, thai-citation-manager, iso29110-docs, thesis-quality-gate, thesis-orchestrator) |
| **Commands** | [commands/](commands/) — 9 slash commands (thesis-init, thesis-chapter, thesis-audit, thesis-review, thesis-deai, thesis-score, thesis-format, thesis-rewrite, iso-docs) |
| **Agents** | [agents/](agents/) — thesis-reviewer agent |
| **Templates** | [mcp-server/templates/](mcp-server/templates/) — Universities (5), ISO (6), De-AI patterns |
| **MCP Server** | [mcp-server/src/](mcp-server/src/) — TypeScript source code |

---

## Development

```bash
cd mcp-server
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run typecheck    # Type check only (faster)
npm run watch        # Watch mode for development
npm run clean        # Remove build output
npm run rebuild      # Clean + build
```

---

## License

MIT License -- see [LICENSE](LICENSE)

---

## Acknowledgments

- ราชบัณฑิตยสถาน for Thai language standards
- Thai universities for thesis formatting guidelines
- [Model Context Protocol](https://modelcontextprotocol.io/) for the open standard
- [OpenCode](https://opencode.ai) ([GitHub](https://github.com/anomalyco/opencode)) for the AI agent framework
- [paper-search-mcp](https://github.com/openags/paper-search-mcp) for citation discovery capabilities
- The Thai graduate student community for feedback and testing

---

## Inspiration & Related Projects

This project was inspired by and builds upon excellent work from these repositories:

| Project | URL | What We Learned |
|---------|-----|-----------------|
| **awesome-ai-research-writing** | [Leey21/awesome-ai-research-writing](https://github.com/Leey21/awesome-ai-research-writing) | High-quality prompts for English paper writing, LaTeX formatting, de-AI patterns (Chinese version) |
| **claude-scholar** | [Galaxy-Dawn/claude-scholar](https://github.com/Galaxy-Dawn/claude-scholar) | Full agent ecosystem (32 skills, 14 agents), Zotero MCP integration, hooks automation |
| **thesis-writer** | [ccam80/thesis-writer](https://github.com/ccam80/thesis-writer) | Plan-driven thesis workflow, document-planner → writer → reviewer chain |
| **opendraft** | [federicodeponte/opendraft](https://github.com/federicodeponte/opendraft) | 19-agent pipeline for thesis generation, verified citations with CrossRef/OpenAlex |
| **academic-ai-prompt** | [bohyy/academic-ai-prompt](https://github.com/bohyy/academic-ai-prompt) | 89+ Chinese prompts for thesis workflow (topic selection → paper finding → literature review → writing) |

### What Makes MCP Thai Thesis Different

While the above projects focus on English/paper writing, MCP Thai Thesis is specifically designed for:
- **Thai language** with proper typography (ราชบัณฑิตยสถาน standards)
- **Thai universities** (จุฬา, เกษตร, KMUTT, มช) with university-specific formatting
- **APA นาม-ปี** with พ.ศ./ค.ศ. year system
- **ISO 29110** documents for software engineering theses
- **De-AI detection** for Thai text (30+ patterns)

---

**Built from real thesis writing experience. Tested against real university standards.**
