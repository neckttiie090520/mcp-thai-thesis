# Contributing | คู่มือการมีส่วนร่วม

> ยินดีต้อนรับทุกการมีส่วนร่วม — ตั้งแต่แก้ typo, เพิ่ม university profile, ไปจนถึงสร้าง tool ใหม่
> All contributions welcome — from typo fixes to new university profiles to entirely new tools.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Contribution Areas](#contribution-areas-สิ่งที่เราต้องการ) — 8 areas ranked by difficulty
3. [Thai Language Contributions](#thai-language-contributions-มีส่วนร่วมด้านภาษาไทย) — the most impactful area
4. [Code Style & Conventions](#code-style--conventions-กฎการเขียนโค้ด)
5. [Project Structure](#project-structure-โครงสร้างโปรเจกต์)
6. [Before Submitting a PR](#before-submitting-a-pr)
7. [Development Pathways](#development-pathways-ช่องทางการพัฒนา)

---

## Quick Start

```bash
# Clone
git clone https://github.com/nextzus/mcp-thai-thesis.git
cd mcp-thai-thesis

# Install & build
cd mcp-server
npm install
npm run build

# Verify
npm run typecheck
```

**Requirements:** Node.js ≥ 18.0.0, npm

---

## Contribution Areas / สิ่งที่เราต้องการ

Ranked from easiest to most advanced. Each area tells you **what** to do, **where** to edit, and **how** to verify.

---

### 1. 📝 Fix Typos & Improve Documentation (Beginner)

**What:** Fix typos, improve wording, add missing explanations in docs.

**Where to edit:**
| File type | Location |
|-----------|----------|
| Documentation | `docs/*.md` |
| README | `README.md`, `README.th.md` |
| Skill descriptions | `skills/*/SKILL.md` |
| Command definitions | `commands/*.md` |

**How to verify:** Read the file — no build step needed.

---

### 2. 🏛️ Add University Profile (Beginner)

**What:** Add a new Thai university with formatting rules, citation style, and year system.

**Where to edit:**

| Step | File | What to add |
|------|------|-------------|
| 1 | `config/university.yaml` | Profile block with all format rules |
| 2 | `mcp-server/src/utils/thai-text.ts` → `normalizeUniversityName()` | Name aliases (Thai, English, abbreviation) |
| 3 | `mcp-server/templates/universities/<name>.md` | Template file (optional) |
| 4 | `mcp-server/src/server.ts` → resource handler | Resource URI (optional) |

**Example profile:**
```yaml
mahidol:
  name_th: "มหาวิทยาลัยมหิดล"
  name_en: "Mahidol University"
  citation_style: "apa_name_year"
  year_system: "phc"              # phc = พ.ศ., ce = ค.ศ.
  font: "TH Sarabun New"
  font_size: 16
  line_spacing: 1.5
  margins:
    top: 1.5
    bottom: 1.0
    left: 1.5
    right: 1.0
  chapters:
    - "บทนำ"
    - "ทบทวนวรรณกรรม"
    - "ระเบียบวิธีวิจัย"
    - "ผลการวิจัย"
    - "สรุป อภิปราย และข้อเสนอแนะ"
```

**Example aliases:**
```ts
case "มหิดล": case "mahidol": case "mu": return "mahidol";
```

**How to verify:** `npm run typecheck` → test with `thai_thesis_init` tool call.

**Universities we need:**
- [ ] มหาวิทยาลัยมหิดล (Mahidol)
- [ ] มหาวิทยาลัยธรรมศาสตร์ (Thammasat)
- [ ] มหาวิทยาลัยสงขลานครินทร์ (PSU)
- [ ] มหาวิทยาลัยขอนแก่น (KKU)
- [ ] สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL)
- [ ] มหาวิทยาลัยศรีนครินทรวิโรฒ (SWU)

> 💡 **Tip:** ถ้าเป็นนักศึกษาจากมหาวิทยาลัยที่ยังไม่มี profile — ช่วยเพิ่มมหาวิทยาลัยของคุณได้เลย! ตรวจสอบจากคู่มือวิทยานิพนธ์ของมหาวิทยาลัย

---

### 3. 🔍 Add De-AI Patterns (Beginner → Intermediate)

**What:** Add new Thai or English AI-writing patterns that the system should detect and flag.

**Where to edit:** `mcp-server/src/utils/thai-text.ts`

**Thai patterns** → `THAI_BANNED_PATTERNS` array:
```ts
// Each entry needs these 4 fields:
{
  regex: /ก้าวสำคัญ/g,
  description: "Significance inflation — AI overvalues importance",
  category: "A",  // A=Content, B=Language, C=Chatbot, D=Filler, E=Structural
  replacement: "ใช้คำที่เจาะจงกว่า เช่น ระบุผลกระทบที่วัดได้"
}
```

**Pattern categories (A-E):**

| Category | What to look for | Examples |
|----------|-----------------|---------|
| A: Content | Significance inflation, promotional language, universal claims | "ก้าวสำคัญ", "พลิกโฉม", "ครอบคลุมทุกมิติ" |
| B: Language | Repetitive connectors, parallel structures, synonym cycling | "นอกจากนี้" ทุกย่อหน้า |
| C: Chatbot | Service language, self-referencing | "ยินดีช่วยเหลือ", "ในฐานะ AI" |
| D: Filler | Empty adverbs, unnecessary qualifiers | "อย่างแท้จริง", "ค่อนข้าง" |
| E: Structural | Uniform lengths, low burstiness, template artifacts | CV < 30, ย่อหน้าเท่ากันหมด |

**How to find new patterns:**
1. Generate text with multiple AI models (ChatGPT, Claude, Gemini) on thesis topics
2. Compare with human-written thesis prose
3. Identify recurring phrases/structures that humans rarely use
4. Verify the pattern doesn't appear in legitimate academic writing

**How to verify:** `npm run typecheck` → test with `thai_deai` tool call on sample text.

---

### 4. 📚 Improve Thai Academic Writing Knowledge (Intermediate) ⭐ Most Wanted

**What:** Enhance the system's understanding of Thai academic writing — sentence patterns, register rules, vocabulary, and writing conventions.

This is our **highest-priority** contribution area. Better Thai writing knowledge directly improves every tool in the system.

**Where to edit:**

| Knowledge area | File(s) to edit |
|---------------|----------------|
| Sentence patterns & examples | `skills/documentation-writer/SKILL.md` |
| Academic register rules | `skills/documentation-writer/SKILL.md` + `thai-text.ts` → `analyzeRegister()` |
| Thai typography rules | `thai-text.ts` → `checkThaiTypography()` |
| Chapter writing guidelines | `skills/thai-thesis-writing/SKILL.md` |
| De-AI rewriting rules | `skills/thai-de-ai/SKILL.md` |
| Reporting verbs | `skills/documentation-writer/SKILL.md` |
| Banned phrases | `thai-text.ts` → `THAI_BANNED_PATTERNS` |

**What we need — Thai sentence pattern contributions:**

<details>
<summary>📖 ประโยคเชิงวิชาการที่ต้องการเพิ่ม (click to expand)</summary>

#### ก. ประโยคนำเสนอข้อเท็จจริง (Factual Statement)
```
[สิ่งที่ศึกษา] + [กริยา] + [ข้อเท็จจริง/ผลลัพธ์]
```
- ตัวอย่าง: ระบบปฏิบัติการ Windows **มี**ค่าความหน่วงเริ่มต้นที่ไม่เหมาะสม

#### ข. ประโยคเชิงเหตุผล (Causal)
```
[เหตุ] + ส่งผลให้/ทำให้/จึง + [ผล]
เนื่องจาก/เพราะ + [เหตุ] + [ผล]
```

#### ค. ประโยคเปรียบเทียบ (Comparative)
```
[A] + มากกว่า/น้อยกว่า/สูงกว่า/ต่ำกว่า + [B]
[A] + เมื่อเทียบกับ/เปรียบเทียบกับ + [B]
```

#### ง. ประโยคอ้างอิง (Citation-integrated)
```
[ผู้แต่ง] ([ปี]) + [กริยารายงาน] + ว่า + [เนื้อหา]     ← narrative
[เนื้อหา] + ([ผู้แต่ง], [ปี])                              ← parenthetical
```

**กริยารายงาน (reporting verbs) ที่ต้องการเพิ่ม:**

| กลุ่ม | คำที่มีแล้ว | คำที่ต้องการเพิ่ม |
|------|------------|----------------|
| นำเสนอ | กล่าวว่า, ระบุว่า | อธิบายว่า, เปิดเผยว่า, ชี้แจงว่า |
| วิเคราะห์ | วิเคราะห์, ศึกษา | ประเมินว่า, ทดสอบว่า, ตรวจสอบว่า |
| สรุป | สรุปว่า, ชี้ให้เห็นว่า | ลงความเห็นว่า, ให้ข้อสรุปว่า |
| โต้แย้ง | โต้แย้งว่า | คัดค้านว่า, ท้าทายว่า, ตั้งข้อสังเกตว่า |
| ค้นพบ | พบว่า, ค้นพบว่า | เปิดเผยว่า, แสดงให้เห็นว่า, ยืนยันว่า |

#### จ. ประโยคนิยาม (Definition)
```
[คำศัพท์] + หมายถึง/คือ/หมายความว่า + [คำนิยาม]
```

#### ฉ. ประโยคแสดงวัตถุประสงค์ (Purpose/Objective)
```
เพื่อ + [กริยา] + [สิ่งที่ต้องการ]
มีวัตถุประสงค์ + เพื่อ + [กริยา]
```

#### ช. ประโยคแสดงขอบเขต (Scope)
```
งานวิจัยนี้ + มุ่งเน้น/จำกัดขอบเขต + [ขอบเขต]
```

#### ซ. ประโยคสมมติฐาน (Hypothesis)
```
H[n]: [ตัวแปรต้น] + มี/ส่งผล + [ตัวแปรตาม] + อย่างมีนัยสำคัญทางสถิติ
```

#### ญ. ประโยคเชื่อมโยง (Transitional)
```
จากที่กล่าวมาข้างต้น / ดังที่ได้กล่าวไว้ / ในส่วนถัดไป
```

#### ฎ. ประโยคสรุป (Conclusion)
```
ผลการศึกษา + แสดงให้เห็นว่า/บ่งชี้ว่า + [สรุป]
```

</details>

**What we need — Academic register contributions:**

| Area | What to contribute |
|------|-------------------|
| สรรพนาม | เพิ่มคู่ "ห้ามใช้ → ใช้แทน" สำหรับบริบทวิชาการ |
| คำเชื่อมต่อ | เพิ่มคำเชื่อมต่อที่เหมาะสม พร้อมบริบทการใช้งาน |
| คำกริยาทางการ | เพิ่มคำกริยาที่ใช้ในงานวิชาการ เช่น ดำเนินการ, พิจารณา |
| ภาษาเฉพาะสาขา | เพิ่มศัพท์เทคนิคสำหรับสาขาต่างๆ (วิศวกรรม, วิทยาศาสตร์, มนุษยศาสตร์) |
| ตัวอย่างจริง | ส่งตัวอย่างประโยคจากวิทยานิพนธ์จริงที่ได้รับการอนุมัติ |

**How to contribute Thai writing knowledge:**
1. ศึกษาจากคู่มือการเขียนวิทยานิพนธ์ของมหาวิทยาลัย
2. เก็บตัวอย่างจากวิทยานิพนธ์ที่ได้รับการอนุมัติแล้ว
3. จัดรูปแบบตาม pattern ใน SKILL.md (สูตร + ตัวอย่าง + สิ่งที่ต้องหลีกเลี่ยง)
4. เพิ่มใน skill file ที่เกี่ยวข้อง
5. ส่ง PR พร้อมระบุมหาวิทยาลัยและสาขาวิชาที่ pattern มาจาก

---

### 5. 🔧 Add or Improve MCP Tools (Intermediate → Advanced)

**What:** Create new tools or enhance existing tool capabilities.

**Where to edit:**

| Step | File | What to do |
|------|------|-----------|
| 1. Define schema | `mcp-server/src/server.ts` → `ListToolsRequestSchema` handler | Add JSON Schema for input params |
| 2. Add handler | `mcp-server/src/server.ts` → `CallToolRequestSchema` handler | Add `case "your_tool_name":` block |
| 3. Implement logic | `mcp-server/src/utils/<module>.ts` | Pure functions, no I/O |
| 4. Verify | Terminal | `npm run typecheck` + `npm run build` |
| 5. Test | MCP client (OpenCode) | Call the tool with test data |

**Tools we want to build:**

| Tool name | Priority | Description |
|-----------|----------|-------------|
| `thai_spell_check` | High | Basic Thai spell checking for academic text |
| `thesis_timeline` | Medium | Generate Gantt chart / timeline from project data |
| `thai_readability` | Medium | Readability score for Thai academic text |
| `thesis_glossary` | Low | Auto-generate glossary from thesis content |

**Key constraints for tool development:**
- All utility functions must be **pure** (no I/O, no side effects)
- Use `McpError` with `ErrorCode.InvalidParams` for input validation errors
- Use `unknown` instead of `any` — narrow explicitly
- Return results via `JSON.stringify(result, null, 2)`

---

### 6. 🧠 Add or Improve Skills (Intermediate)

**What:** Create new skills or enhance existing skill rules and workflows.

**Where to edit:** `skills/<skill-name>/SKILL.md`

**Skills are plain Markdown** — no compilation needed. They teach AI agents domain-specific rules, workflows, and judgment calls.

**What a good skill contains:**
1. **Scope** — what the skill covers and doesn't cover
2. **Rules** — clear, numbered rules the agent must follow
3. **Workflows** — step-by-step procedures
4. **Examples** — real input/output pairs
5. **Integration points** — which MCP tools the skill uses

**Skills we want to build:**

| Skill name | Purpose |
|-----------|---------|
| `thai-readability` | Thai readability scoring and improvement suggestions |
| `thesis-defense-prep` | Defense preparation — anticipated questions, presentation structure |
| `field-specific-vocab` | Domain-specific vocabulary for engineering, science, humanities |

---

### 7. ⚡ Add Commands (Beginner → Intermediate)

**What:** Create new slash commands as user-facing entry points.

**Where to edit:** `commands/<command-name>.md`

**Format:**
```markdown
---
description: Brief description of what this command does
agent: (optional) specific agent to use
---

1. First step the agent should take
2. Second step...
3. ...
```

**Commands we want:**
- [ ] `/thesis-glossary` — Auto-generate terminology glossary
- [ ] `/thesis-defense` — Defense preparation checklist
- [ ] `/thesis-progress` — Show overall thesis completion status

---

### 8. 🏗️ Infrastructure Improvements (Advanced)

**What:** Server architecture, test suite, CI/CD, performance.

| Area | What to do | Where |
|------|-----------|-------|
| Refactor server.ts | Split ~1,848 lines into domain modules | `mcp-server/src/` |
| Add test suite | Unit tests with vitest or node:test | `mcp-server/src/__tests__/` |
| CI/CD | GitHub Actions: typecheck + build + test | `.github/workflows/` |
| Documentation site | VitePress or Docusaurus | `docs-site/` |
| Performance | Optimize pattern matching for large texts | `utils/thai-text.ts` |

---

## Thai Language Contributions / มีส่วนร่วมด้านภาษาไทย

> ⭐ **This is the area where contributions have the most impact.** Every improvement to Thai language knowledge makes all 11 tools and 7 skills smarter.

### What we need most

| Priority | Area | Impact |
|----------|------|--------|
| 🔴 Critical | More sentence patterns + real examples | Improves all chapter generation |
| 🔴 Critical | Field-specific vocabulary (วิศวกรรม, วิทยาศาสตร์, มนุษยศาสตร์) | Enables multi-discipline support |
| 🟡 High | More banned AI patterns from real Thai AI outputs | Improves de-AI accuracy |
| 🟡 High | University-specific writing conventions | Improves per-university compliance |
| 🟢 Medium | More reporting verbs with usage examples | Improves citation integration |
| 🟢 Medium | Thai academic connectors with context rules | Improves paragraph flow |

### How to contribute Thai knowledge

**Option A: Add patterns to skill files (easiest)**

Edit the relevant `SKILL.md` file directly. Use this format:
```markdown
#### [Pattern Name]
**สูตร:** [subject] + [verb pattern] + [object/complement]
**ตัวอย่าง:**
- ผลการวิจัย**แสดงให้เห็นว่า**ค่า latency ลดลงร้อยละ 23
- การทดสอบ**บ่งชี้ว่า**ความแตกต่างมีนัยสำคัญทางสถิติ

**⚠️ หลีกเลี่ยง:** [anti-pattern example]
**ที่มา:** [university name, field, or thesis reference]
```

**Option B: Add detection rules to MCP server (intermediate)**

Add patterns to `thai-text.ts` for automated detection:
```ts
// In analyzeRegister() or checkThaiTypography()
// Each rule: { regex, description, severity, suggestion }
```

**Option C: Submit real thesis examples (any level)**

Send us anonymized examples of:
- Paragraphs from approved Thai theses (with university and field noted)
- Before/after examples from advisor feedback
- Common errors that advisors flag

These help us calibrate patterns and improve register analysis.

---

## Code Style & Conventions / กฎการเขียนโค้ด

### TypeScript Rules

| Rule | Details |
|------|---------|
| Module system | ES modules (`import`/`export`). Never `require()` |
| Import extensions | `.js` extension required in relative imports |
| Indentation | 2 spaces |
| File naming | `kebab-case.ts` (e.g., `thai-text.ts`) |
| Type naming | `PascalCase` (e.g., `SourceMeta`) |
| Function naming | `camelCase` (e.g., `formatBibEntry`) |
| Constant naming | `UPPER_SNAKE_CASE` (e.g., `THAI_BANNED_PATTERNS`) |
| Tool naming | `snake_case` matching MCP schema (e.g., `thai_thesis_init`) |
| Avoid `any` | Use `unknown` + explicit narrowing |
| Error handling | `McpError` with `ErrorCode` in tool handlers, never plain `Error` |
| Thai text rule | No period `.` at end of Thai sentences |

### Skill/Command Rules

| Rule | Details |
|------|---------|
| YAML front matter | Keep `description` and `agent` fields intact |
| Step structure | Numbered steps — these are agent execution instructions |
| Unverified rules | Mark with `[VERIFY REQUIRED]` |
| No fabrication | Never invent citations, statistics, or institutional requirements |

### Banned phrases in Thai prose

These phrases should never appear in AI skill outputs:

| Category | Examples |
|----------|---------|
| Overused connectors | "นอกจากนี้" (if used >1/page) |
| Promotional | "ก้าวสำคัญ", "พลิกโฉม", "ล้ำสมัย" |
| Empty closers | "ซึ่งจะเป็นประโยชน์ต่อไปในอนาคต" |
| Exaggeration | "ปฏิวัติวงการ", "เปลี่ยนโลก" |

---

## Project Structure / โครงสร้างโปรเจกต์

```
mcp-thai-thesis/
├── mcp-server/                    # 🔧 MCP Server (TypeScript)
│   ├── src/
│   │   ├── server.ts              #   Tool definitions + handlers (~1,200 lines)
│   │   └── utils/
│   │       ├── thai-text.ts       #   Thai text analysis engine (674 lines)
│   │       └── citation.ts        #   APA citation engine (685 lines)
│   ├── templates/
│   │   ├── universities/          #   5 university format templates
│   │   ├── iso/                   #   6 ISO 29110 document templates
│   │   └── deai/                  #   De-AI pattern reference
│   ├── package.json
│   └── tsconfig.json
├── skills/                        # 🧠 7 AI skill definitions
│   ├── thai-thesis-writing/       #   Chapter drafting workflow
│   ├── documentation-writer/      #   Thai academic prose + de-AI
│   ├── thesis-orchestrator/       #   Multi-agent routing
│   ├── iso29110-docs/             #   ISO document generation
│   ├── thai-de-ai/                #   AI fingerprint detection
│   ├── thai-citation-manager/     #   APA citation management
│   └── thesis-quality-gate/       #   8-gate quality checklist
├── commands/                      # 💬 9 slash command definitions
├── agents/                        # 🤖 Agent definitions
├── config/
│   └── university.yaml            # 🏛️ University profiles
├── docs/                          # 📖 Documentation (you are here)
├── README.md                      # English README
├── README.th.md                   # Thai README
└── LICENSE                        # MIT
```

### Quick edit map

| I want to... | Edit this |
|--------------|-----------|
| Add university | `config/university.yaml` + `thai-text.ts` |
| Add AI banned pattern | `thai-text.ts` → `THAI_BANNED_PATTERNS` |
| Add citation source type | `citation.ts` → `formatBibEntry()` |
| Add MCP tool | `server.ts` (schema + handler) + `utils/` |
| Add skill | `skills/<name>/SKILL.md` |
| Add command | `commands/<name>.md` |
| Add resource | `server.ts` resource handlers |
| Add Thai sentence pattern | `skills/documentation-writer/SKILL.md` |
| Add register rule | `thai-text.ts` → `analyzeRegister()` |
| Add typography rule | `thai-text.ts` → `checkThaiTypography()` |
| Change scoring weights | `server.ts` → `thesis_score` handler |
| Change quality gates | `server.ts` → `thesis_audit` handler |

---

## Before Submitting a PR

### Checklist

```bash
cd mcp-server
npm run typecheck   # ต้องผ่าน
npm run build       # ต้องผ่าน
```

- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] No `dist/` or `node_modules/` in commit
- [ ] Commit message is imperative: `Add Mahidol university profile`
- [ ] If adding university → tested with `thai_thesis_init` tool call
- [ ] If adding pattern → tested with `thai_deai` tool call
- [ ] If adding tool → tested with direct MCP tool call
- [ ] If adding Thai knowledge → includes source (university, field, or reference)

### Commit message format

```
<verb> <what you changed>

Examples:
Add Mahidol university profile
Fix เว้นวรรค detection for double spaces
Improve chapter 3 structure template
Add 5 new banned AI patterns (category B)
Update thesis-writing skill with CMU register rules
```

---

## Development Pathways / ช่องทางการพัฒนา

### Where to start based on your expertise

| Your background | Best starting contribution |
|----------------|--------------------------|
| Thai thesis student | University profile + Thai writing patterns |
| Thai language expert | Register rules + sentence patterns + vocabulary |
| TypeScript developer | MCP tools + server refactoring + test suite |
| AI/NLP researcher | De-AI patterns + detection algorithms |
| Documentation writer | Improve docs + add examples |

### Feature roadmap

| Phase | Features | Status |
|-------|----------|--------|
| **v1.1** (short-term) | More universities, more patterns, test suite | 🔄 In progress |
| **v1.5** (mid-term) | Thai spell checker, server refactoring, CI/CD | 📋 Planned |
| **v2.0** (long-term) | Plugin system, GUI dashboard, Word/PDF export | 💭 Future |

See [ROADMAP.md](ROADMAP.md) for full details.

---

## License

MIT — see [LICENSE](../LICENSE)

---

## See Also

| Document | Content |
|----------|---------|
| [CAPABILITIES.md](CAPABILITIES.md) | Complete reference for all tools, skills, commands, resources |
| [SKILLS-GUIDE.md](SKILLS-GUIDE.md) | Detailed documentation of each skill |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 3-layer system architecture |
| [WORKFLOW.md](WORKFLOW.md) | 7 pipeline diagrams (A–G) |
| [EXAMPLES.md](EXAMPLES.md) | Real outputs from thesis project |
| [ROADMAP.md](ROADMAP.md) | Future development plans |
| [GETTING-STARTED.md](GETTING-STARTED.md) | Installation & first steps |
