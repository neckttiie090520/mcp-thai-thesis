# Workshop Module 7: ISO Docs / การสร้างเอกสาร ISO 29110

> สอนสร้างเอกสาร ISO 29110 ด้วย /iso-docs และ iso_document

---

## ภาพรวม

ใน module นี้คุณจะได้เรียนรู้:
1. ทำความรู้จัก ISO 29110
2. 10 ประเภทเอกสาร
3. วิธีสร้างด้วย /iso-docs
4. ลำดับการสร้าง

---

## ISO 29110 คืออะไร?

### มาตรฐานสำหรับโปรเจคซอฟต์แวร์ขนาดเล็ก

- **Entry Profile** - โปรเจคขนาดเล็ก (< 10,000 lines)
- **Basic Profile** - โปรเจคขนาดกลาง (10,000-30,000 lines)

### เอกสารหลัก 5 ฉบับ

| ฉบับ | ชื่อ | คำอธิบาย |
|--------|------|-----------|
| 1 | Project Plan | แผนโครงการ |
| 2 | SRS | ข้อกำหนดความต้องการ |
| 3 | SDD | คำอธิบายการออกแบบ |
| 4 | Test Plan | แผนการทดสอบ |
| 5 | Test Record | บันทึกการทดสอบ |

### เอกสารเพิ่มเติม 5 ฉบับ

| ฉบับ | ชื่อ | คำอธิบาย |
|--------|------|-----------|
| 6 | Traceability Matrix | ตารางการติดตาม |
| 7 | Change Request | คำร้องขอเปลี่ยนแปลง |
| 8 | Progress Report | รายงานความก้าวหน้า |
| 9 | Configuration Plan | แผนการจัดการการตั้งค่า |
| 10 | User Manual | คู่มือผู้ใช้ |

---

## ใช้ /iso-docs

### Command

```
/iso-docs document_type={type} language={language}
```

### Parameters

| Parameter | จำเป็น | ค่า | คำอธิบาย |
|-----------|--------|------|-----------|
| `document_type` | ✓ | project-plan, srs, sdd, test-plan, test-record, traceability, change-request, progress, config-plan, user-manual | ประเภทเอกสาร |
| `language` | - | thai, english, bilingual | ภาษา |
| `project_info` | ✓ | object | ข้อมูลโครงการ |

### Project Info Object

```json
{
  "project_name": "ชื่อโครงการ",
  "version": "1.0",
  "date": "16 มีนาคม 2569",
  "author": "ชื่อผู้เขียน",
  "approver": "ชื่อผู้อนุมัติ"
}
```

---

## ขั้นตอนการใช้

### Step 1: โหลด Skill

```
/skill iso29110-docs
```

### Step 2: สร้าง Project Plan

```
/iso-docs document_type=project-plan language=bilingual
```

ใส่ project_info:
```json
{
  "project_name": "ClutchG PC Optimizer",
  "version": "1.0",
  "date": "16 มีนาคม 2569",
  "author": "ชื่อผู้เขียน",
  "approver": "ชื่อผู้อนุมัติ"
}
```

### Step 3: สร้าง SRS

```
/iso-docs document_type=srs language=bilingual
```

### Step 4: สร้าง SDD

```
/iso-docs document_type=sdd language=bilingual
```

### Step 5: สร้าง Test Plan

```
/iso-docs document_type=test-plan language=bilingual
```

### Step 6: สร้าง Test Record

```
/iso-docs document_type=test-record language=bilingual
```

---

## เอกสารที่เหลือ

### Traceability Matrix

```
/iso-docs document_type=traceability language=bilingual
```

### Change Request (ถ้ามี)

```
/iso-docs document_type=change-request language=bilingual
```

### Progress Report

```
/iso-docs document_type=progress language=bilingual
```

### Configuration Plan (ถ้ามี)

```
/iso-docs document_type=config-plan language=bilingual
```

### User Manual

```
/iso-docs document_type=user-manual language=bilingual
```

---

## ใช้ MCP Tool โดยตรง

```
iso_document document_type=srs language=bilingual project_info="{\"project_name\": \"ClutchG\", \"version\": \"1.0\", \"date\": \"16 มีนาคม 2569\", \"author\": \"ชื่อผู้เขียน\", \"approver\": \"ชื่อผู้อนุมัติ\"}"
```

---

## ลำดับการสร้าง (แนะนำ)

```
1. Project Plan        ← ต้นโครงการ (บท 1-2)
        ↓
2. SRS                ← หลังบท 2
        ↓
3. SDD                ← หลังบท 3
        ↓
4. Test Plan          ← หลังบท 4
        ↓
5. Test Record        ← หลังบท 6
        ↓
6. Traceability       ← หลัง Test Record
        ↓
7-10. เอกสารเพิ่มเติม ← ก่อนส่ง
```

---

## Bilingual Format

### Header

```
# ชื่อเอกสาร (ภาษาไทย)
# Document Title (English)

---
Version: x.y
Date: วัน/เดือน/ปี
---
```

### Section Header

```
## 1. ชื่อหมวด (Section Title)
```

---

## สิ่งที่ควรมีหลังจาก Module นี้

- [ ] เข้าใจ ISO 29110
- [ ] รู้จัก 10 ประเภทเอกสาร
- [ ] สร้างเอกสารได้ด้วย /iso-docs
- [ ] รู้จักลำดับการสร้าง

---

## ต่อไป

ไปที่: **`07-workshop/08-consistency.md`** → ตรวจความสอดคล้องข้ามเอกสาร

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
