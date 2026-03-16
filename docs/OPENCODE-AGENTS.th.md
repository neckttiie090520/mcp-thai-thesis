# OpenCode Agent System — MCP Thai Thesis

> เอกสารนี้อธิบายระบบ Agent ของ OpenCode และวิธีใช้กับ MCP Thai Thesis

---

## ทำไมต้องใช้ OpenCode?

OpenCode เป็น AI CLI ที่มีระบบ **Agent แบบลำดับชั้น** ซึ่งเหมาะมากสำหรับการทำงานวิจัยและเขียนวิทยานิพนธ์:

### ความสามารถหลัก

| ความสามารถ | คำอธิบาย |
|---|---|
| **Agent → Subagent** | Agent หลักสามารถเรียก Subagent ทำงานเฉพาะทางได้ |
| **เปลี่ยน LLM Model** | แต่ละ Agent สามารถใช้ Model ต่างกันได้ |
| **Model Selection** | เลือก Model ให้เหมาะกับ Task (เร็ว=Planning, แม่น=Writing) |
| **Permission Control** | ควบคุมว่า Agent ทำอะไรได้/ไม่ได้ |
| **Temperature Control** | ปรับความสร้างสรรค์ของ Model (0.0-1.0) |

---

## ประเภทของ Agent

### Primary Agent
Agent หลักที่คุณสื่อสารด้วยโดยตรง:

| Agent | Model | หน้าที่ |
|-------|-------|---------|
| **Build** | Claude Sonnet 4 | งาน Development เต็มรูปแบบ (เขียน/แก้ไข/รันคำสั่ง) |
| **Plan** | Claude Haiku | วางแผนและวิเคราะห์ (ดูอย่างเดียว ไม่แก้ไข) |

### Subagent
Agent เฉพาะทางที่ Primary Agent เรียกใช้:

| Agent | Model | หน้าที่ |
|-------|-------|---------|
| **General** | Claude Sonnet | งานวิจัยทั่วไป, ทำหลายงานพร้อมกัน |
| **Explore** | Claude Haiku | ค้นหาไฟล์, อ่าน Code (Read-only) |

---

## การเลือก Model ให้เหมาะสมกับ Task

### Model Recommendations สำหรับวิทยานิพนธ์

| Task | แนะนำ Model | เหตุผล |
|------|-------------|---------|
| **วางแผนโครงสร้าง** | Haiku / Gemini Flash | เร็ว, ถูก, เพียงพอสำหรับ Structuring |
| **ค้นหา Citation** | Haiku / Gemini Flash | ค้นหาข้อมูล ไม่ต้อง Model แพง |
| **เขียนเนื้อหา** | Sonnet / GPT-4o | ต้องการคุณภาพภาษาสูง |
| **De-AI Detection** | Sonnet / Opus | วิเคราะห์ละเอียด, Pattern recognition |
| **ตรวจสอบ Citation** | Haiku | งานที่ต้องการความแม่นยำ |
| **Review/Feedback** | Sonnet | ต้องการ Context เยอะ |
| **Debug/แก้ปัญหา** | Opus | ต้องการ Reasoning เข้มข้น |

### Model Comparison

| Model | Speed | Quality | Cost | เหมาะกับ |
|-------|-------|---------|------|----------|
| Haiku | ⚡⚡⚡ | ⭐⭐ | $ | Planning, Search, Simple Tasks |
| Sonnet | ⚡⚡ | ⭐⭐⭐ | $$ | Writing, Analysis, Review |
| Opus | ⚡ | ⭐⭐⭐⭐ | $$$$ | Complex Reasoning, Debug |

---

## การใช้ Agent กับ MCP Thai Thesis

### Architecture ที่แนะนำ

```
                    ┌─────────────────┐
                    │   Build Agent   │ (Primary - Claude Sonnet)
                    │  สั่งงานรวม    │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ thesis-reviewer │ │    Explore      │ │    General     │
│   (Subagent)    │ │   (Subagent)    │ │   (Subagent)   │
│ - De-AI Check  │ │ - ค้นหา Code   │ │ - วิจัย        │
│ - Citation     │ │ - อ่านไฟล์     │ │ - รวบรวมข้อมูล  │
│ - Quality      │ │ - Read-only     │ │ - หลายงาน      │
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                   │                   │
         └───────────────────┴───────────────────┘
                             │
                             ▼
              ┌────────────────────────────────┐
              │   MCP Thai Thesis Tools       │
              │  - thai_deai                  │
              │  - thai_citation              │
              │  - thesis_score                │
              │  - iso_document               │
              └────────────────────────────────┘
```

---

## Agent Configuration สำหรับ Thesis Writing

### แนะนำ Configuration

```json
{
  "agent": {
    "build": {
      "mode": "primary",
      "model": "anthropic/claude-sonnet-4-20250514",
      "temperature": 0.3
    },
    "planner": {
      "mode": "primary", 
      "model": "anthropic/claude-haiku-4-20250514",
      "description": "วางแผนและวิเคราะห์โครงสร้างวิทยานิพนธ์",
      "temperature": 0.2,
      "tools": {
        "write": false,
        "edit": false,
        "bash": false
      }
    },
    "thesis-reviewer": {
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4-20250514",
      "description": "ตรวจสอบคุณภาพวิทยานิพนธ์ - De-AI, Citation, Format",
      "prompt": "คุณเป็นผู้ตรวจสอบวิทยานิพนธ์...",
      "temperature": 0.1
    },
    "citation-finder": {
      "mode": "subagent",
      "model": "anthropic/claude-haiku-4-20250514",
      "description": "ค้นหา Citation ที่ขาดหายไป",
      "temperature": 0.2
    },
    "writer": {
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4-20250514",
      "description": "เขียนเนื้อหาวิทยานิพนธ์",
      "temperature": 0.5
    }
  }
}
```

---

## การเรียกใช้ Subagent

### วิธีที่ 1: ผ่าน Task Tool

```
ใช้ Task tool เรียก thesis-reviewer:
- description: "ตรวจสอบ De-AI"
- prompt: "ตรวจสอบข้อความนี้..."
- subagent_type: "thesis-reviewer"
```

### วิธีที่ 2: @Mention

```
@thesis-reviewer ตรวจสอบบทนำนี้ให้หน่อย
```

### วิธีที่ 3: Agent หลักเรียกเอง

```
Build Agent จะเรียก citation-finder เมื่อต้องหา Citation
```

---

## การใช้งานจริง

### Workflow 1: ตรวจ De-AI

```
1. @thesis-reviewer (Sonnet)
   → วิเคราะห์ข้อความ → หา AI Patterns
   
2. thesis_deai tool
   → Detect/Edit/Rewrite

3. ส่งผลลัพธ์กลับมา
```

### Workflow 2: หา Citation ที่ขาด

```
1. thesis_consistency (Haiku)
   → หาว่าขาด Citation อะไร

2. paper-search-mcp (Haiku)
   → ค้นหางานวิจัย

3. thai_citation (Sonnet)
   → สร้าง Bibliography

4. thesis-reviewer (Sonnet)
   → ตรวจสอบความถูกต้อง
```

### Workflow 3: เขียนบทใหม่

```
1. planner (Haiku)
   → วางโครงสร้างบท

2. writer (Sonnet)
   → เขียนเนื้อหา

3. thesis-reviewer (Sonnet)
   → ตรวจสอบคุณภาพ

4. thai_deai (Sonnet)
   → ลบ AI Patterns
```

---

## OpenCode Agents ใน MCP Thai Thesis

### มี Agent อะไรบ้าง?

MCP Thai Thesis มาพร้อม `.opencode/agents/thesis-reviewer.md`:

```yaml
---
description: ตรวจสอบคุณภาพวิทยานิพนธ์จากมุมมองกรรมการสอบ
mode: subagent
model: anthropic/claude-sonnet-4-20250514
tools:
  read: true
  write: false
  edit: false
  bash: false
---

คุณเป็นผู้เชี่ยวชาญการตรวจสอบวิทยานิพนธ์...
```

---

## การต่อยอด

### เครื่องมืออื่นที่รองรับ Agent System

| เครื่องมือ | Agent Support | หมายเหตุ |
|------------|---------------|-----------|
| **Claude Code** | ✅ | มี Claude Code agents |
| **Codex CLI** | ✅ | OpenAI Codex |
| **Cursor** | ✅ | Agents + Rules |
| **Windsurf** | ✅ | Cascade agent |
| **Continue** | ✅ | VS Code extension |
| **Zed** | ✅ | Agent mode |

### Model Selection Best Practices

1. **งาน Simple → ใช้ Model เร็ว** (Haiku, Flash)
   - ค้นหา, อ่าน, สรุป
   
2. **งานซับซ้อน → ใช้ Model แม่น** (Sonnet, Opus)
   - เขียน, วิเคราะห์, Debug

3. **งาน Creative → เพิ่ม Temperature**
   - Brainstorm: 0.7
   - Writing: 0.3-0.5

4. **งาน Precision → ลด Temperature**
   - Fact-check: 0.1
   - Citation: 0.1

---

## อ้างอิง

- [OpenCode Agents Documentation](https://opencode.ai/docs/agents/)
- [OpenCode Config Schema](https://opencode.ai/docs/config/)

---

**สร้างสำหรับ OpenCode + MCP Thai Thesis**
