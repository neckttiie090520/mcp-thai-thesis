# Workshop Module 9: Audit / การตรวจรวบยอด 8-Gate

> สอนตรวจรวบยอดด้วย /thesis-audit และ thesis_audit

---

## ภาพรวม

ใน module นี้คุณจะได้เรียนรู้:
1. เข้าใจ 8-Gate Framework
2. ตรวจด้วย /thesis-audit
3. ตรวจ scope ต่างๆ
4. อ่านผลลัพธ์

---

## 8-Gate Framework

```
┌─────────────────────────────────────────────────────────────────────┐
│                        8-GATE CHECK                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Gate 1: โครงสร้าง      → มีครบทุกบท (1-7)                       │
│  Gate 2: เนื้อหา        → ลึกซึ้ง, มีเหตุผล                      │
│  Gate 3: การอ้างอิง      → APA ถูกต้อง                            │
│  Gate 4: ภาษาไทย        → ราชบัณฑิตยสถาน                        │
│  Gate 5: De-AI          → CV >= 30, 0 banned patterns            │
│  Gate 6: ความสอดคล้อง   → ตัวเลข, ศัพท์ตรงกัน                   │
│  Gate 7: รูปแบบ        → ตรง template                           │
│  Gate 8: ISO 29110      → ครบ 10 เอกสาร                         │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ใช้ /thesis-audit

### Command

```
/thesis-audit scope={scope}
```

### Parameters

| Parameter | จำเป็น | ค่า | คำอธิบาย |
|-----------|--------|------|-----------|
| `scope` | ✓ | full, chapter, iso, consistency | ขอบเขตการตรวจ |
| `text` | - | ข้อความ | เนื้อหาที่ตรวจ (สำหรับ chapter) |
| `chapter` | - | 1-7 | หมายเลขบท (สำหรับ chapter) |
| `university` | - | chulalongkorn, kasetsart, kmutt, chiangmai, generic | มหาวิทยาลัย |

### Scope

| Scope | ใช้เมื่อ |
|-------|----------|
| `full` | ตรวจทั้งเล่ม |
| `chapter` | ตรวจเฉพาะบท |
| `iso` | ตรวจเฉพาะ ISO เอกสาร |
| `consistency` | ตรวจเฉพาะความสอดคล้อง |

---

## ขั้นตอนการใช้

### Step 1: โหลด Skill

```
/skill thesis-quality-gate
```

### Step 2: เรียก /thesis-audit

```
/thesis-audit scope=full university=chiangmai
```

หรือตรวจเฉพาะบท:

```
/thesis-audit scope=chapter chapter=3 university=chiangmai
```

### Step 3: รอผลลัพธ์

```json
{
  "gates": {
    "gate_1_structure": {
      "passed": true,
      "score": 15,
      "max": 15,
      "details": "ครบทุกบท 1-7"
    },
    "gate_2_content": {
      "passed": true,
      "score": 22,
      "max": 25,
      "details": "เนื้อหาลึกซึ้ง"
    },
    "gate_3_citations": {
      "passed": false,
      "score": 14,
      "max": 20,
      "details": "มี 2 อ้างอิงที่ยังไม่ครบ"
    },
    "gate_4_language": {
      "passed": true,
      "score": 18,
      "max": 20,
      "details": "ภาษาดี"
    },
    "gate_5_deai": {
      "passed": false,
      "score": 7,
      "max": 10,
      "details": "CV 28% ต่ำกว่า 30%"
    },
    "gate_6_consistency": {
      "passed": true,
      "score": 9,
      "max": 10,
      "details": "ตัวเลขสอดคล้อง"
    },
    "gate_7_format": {
      "passed": true,
      "score": 13,
      "max": 15,
      "details": "ตรง template"
    },
    "gate_8_iso": {
      "passed": true,
      "score": 10,
      "max": 10,
      "details": "ครบ 10 เอกสาร"
    }
  },
  "total_score": 108,
  "max_score": 125,
  "percentage": 86.4,
  "passed_gates": 6,
  "failed_gates": 2,
  "recommendations": [
    "เพิ่มอ้างอิงที่ขาดใน gate 3",
    "ปรับ CV ให้สูงขึ้นใน gate 5"
  ]
}
```

---

## อ่านผลลัพธ์

### Score Summary

| Score | เกณฑ์ | ผล |
|-------|--------|-----|
| >= 90 | A | ยอดเยี่ยม |
| 80-89 | B | ดี |
| 70-79 | C+ | พอใช้ |
| 60-69 | C | ต้องปรับปรุง |
| < 60 | F | ไม่ผ่าน |

### Gate Status

| Status | ความหมาย |
|--------|----------|
| ✓ passed | ผ่าน |
| ✗ failed | ไม่ผ่าน - ต้องแก้ไข |

---

## ใช้ MCP Tool โดยตรง

```
thesis_audit scope=full university=chiangmai
```

---

## Scope ต่างๆ

### Full Audit

```
/thesis-audit scope=full university=chiangmai
```

ตรวจทั้ง 8 gates

### Chapter Audit

```
/thesis-audit scope=chapter chapter=3 university=chiangmai
```

ตรวจเฉพาะบทที่ 3

### ISO Audit

```
/thesis-audit scope=iso
```

ตรวจเฉพาะ ISO เอกสาร (Gate 8)

### Consistency Audit

```
/thesis-audit scope=consistency
```

ตรวจเฉพาะความสอดคล้อง (Gate 6)

---

## Workflow แนะนำ

```
เขียนบท 1-7 เสร็จ
        ↓
สร้าง ISO เสร็จ
        ↓
/thesis-audit scope=consistency
        ↓
/thesis-audit scope=iso
        ↓
/thesis-audit scope=full
        ↓
แก้ไขตาม recommendations
        ↓
/thesis-audit scope=full อีกครั้ง
        ↓
ผ่าน 8 gates → ส่ง!
```

---

## สิ่งที่ควรมีหลังจาก Module นี้

- [ ] เข้าใจ 8-Gate Framework
- [ ] ใช้ /thesis-audit ได้
- [ ] อ่านผลลัพธ์เป็น
- [ ] เลือก scope ถูกต้อง

---

## ต่อไป

ไปที่: **`07-workshop/10-final-check.md`** → Check ก่อนส่งวิทยานิพนธ์

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
