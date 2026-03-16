# Workshop Module 5: Citation / การจัดการอ้างอิง APA นาม-ปี

> สอนค้นหา สร้าง และจัดการอ้างอิงด้วย paper-search-mcp และ thai_citation

---

## ภาพรวม

ใน module นี้คุณจะได้เรียนรู้:
1. ค้นหาอ้างอิงด้วย paper-search-mcp
2. สร้าง in-text citation
3. สร้าง bibliography
4. ตรวจสอบความถูกต้อง

---

## APA นาม-ปี พื้นฐาน

### รูปแบบ In-text Citation

| รูปแบบ | ตัวอย่าง |
|---------|-----------|
| แบบประโยค | สมชาย (2566) กล่าวว่า... |
| แบบวงเล็บ | ...พบว่า (สมชาย, 2566) |
| หลายคน | (สมชาย และสมศักดิ์, 2566) |
| 3+ คน | (สมชาย et al., 2566) |

### รูปแบบ Bibliography

```
ผู้แต่ง. (ปี). ชื่อเรื่อง. แหล่งพิมพ์.
```

### ระบบปี

| ประเภทผู้แต่ง | ระบบแนะนำ |
|--------------|----------|
| ไทย | พ.ศ. (2566) |
| อังกฤษ | พ.ศ. หรือ ค.ศ. (กำหนดเอง แต่ต้องตรงกันทั้งเอกสาร) |

---

## ขั้นตอนที่ 1: ค้นหาอ้างอิง

### ใช้ paper-search-mcp_search_semantic

```
paper-search-mcp_search_semantic query="latency online games" max_results=10
```

**ผลลัพธ์:**
```json
[
  {
    "title": "Network Latency and Gaming Performance",
    "authors": ["John Smith", "Jane Doe"],
    "year": 2023,
    "doi": "10.1000/xyz123",
    "abstract": "..."
  },
  ...
]
```

### ใช้ paper-search-mcp_search_google_scholar

```
paper-search-mcp_search_google_scholar query="windows optimization gaming" max_results=10
```

### ใช้ paper-search-mcp_search_arxiv

```
paper-search-mcp_search_arxiv query="machine learning gaming" max_results=5
```

---

## ขั้นตอนที่ 2: ดึงข้อมูลจาก DOI

### ใช้ paper-search-mcp_get_crossref_paper_by_doi

```
paper-search-mcp_get_crossref_paper_by_doi doi="10.1145/1167838.1167860"
```

**ผลลัพธ์:**
```json
{
  "title": "...",
  "authors": [...],
  "year": 2023,
  "journal": "...",
  "volume": "...",
  "issue": "...",
  "pages": "...",
  "doi": "..."
}
```

---

## ขั้นตอนที่ 3: สร้าง In-text Citation

### ใช้ thai_citation action=cite

```
thai_citation action=cite source="{"author": "John Smith", "year": 2023, "title": "Network Latency", "type": "journal"}" year_system=phc
```

**ผลลัพธ์:**
```json
{
  "narrative": "Smith (2566) กล่าวว่า...",
  "parenthetical": "(Smith, 2566)"
}
```

---

## ขั้นตอนที่ 4: สร้าง Bibliography

### ใช้ thai_citation action=bibliography

```
thai_citation action=bibliography sources="[{\"author\": \"John Smith\", \"year\": 2023, \"title\": \"Network Latency\", \"journal\": \"IEEE\", \"doi\": \"10.1000/xyz123\"}]" year_system=phc
```

**ผลลัพธ์:**
```
Smith, J. (2566). Network Latency and Gaming Performance. IEEE, 15(2), 1-15. https://doi.org/10.1000/xyz123
```

---

## ขั้นตอนที่ 5: ตรวจสอบความถูกต้อง

### ใช้ thai_citation action=audit

```
thai_citation action=audit cited_keys="[\"Smith2566\", \"Doe2565\", \"Johnson2564\"]" year_system=phc
```

**ผลลัพธ์:**
```json
{
  "total_citations": 3,
  "found_in_bibliography": 3,
  "missing_in_bibliography": [],
  "issues": [
    "Doe2565: ปีไม่ตรงกับ bibliography"
  ]
}
```

---

## ขั้นตอนที่ 6: Validate Source

### ใช้ thai_citation action=validate

```
thai_citation action=validate source="{\"author\": \"John Smith\", \"year\": 2023, \"title\": \"Network Latency\", \"type\": \"journal\"}" year_system=phc
```

**ผลลัพธ์:**
```json
{
  "valid": true,
  "issues": []
}
```

---

## Workflow แนะนำ

```
1. ค้นหาด้วย paper-search-mcp_search_semantic
        ↓
2. ดึงข้อมูลด้วย paper-search-mcp_get_crossref_paper_by_doi
        ↓
3. ดาวน์โหลด PDF ด้วย paper-search-mcp_download_semantic
        ↓
4. สร้าง in-text citation ด้วย thai_citation action=cite
        ↓
5. รวบรวม bibliography ด้วย thai_citation action=bibliography
        ↓
6. ตรวจสอบด้วย thai_citation action=audit
```

---

## การใช้ [CITATION NEEDED]

### เมื่อไหร่?

- ไม่มีข้อมูลจริง
- ยังหาอ้างอิงไม่เจอ

### วิธีใช้

```
ในเนื้อหา:
"การศึกษาเรื่องนี้มีความสำคัญ [CITATION NEEDED]"

ใน bibliography:
[CITATION NEEDED] - รอการค้นหา
```

### ทำ list แล้วค้นหาทีหลัง

```markdown
## รายการอ้างอิงที่ต้องหา

1. [CITATION NEEDED] - เรื่อง latency ในเกม
2. [CITATION NEEDED] - เรื่อง Windows optimization
3. [CITATION NEEDED] - เรื่อง Valorant performance
```

---

## สิ่งที่ควรมีหลังจาก Module นี้

- [ ] ค้นหาอ้างอิงได้
- [ ] สร้าง in-text citation ได้
- [ ] สร้าง bibliography ได้
- [ ] ตรวจสอบความถูกต้องได้
- [ ] ใช้ [CITATION NEEDED] เป็น

---

## ต่อไป

ไปที่: **`07-workshop/06-review-score.md`** → ตรวจคุณภาพ + ให้คะแนน

---

**อัพเดทล่าสุด:** 16 มีนาคม 2569
