# Troubleshooting — MCP Thai Thesis

> คำตอบสำหรับปัญหาที่พบบ่อย

---

## ปัญหาที่พบบ่อย

### MCP Server ไม่ทำงาน

**อาการ:** เรียก tool แล้วไม่ตอบกลับ หรือ error

**วิธีแก้:**

1. ตรวจสอบว่า server ทำงานอยู่:
   ```bash
   node mcp-server/dist/server.js
   ```

2. ตรวจสอบ config ใน `opencode.json`:
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

3. รัน build ใหม่:
   ```bash
   cd mcp-server
   npm run rebuild
   ```

---

### TypeScript Error

**อาการ:** `Error: Cannot find module` หรือ compile error

**วิธีแก้:**

1. ติดตั้ง dependencies ใหม่:
   ```bash
   cd mcp-server
   npm install
   ```

2. รัน typecheck:
   ```bash
   npm run typecheck
   ```

3. หากมี unused variables, แก้ไขใน source code แล้ว rebuild

---

### Citation Format ไม่ถูกต้อง

**อาการ:** Citation ออกมาไม่ตรงตาม APA นาม-ปี

**วิธีแก้:**

1. ตรวจสอบ year system:
   - พ.ศ. → ใช้ `year_system: "phc"`
   - ค.ศ. → ใช้ `year_system: "ce"`

2. ตรวจสอบ university profile:
   ```bash
   thai_format --university chiangmai
   ```

3. ตรวจสอบว่า source metadata ถูกต้อง (year, authors, title)

---

### De-AI Detection ไม่พบ Patterns

**อาการ:** ข้อความมี AI patterns แต่ระบบไม่ตรวจพบ

**วิธีแก้:**

1. ตรวจสอบ language mode:
   - ภาษาไทย → `language: "thai"`
   - ภาษาอังกฤษ → `language: "english"`
   - ทั้งสอง → `language: "both"`

2. ลองใช้ mode `detect` ก่อน แล้วค่อย `edit` หรือ `rewrite`

3. ตรวจสอบว่าข้อความยาวพอ (patterns ต้องการ context)

---

### ISO Document ไม่สร้าง

**อาการ:** `iso_document` คืนค่าว่างหรือ error

**วิธีแก้:**

1. ตรวจสอบ document_type:
   - ต้องเป็น one of: `project-plan`, `srs`, `sdd`, `test-plan`, `test-record`, `traceability`, `change-request`, `progress`, `config-plan`, `user-manual`

2. ตรวจสอบ project_info:
   ```json
   {
     "name": "ชื่อโปรเจกต์",
     "version": "1.0.0",
     "author": "ชื่อผู้เขียน",
     "date": "2026-01-01"
   }
   ```

3. ลองใช้ language `bilingual` ก่อน

---

### Consistency Check ไม่ตรงกัน

**อาการ:** ตัวเลข/ศัพท์ที่ควรเหมือนกันถูก mark ไม่ตรงกัน

**วิธีแก้:**

1. ตรวจสอบว่าเอกสารอยู่ในรูปแบบที่ถูกต้อง (markdown/text)

2. ตรวจสอบ check_types:
   - `["numbers"]` — ตรวจเฉพาะตัวเลข
   - `["numbers", "terminology"]` — ตรวจหลายอย่าง

3. ตรวจสอบว่า encoding ถูกต้อง (UTF-8)

---

### Quality Score ต่ำผิดปกติ

**อาการ:** คะแนนออกมาต่ำกว่าที่คาดหวัง

**วิธีแก้:**

1. ตรวจสอบ university profile — แต่ละมหาวิทยาลัยมีเกณฑ์ต่างกัน

2. ตรวจสอบว่า text มีความยาวเพียงพอ (short text จะได้คะแนนไม่ดี)

3. ทำความเข้าใจ 6 มิติ:
   - Format (รูปแบบ)
   - Structure (โครงสร้าง)
   - Content (เนื้อหา)
   - Citation (การอ้างอิง)
   - Language (ภาษา)
   - Research (งานวิจัย)

---

### Permission Error

**อาการ:** เรียกใช้ tool แล้วได้ permission error

**วิธีแก้:**

1. ตรวจสอบ opencode.json permissions:
   ```json
   {
     "permission": {
       "edit": "allow",
       "bash": "ask"
     }
   }
   ```

2. ตรวจสอบ agent permissions ใน config

3. ลองเรียก tool ด้วย user ที่มีสิทธิ์

---

### OpenCode ไม่เห็น MCP Server

**อาการ:** เรียก `thai_thesis_init` แล้วไม่พบ

**วิธีแก้:**

1. Restart OpenCode:
   ```bash
   # ปิดและเปิดใหม่
   opencode --restart
   ```

2. ตรวจสอบ config path:
   - Global: `~/.config/opencode/opencode.json`
   - Project: `./opencode.json`

3. ตรวจสอบว่า path ถูกต้อง (ใช้ absolute path)

---

## การ Debug

### เปิด Verbose Logging

```bash
# รัน OpenCode พร้อม logging
opencode --verbose
```

### ตรวจสอบ MCP Server Status

```bash
# รัน server และดู output
cd mcp-server
node dist/server.js
```

### ตรวจสอบ Network

```bash
# ตรวจสอบว่า port ถูกใช้งาน
netstat -an | grep 3000
```

---

## ติดต่อช่วยเหลือ

- **GitHub Issues:** [https://github.com/neckttiie090520/mcp-thai-thesis/issues](https://github.com/neckttiie090520/mcp-thai-thesis/issues)
- **Documentation:** [docs/](docs/)
- **Discussions:** [GitHub Discussions](https://github.com/neckttiie090520/mcp-thai-thesis/discussions)

---

**หากไม่พบคำตอบที่นี่ กรุณาเปิด Issue บน GitHub**
