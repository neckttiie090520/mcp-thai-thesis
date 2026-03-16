# Workshop Module 1: Setup / การตั้งค่าระบบ

> สอนตั้งค่า OpenCode + MCP Server ให้พร้อมใช้งาน

---

## ภาพรวม

ใน module นี้คุณจะได้เรียนรู้:
1. ติดตั้ง MCP Server
2. ตั้งค่า opencode.json
3. ทดสอบว่าระบบทำงาน

---

## Step 1: ติดตั้ง MCP Server

### 1.1 เปิด Terminal และไปที่โฟลเดอร์ mcp-server

```bash
cd C:\Users\nextzus\Documents\thesis\thesis-doc\mcp-thai-thesis\mcp-server
```

### 1.2 ติดตั้ง dependencies

```bash
npm install
```

### 1.3 Build TypeScript

```bash
npm run build
```

ถ้า build สำเร็จ จะเห็น:
```
✓ 10 modules transformed.
server.js  23.4 kB
```

---

## Step 2: ตั้งค่า opencode.json

### 2.1 เปิดไฟล์ opencode.json

ไฟล์อยู่ที่: `C:\Users\nextzus\.config\opencode\opencode.json`

### 2.2 เพิ่ม MCP Server config

```json
{
  "mcp": {
    "thai-thesis-mcp": {
      "type": "local",
      "command": [
        "node",
        "C:\\Users\\nextzus\\Documents\\thesis\\thesis-doc\\mcp-thai-thesis\\mcp-server\\dist\\server.js"
      ],
      "environment": {}
    }
  }
}
```

### 2.3 ตรวจสอบว่าถูกต้อง

```json
{
  "mcp": {
    "thai-thesis-mcp": {
      "type": "local",
      "command": [
        "node",
        "C:\\Users\\nextzus\\Documents\\thesis\\thesis-doc\\mcp-thai-thesis\\mcp-server\\dist\\server.js"
      ],
      "environment": {}
    },
    "paper-search-mcp": {
      "type": "local",
      "command": [
        "node",
        "C:\\Users\\nextzus\\Documents\\thesis\\thesis-doc\\mcp-server\\dist\\server.js"
      ],
      "environment": {}
    }
  }
}
```

---

## Step 3: ทดสอบระบบ

### 3.1 Restart OpenCode

ปิดและเปิด OpenCode ใหม่

### 3.2 ทดสอบเรียก MCP Tool

ลองเรียก tool ง่ายๆ:

```
thai_thesis_init university=chiangmai title="ทดสอบ" author="ทดสอบ"
```

ถ้าได้ผลลัพธ์ JSON กลับมา = ระบบทำงาน ✓

### 3.3 ทดสอบ Paper Search

```
paper-search-mcp_search_semantic query="test" max_results=3
```

---

## Troubleshooting

### ปัญหา: MCP Server ไม่ทำงาน

**สาเหตุ:** Build ไม่สำเร็จ

**วิธีแก้:**
```bash
cd mcp-server
npm run build
```

### ปัญหา: Tools ไม่ขึ้น

**สาเหตุ:** opencode.json ไม่ถูกต้อง

**วิธีแก้:**
1. ตรวจสอบ path ของ server.js ว่าถูกต้อง
2. ตรวจสอบว่าเป็น `environment` ไม่ใช่ `env`

### ปัญหา: Node version ไม่ถูกต้อง

**สาเหตุ:** Node.js ต่ำกว่า 18

**วิธีแก้:**
```bash
node --version
# ต้อง >= 18.0.0
```

---

## สิ่งที่ควรมีหลังจาก Module นี้

- [ ] MCP Server build สำเร็จ
- [ ] opencode.json ถูกต้อง
- [ ] Tools ขึ้นใน OpenCode
- [ ] ทดสอบเรียก thai_thesis_init ได้

---

## ต่อไป

ไปที่: **`07-workshop/02-init-project.md`** → สร้างโปรเจควิทยานิพนธ์

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
