# Contributing | คู่มือการมีส่วนร่วม

> ยินดีต้อนรับทุกการมีส่วนร่วม — ตั้งแต่แก้ typo จนถึงเพิ่ม university profile ใหม่
> All contributions welcome — from typo fixes to new university profiles.

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

---

## สิ่งที่เราต้องการ | What We Need

### 1. เพิ่ม University Profile (ง่ายที่สุด)

เพิ่มมหาวิทยาลัยใหม่ใน `config/university.yaml`:

```yaml
your_university:
  name_th: "มหาวิทยาลัย..."
  name_en: "... University"
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
```

จากนั้นเพิ่มชื่อใน `mcp-server/src/server.ts` ฟังก์ชัน `normalizeUniversityName()`.

### 2. เพิ่ม De-AI Patterns

เพิ่ม banned patterns ใน `mcp-server/src/utils/thai-text.ts`:

- **Thai patterns** — เพิ่มใน array `THAI_BANNED_PATTERNS`
- **English patterns** — เพิ่มใน array ที่เกี่ยวข้อง
- ทุก pattern ต้องมี: regex, คำอธิบาย, หมวดหมู่ (A-E), คำแนะนำทดแทน

### 3. เพิ่ม MCP Tool ใหม่

1. เพิ่ม schema ใน `ListToolsRequestSchema` handler (`server.ts`)
2. เพิ่ม `case` ใน `CallToolRequestSchema` handler
3. เพิ่ม business logic ใน `src/utils/` (ไฟล์ใหม่หรือไฟล์เดิม)
4. รัน `npm run typecheck`
5. ทดสอบด้วย OpenCode tool call

### 4. เพิ่ม Skill ใหม่

สร้างไดเรกทอรีใหม่ใน `skills/your-skill/SKILL.md` ตามรูปแบบ skill ที่มีอยู่
ดู [SKILLS-GUIDE.md](SKILLS-GUIDE.md) สำหรับโครงสร้าง

### 5. แก้ Bug / ปรับปรุง

- แก้ typo ในเอกสาร
- ปรับปรุง error messages
- เพิ่ม test cases
- ปรับปรุง TypeScript types

---

## กฎการเขียนโค้ด | Code Style

| หัวข้อ | กฎ |
|--------|-----|
| Module system | ES modules (`import`/`export`), ไม่ใช้ `require()` |
| Import extensions | ต้องมี `.js` ใน relative imports |
| Indentation | 2 spaces |
| Naming | files: `kebab-case.ts`, types: `PascalCase`, functions: `camelCase` |
| Types | หลีกเลี่ยง `any` — ใช้ `unknown` + narrow |
| Errors | ใช้ `McpError` ใน tool handlers, ไม่ใช้ `Error` ธรรมดา |
| Thai text | ไม่ใส่จุด `.` ท้ายประโยคภาษาไทย |

---

## ก่อน Submit PR

```bash
cd mcp-server
npm run typecheck   # ต้องผ่าน
npm run build       # ต้องผ่าน
```

- [ ] typecheck ผ่าน
- [ ] build ผ่าน
- [ ] ไม่มีไฟล์ `dist/` หรือ `node_modules/` ใน commit
- [ ] commit message เป็น imperative: `Add Mahidol university profile`
- [ ] ถ้าเพิ่ม university — ทดสอบด้วย `thai_thesis_init` tool call

---

## โครงสร้างโปรเจกต์ | Project Structure

```
mcp-thai-thesis/
├── mcp-server/
│   ├── src/
│   │   ├── server.ts          # tool definitions + handlers
│   │   └── utils/
│   │       ├── thai-text.ts   # Thai text analysis
│   │       └── citation.ts    # APA citation engine
│   ├── templates/             # university + ISO templates
│   ├── package.json
│   └── tsconfig.json
├── skills/                    # 7 AI skill definitions
├── commands/                  # 9 slash commands
├── agents/                    # agent definitions
├── config/
│   └── university.yaml        # university profiles
├── docs/                      # documentation
├── README.md
└── LICENSE                    # MIT
```

---

## License

MIT — ดู [LICENSE](../LICENSE)

---

## ดูเพิ่มเติม | See Also

- [ROADMAP.md](ROADMAP.md) — แผนพัฒนาในอนาคต
- [ARCHITECTURE.md](ARCHITECTURE.md) — สถาปัตยกรรมระบบ
- [GETTING-STARTED.md](GETTING-STARTED.md) — เริ่มต้นใช้งาน
