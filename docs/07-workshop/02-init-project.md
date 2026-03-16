# Workshop Module 2: Init Project / การสร้างโปรเจควิทยานิพนธ์

> สอนสร้างโปรเจควิทยานิพนธ์ด้วย /thesis-init

---

## ภาพรวม

ใน module นี้คุณจะได้เรียนรู้:
1. ใช้ /thesis-init command
2. สร้างโปรเจควิทยานิพนธ์
3. เลือกมหาวิทยาลัย
4. ได้ project config

---

## ทำความเข้าใจ /thesis-init

### Command

```
/thesis-init university={university} title="{title}" author="{author}" advisor="{advisor}"
```

### Parameters

| Parameter | จำเป็น | ค่าที่รองรับ | ตัวอย่าง |
|-----------|--------|---------------|-----------|
| `university` | ✓ | chulalongkorn, kasetsart, kmutt, chiangmai, generic | chiangmai |
| `title` | ✓ | ชื่อวิทยานิพนธ์ภาษาไทย | "ระบบลดความหน่วง..." |
| `author` | ✓ | ชื่อผู้วิจัย | "นายสมชาย วงศ์สกุล" |
| `title_en` | - | ชื่อภาษาอังกฤษ | "Windows Latency..." |
| `advisor` | - | ชื่ออาจารย์ที่ปรึกษา | "ดร.สมศักดิ์" |

---

## ขั้นตอนการใช้

### Step 1: เรียก /thesis-init

พิมพ์ใน OpenCode:

```
/thesis-init university=chiangmai title="ระบบลดความหน่วงของ Windows สำหรับเกม" author="ชื่อผู้วิจัย" advisor="ชื่ออาจารย์ที่ปรึกษา"
```

### Step 2: รอผลลัพธ์

ระบบจะสร้าง project config กลับมา:

```json
{
  "project_id": "thesis-2026-001",
  "university": "chiangmai",
  "title": "ระบบลดความหน่วงของ Windows สำหรับเกม",
  "author": "ชื่อผู้วิจัย",
  "advisor": "ชื่ออาจารย์ที่ปรึกษา",
  "chapter_plan": {
    "1": "บทนำ",
    "2": "ทฤษฎีและงานวิจัยที่เกี่ยวข้อง",
    "3": "ระเบียบวิธีวิจัย",
    "4": "การวิเคราะห์และออกแบบ",
    "5": "การดำเนินการ",
    "6": "ผลการวิจัย",
    "7": "สรุปและข้อเสนอแนะ"
  },
  "citation_policy": {
    "style": "APA-name-year",
    "year_system": "พ.ศ."
  },
  "format_profile": {
    "font": "TH Sarabun New",
    "font_size": 16,
    "line_spacing": 1.5
  }
}
```

---

## มหาวิทยาลัยที่รองรับ

| University Code | มหาวิทยาลัย | Font | Citation |
|----------------|--------------|------|----------|
| chulalongkorn | จุฬาลงกรณ์มหาวิทยาลัย | TH Sarabun New | APA |
| kasetsart | มหาวิทยาลัยเกษตรศาสตร์ | TH Sarabun New | APA |
| kmutt | มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง | TH Sarabun New | APA |
| chiangmai | มหาวิทยาลัยเชียงใหม่ | TH Sarabun New | APA |
| generic | แบบทั่วไป | TH Sarabun New | APA |

---

## ทางเลือก: ใช้ MCP Tool โดยตรง

นอกจาก /thesis-init ยังสามารถเรียก MCP Tool โดยตรงได้:

```
thai_thesis_init university=chiangmai title="ระบบลดความหน่วงของ Windows สำหรับเกม" author="ชื่อผู้วิจัย"
```

---

## สิ่งที่ได้จาก Init

เมื่อ init เสร็จ คุณจะได้:

1. **Project ID** - ใช้อ้างอิงโปรเจค
2. **Chapter Plan** - แผนบททั้ง 7 บท
3. **Citation Policy** - รูปแบบอ้างอิง
4. **Format Profile** - รูปแบบการจัดพิมพ์

---

## สิ่งที่ควรมีหลังจาก Module นี้

- [ ] เรียก /thesis-init ได้
- [ ] ได้ project config กลับมา
- [ ] เลือก university ถูกต้อง
- [ ] บันทึก project config ไว้

---

## ต่อไป

ไปที่: **`07-workshop/03-chapter-writing.md`** → เขียนบทวิทยานิพนธ์

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
