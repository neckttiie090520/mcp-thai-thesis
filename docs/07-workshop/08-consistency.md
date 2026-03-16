# Workshop Module 8: Consistency / การตรวจความสอดคล้องข้ามเอกสาร

> สอนตรวจความสอดคล้องด้วย thesis_consistency

---

## ภาพรวม

ใน module นี้คุณจะได้เรียนรู้:
1. ตรวจความสอดคล้องของตัวเลข
2. ตรวจความสอดคล้องของศัพท์เทคนิค
3. ตรวจความสอดคล้องของข้อเท็จจริง
4. ตรวจเวอร์ชันและวันที่

---

## ทำไมต้องตรวจ?

```
❌ ไม่สอดคล้อง:
- บท 3: กลุ่มตัวอย่าง 20 คน
- บท 6: กลุ่มตัวอย่าง 30 คน

✓ สอดคล้อง:
- บท 3: กลุ่มตัวอย่าง 20 คน
- บท 6: กลุ่มตัวอย่าง 20 คน
```

---

## ใช้ thesis_consistency

### Command

```
thesis_consistency documents=[...] check_types=[...]
```

### Parameters

| Parameter | จำเป็น | ค่า | คำอธิบาย |
|-----------|--------|------|-----------|
| `documents` | ✓ | array | เอกสารที่ต้องการตรวจ |
| `check_types` | - | numbers, terminology, facts, versions, dates | ประเภทการตรวจ |

### Check Types

| Type | ตรวจอะไร |
|------|-----------|
| `numbers` | ตัวเลข, จำนวน, สถิติ |
| `terminology` | ศัพท์เทคนิค, คำศัพท์ |
| `facts` | ข้อเท็จจริง, การอธิบาย |
| `versions` | เวอร์ชันซอฟต์แวร์ |
| `dates` | วันที่, ช่วงเวลา |

---

## ขั้นตอนการใช้

### Step 1: เตรียมเอกสาร

รวบรวมเอกสารที่ต้องการตรวจ:

```json
[
  {
    "name": "บทที่ 3",
    "content": "...เนื้อหาบทที่ 3..."
  },
  {
    "name": "บทที่ 6", 
    "content": "...เนื้อหาบทที่ 6..."
  }
]
```

### Step 2: เรียก thesis_consistency

```
thesis_consistency documents=[{"name": "บท3", "content": "..."}, {"name": "บท6", "content": "..."}] check_types=["numbers", "terminology", "facts"]
```

### Step 3: รอผลลัพธ์

```json
{
  "issues": [
    {
      "type": "numbers",
      "location": "บทที่ 6, ย่อหน้าที่ 5",
      "description": "กลุ่มตัวอย่าง: 30 คน (ไม่ตรงกับ บทที่ 3: 20 คน)"
    },
    {
      "type": "terminology", 
      "location": "บทที่ 4, หัวข้อ 4.2",
      "description": "ใช้ 'latency' บ้าง, 'lag' บ้าง - ควรใช้คำเดียวกัน"
    }
  ],
  "summary": {
    "total_issues": 2,
    "numbers": 1,
    "terminology": 1,
    "facts": 0,
    "versions": 0,
    "dates": 0
  }
}
```

---

## ประเภทการตรวจ

### 1. Numbers (ตัวเลข)

| ตรวจ | ตัวอย่าง |
|------|----------|
| จำนวนกลุ่มตัวอย่าง | 20 vs 30 |
| สถิติ | mean, SD, p-value |
| เปอร์เซ็นต์ | 85% vs 80% |
| ขนาดไฟล์ | 1.2 MB vs 1.5 MB |

### 2. Terminology (ศัพท์เทคนิค)

| ตรวจ | ตัวอย่าง |
|------|----------|
| คำศัพท์ | latency vs lag |
| ชื่อตัวแปร | FPS vs frames per second |
| ชื่อระบบ | ClutchG vs ClutchG Optimizer |

### 3. Facts (ข้อเท็จจริง)

| ตรวจ | ตัวอย่าง |
|------|----------|
| วิธีการ | ใช้ G*Power vs ใช้ SampleSize |
| เครื่องมือ | CapFrameX vs OBS |
| ผลลัพธ์ | ลดลง 15% vs เพิ่มขึ้น 15% |

### 4. Versions (เวอร์ชัน)

| ตรวจ | ตัวอย่าง |
|------|----------|
| Python version | 3.11 vs 3.10 |
| Windows version | Windows 11 vs Windows 10 |
| ไลบรารี | v2.0 vs v1.5 |

### 5. Dates (วันที่)

| ตรวจ | ตัวอย่าง |
|------|----------|
| วันที่ทดสอบ | 15 ม.ค. vs 20 ม.ค. |
| ระยะเวลา | 4 สัปดาห์ vs 1 เดือน |

---

## ใช้ /thesis-audit แทน

สำหรับ consistency check พร้อมกับ audit อื่นๆ:

```
/thesis-audit scope=consistency
```

---

## ลำดับการตรวจ (แนะนำ)

### หลังเขียนบท 6 เสร็จ

```
thesis_consistency ตรวจ: บท 3 + บท 6
```

### ก่อนส่งวิทยานิพนธ์

```
thesis_consistency ตรวจ: บท 1-7 + ISO docs
```

---

## Workflow แนะนำ

```
เขียนบท 3 → เขียนบท 6 → thesis_consistency (numbers) → แก้ไข → ต่อไป
```

---

## สิ่งที่ควรมีหลังจาก Module นี้

- [ ] ใช้ thesis_consistency ได้
- [ ] ตรวจความสอดคล้องของตัวเลข
- [ ] ตรวจความสอดคล้องของศัพท์
- [ ] ตรวจความสอดคล้องของข้อเท็จจริง

---

## ต่อไป

ไปที่: **`07-workshop/09-audit.md`** → ตรวจรวบยอด 8-Gate

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
