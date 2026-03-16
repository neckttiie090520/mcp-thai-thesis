# Workflow Pipelines / ขั้นตอนการทำงาน

เอกสารนี้อธิบาย pipeline หลัก 7 แบบของ MCP Thai Thesis และวิธีที่ข้อมูลไหลผ่านระบบ

This document describes the 7 core pipelines and how data flows through the system.

---

## How the System Works

```
You (write thesis)
    │
    ▼
OpenCode / Claude Desktop / MCP Client
    │
    ├── loads Skills (workflow rules)
    ├── runs Commands (slash commands)
    │
    ▼
MCP Server (stdio, JSON-RPC 2.0)
    │
    ├── server.ts (tool dispatcher)
    ├── thai-text.ts (Thai analysis)
    └── citation.ts (APA engine)
    │
    ▼
Structured JSON response → displayed to you
```

Key point: **Skills provide the intelligence** (what to check, what rules to apply). **MCP Tools provide the processing** (pattern matching, scoring, formatting). The AI model orchestrates both.

---

## Pipeline A: Thesis Initialization

```
/thesis-init
    │
    ▼
thai_thesis_init tool
    │
    ├── Normalize university name
    │   ("เชียงใหม่" → "chiangmai")
    │
    ├── Load university profile
    │   (format rules, citation style, year system)
    │
    ├── Generate project config
    │   (UUID, timestamps, chapter roadmap)
    │
    └── Return: project summary + chapter plan
```

**Input**: university, title, author, advisor
**Output**: project config with chapter roadmap, citation policy, format notes

---

## Pipeline B: Chapter Writing / Revision

```
/thesis-chapter [n] [mode]
    │
    ▼
thai-thesis-writing skill (loaded)
    │  provides: chapter structure rules,
    │  section requirements, register guidelines
    │
    ▼
thai_thesis_chapter tool
    │
    ├── mode=generate → outline + structure
    ├── mode=revise → edit existing content
    ├── mode=expand → add depth
    └── mode=condense → tighten prose
    │
    ▼
thai_format tool (optional)
    │
    ├── Apply university formatting
    ├── Fix Thai typography (เว้นวรรค)
    └── Normalize number formats
    │
    ▼
Output: chapter content + formatting notes
```

---

## Pipeline C: De-AI Detection and Rewriting

This is the most complex pipeline with 4 analysis stages.

```
/thesis-deai [mode]
    │
    ▼
thai-de-ai skill (loaded)
    │  provides: 30-pattern framework,
    │  banned phrase lists, CV threshold
    │
    ▼
thai_deai tool
    │
    ├── Stage 1: Banned Pattern Scan
    │   30 Thai patterns + 30 English patterns
    │   Categories:
    │     • Overused connectors (นอกจากนี้, ยิ่งไปกว่านั้น)
    │     • Promotional language (ก้าวสำคัญ, พลิกโฉม)
    │     • Empty closers (จะส่งผลดีต่ออนาคต)
    │     • AI vocabulary (ครอบคลุมทุกมิติ)
    │
    ├── Stage 2: Burstiness Analysis
    │   Measures sentence length variation
    │   CV (Coefficient of Variation):
    │     CV >= 30 → human-like ✓
    │     CV < 30  → likely AI ✗
    │
    ├── Stage 3: Register Check
    │   Thai academic register scoring
    │   Formal vs informal detection
    │
    └── Stage 4: Typography Check
        เว้นวรรค correctness
        Thai-English spacing
        Number format consistency
    │
    ▼
    mode=detect → report only
    mode=edit   → suggest fixes
    mode=rewrite → full rewrite
```

**Real example from our thesis work:**
- Input: 674-word paragraph with CV=18.2
- Detected: 4 banned patterns, 2 register violations
- After rewrite: CV=34.7, 0 banned patterns

---

## Pipeline D: Citation Management

```
/thai_citation [action]
    │
    ▼
thai-citation-manager skill (loaded)
    │  provides: APA นาม-ปี rules,
    │  Thai/English author handling,
    │  year-system control
    │
    ▼
thai_citation tool
    │
    ├── action=cite
    │   Input: source metadata
    │   Output: formatted in-text citation
    │   Forms: narrative ผู้แต่ง (ปี)
    │          parenthetical (ผู้แต่ง, ปี)
    │
    ├── action=bibliography
    │   Input: array of sources
    │   Output: formatted bibliography
    │   Sorted: alphabetical by author
    │
    ├── action=audit
    │   Input: cited_keys from text
    │   Checks: format, year system,
    │           bibliography matching
    │   Output: issues list + statistics
    │
    └── action=validate
        Input: single source metadata
        Checks: author format, year range,
                DOI format, URL format
        Output: validation result
```

**Year system handling:**
- `phc` mode: Thai authors → พ.ศ., English authors → ค.ศ.
- `ce` mode: all years in ค.ศ.
- Mixed detection: warns if both systems found in same document

---

## Pipeline E: ISO 29110 Document Generation

```
/iso-docs [type]
    │
    ▼
iso29110-docs skill (loaded)
    │  provides: document structure rules,
    │  section requirements, bilingual templates
    │
    ▼
iso_document tool
    │
    ├── Validate document_type
    │   10 types: project-plan, srs, sdd,
    │   test-plan, test-record, traceability,
    │   change-request, progress, config-plan,
    │   user-manual
    │
    ├── Load template structure
    │   Required sections per type
    │   Bilingual headers (Thai + English)
    │
    ├── Fill project metadata
    │   Version, date, author, approver
    │
    └── Generate document
        Markdown format, ready for Word/PDF
```

---

## Pipeline F: Quality Audit (Full)

The audit pipeline chains multiple tools together:

```
/thesis-audit full
    │
    ▼
thesis_audit tool (scope=full)
    │
    ├── Gate 1: Structure Check
    │   Required chapters present?
    │   Required sections per chapter?
    │
    ├── Gate 2: Content Quality
    │   Problem statement clarity
    │   Literature depth, methodology
    │
    ├── Gate 3: Citation Integrity
    │   → calls thai_citation(audit)
    │   APA format, year consistency
    │
    ├── Gate 4: Thai Language Quality
    │   Grammar, register, เว้นวรรค
    │
    ├── Gate 5: De-AI Compliance
    │   → calls thai_deai(detect)
    │   Burstiness, banned patterns
    │
    ├── Gate 6: Data Consistency
    │   → calls thesis_consistency
    │   Numbers, terms across chapters
    │
    ├── Gate 7: Formatting
    │   University template compliance
    │
    └── Gate 8: ISO 29110 (if applicable)
        Document completeness
        Cross-references
    │
    ▼
thesis_score tool
    │
    ├── 6-dimension scoring (100 points)
    │   Structure:   15%
    │   Content:     25%
    │   Language:    15%
    │   Citations:   15%
    │   ISO:         15%
    │   Consistency: 15%
    │
    └── Output: score + gate results + recommendations
```

---

## Pipeline G: Cross-Document Consistency

```
thesis_consistency tool
    │
    Input: array of {name, content} documents
    │
    ├── Numbers check
    │   Same statistics across chapters?
    │   Percentages match?
    │
    ├── Terminology check
    │   Same terms used consistently?
    │   Abbreviations defined?
    │
    ├── Facts check
    │   Methodology described same way?
    │   Results don't contradict?
    │
    ├── Versions check
    │   Software versions match?
    │
    └── Dates check
        Timeline consistent?
    │
    ▼
    Output: issues list with locations
```

---

## Typical Session Workflow

A realistic thesis-checking session looks like this:

```
Session start
    │
    ├─ 1. /thesis-init (once per project)
    │
    ├─ 2. Write chapter in your editor
    │
    ├─ 3. /thesis-deai scan (check AI patterns)
    │     └─ fix flagged patterns manually
    │
    ├─ 4. /thesis-review (advisor perspective)
    │     └─ address structural feedback
    │
    ├─ 5. /thesis-score (quick check)
    │     └─ see which dimensions need work
    │
    ├─ 6. Repeat 2-5 for each chapter
    │
    ├─ 7. /iso-docs (generate ISO documents)
    │
    ├─ 8. /thesis-audit full (final check)
    │     └─ fix all remaining issues
    │
    └─ 9. Submit
```

---

## What Happens Inside the MCP Server

When you call any tool, this is the actual execution path:

```
OpenCode sends JSON-RPC request
    │
    ▼
server.ts: CallToolRequestSchema handler
    │
    ▼
switch (request.params.name)
    │
    ├── "thai_deai" → parse args → call detectThaBannedPatterns()
    │                              call analyzeSentenceLengths()
    │                              call checkRegister()
    │                              call checkTypography()
    │                              → assemble response
    │
    ├── "thai_citation" → parse args → call formatCitation()
    │                                  or auditCitations()
    │                                  or generateBibliography()
    │                                  → assemble response
    │
    └── ... (11 tools total)
    │
    ▼
Return { content: [{ type: "text", text: JSON.stringify(result) }] }
```

All utility functions are **pure** (no I/O, no side effects). The server is stateless -- each tool call is independent.
