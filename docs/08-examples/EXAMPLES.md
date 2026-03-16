# Examples | ตัวอย่างผลลัพธ์จริง

> ผลลัพธ์จริงจากการใช้ระบบ mcp-thai-thesis เขียนวิทยานิพนธ์ M.Sc. Software Engineering, CMU
> Real outputs from using mcp-thai-thesis on an actual M.Sc. thesis at Chiang Mai University.

ตัวอย่างทั้งหมดมาจากโปรเจกต์วิทยานิพนธ์จริง ไม่ใช่ข้อมูลจำลอง บาง section ยังมี `[TBD]` หรือ `[CITATION NEEDED]` ซึ่งเป็นส่วนหนึ่งของ workflow ปกติ — ระบบไม่แต่งข้อมูลเอง

All examples come from a real thesis project, not fabricated data. Some sections still contain `[TBD]` or `[CITATION NEEDED]` markers — this is by design. The system never invents data.

---

## สารบัญ | Table of Contents

1. [Thai Abstract (บทคัดย่อ)](#1-thai-abstract)
2. [Chapter 1 Introduction (บทนำ)](#2-chapter-1-introduction)
3. [Citation Management (จัดการ Citation)](#3-citation-management)
4. [TweakRegistry Table (ภาคผนวก)](#4-tweakregistry-table)
5. [What the System Produces](#5-what-the-system-produces)

---

## 1. Thai Abstract

ผลลัพธ์จาก `thai_thesis_chapter` (chapter=abstract) + `thai_deai` (mode=edit):

```markdown
# บทคัดย่อ

**ชื่อเรื่อง:** แนวทางการพัฒนาซอฟต์แวร์ลดความหน่วงของระบบปฏิบัติการวินโดวส์
เพื่อเพิ่มทักษะของผู้เล่นในการเล่นเกมยิงมุมมองบุคคลที่หนึ่ง

**ผู้วิจัย:** ชื่อผู้วิจัย
**อาจารย์ที่ปรึกษา:** ชื่ออาจารย์ที่ปรึกษา
**ระดับปริญญา:** วิทยาศาสตรมหาบัณฑิต (วิศวกรรมซอฟต์แวร์)
วิทยาลัยศิลปะ สื่อ และเทคโนโลยี มหาวิทยาลัยเชียงใหม่

งานวิจัยนี้มีวัตถุประสงค์ 4 ข้อ ได้แก่ (1) พัฒนาซอฟต์แวร์ปรับแต่ง
ระบบปฏิบัติการ Windows ที่ลดค่าความหน่วงของระบบสำหรับการเล่นเกมยิง
มุมมองบุคคลที่หนึ่ง โดยมีระบบจำแนกความเสี่ยงและระบบความปลอดภัยรองรับ
(2) จัดทำระบบจำแนกความเสี่ยงของเทคนิคปรับแต่ง Windows แบ่งเป็น 3 ระดับ
พร้อมจัดกลุ่มเป็น 3 โปรไฟล์ตามระดับความเสี่ยงที่ผู้ใช้ยอมรับได้ ...
```

**สิ่งที่ระบบช่วย:**
- สร้างโครงสร้างตามรูปแบบ CMU (ชื่อเรื่อง, ผู้วิจัย, อาจารย์ที่ปรึกษา, ระดับปริญญา, เนื้อหา)
- ใช้ register ภาษาไทยวิชาการ (ใช้ "ผู้วิจัย" แทน "ผม/ฉัน")
- ผ่าน de-AI scan — ไม่มีภาษาสรรเสริญเกินจริง
- ใส่ `[TBD]` สำหรับข้อมูลที่ยังไม่มี แทนที่จะแต่งขึ้น

---

## 2. Chapter 1 Introduction

ผลลัพธ์จาก `thai_thesis_chapter` (chapter=1, mode=generate):

```markdown
# บทที่ 1 บทนำ

## 1.1 ความเป็นมาและความสำคัญของปัญหา

เกมยิงมุมมองบุคคลที่หนึ่ง (first-person shooter: FPS) จัดเป็นประเภทเกม
ที่ผู้เล่นต้องอาศัยความเร็วในการตอบสนองและความแม่นยำในการเล็งสูงกว่า
เกมประเภทอื่น [CITATION NEEDED — งานวิจัยด้าน esports reaction time]
ความได้เปรียบด้านเวลาเพียงไม่กี่มิลลิวินาทีสามารถกำหนดผลแพ้ชนะใน
สถานการณ์ยิงต่อสู้ได้

...

## 1.2 วัตถุประสงค์การวิจัย

1. เพื่อพัฒนาซอฟต์แวร์ปรับแต่งระบบปฏิบัติการ Windows ที่ลดค่าความหน่วง
   ของระบบสำหรับการเล่นเกมยิงมุมมองบุคคลที่หนึ่ง
2. เพื่อจัดทำระบบจำแนกความเสี่ยงของเทคนิคปรับแต่ง Windows แบ่งเป็น
   3 ระดับ (LOW, MEDIUM, HIGH)
3. เพื่อทดสอบประสิทธิภาพของซอฟต์แวร์
4. เพื่อดำเนินกระบวนการพัฒนาซอฟต์แวร์ตามมาตรฐาน ISO/IEC 29110

### สมมติฐานการวิจัย

H1: ผู้เล่นที่ใช้โปรไฟล์ COMPETITIVE มีค่า average frametime ต่ำกว่า
    กลุ่ม baseline อย่างมีนัยสำคัญทางสถิติ (α = 0.05)
H2: ผู้เล่นที่ใช้โปรไฟล์ COMPETITIVE มีค่า ISR latency และ DPC latency
    ต่ำกว่ากลุ่ม baseline
H3: ผู้เล่นที่ใช้ซอฟต์แวร์มีค่า ACS และ K/D สูงกว่าช่วง baseline
```

**สิ่งที่ระบบช่วย:**
- โครงสร้าง 5 ส่วน: ความเป็นมา, วัตถุประสงค์, ขอบเขต, สมมติฐาน, ประโยชน์
- ใส่ `[CITATION NEEDED]` พร้อมคำแนะนำว่าควรหา citation ประเภทใด
- ไม่แต่งตัวเลขสถิติที่ยังไม่มี

---

## 3. Citation Management

ผลลัพธ์จาก `thai_citation` (action=audit) + citation-manager skill:

```markdown
# CITATION NEEDED Inventory

> จำนวนรวม: 54 จุด (Ch1=10, Ch2=31, Ch3=8, Ch4=2, Ch6=3)

## รายการที่หาได้แล้ว (APA นาม-ปี พ.ศ.)

### บทที่ 1: บทนำ

| # | หัวข้อ | APA Citation (พ.ศ.) |
|---|--------|---------------------|
| 1.1 | FPS esports reaction time | Pedraza-Ramirez, I., Musculus, L.,
      Raab, M., & Laborde, S. (2563). Setting the scientific stage for
      esports psychology. *International Review of Sport and Exercise
      Psychology*, 13(1), 319-352. |
| 1.6 | ปิด Defender/UAC เปิดช่องโหว่ | Microsoft. (2566). Windows security
      features. https://learn.microsoft.com/... |
| 1.9 | ISO/IEC 29110 VSE | ISO/IEC 29110-1:2016. *Software engineering —
      Lifecycle profiles for Very Small Entities (VSEs)* |
```

**สิ่งที่ระบบช่วย:**
- ติดตาม `[CITATION NEEDED]` ทุกจุดในทุกบท
- แปลงปี ค.ศ. → พ.ศ. ตามการตั้งค่ามหาวิทยาลัย (CMU ใช้ พ.ศ.)
- จัดกลุ่มตามบท พร้อมหมายเลขอ้างอิง
- ระบุแหล่งที่หาได้แล้ว vs ที่ยังต้องหาเพิ่ม

---

## 4. TweakRegistry Table

ผลลัพธ์จาก `thai_thesis_chapter` (chapter=appendix) + `iso_document`:

```markdown
# ภาคผนวก ง — ตารางจำแนกเทคนิคปรับแต่ง Windows (TweakRegistry)

## ง.1 สรุปภาพรวม

| รายการ              | จำนวน |
|---------------------|-------|
| เทคนิคทั้งหมด       | 56    |
| หมวดหมู่            | 10    |
| ความเสี่ยง LOW      | 25    |
| ความเสี่ยง MEDIUM   | 23    |
| ความเสี่ยง HIGH     | 8     |
| SAFE profile        | 17    |
| COMPETITIVE profile | 35    |
| EXTREME profile     | 48    |
| Myth/Obsolete       | 8     |

## ง.2 Power (7 เทคนิค)

| # | ชื่อเทคนิค               | ความเสี่ยง | โปรไฟล์      |
|---|--------------------------|-----------|-------------|
| 1 | Ultimate Performance Plan | LOW       | SAFE        |
| 2 | Disable Power Throttling  | LOW       | SAFE        |
| 3 | Processor Idle Disable    | MEDIUM    | COMPETITIVE |
| 4 | USB Selective Suspend Off | LOW       | SAFE        |
| 5 | PCI Express Link State Off| MEDIUM    | COMPETITIVE |
| 6 | Core Parking Disable      | HIGH      | EXTREME     |
| 7 | Performance Boost Config  | MEDIUM    | COMPETITIVE |
```

**สิ่งที่ระบบช่วย:**
- สร้างตาราง 56 รายการพร้อมจำแนกความเสี่ยง 3 ระดับ
- จัดกลุ่มเป็น 10 หมวดหมู่ (Power, Network, Telemetry, Services, GPU, Timer, Memory, BCDEdit, Scheduler, Input)
- แยก Myth/Obsolete ออกจากรายการใช้งานจริง

---

## 5. What the System Produces

### ผลลัพธ์ทั้งหมดจากโปรเจกต์จริง

ระบบ mcp-thai-thesis ช่วยสร้างไฟล์ทั้งหมด **28 ไฟล์** สำหรับวิทยานิพนธ์เล่มเดียว:

| ประเภท | ไฟล์ | รายละเอียด |
|--------|------|------------|
| **บทวิทยานิพนธ์** | 7 | บทที่ 1-7 (แบบ 7 บท สายวิศวกรรมซอฟต์แวร์) |
| **บทคัดย่อ** | 2 | ไทย + อังกฤษ |
| **ส่วนหน้า** | 5 | กิตติกรรมประกาศ, สารบัญ, รายการตาราง, รายการภาพ, คำย่อ |
| **ส่วนท้าย** | 2 | บรรณานุกรม, อภิธานศัพท์ |
| **ภาคผนวก** | 6 | ก (ISO 29110), ข (แบบสอบถาม), ค (ใบยินยอม), ง (TweakRegistry), จ (GitHub analysis), ฉ (screenshots) |
| **เอกสารสนับสนุน** | 4 | citation report, citation-needed list, handoff doc, author bio |
| **รวม** | **28** | **~490 KB Markdown** |

### ตัวเลขความครบถ้วน

| Metric | ค่า |
|--------|-----|
| ขนาดรวม | ~490 KB Markdown |
| จำนวน `[CITATION NEEDED]` | 54 จุด (หาได้แล้ว ~48) |
| จำนวน `[TBD]` | ~190 จุด (ส่วนใหญ่รอข้อมูลการทดลอง) |
| จำนวน `[VERIFY REQUIRED]` | ~6 จุด |
| Citations in bibliography | ~40 รายการ |
| ISO 29110 documents referenced | 10 ฉบับ |

### สิ่งที่ระบบไม่ทำ

- ไม่แต่งผลการทดลอง (ใส่ `[TBD]` แทน)
- ไม่แต่ง DOI, URL, หรือเลขหน้า (ใส่ `[VERIFY REQUIRED]` แทน)
- ไม่อ้างว่าวิทยานิพนธ์เสร็จสมบูรณ์ — มี HANDOFF.md ระบุสิ่งที่ต้องทำต่อ

---

## ดูเพิ่มเติม | See Also

- [SKILLS-GUIDE.md](SKILLS-GUIDE.md) — วิธีใช้แต่ละ skill
- [WORKFLOW.md](WORKFLOW.md) — ลำดับการทำงาน 7 pipelines
- [CAPABILITIES.md](CAPABILITIES.md) — รายการ tools ทั้งหมด
