# Architecture

## System Overview

MCP Thai Thesis is a three-layer system: **MCP Server** (tools), **Skills** (knowledge), and **Commands** (user interface). Each layer has a distinct role and they communicate through well-defined interfaces.

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface Layer                      │
│                                                               │
│  Slash Commands          AI Agent Chat         Direct Tool    │
│  /thesis-audit           "ช่วยตรวจบทที่ 2"      thai_deai()   │
│  /thesis-score           "audit my chapter"                   │
│  /iso-docs                                                    │
└───────────────┬──────────────────┬──────────────┬────────────┘
                │                  │              │
                v                  v              v
┌─────────────────────────────────────────────────────────────┐
│                      Knowledge Layer                         │
│                                                               │
│  Skills (loaded on demand by AI agents)                       │
│  ┌─────────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │ thai-thesis-     │  │ documentation│  │ thai-de-ai     │  │
│  │ writing          │  │ -writer      │  │                │  │
│  │                  │  │              │  │ 30-pattern     │  │
│  │ 10-stage thesis  │  │ 13 writing   │  │ framework      │  │
│  │ workflow         │  │ workflows    │  │ burstiness     │  │
│  │ chapter-by-      │  │ 30-pattern   │  │ soul injection │  │
│  │ chapter guide    │  │ de-AI master │  │                │  │
│  └─────────────────┘  └──────────────┘  └────────────────┘  │
│  ┌─────────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │ thai-citation-   │  │ iso29110-    │  │ thesis-quality │  │
│  │ manager          │  │ docs         │  │ -gate          │  │
│  │                  │  │              │  │                │  │
│  │ APA นาม-ปี       │  │ 10 document  │  │ 8-gate QA     │  │
│  │ Thai/English     │  │ types        │  │ framework      │  │
│  │ audit pipeline   │  │ bilingual    │  │ pre-submission │  │
│  └─────────────────┘  └──────────────┘  └────────────────┘  │
│  ┌─────────────────┐                                         │
│  │ thesis-          │                                         │
│  │ orchestrator     │                                         │
│  │                  │                                         │
│  │ multi-agent      │                                         │
│  │ routing          │                                         │
│  │ 7 exec patterns  │                                         │
│  └─────────────────┘                                         │
└───────────────┬──────────────────────────────────────────────┘
                │
                v
┌─────────────────────────────────────────────────────────────┐
│                      Processing Layer                        │
│                                                               │
│  MCP Server (TypeScript, Stdio transport)                     │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ server.ts — Tool definitions + handlers                  │ │
│  │                                                           │ │
│  │  11 Tools:                                                │ │
│  │  thai_thesis_init    thai_thesis_chapter   thai_format    │ │
│  │  thai_deai           thai_citation                        │ │
│  │  iso_document        thesis_review         thesis_audit   │ │
│  │  thesis_score        thesis_consistency                    │ │
│  │  thesis_traceability                                      │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌──────────────────┐  ┌──────────────────┐                  │
│  │ thai-text.ts      │  │ citation.ts       │                  │
│  │ (674 lines)       │  │ (685 lines)       │                  │
│  │                    │  │                    │                  │
│  │ analyzeSentence   │  │ formatInTextCite  │                  │
│  │ Lengths()         │  │ formatBibEntry()  │                  │
│  │ detectThaBanned   │  │ formatBiblio()    │                  │
│  │ Patterns()        │  │ auditCitations()  │                  │
│  │ analyzeRegister() │  │ validateSource    │                  │
│  │ checkThaiTypo()   │  │ Meta()            │                  │
│  │ detectYearSystem  │  │ renderAudit       │                  │
│  │ Mixing()          │  │ Report()          │                  │
│  │ scanThaiText()    │  │                    │                  │
│  └──────────────────┘  └──────────────────┘                  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 9 Resources (read-only data served to clients)           │ │
│  │                                                           │ │
│  │ templates://chulalongkorn   patterns://deai-thai          │ │
│  │ templates://kasetsart       patterns://deai-english        │ │
│  │ templates://kmutt           scoring://rubric               │ │
│  │ templates://chiangmai       scoring://quality-gate         │ │
│  │ templates://generic                                        │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Templates (on disk)                                       │ │
│  │                                                           │ │
│  │ templates/universities/  — 5 university format profiles   │ │
│  │ templates/iso/           — 6 ISO 29110 document templates │ │
│  │ templates/deai/          — De-AI pattern reference         │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## How Components Interact

### Tool Call Flow

When a user (or AI agent) calls a tool, here is the execution path:

```
User: "ตรวจสอบข้อความนี้ว่ามีลายนิ้วมือ AI หรือไม่"

Agent loads skill: thai-de-ai
  → Understands 30-pattern framework
  → Knows scan/edit/rewrite modes
  → Knows what to look for

Agent calls MCP tool: thai_deai(text, mode="detect")
  → server.ts receives request
  → Calls analyzeSentenceLengths(text)     → burstiness stats
  → Calls detectThaBannedPatterns(text)    → pattern matches
  → Calls analyzeRegister(text)            → register analysis
  → Calls checkThaiTypography(text)        → typography issues
  → Calls detectYearSystemMixing(text)     → year system check
  → Assembles markdown report
  → Returns to agent

Agent interprets report using skill knowledge
  → Adds context-specific recommendations
  → Returns structured output to user
```

### Skill + Tool Relationship

Skills and tools serve different purposes:

| Aspect | MCP Tools | Skills |
|--------|-----------|--------|
| What they are | Functions with defined inputs/outputs | Instruction documents for AI agents |
| Where they run | MCP server process (TypeScript) | Inside the AI agent's context |
| What they know | Algorithms, patterns, templates | Domain expertise, workflow rules, judgment |
| Speed | Fast (milliseconds) | Slow (requires LLM reasoning) |
| Determinism | Same input → same output | May vary based on context |

**They work together:** A skill tells the agent *what to check and why*. A tool *does the checking*. The agent uses skill knowledge to *interpret the results*.

Example: The `thai-citation-manager` skill knows that Thai bibliography entries should be sorted before English entries. The `thai_citation` tool implements the sorting algorithm. The skill tells the agent when to call the tool and how to handle edge cases the tool cannot detect.

---

## Utility Module Design

All utility modules follow the same design principles:

1. **Pure functions** -- No I/O, no side effects. Input data, return data.
2. **Explicit types** -- Every exported function has TypeScript types and JSDoc.
3. **Domain constants** -- Lookup tables and pattern arrays live alongside the functions that use them.
4. **Composable** -- Small functions that can be combined (e.g., `scanThaiText()` calls all 5 analysis functions).

### thai-text.ts — 674 Lines

The Thai text analysis engine. Key capabilities:

| Function Group | Functions | Purpose |
|---------------|-----------|---------|
| Burstiness | `analyzeSentenceLengths`, `formatBurstinessReport` | Measure sentence-length variation (CV >= 30% = human) |
| Banned Patterns | `detectThaBannedPatterns`, `formatBannedPatternReport` | Scan for 30+ Thai AI-writing patterns |
| Register | `analyzeRegister` | Check formal vs. informal Thai usage |
| Typography | `checkThaiTypography`, `formatTypographyReport` | Detect 5 Thai typography errors |
| Year System | `convertYearsInText`, `detectYearSystemMixing`, `ceToBE`, `beToCE` | Year conversion and mixing detection |
| University | `normalizeUniversityName`, `universityDisplayName` | Map 23 aliases to 5 canonical university keys |
| Composite | `scanThaiText`, `formatComprehensiveReport` | Run all analyses in one call |

**Banned Pattern Categories (30+ patterns):**

| Category | Count | Example |
|----------|-------|---------|
| Filler phrases | 10 | "นอกจากนี้", "ในขณะเดียวกัน" |
| Significance inflation | 9 | "ก้าวสำคัญ", "นับเป็นสิ่งสำคัญ" |
| Marketing language | 9 | "ล้ำสมัย", "พลิกโฉม", "ปฏิวัติวงการ" |
| Generic AI endings | 5 | "ซึ่งจะเป็นประโยชน์ต่อไปในอนาคต" |
| Stacked hedging | 3 | "อาจจะเป็นไปได้ว่า" |
| Repetitive openers | 3 | Consecutive "นอกจากนี้", "อีกทั้ง" |

### citation.ts — 685 Lines

The APA citation engine. Key capabilities:

| Function Group | Functions | Purpose |
|---------------|-----------|---------|
| Citation | `formatInTextCitation`, `formatMultipleCitations`, `narrativeCite`, `parentheticalCite` | Generate in-text citations |
| Bibliography | `formatBibEntry`, `formatBibliography` | Format bibliography entries (6 source type formatters) |
| Audit | `auditCitations`, `renderAuditReport` | Cross-check citations vs. bibliography |
| Validation | `validateSourceMeta` | Validate source metadata completeness |
| Utilities | `displayYear`, `isThaiName`, `authorSurnameDisplay`, `formatInTextAuthors` | Name/year handling helpers |

**Source Types:**

| Type | Required Fields |
|------|----------------|
| book | authors, year, title, publisher |
| journal | authors, year, title, journal, volume |
| conference | authors, year, title, source (proceedings) |
| thesis | authors, year, title, publisher (university) |
| website | authors, year, title, url |
| report | authors, year, title, publisher |
| other | authors, year, title |

---

## Resource System

MCP Resources are read-only data endpoints that clients can query. The server exposes 9 resources:

### University Templates (5)

Each returns a JSON object with:
- `fonts` — Thai and English font specifications
- `margins` — Page margins (inches)
- `lineSpacing` — Line spacing multiplier
- `yearFormat` — Default year system (Buddhist/Common Era)
- `citationStyle` — Citation format standard
- `chapters` — Array of chapter names in Thai

### Pattern Resources (2)

- `patterns://deai-thai` — Full array of 30+ Thai banned patterns with categories and replacements
- `patterns://deai-english` — Three tiers of English AI-fingerprint words ranked by overuse frequency (Tier 1: 200-700x, Tier 2: 100-200x, Tier 3: 50-100x)

### Scoring Resources (2)

- `scoring://rubric` — 6-dimension 100-point scoring rubric with 5 levels per dimension
- `scoring://quality-gate` — 8-gate pre-submission quality framework with pass/fail criteria

---

## Design Decisions

### Why Stdio Transport?

The MCP server uses stdio (standard I/O) rather than HTTP. This means:
- The MCP client spawns the server as a subprocess
- Communication happens through stdin/stdout
- No network ports, no authentication needed
- Works offline, works on any machine with Node.js

### Why No External Dependencies?

The server has exactly one runtime dependency: `@modelcontextprotocol/sdk`. Everything else (Thai text analysis, citation formatting, ISO templates) is implemented from scratch. This was intentional:
- No dependency on external Thai NLP libraries (which may not support thesis-specific patterns)
- No risk of breaking changes from upstream packages
- Complete control over detection algorithms
- Smaller attack surface

### Why Skills Instead of More Tools?

Some logic lives in skills rather than tools because it requires judgment, not computation:
- Deciding whether a paragraph needs full rewrite or just editing → skill judgment
- Routing a complex request to the right sequence of tools → orchestrator skill
- Knowing when to flag `[VERIFY REQUIRED]` vs. making an assumption → domain knowledge in skill

Tools handle the deterministic parts. Skills handle the contextual reasoning.

### Why Separate Thai and English De-AI Patterns?

Thai and English AI writing have different fingerprints:
- Thai AI tends toward significance inflation ("ก้าวสำคัญ") and marketing language ("ล้ำสมัย")
- English AI tends toward specific vocabulary overuse ("delve", "leverage", "multifaceted")
- Thai typography errors (missing space before ๆ) are unique to Thai
- Sentence rhythm analysis needs different thresholds for Thai vs. English

---

## File Size Reference

| File | Lines | Role |
|------|-------|------|
| `server.ts` | ~1,200* | Tool definitions, handlers, helpers |
| `thai-text.ts` | 674 | Thai text analysis engine |
| `citation.ts` | 685 | APA citation engine |
| Skills (7 total) | ~4,400 | Domain knowledge and workflows |
| Commands (9 total) | ~1,300 | User interface definitions |
| Templates | ~800 | University + ISO + de-AI reference files |

*Server line count is for the thesis-only version without Windows optimizer tools.

---

## Extension Points

### Adding a New University Profile

1. Add formatting constants to `UNIVERSITY_PROFILES` in `server.ts`
2. Add alias mappings in `normalizeUniversityName()` in `thai-text.ts`
3. Create a template file in `templates/universities/`
4. Add the resource URI in the resource handler

### Adding a New Tool

1. Define the JSON Schema in `ListToolsRequestSchema` handler
2. Add the `case` in `CallToolRequestSchema` handler
3. Implement logic in appropriate utility module
4. Run `npm run typecheck`

### Adding a New Skill

1. Create `skills/<skill-name>/SKILL.md`
2. Define the skill's scope, rules, and integration points
3. Register in your MCP client's skill configuration
