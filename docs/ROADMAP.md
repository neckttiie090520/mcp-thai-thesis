# Roadmap | แผนพัฒนาในอนาคต

> สถานะ: v1.0.0 — ใช้งานได้จริงกับวิทยานิพนธ์ 1 โปรเจกต์
> Status: v1.0.0 — battle-tested on 1 real thesis project.

---

## ระยะสั้น (Short-term) — v1.1

- [ ] **เพิ่ม university profiles** — เพิ่มมหาวิทยาลัยสงขลานครินทร์, มหิดล, ธรรมศาสตร์
- [ ] **ปรับปรุง de-AI patterns** — เพิ่ม banned patterns จากการตรวจวิทยานิพนธ์จริง
- [ ] **เพิ่ม test suite** — unit tests สำหรับ `thai-text.ts` และ `citation.ts` ด้วย `vitest`
- [ ] **ปรับปรุง error messages** — ให้ error messages เป็นภาษาไทย + อังกฤษ
- [ ] **เพิ่ม validation** — ตรวจสอบ input ของ MCP tools ให้ครบถ้วนขึ้น

## ระยะกลาง (Mid-term) — v1.5

- [ ] **แยก server.ts** — refactor จาก monolithic 1,848 บรรทัด เป็นไฟล์ย่อยตาม domain
- [ ] **เพิ่ม tool: `thai_spell_check`** — ตรวจสะกดภาษาไทยระดับพื้นฐาน
- [ ] **เพิ่ม tool: `thesis_timeline`** — สร้าง Gantt chart / timeline จากข้อมูลโปรเจกต์
- [ ] **เพิ่ม resource: `examples://`** — ตัวอย่างผลลัพธ์ที่สามารถเรียกใช้ผ่าน MCP
- [ ] **CI/CD** — GitHub Actions สำหรับ typecheck + build + test
- [ ] **Documentation site** — สร้างเว็บไซต์เอกสารด้วย VitePress หรือ Docusaurus

## ระยะยาว (Long-term) — v2.0

- [ ] **Multi-thesis support** — รองรับหลายวิทยานิพนธ์พร้อมกัน (แต่ละโปรเจกต์มี config แยก)
- [ ] **GUI dashboard** — web interface สำหรับดูสถานะวิทยานิพนธ์ + quality gates
- [ ] **Plugin system** — ให้ผู้ใช้เพิ่ม custom patterns, university profiles, scoring rubrics
- [ ] **Collaboration** — รองรับอาจารย์ที่ปรึกษาดู quality dashboard ผ่าน web
- [ ] **Export to Word/PDF** — แปลง Markdown output เป็น Word (ตาม template มหาวิทยาลัย) หรือ PDF

---

## ข้อจำกัดปัจจุบัน | Current Limitations

| ข้อจำกัด | รายละเอียด |
|----------|------------|
| ทดสอบจริง 1 โปรเจกต์ | ใช้กับวิทยานิพนธ์ CMU 1 เล่ม ยังไม่ทดสอบกับมหาวิทยาลัยอื่น |
| ไม่มี test suite | ยังไม่มี automated tests — ตรวจสอบด้วย typecheck + manual เท่านั้น |
| server.ts monolithic | ไฟล์หลัก 1,848 บรรทัด ควร refactor |
| University profiles | มี 5 มหาวิทยาลัย แต่ข้อมูลละเอียดเฉพาะ CMU |
| ไม่มี spell checker | ยังไม่มีการตรวจสะกดภาษาไทย |
| ไม่ export Word/PDF | ผลลัพธ์เป็น Markdown — ผู้ใช้ต้องจัดรูปแบบเอง |

---

## วิธีมีส่วนร่วม | How to Contribute

ดู [CONTRIBUTING.md](CONTRIBUTING.md) สำหรับรายละเอียดการมีส่วนร่วม

---

## ดูเพิ่มเติม | See Also

- [DEVELOPMENT-JOURNEY.md](DEVELOPMENT-JOURNEY.md) — เส้นทางพัฒนาจนถึงปัจจุบัน
- [ARCHITECTURE.md](ARCHITECTURE.md) — สถาปัตยกรรมระบบ
