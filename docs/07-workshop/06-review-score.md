# Workshop Module 6: Review & Score / การตรวจคุณภาพและให้คะแนน

> สอนตรวจคุณภาพวิทยานิพนธ์ด้วย /thesis-review และ /thesis-score

---

## ภาพรวม

ใน module นี้คุณจะได้เรียนรู้:
1. ตรวจคุณภาพด้วย thesis_review
2. ให้คะแนนด้วย thesis_score
3. 3 มุมมอง: advisor, committee, iso_auditor
4. 6 มิติการให้คะแนน

---

## การตรวจคุณภาพ (thesis_review)

### Command

```
/thesis-review perspective={perspective}
```

### Parameters

| Parameter | จำเป็น | ค่า | คำอธิบาย |
|-----------|--------|------|-----------|
| `perspective` | ✓ | advisor, committee, iso_auditor | มุมมองผู้ตรวจ |
| `text` | ✓ | ข้อความ | เนื้อหาที่ต้องการตรวจ |
| `chapter` | - | 1-7 | หมายเลขบท |

### 3 มุมมอง

| Perspective | ใช้เมื่อ |
|-------------|----------|
| `advisor` | ตรวจเบื้องต้น ก่อนส่งจริง |
| `committee` | ตรวจแบบกรรมการสอบ |
| `iso_auditor` | ตรวจตามมาตรฐาน ISO 29110 |

---

## ขั้นตอนการใช้

### Step 1: โหลด Skill

```
/skill thesis-quality-gate
```

### Step 2: เรียก /thesis-review

```
/thesis-review perspective=advisor
```

วางเนื้อหาที่ต้องการตรวจตามด้วย

### Step 3: รอผลลัพธ์

```json
{
  "review": {
    "strengths": [
      "โครงสร้างชัดเจน",
      "มีเหตุผลรองรับ"
    ],
    "weaknesses": [
      "บางส่วนต้องการอ้างอิงเพิ่ม",
      "ภาษาควรเป็นทางการมากขึ้น"
    ],
    "suggestions": [
      "เพิ่มอ้างอิงในส่วน methodology",
      "แก้ไขการเว้นวรรค"
    ]
  }
}
```

---

## การให้คะแนน (thesis_score)

### Command

```
/thesis-score university={university}
```

### Parameters

| Parameter | จำเป็น | ค่า | คำอธิบาย |
|-----------|--------|------|-----------|
| `text` | ✓ | ข้อความ | เนื้อหาที่ต้องการให้คะแนน |
| `university` | - | chulalongkorn, kasetsart, kmutt, chiangmai, generic | มหาวิทยาลัย |
| `chapter` | - | 1-7 | หมายเลขบท |

### 6 มิติการให้คะแนน

| มิติ | คะแนนสูงสุด | คำอธิบาย |
|------|-------------|-----------|
| เนื้อหาและการโต้แย้ง | 25 | ความลึกซึ้ง, เหตุผล |
| อ้างอิงวิชาการ | 20 | APA, ความเพียงพอ |
| ภาษาไทย | 20 | ราชบัณฑิตยสถาน, register |
| โครงสร้างและรูปแบบ | 15 | ครบถ้วน, ตรง template |
| ความสอดคล้องของข้อมูล | 10 | ตัวเลข, ศัพท์ |
| De-AI Score | 10 | CV >= 30, 0 banned |

**รวม: 100 คะแนน**

---

## ขั้นตอนการใช้

### Step 1: เรียก /thesis-score

```
/thesis-score university=chiangmai
```

วางเนื้อหาที่ต้องการให้คะแนนตามด้วย

### Step 2: รอผลลัพธ์

```json
{
  "total_score": 78,
  "grade": "B",
  "dimensions": {
    "content": {
      "score": 20,
      "max": 25,
      "comment": "เนื้อหาดี แต่ขาดรายละเอียดบางส่วน"
    },
    "references": {
      "score": 15,
      "max": 20,
      "comment": "อ้างอิงเพียงพอ แต่บางรายการไม่ตรงปี"
    },
    "language": {
      "score": 16,
      "max": 20,
      "comment": "ภาษาดี มีบางจุดที่ไม่เป็นทางการ"
    },
    "structure": {
      "score": 12,
      "max": 15,
      "comment": "โครงสร้างครบถ้วน"
    },
    "consistency": {
      "score": 8,
      "max": 10,
      "comment": "ตัวเลขสอดคล้องกัน"
    },
    "deai": {
      "score": 7,
      "max": 10,
      "comment": "CV 28% ใกล้เกณฑ์"
    }
  },
  "recommendations": [
    "เพิ่มอ้างอิงในบทที่ 3",
    "ปรับ CV ให้สูงขึ้น"
  ]
}
```

---

## เกรด

| คะแนน | เกรด |
|-------|------|
| 90-100 | A |
| 80-89 | B |
| 70-79 | C+ |
| 60-69 | C |
| 50-59 | D |
| < 50 | F |

---

## ใช้ MCP Tools โดยตรง

### thesis_review

```
thesis_review perspective=advisor text="เนื้อหาที่ต้องการตรวจ"
```

### thesis_score

```
thesis_score text="เนื้อหาที่ต้องการให้คะแนน" university=chiangmai
```

---

## Workflow แนะนำ

```
เขียนบท → De-AI → ตรวจด้วย thesis_review (advisor) → แก้ไข → thesis_score → ต่อบทถัดไป
```

---

## สิ่งที่ควรมีหลังจาก Module นี้

- [ ] ใช้ /thesis-review ได้
- [ ] ใช้ /thesis-score ได้
- [ ] เข้าใจ 3 มุมมอง
- [ ] เข้าใจ 6 มิติการให้คะแนน
- [ ] รู้จักเกรด

---

## ต่อไป

ไปที่: **`07-workshop/07-iso-docs.md`** → สร้างเอกสาร ISO 29110

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
