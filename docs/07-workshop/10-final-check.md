# Workshop Module 10: Final Check / การตรวจสอบก่อนส่งวิทยานิพนธ์

> สอนทำ final check ก่อนส่งวิทยานิพนธ์จริง

---

## ภาพรวม

ใน module นี้คุณจะได้เรียนรู้:
1. Checklist ก่อนส่ง
2. วิธีทำ final check
3. การเตรียมตัวส่ง

---

## Final Checklist

### ✓ โครงสร้าง

- [ ] มีครบทุกบท (1-7)
- [ ] แต่ละบทมีหัวข้อครบถ้วน
- [ ] ลำดับถูกต้อง

### ✓ เนื้อหา

- [ ] เนื้อหาครบตามขอบเขต
- [ ] มีเหตุผลรองรับ
- [ ] ไม่มี [TBD] ค้างอยู่

### ✓ การอ้างอิง

- [ ] ไม่มี [CITATION NEEDED] ค้างอยู่
- [ ] Bibliography ครบถ้วน
- [ ] APA ถูกต้อง
- [ ] อ้างอิงเรียงตามตัวอักษร

### ✓ De-AI

- [ ] CV >= 30%
- [ ] ไม่มี Banned Patterns
- [ ] ภาษาเป็นธรรมชาติ

### ✓ รูปแบบ

- [ ] Font ถูกต้อง (TH Sarabun New 16pt)
- [ ] Line spacing 1.5
- [ ] เว้นวรรคถูกต้อง
- [ ] หัวข้อถูกต้อง

### ✓ ISO 29110

- [ ] ครบ 10 เอกสาร
- [ ] ข้อมูลถูกต้อง
- [ ] เวอร์ชันถูกต้อง

### ✓ ความสอดคล้อง

- [ ] ตัวเลขตรงกันทุกบท
- [ ] ศัพท์ใช้คำเดียวกัน
- [ ] เวอร์ชันตรงกัน

### ✓ คะแนน

- [ ] ได้คะแนน >= 75/100
- [ ] ผ่าน 8 gates

---

## ขั้นตอน Final Check

### Step 1: Run Full Audit

```
/thesis-audit scope=full university=chiangmai
```

ดูว่าผ่านกี่ gates

### Step 2: Check [CITATION NEEDED]

```
ค้นหา "[CITATION NEEDED]" ในทุกบท
```

ถ้ายังมี → ต้องหาอ้างอิงเพิ่ม

### Step 3: Check De-AI

```
/thesis-deai mode=detect language=thai
```

สแกนทุกบท ดู CV และ banned patterns

### Step 4: Check Consistency

```
thesis_consistency documents=[...] check_types=["numbers", "terminology"]
```

ตรวจตัวเลขและศัพท์

### Step 5: Check ISO

ตรวจว่ามีทุกเอกสาร:
- [ ] Project Plan
- [ ] SRS
- [ ] SDD
- [ ] Test Plan
- [ ] Test Record
- [ ] Traceability Matrix
- [ ] Change Request (ถ้ามี)
- [ ] Progress Report
- [ ] Configuration Plan (ถ้ามี)
- [ ] User Manual

### Step 6: Final Score

```
/thesis-score university=chiangmai
```

ให้คะแนนทั้งเล่ม

---

## สิ่งที่ต้องแก้ไขก่อนส่ง

### ถ้า CV < 30%

- เพิ่มประโยคสั้น-ยาวหลากหลาย
- ใช้ passive/active สลับ
- เพิ่ม personal anecdote

### ถ้ามี Banned Patterns

- แทนที่ "นอกจากนี้" → "อีกประการหนึ่ง"
- แทนที่ "ก้าวสำคัญ" → "ปรับปรุง"
- ลบประโยคว่างเปล่า

### ถ้ามี [CITATION NEEDED]

- ค้นหาด้วย paper-search-mcp
- เพิ่ม in-text citation
- เพิ่มใน bibliography

### ถ้า Score < 75

- ดู dimension ที่ต่ำ
- แก้ไขตาม recommendations
- Run อีกครั้ง

---

## การเตรียมส่ง

### 1. ไฟล์ที่ต้องมี

```
thesis/
├── chapter1.md      # บทนำ
├── chapter2.md      # ทฤษฎีและงานวิจัย
├── chapter3.md      # ระเบียบวิธี
├── chapter4.md     # การวิเคราะห์และออกแบบ
├── chapter5.md     # การดำเนินการ
├── chapter6.md     # ผลการวิจัย
├── chapter7.md     # สรุปและข้อเสนอแนะ
├── bibliography.md # บรรณานุกรม
├── abstract-th.md   # บทคัดย่อไทย
├── abstract-en.md   # บทคัดย่ออังกฤษ
└── iso/            # โฟลเดอร์ ISO เอกสาร
```

### 2. ตรวจสอบไฟล์

- [ ] ชื่อไฟล์ถูกต้อง
- [ ] Encoding เป็น UTF-8
- [ ] ขนาดไฟล์ไม่ใหญ่เกินไป

---

## ขั้นตอนสุดท้าย

```
1. /thesis-audit scope=full → ผ่าน 8 gates
2. ทุกบท CV >= 30%
3. ไม่มี [CITATION NEEDED]
4. Score >= 75/100
5. ISO ครบ 10 เอกสาร
6. ตรวจสอบตัวเลข/ศัพท์
7. ✓ พร้อมส่ง!
```

---

## สิ่งที่ควรมีหลังจาก Module นี้

- [ ] ทำ final checklist เสร็จ
- [ ] ผ่าน 8 gates
- [ ] ไม่มี [CITATION NEEDED]
- [ ] CV >= 30%
- [ ] Score >= 75/100
- [ ] ISO ครบ
- [ ] พร้อมส่ง!

---

## Workshop สำเร็จ!

ยินดีด้วย! คุณได้เรียนรู้ทุกอย่างที่จำเป็นในการเขียนวิทยานิพนธ์ด้วย MCP Thai Thesis

---

## ขั้นตอนถัดไป

1. นำไปใช้กับโปรเจคจริงของคุณ
2. ฝึกฝนจนชำนาญ
3. ส่งวิทยานิพนธ์!

---

## Support

ถ้าต้องการความช่วยเหลือ:

- แก้ปัญหา: **`09-reference/TROUBLESHOOTING.md`**
- ดูตัวอย่าง: **`08-examples/CASE-STUDY.md`**
- อ่านเพิ่ม: **`06-best-practices/BEST-PRACTICES.md`**

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
