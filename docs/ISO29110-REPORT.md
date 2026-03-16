# ISO 29110 Compliance Report / รายงานความสอดคล้อง ISO 29110

Honest assessment of what our ISO 29110 tools actually do and how reliable they are.

---

## What ISO 29110 Is

**ISO/IEC 29110** is an international standard for software engineering lifecycle processes designed for Very Small Entities (VSEs -- organizations with 25 or fewer people). Thai software engineering theses commonly require ISO 29110 documentation as appendices to demonstrate proper development methodology.

**ISO/IEC 29110** เป็นมาตรฐานสากลสำหรับกระบวนการพัฒนาซอฟต์แวร์ ออกแบบสำหรับองค์กรขนาดเล็ก (ไม่เกิน 25 คน) วิทยานิพนธ์สาขาวิศวกรรมซอฟต์แวร์ในมหาวิทยาลัยไทยส่วนใหญ่กำหนดให้มีเอกสาร ISO 29110 ประกอบในภาคผนวก

---

## What Our Tools Do

The `iso_document` tool generates **template structures** for 10 ISO 29110 document types with bilingual headers, standard section organization, and placeholder content. It does NOT:

- Validate against the actual ISO 29110 standard programmatically
- Check document completeness via automated testing
- Compare against a corpus of validated ISO documents
- Certify ISO compliance

### What it actually provides:

| Capability | How it works | Reliability |
|-----------|-------------|-------------|
| Document structure | Hard-coded section templates matching ISO 29110 VSE profile | High -- sections match the standard |
| Bilingual headers | Thai + English section headers | High -- manually verified |
| Section ordering | Follows ISO 29110 prescribed order | High -- based on standard text |
| Required sections | Lists mandatory sections per document type | Medium -- covers main sections |
| Cross-reference hints | Suggests which sections reference other documents | Medium -- basic linking |
| Content placeholders | Provides guidance text for each section | Medium -- generic guidance |

---

## Document Coverage

### 10 Supported Document Types

| # | Document | ISO 29110 Reference | Template quality |
|---|----------|-------------------|-----------------|
| 1 | Project Plan | PM process, Activity PM.1 | Good -- covers scope, schedule, resources, risks |
| 2 | SRS | SI process, Activity SI.2 | Good -- FR, NFR, interfaces, constraints |
| 3 | SDD | SI process, Activity SI.3 | Good -- architecture, detailed design, DB |
| 4 | Test Plan | SI process, Activity SI.4 | Good -- strategy, cases, environment, criteria |
| 5 | Test Record | SI process, Activity SI.4 | Good -- execution results, defects, coverage |
| 6 | Traceability Matrix | SI process (cross-cutting) | Good -- req-to-design-to-test mapping |
| 7 | Change Request | PM process, Activity PM.4 | Adequate -- basic change tracking |
| 8 | Progress Report | PM process, Activity PM.3 | Adequate -- status, milestones, issues |
| 9 | Configuration Plan | PM process (cross-cutting) | Adequate -- basic config management |
| 10 | User Manual | SI process, Activity SI.5 | Adequate -- installation, usage, troubleshooting |

**"Good"** = covers all required sections with appropriate detail guidance.
**"Adequate"** = covers required sections but may need supplementation for complex projects.

---

## How We Tested

### Methodology

We tested against **one real thesis project** (M.Sc. Software Engineering, CMU) that produced all 10 document types. This is honest: we did not test against 500+ documents as the previous version of this report claimed.

**Test project**: ClutchG PC Optimizer v2.0 -- Windows latency reduction software
**Documents produced**: 10 ISO 29110 documents (6 as thesis appendices ก-ฉ)
**Review**: Reviewed by thesis advisor, not by ISO auditor

### Results from our single real-world test

| Document | Sections generated | Sections needed manual addition | Notes |
|----------|-------------------|--------------------------------|-------|
| Project Plan | 6/6 main sections | 0 | Schedule needed real dates |
| SRS | 5/5 main sections | 1 subsection | Performance metrics needed specifics |
| SDD | 5/5 main sections | 2 subsections | UML diagrams added manually |
| Test Plan | 4/4 main sections | 0 | Test cases needed real data |
| Test Record | 4/4 main sections | 0 | Results filled from actual testing |
| Traceability | Complete matrix structure | 0 | Requirements populated manually |
| Change Request | 3/3 main sections | 0 | Simple structure |
| Progress Report | 3/3 main sections | 0 | Dates filled manually |
| Config Plan | 3/3 main sections | 0 | Tool-specific details added |
| User Manual | 5/5 main sections | 1 section | Screenshots added manually |

### What this tells us

The templates **reliably produce the correct document structure**. They do NOT fill in project-specific content -- that is the user's responsibility. The tool saves time on structure and formatting, not on content creation.

---

## Limitations

### What we can verify
- Section presence and ordering (reliable)
- Bilingual header correctness (reliable)
- Basic cross-reference suggestions (mostly reliable)

### What we cannot verify
- Content quality within sections
- Whether requirements are actually traceable
- Whether test cases actually cover requirements
- Whether the document would pass a formal ISO audit

### Known gaps
1. **No automated content validation** -- the tool checks structure, not substance
2. **No diagram support** -- UML, ER, and architecture diagrams must be added manually
3. **Cross-references are suggestions** -- they don't validate that referenced sections exist
4. **Version history is templated** -- actual version tracking is the user's responsibility
5. **Thai academic formatting** -- while bilingual headers work well, some universities have specific formatting requirements not captured in our templates

---

## Honest Assessment

| Claim | Reality |
|-------|---------|
| "94% overall accuracy" (old report) | We cannot substantiate this number. It was generated, not measured. |
| "Tested against 500+ documents" (old report) | False. Tested against 1 real project. |
| "Full compliance checking" | Partial. Structure checking is reliable; content checking does not exist. |

### What we actually provide

**Template generation**: Reliable. The 10 document templates correctly follow ISO 29110 VSE profile structure.

**Structure guidance**: Reliable. Users get the right sections in the right order with appropriate guidance.

**Time savings**: Significant. Creating ISO document structure from scratch takes hours; our tool produces it in seconds.

**Compliance guarantee**: None. The tool helps you organize your documents correctly but cannot certify ISO compliance.

---

## Recommendations for Users

1. **Use the templates as starting points**, not final documents
2. **Fill in all placeholder content** with your actual project data
3. **Add diagrams manually** (UML, ER, architecture, screenshots)
4. **Have your advisor review** the completed documents
5. **Cross-reference manually** between documents (SRS requirements should map to SDD components and test cases)
6. **Do not claim ISO certification** based on using these templates -- they help with structure, not with process compliance

---

## Future Work

- Add content validation rules (check that SRS has measurable requirements)
- Add automated cross-reference validation between documents
- Add more university-specific ISO formatting templates
- Collect and incorporate feedback from thesis committees
- Test against more real thesis projects to build a proper accuracy baseline
