# Use Cases — MCP Thai Thesis

> ไอเดียการใช้งานสำหรับ MCP Thai Thesis และเครื่องมือที่เกี่ยวข้อง

---

## 1. Workflow หลัก: ตรวจสอบคุณภาพวิทยานิพนธ์

### 1.1 De-AI Detection (ตรวจจับลายนิ้วมือ AI)

**Use Case:** ตรวจสอบว่าข้อความมีรูปแบบการเขียนของ AI หรือไม่

```
ใช้ thai-deai เพื่อวิเคราะห์ข้อความ:
- ภาษา: thai (หรือ english/both)
- โหมด: detect (หรือ edit/rewrite)
- ข้อความ: [วางข้อความวิทยานิพนธ์ที่นี่]
```

**Output:**
- รายการ AI patterns ที่พบ (30+ patterns)
- คะแนน burstiness (CV ≥ 30 = คนเขียน)
- คำแนะนำการแก้ไข

---

### 1.2 Citation Audit (ตรวจสอบการอ้างอิง)

**Use Case:** ตรวจสอบว่า citation ทุกตัวในเนื้อหามี bibliography ที่ตรงกัน

```
ใช้ thai-citation เพื่อ audit:
- action: audit
- cited_keys: [citation keys ที่พบในเนื้อหา]
- year_system: phc (พ.ศ.) หรือ ce (ค.ศ.)
```

**Output:**
- Citation ที่มีในเนื้อหาแต่ไม่มีใน bibliography
- Bibliography ที่ไม่ได้อ้างในเนื้อหา
- ความไม่สอดคล้องของชื่อผู้แต่ง/ปี

---

### 1.3 Consistency Check (ตรวจสอบความสอดคล้อง)

**Use Case:** ตรวจสอบว่าตัวเลข/ศัพท์/ข้อเท็จจริงตรงกันข้ามบท

```
ใช้ thesis-consistency เพื่อตรวจสอบ:
- documents: [เอกสารที่ต้องการตรวจ]
- check_types: ["numbers", "terminology", "facts", "versions", "dates"]
```

**Output:**
- ตัวเลขที่ไม่ตรงกัน
- ศัพท์ที่ใช้ไม่สม่ำเสมอ
- ข้อเท็จจริงที่ขัดแย้ง

---

### 1.4 Quality Scoring (ให้คะแนน)

**Use Case:** ประเมินคุณภาพวิทยานิพนธ์เป็นตัวเลข

```
ใช้ thesis-score:
- text: [เนื้อหาวิทยานิพนธ์]
- university: chiangmai (หรือ chulalongkorn/kasetsart/kmutt/generic)
```

**Output:**
- คะแนนรวม 100 คะแนน
- แยก 6 มิติ:
  - Format (รูปแบบ)
  - Structure (โครงสร้าง)
  - Content (เนื้อหา)
  - Citation (การอ้างอิง)
  - Language (ภาษา)
  - Research (งานวิจัย)

---

### 1.5 Pre-Submission Quality Gate (ตรวจสอบก่อนส่ง)

**Use Case:** Checklist 8 ขั้นตอนก่อนส่งวิทยานิพนธ์

```
ใช้ thesis-quality-gate:
- scope: full (หรือ chapter/iso/consistency)
- university: chiangmai
```

**Output:**
- Gate 1: Structural completeness
- Gate 2: Content quality
- Gate 3: Citation integrity
- Gate 4: Thai language quality
- Gate 5: De-AI compliance
- Gate 6: Data consistency
- Gate 7: Formatting compliance
- Gate 8: ISO 29110 compliance

---

## 2. Workflow การหา Citation ที่ขาด

### 2.1 หา Citation ที่ขาดด้วย paper-search-mcp

**Step 1:** หาว่าขาดอะไร

```
ใช้ thesis_consistency เพื่อหา citation ที่ขาด:
- documents: [{name: "บทนำ", content: "..."}]
- check_types: ["numbers", "terminology", "facts"]
```

**Step 2:** ค้นหางานวิจัย

```
ใช้ paper-search-mcp:
- search_semantic(query: "หัวข้อที่ต้องการ", max_results: 5)
- search_google_scholar(query: "หัวข้อที่ต้องการ", max_results: 5)
- search_arxiv(query: "หัวข้อที่ต้องการ", max_results: 5)
```

**Step 3:** สร้าง Bibliography Entry

```
ใช้ thai_citation:
- action: bibliography
- sources: [{title, authors, year, doi, venue}]
- year_system: phc
```

---

## 3. Workflow การสร้างเอกสาร ISO 29110

### 3.1 สร้าง ISO Document

**Use Case:** สร้างเอกสาร ISO/IEC 29110 สำหรับโปรเจกต์ซอฟต์แวร์

```
ใช้ iso_document:
- document_type: project-plan (หรือ srs/sdd/test-plan/test-record/traceability/change-request/progress/config-plan/user-manual)
- language: bilingual (หรือ thai/english)
- project_info: {name, version, author, date, description}
```

**Output:**
- เอกสาร ISO แบบสองภาษา (ไทย + อังกฤษ)
- รูปแบบตามมาตรฐาน ISO/IEC 29110

---

## 4. Use Cases ขยาย

### 4.1 วิทยานิพนธ์ข้ามมหาวิทยาลัย

**Use Case:** นักศึกษาที่เรียน มช. แต่อาจารย์ที่ปรึกษาอยู่ จุฬาฯ

```
1. เริ่มต้นด้วย template ของมหาวิทยาลัยที่ต้องส่ง (chiangmai)
2. เขียนเนื้อหาตาม template นั้น
3. ใช้ thai_format ตรวจสอบรูปแบบ
4. ก่อนส่ง เปลี่ยนเป็น template ของอาจารย์ที่ปรึกษา (chulalongkorn)
5. ใช้ thesis_consistency ตรวจสอบว่าเนื้อหาไม่เปลี่ยน
```

---

### 4.2 วิทยานิพนธ์ภาษาอังกฤษสำหรับมหาวิทยาลัยต่างประเทศ

**Use Case:** นักศึกษาต่างชาติเขียนวิทยานิพนธ์ภาษาไทย

```
1. ใช้ thai_thesis_init กำหนด university เป็น generic
2. เขียนเนื้อหาเป็นภาษาไทย
3. ใช้ thai_deai (language: "both") ตรวจสอบทั้งไทยและอังกฤษ
4. ใช้ thai_citation (year_system: "ce") สำหรับ citation
```

---

### 4.3 รายงานการปฏิบัติงาน (Co-op/Internship Report)

**Use Case:** รายงานการฝึกงานที่ต้องมี ISO เอกสาร

```
1. ใช้ iso_document สร้าง:
   - project-plan (แผนโปรเจกต์)
   - srs (ข้อกำหนดความต้องการ)
   - test-record (บันทึกการทดสอบ)
2. ใช้ thai_deai ตรวจสอบคุณภาพการเขียน
3. ใช้ thesis_score ให้คะแนน
```

---

### 4.4 ตรวจสอบวิทยานิพนธ์รุ่นพี่

**Use Case:** ทบทวนวิทยานิพนธ์รุ่นพี่เพื่อหาข้อผิดพลาด

```
1. ใส่เนื้อหาวิทยานิพนธ์เข้าไป
2. ใช้ thesis_audit (scope: "full") ตรวจสอบทั้งเล่ม
3. ใช้ thesis_consistency ตรวจความสอดคล้องข้ามบท
4. ใช้ thai_citation (action: "audit") ตรวจ bibliography
```

**Output:**
- รายการปัญหาที่พบ
- คะแนนแต่ละมิติ
- ข้อเสนอแนะการแก้ไข

---

### 4.5 เปรียบเทียบฉบับแก้ไข

**Use Case:** เปรียบเทียบฉบับก่อน/หลังแก้ไข

```
1. ใส่ฉบับก่อนแก้ไขและหลังแก้ไข
2. ใช้ thesis_consistency ตรวจสอบ:
   - ตัวเลขเหมือนกันไหม (จำนวนตัวอย่าง, ผลการทดสอบ)
   - ศัพท์เหมือนกันไหม (ชื่อระบบ, คำศัพท์เทคนิค)
   - ข้อเท็จจริงตรงกันไหม (วัตถุประสงค์, ขอบเขต)
```

---

### 4.6 สร้าง Mock Thesis สำหรับสอน

**Use Case:** สร้างตัวอย่างวิทยานิพนธ์สำหรับสอนนักศึกษาใหม่

```
1. ใช้ thai_thesis_chapter (mode: "generate") สร้างโครงสร้างบทตัวอย่าง
2. ใช้ thai_format กำหนดรูปแบบ
3. ใช้ thai_citation สร้าง bibliography ตัวอย่าง
4. ใช้ iso_document สร้างเอกสาร ISO ตัวอย่าง
```

---

### 4.7 Abstract หลายฉบับ

**Use Case:** สร้าง abstract หลายเวอร์ชันสำหรับ journal ต่างๆ

```
1. เขียน abstract เวอร์ชันแรก
2. ใช้ thai_deai (mode: "edit") ปรับให้เป็นธรรมชาติ
3. ใช้ thai_deai (mode: "rewrite") เขียนใหม่ในโทนต่างกัน
4. ใช้ thesis_score เลือกเวอร์ชันที่ดีที่สุด
```

---

### 4.8 เปลี่ยนระบบปี

**Use Case:** แปลงเอกสารจาก พ.ศ. เป็น ค.ศ. หรือกลับ

```
1. ใส่เอกสารที่ต้องการแปลง
2. ใช้ thai_citation:
   - year_system: "ce" (แปลง พ.ศ. → ค.ศ.)
   - หรือ year_system: "phc" (แปลง ค.ศ. → พ.ศ.)
3. ระบบจะแปลงทั้ง in-text citations และ bibliography
```

---

### 4.9 ตรวจ de-AI ก่อนส่ง Journal ต่างประเทศ

**Use Case:** ปรับงานวิจัยก่อนส่ง journal ที่ตรวจ AI writing

```
1. ใช้ thai_deai (language: "english", mode: "detect") หา patterns
2. ใช้ thai_deai (language: "english", mode: "rewrite") เขียนใหม่
3. ใช้ thai_citation ตรวจสอบ citation format ของ journal
4. ใช้ thesis_score ประเมินคุณภาพ
```

---

### 4.10 Traceability Matrix

**Use Case:** สร้างตารางติดตามความสัมพันธ์ Requirements → Design → Implementation → Test

```
ใช้ thesis_traceability:
- requirements: [
    {id: "FR-001", description: "...", design_ref: "D-001", impl_ref: "M-001", test_ref: "TC-001"},
    ...
  ]
- include_coverage: true
```

**Output:**
- ตาราง traceability matrix
- Coverage metrics (% ของ requirements ที่มี test)

---

## 5. การใช้งานร่วมกับเครื่องมืออื่น

### 5.1 ร่วมกับ Zotero

```
1. ใช้ Zotero จัดการ paper library
2. ใช้ paper-search-mcp ค้นหาและ import papers
3. ใช้ thai_citation สร้าง APA bibliography จาก metadata
```

### 5.2 ร่วมกับ Claude Code / Codex CLI

```
1. ติดตั้ง skills จาก mcp-thai-thesis
2. ใช้ slash commands สำหรับ workflow ต่างๆ
3. ใช้ paper-search-mcp สำหรับ citation search
```

### 5.3 ร่วมกับ Overleaf/LaTeX

```
1. เขียนเนื้อหาใน LaTeX
2. ใช้ thai_deai ตรวจสอบภาษา
3. ใช้ thai_citation ตรวจสอบ citation format
4. ใช้ thesis_score ประเมินคุณภาพ
```

---

## 6. Limitations (สิ่งที่ทำไม่ได้)

- ❌ เขียนวิทยานิพนธ์ให้ทั้งเล่มอัตโนมัติ
- ❌ สร้างข้อมูลวิจัยปลอม
- ❌ สร้าง citation ที่ไม่มีอยู่จริง (ต้องใช้ paper-search-mcp หาเอง)
- ❌ รับประกันว่าจะผ่านการสอบ
- ❌ ตรวจ plagiarism (แยกต่างหาก)

---

**Created for Thai graduate students. Built with real thesis writing experience.**
