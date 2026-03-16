# Getting Started

## Prerequisites

Before you begin, make sure you have:

- **Node.js >= 18.0.0** — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **An MCP-compatible client** — Recommended: [OpenCode](https://opencode.ai)

Optional:
- **Git** for cloning the repository
- **TypeScript knowledge** if you want to extend the tools

---

## Installation

### Step 1: Get the Code

```bash
git clone https://github.com/nextzus/mcp-thai-thesis.git
cd mcp-thai-thesis
```

### Step 2: Install and Build the MCP Server

```bash
cd mcp-server
npm install
npm run build
```

This compiles the TypeScript source to JavaScript in `dist/`.

### Step 3: Verify the Build

```bash
npm run typecheck
```

If there are no errors, the server is ready.

---

## Configuration

### Option A: OpenCode (Recommended)

Add to your project's `opencode.json`:

```json
{
  "mcpServers": {
    "thai-thesis": {
      "command": "node",
      "args": ["C:/path/to/mcp-thai-thesis/mcp-server/dist/server.js"]
    }
  }
}
```

Replace `C:/path/to/` with the actual path where you cloned the repository.

### Option B: Claude Desktop

Add to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "thai-thesis": {
      "command": "node",
      "args": ["/path/to/mcp-thai-thesis/mcp-server/dist/server.js"]
    }
  }
}
```

### Option C: Any MCP Client

The server communicates via stdio. Any MCP-compatible client can use it by spawning:

```bash
node /path/to/mcp-thai-thesis/mcp-server/dist/server.js
```

---

## Installing Skills (OpenCode Only)

Skills are instruction files that enhance AI agent capabilities. Copy the `skills/` directory to your project:

```bash
# From your project root
cp -r /path/to/mcp-thai-thesis/skills/ .opencode/skills/
```

Or create symlinks:

```bash
# Linux/macOS
ln -s /path/to/mcp-thai-thesis/skills/ .opencode/skills/thesis

# Windows (PowerShell, run as admin)
New-Item -ItemType Junction -Path ".opencode\skills\thesis" -Target "C:\path\to\mcp-thai-thesis\skills"
```

---

## Installing Commands (OpenCode Only)

Copy slash commands:

```bash
cp -r /path/to/mcp-thai-thesis/commands/ .opencode/commands/
```

This gives you commands like `/thesis-init`, `/thesis-audit`, `/thesis-deai`, etc.

---

## First Run: Initialize Your Thesis

Once configured, run:

```
/thesis-init --university chiangmai --author "ชื่อ นามสกุล" --title "ชื่อวิทยานิพนธ์ภาษาไทย"
```

This returns your university's profile:

```
University: มหาวิทยาลัยเชียงใหม่ (Chiang Mai University)

Formatting Profile:
  Thai Font:    TH Sarabun New 16pt
  English Font: Times New Roman 16pt
  Margins:      1.5" top/left, 1" bottom/right
  Line Spacing: 1.5x
  Year System:  Buddhist Era (พ.ศ.)
  Citation:     APA 7th Edition (นาม-ปี)

Chapter Structure:
  1. บทนำ
  2. เอกสารและงานวิจัยที่เกี่ยวข้อง
  3. วิธีดำเนินการวิจัย
  4. ผลการวิจัย
  5. สรุป อภิปราย และข้อเสนอแนะ

Next Steps:
  1. Use /thesis-chapter to start drafting chapters
  2. Use /thesis-deai to check for AI-writing patterns
  3. Use /thesis-audit for quality review
```

---

## Supported University Aliases

You can use various aliases when specifying your university:

| University | Accepted Names |
|-----------|---------------|
| Chulalongkorn | `chulalongkorn`, `จุฬา`, `จุฬาลงกรณ์`, `chula`, `cu` |
| Kasetsart | `kasetsart`, `เกษตร`, `เกษตรศาสตร์`, `มก`, `ku` |
| KMUTT | `kmutt`, `มจธ`, `บางมด`, `พระจอมเกล้าธนบุรี` |
| Chiang Mai | `chiangmai`, `มช`, `เชียงใหม่`, `cmu` |
| Generic | `generic`, `ทั่วไป`, `default`, `other` |

---

## Common Tasks

### Check a Chapter for AI Writing Patterns

```
/thesis-deai

> Paste your chapter text when prompted
```

### Score a Chapter

```
/thesis-score

> Paste your chapter text
> Specify chapter number
```

### Audit Your Citations

Use the `thai_citation` tool with `action: "audit"`:

```
thai_citation(action="audit", cited_keys=["สมชาย2566", "Smith2023"], sources=[...])
```

### Generate ISO 29110 Documents

```
/iso-docs --type srs --language bilingual
```

### Full Thesis Audit

```
/thesis-audit --scope full
```

---

## Configuration File (Optional)

Create `config/university.yaml` for project-wide settings:

```yaml
university: chiangmai
author: "ชื่อ นามสกุล"
advisor: "ชื่ออาจารย์ที่ปรึกษา"
title: "ชื่อวิทยานิพนธ์ภาษาไทย"
title_en: "English Thesis Title"
year_system: phc        # phc = พ.ศ., ce = ค.ศ.
thesis_type: standard   # standard (5 chapters) or extended (7 chapters)
```

---

## Troubleshooting

### "Cannot find module" Error

Make sure you built the server:
```bash
cd mcp-server
npm run build
```

### "MCP server not responding"

Check the path in your `opencode.json`. The path must point to the compiled `dist/server.js`, not the source `src/server.ts`.

### Tools Not Appearing

Restart your MCP client after adding the server configuration. Most clients discover tools on startup.

### TypeScript Errors After Editing

Run the type checker:
```bash
cd mcp-server
npm run typecheck
```

Fix any reported errors, then rebuild:
```bash
npm run build
```

---

## Next Steps

- Read the [Workflow Guide](WORKFLOW.md) to understand the verification pipeline
- See [Examples](EXAMPLES.md) for real output from each tool
- Explore [Capabilities](CAPABILITIES.md) for the full feature reference
- Check the [Skills Guide](SKILLS-GUIDE.md) to understand how skills enhance the tools
