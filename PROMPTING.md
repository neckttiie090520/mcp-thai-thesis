# Image Prompting Guide — MCP Thai Thesis

> Prompt สำหรับสร้างภาพประกอบ README ใ�้กับ Gemini

---

## หลักการ

- ใช้ **ASCII art** ร่วมกับ **Mermaid diagram** สำหรับ technical images
- ภาพควรสื่อสาร **concept** ไม่ใช่แค่ decoration
- ใช้ **bilingual** ตาม README (ไทย + อังกฤษ)

---

## 1. Hero Section — ภาพหน้าปก

**Prompt สำหรับ Gemini:**
```
Create a modern, minimalist tech illustration for a software documentation README header.

Style:
- Clean, modern aesthetic (like Linear, Vercel documentation)
- Dark theme with accent colors (teal/cyan highlights)
- Include subtle technical elements: code brackets, document icons, floating nodes
- Center focal point: a stylized thesis/document icon
- Professional, not cartoonish
- Resolution: 1200x400px

Color palette:
- Background: #0f172a (dark slate)
- Primary: #06b6d4 (cyan)
- Secondary: #64748b (slate gray)
- Accent: #f472b6 (pink for highlights)

Elements to include:
- Document/thesis icon (center)
- Subtle network nodes connecting
- Code bracket symbols
- Small gear/optimization icons (optional)

This is for a Thai thesis MCP server project - emphasize Thai cultural subtle elements.
```

---

## 2. How It Works — Flow Diagram

**Prompt สำหรับ Gemini:**
```
Create a clean flowchart diagram for a thesis quality assurance pipeline.

Style:
- Minimalist, modern tech documentation style
- White background with dark icons
- Rounded rectangles with subtle shadows
- Flow arrows in cyan (#06b6d4)
- Professional, easy to read

Content (Mermaid compatible):
```
Your Thesis → [MCP Thai Thesis] → Report → You Fix
                ↓
        De-AI + Citation + ISO + Score + Format
```

Flow:
1. Input box: "Your Thesis (markdown/text)"
2. Center box: "MCP Thai Thesis" with 5 parallel icons below:
   - De-AI Check
   - Citation Audit
   - ISO Check
   - Score
   - Format Check
3. Output: "Structured Report (issues, scores, fixes)"
4. Arrow back: "You Fix Your Work"
5. Curved arrow looping back to "Your Thesis" (iteration)
```

---

## 3. Architecture — System Diagram

**Prompt สำหรับ Gemini:**
```
Create a technical architecture diagram showing MCP server structure.

Style:
- Technical, system design diagram
- Three-layer architecture
- Clean boxes with icons
- Connection lines showing data flow
- Mermaid-compatible layout

Layers:
```
┌─────────────────────────────────────┐
│         User (OpenCode/CLI)          │
└─────────────────┬───────────────────┘
                  │ Tool Calls
                  ▼
┌─────────────────────────────────────┐
│         MCP Thai Thesis Server       │
│  ┌─────────┐ ┌─────────┐ ┌───────┐ │
│  │ De-AI   │ │Citation │ │ ISO   │ │
│  │ Tools   │ │ Tools   │ │Tools  │ │
│  └─────────┘ └─────────┘ └───────┘ │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│    Utils (thai-text, citation)       │
└─────────────────────────────────────┘
```

Color: Dark mode, cyan accents
```

---

## 4. Tools Overview — Icon Grid

**Prompt สำหรับ Gemini:**
```
Create an icon grid showing 11 MCP tools.

Style:
- 3x4 grid of rounded square icons
- Each icon: 80x80px
- Dark background (#1e293b)
- Icons in white/cyan
- Label below each icon

Icons needed:
1. 📝 thai_thesis_init — เริ่มโปรเจกต์
2. 📖 thai_thesis_chapter — เขียนบท
3. 🤖 thai_deai — ตรวจ AI
4. 📚 thai_citation — จัดการ citation
5. 🎨 thai_format — จัดรูปแบบ
6. 📋 iso_document — เอกสาร ISO
7. 👁️ thesis_review — ทบทวน
8. ✅ thesis_audit — audit
9. 📊 thesis_score — ให้คะแนน
10. 🔗 thesis_consistency — ความสอดคล้อง
11. 🗺️ thesis_traceability — traceability
```

---

## 5. Skills — Chain Diagram

**Prompt สำหรับ Gemini:**
```
Create a skill chain diagram showing 7 skills workflow.

Style:
- Horizontal flow with arrows
- Circular skill icons
- Connected in sequence

Flow:
```
[thai-thesis-writing] → [documentation-writer] → [thai-de-ai]
        ↓
[thai-citation-manager] → [iso29110-docs]
        ↓
[thesis-quality-gate] → [thesis-orchestrator]
```

Each skill:
- Circle icon (60x60)
- Skill name below
- Arrow connecting to next
```

---

## 6. Workflow — Step by Step

**Prompt สำหรับ Gemini:**
```
Create a 5-step horizontal process diagram.

Style:
- Numbered steps in circles
- Connected by arrows
- Each step has icon + title + description

Steps:
1. 📝 "You Write" — Draft your thesis chapters
2. 🔍 "You Check" — Run tools against content
3. 📊 "You Get Report" — Structured feedback
4. 🔧 "You Fix" — Revise based on report
5. ♻️ "Re-check" — Iterate until perfect

Arrow style: Curved connecting arrows in cyan
```

---

## 7. Quality Gate — Checklist Visual

**Prompt สำหรับ Gemini:**
```
Create an 8-gate checklist graphic for thesis submission.

Style:
- Vertical checklist
- 8 numbered gates
- Each gate has icon + title + status indicator

Gates:
1. ✅ Structural Completeness
2. ✅ Content Quality
3. ✅ Citation Integrity
4. ✅ Thai Language Quality
5. ✅ De-AI Compliance
6. ✅ Data Consistency
7. ✅ Formatting Compliance
8. ✅ ISO 29110 Compliance

Visual: Green checkmarks, clean list style
```

---

## 8. University Profiles — Map/Flags

**Prompt สำหรับ Gemini:**
```
Create a simple map or flag icons showing 5 Thai universities.

Style:
- Thailand map outline (simplified)
- 5 location markers with university abbreviations

Universities:
1. จุฬา (CU) — Bangkok
2. เกษตร (KU) — Bangkok
3. KMUTT — Bangkok
4. มช (CMU) — Chiang Mai
5. Generic — Default icon

Each marker:
- Circle with university initial
- Location on map
- Name label
```

---

## 9. Use Cases — Scenario Cards

**Prompt สำหรับ Gemini:**
```
Create 4 use case scenario cards in a grid.

Style:
- 2x2 grid
- Each card: rounded rectangle
- Icon + title + brief description

Scenarios:
1. 🎓 "Cross-University Thesis" — เปลี่ยน template ข้ามมหาวิทยาลัย
2. 🔍 "Citation Finder" — หา citation ที่ขาด
3. ✍️ "De-AI Writing" — ลบลายนิ้วมือ AI
4. 📋 "ISO Compliance" — ตรวจเอกสาร ISO

Card size: 280x160px each
Background: #1e293b
Border: 1px #06b6d4
```

---

## 10. OpenCode Agents — Hierarchy

**Prompt สำหรับ Gemini:**
```
Create an agent hierarchy diagram showing OpenCode agent system.

Style:
- Organizational chart style
- Top: Primary Agent
- Middle: Subagents
- Bottom: Tools/MCP

Structure:
```
┌─────────────────────────────────┐
│         Build Agent (Primary)   │
│     Claude Sonnet 4.6           │
└───────────────┬─────────────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
┌───────┐ ┌───────┐ ┌───────────┐
│Thesis-│ │Explore│ │ General   │
│Reviewer│ │Agent  │ │  Agent    │
└───────┘ └───────┘ └───────────┘
    │           │           │
    └───────────┼───────────┘
                │
    ┌───────────┴───────────┐
    ▼                       ▼
┌─────────┐          ┌──────────┐
│   MCP   │          │ Skills   │
│  Tools  │          │  (7)     │
└─────────┘          └──────────┘
```

---

## 11. Comparison — Before/After

**Prompt สำหรับ Gemini:**
```
Create a before/after comparison for de-AI processing.

Style:
- Two-panel layout
- Left: "Before (AI-written)" - with red X markers
- Right: "After (Human-like)" - with green checkmark

Content:
- Show example Thai text
- Highlight AI patterns (red)
- Show humanized version (green)
- "AI Patterns Removed" label
- "Natural, Human-like" label
```

---

## 12. Closing — Thank You Graphic

**Prompt สำหรับ Gemini:**
```
Create a simple, elegant closing illustration for README.

Style:
- Minimalist
- Thai-inspired pattern (subtle)
- "Thank you" in Thai + English

Text:
- ขอบคุณ / Thank You
- "Built from real thesis experience"

Elements:
- Small document icon
- Subtle wave pattern (Thai silk inspired)
- Clean, professional
```

---

## สรุป: Image Sizes

| Section | Size | Format |
|---------|------|--------|
| Hero | 1200x400 | PNG |
| Diagrams | 800x600 | PNG/Mermaid |
| Icons | 80x80 | PNG/SVG |
| Cards | 280x160 | PNG |
| Flowcharts | 600x400 | PNG/Mermaid |

## สรุป: Color Palette

```
Primary:     #06b6d4 (cyan)
Secondary:   #64748b (gray)
Background:  #0f172a (dark slate)
Surface:     #1e293b (card bg)
Success:     #22c55e (green)
Error:       #ef4444 (red)
Accent:      #f472b6 (pink)
Text:        #f8fafc (white)
```

---

**ใช้ prompt เหล่านี้กับ Gemini เพื่อสร้างภาพประกอบ README แต่ละส่วน**
