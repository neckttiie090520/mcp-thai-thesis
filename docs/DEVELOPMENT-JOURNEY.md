# Development Journey / เส้นทางการพัฒนา

How this project was built, the problems it solved, and the lessons learned.

---

## The Problem

Writing a Thai M.Sc. thesis in Software Engineering involves:

1. **Thai academic writing** with strict register requirements (ภาษาทางการระดับวิชาการ)
2. **APA citations in Buddhist Era** -- Thai authors use พ.ศ., English authors use ค.ศ., and you must never mix them incorrectly
3. **University-specific formatting** -- each university has its own template, margins, fonts, chapter structure
4. **ISO 29110 documentation** -- software theses need 6-10 ISO documents as appendices
5. **De-AI compliance** -- thesis committees increasingly check for AI-generated content
6. **Cross-document consistency** -- numbers, terms, and facts must match across 7+ chapters and 10+ appendices

No existing tool addressed all of these simultaneously for Thai theses. The author needed a system that could check all of these in a single pipeline.

---

## Timeline

### Phase 1: MCP Server (Core Engine)

**What was built**: A TypeScript MCP server (`server.ts`, 1,848 lines) with two utility modules:
- `thai-text.ts` (674 lines) -- Thai text analysis, burstiness calculation, banned pattern detection, register scoring, typography checking
- `citation.ts` (685 lines) -- APA citation formatting, bibliography generation, citation audit, metadata validation

**Key design decisions**:
- **MCP protocol over REST API**: MCP integrates directly with AI coding tools (OpenCode, Claude Desktop). No need for a separate web server, authentication, or deployment. The tool runs locally via stdio.
- **Zero external dependencies** (beyond MCP SDK): No NLP libraries, no databases, no API keys. All text analysis is done with regex and string operations. This makes it fast, portable, and predictable.
- **Pure utility functions**: All business logic in `utils/` is side-effect-free. Input goes in, output comes out. No file I/O, no network calls. This makes the code easy to test and reason about.
- **Monolithic server.ts**: All 11 tool definitions and handlers in one file. Not ideal for large teams, but practical for a thesis project where one person needs to find and modify things quickly.

**Technical details**:
- TypeScript strict mode with `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`
- ES modules with `.js` extension imports (Node16 resolution)
- `McpError` with typed error codes for all validation failures
- JSON.stringify with 2-space indent for all tool responses

### Phase 2: Skills (Knowledge Layer)

**Problem**: The MCP server provides processing, but it doesn't know *when* to use which tool, *what rules* to apply, or *how* to interpret results. That knowledge needed to live somewhere.

**Solution**: Skills -- markdown files that encode domain knowledge as structured instructions for AI agents.

**Skills created** (total ~4,335 lines of markdown):

| Skill | Lines | What it encodes |
|-------|-------|----------------|
| `documentation-writer` | 1,235 | Thai academic prose rules, ราชบัณฑิตยสถาน conventions, register scoring rubric, de-AI techniques, ISO document writing guidelines |
| `thai-thesis-writing` | 625 | Chapter structure for 5-chapter and 7-chapter theses, section requirements, cross-reference patterns, writing workflow |
| `iso29110-docs` | 425 | All 10 ISO 29110 document structures, section requirements, bilingual formatting rules |
| `thesis-orchestrator` | 356 | Pipeline routing logic (which tool to call when), agent coordination patterns |
| `thai-de-ai` | 326 | 30-pattern framework details, burstiness thresholds, humanization strategies |
| `thai-citation-manager` | 309 | APA นาม-ปี rules, Thai/English author handling, year system logic |
| `thesis-quality-gate` | 264 | 8-gate pre-submission checklist, scoring criteria, pass/fail thresholds |

**Key insight**: Skills are more effective than fine-tuned prompts because they can be loaded on demand, combined, and updated independently. They also make the system transparent -- anyone can read a SKILL.md file and understand exactly what rules are being applied.

### Phase 3: Commands (User Interface)

**9 slash commands** created as markdown files in `.opencode/commands/`:

```
/thesis-init       → start a project
/thesis-chapter    → write/revise a chapter
/thesis-audit      → full 8-gate quality check
/thesis-review     → advisor/committee review
/thesis-deai       → AI pattern detection
/thesis-score      → quick scoring
/thesis-format     → university formatting
/thesis-rewrite    → full rewrite
/iso-docs          → ISO document generation
```

Each command defines a multi-step workflow that loads appropriate skills and calls MCP tools in sequence.

### Phase 4: Real-World Testing

The entire system was tested by using it to produce a real thesis:

**Thesis**: "Windows OS Latency Reduction Software to Enhance FPS Game Player Skills"
**Program**: M.Sc. Software Engineering, CAMT, Chiang Mai University
**Output produced**:
- 7 thesis chapters (บทที่ 1-5 + abstract TH/EN)
- 6 appendices (ภาคผนวก ก-ฉ, ISO 29110 documents)
- 1 bibliography (บรรณานุกรม)
- 1 citation audit report
- ~80% content completion, ~60% final-submission readiness
- 244 remaining placeholders ([TBD], [CITATION NEEDED], [VERIFY REQUIRED])

**Issues found and fixed during testing**:
- Year system mixing (พ.ศ./ค.ศ.) in citations -- the audit tool caught 12 instances
- Register violations in Thai prose -- the de-AI tool flagged informal language
- Structural gaps -- the audit tool identified missing sections in chapters 3 and 4
- ISO document cross-reference inconsistencies

### Phase 5: Open-Source Packaging

**Problem**: The original system included Windows optimization tools (for the thesis topic) mixed with thesis writing tools. It also had university-specific hardcoding for CMU.

**Changes for open-source**:
- Removed 5 Windows optimization tools (16 → 11 thesis-only tools)
- Removed `utils/windows-opt.ts` (477 lines)
- Made university selection configurable (5 profiles, extensible via YAML)
- Removed CMU-specific hardcoding from skills
- Added comprehensive documentation (this repo)
- Added MIT license

---

## Architecture Evolution

### What we tried and changed

**Agent-per-domain (abandoned)**: Initially, we created 11 separate agents (thesis-orchestrator, thai-writer, thesis-advisor, thesis-auditor, thai-editor, docwriter, citation-checker, iso-auditor, deep-research, senior-dev, junior-dev). This was over-engineered. Most agents did the same thing: read a skill file and call MCP tools. We consolidated to 2 agents (thesis-reviewer + dev) and moved domain knowledge into skills.

**Skill-based architecture (current)**: Skills contain the knowledge. The AI model reads a skill file and knows what to do. MCP tools provide the processing. Commands define the user-facing workflow. This is simpler and more maintainable.

```
Before (11 agents):
  user → orchestrator → thai-writer → MCP tools
                      → thesis-advisor → MCP tools
                      → citation-checker → MCP tools
                      → ... (8 more agents)

After (2 agents + skills):
  user → build-main (loads skills on demand) → MCP tools
       → thesis-reviewer (subagent for review tasks) → MCP tools
```

---

## Lessons Learned

1. **Skills > Agents for domain knowledge**: Markdown skill files are easier to write, debug, and share than agent configurations. They're also more transparent.

2. **Pure functions are worth the discipline**: Every function in `thai-text.ts` and `citation.ts` takes data in and returns data out. No side effects. This made debugging straightforward.

3. **MCP protocol is underrated for local tools**: Running via stdio means zero deployment overhead. The tool starts instantly and works offline.

4. **Honest metrics matter**: The previous version of this repo claimed "94% accuracy tested against 500+ documents." We tested against 1 real thesis. That's honest, and it's enough to show the tools work. Fabricated metrics undermine credibility.

5. **Thai text analysis doesn't need NLP libraries**: Regex-based pattern matching catches the most common issues (banned phrases, burstiness, register violations) reliably. A full NLP pipeline would add complexity without proportional benefit for this use case.

6. **244 placeholders is normal**: A thesis-writing tool that leaves gaps is more honest than one that fills them with fabricated content. The placeholders ([CITATION NEEDED], [TBD]) tell the user exactly what still needs human work.

---

## Code Statistics

| Component | Files | Lines | Language |
|-----------|-------|-------|----------|
| MCP Server | 3 | 3,207 | TypeScript |
| Skills | 7 | 4,335 | Markdown |
| Commands | 9 | ~900 | Markdown |
| Agents | 2 | ~200 | Markdown |
| Documentation | 10+ | ~3,000 | Markdown |
| **Total** | ~31 | ~11,642 | |

The entire system is small enough for one person to understand completely. That is intentional.
