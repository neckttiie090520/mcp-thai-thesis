/**
 * server.ts
 * Thai Thesis MCP Server - Main entry point
 *
 * Provides 11 thesis tools and 9 resources for Thai thesis writing:
 *
 * Thesis Tools:
 * - thai_thesis_init: Initialize new thesis project
 * - thai_thesis_chapter: Generate/revise thesis chapters
 * - thai_deai: De-AI processing (30 patterns)
 * - thai_citation: APA นามปี citation management
 * - thai_format: University formatting
 * - iso_document: Generate ISO 29110 documents
 * - thesis_review: Quality review (กรรมการสอบ perspective)
 * - thesis_audit: Full thesis quality audit with scoring and consistency checks
 * - thesis_score: Quick quantitative chapter/thesis scoring
 * - thesis_consistency: Cross-document consistency check
 * - thesis_traceability: Generate requirements traceability matrix
 *
 * Resources:
 * - templates://chulalongkorn, kasetsart, kmutt, chiangmai, generic
 * - patterns://deai-thai, deai-english
 * - scoring://rubric, scoring://quality-gate
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

import {
  analyzeSentenceLengths,
  formatBurstinessReport,
  detectThaBannedPatterns,
  formatBannedPatternReport,
  analyzeRegister,
  checkThaiTypography,
  formatTypographyReport,
  detectYearSystemMixing,
  normalizeUniversityName,
  universityDisplayName,
} from "./utils/thai-text.js";

import {
  formatInTextCitation,
  formatBibliography,
  auditCitations,
  renderAuditReport,
  validateSourceMeta,
  type SourceMeta,
  type CitationOptions,
} from "./utils/citation.js";

// ─── Server Setup ─────────────────────────────────────────────────────────────

const SERVER_NAME = "thai-thesis-mcp-server";
const SERVER_VERSION = "1.0.0";

const server = new Server(
  { name: SERVER_NAME, version: SERVER_VERSION },
  { capabilities: { tools: {}, resources: {} } }
);

// ─── University Profiles ───────────────────────────────────────────────────────

interface UniversityProfile {
  key: string;
  name: { th: string; en: string };
  fonts: { thai: string; english: string; size: number };
  margins: { top: string; bottom: string; left: string; right: string };
  line_spacing: number;
  year_format: "พ.ศ." | "ค.ศ.";
  citation_style: "APA นามปี";
  abstract_length: { thai: string; english: string };
  chapters: string[];
}

const UNIVERSITY_PROFILES: Record<string, UniversityProfile> = {
  chulalongkorn: {
    key: "chulalongkorn",
    name: { th: "จุฬาลงกรณ์มหาวิทยาลัย", en: "Chulalongkorn University" },
    fonts: { thai: "TH Sarabun New", english: "Times New Roman", size: 16 },
    margins: { top: "1.5in", bottom: "1in", left: "1.5in", right: "1in" },
    line_spacing: 1.5,
    year_format: "พ.ศ.",
    citation_style: "APA นามปี",
    abstract_length: { thai: "300-500 words", english: "250-400 words" },
    chapters: [
      "บทที่ 1: บทนำ",
      "บทที่ 2: เอกสารและงานวิจัยที่เกี่ยวข้อง",
      "บทที่ 3: วิธีดำเนินการวิจัย",
      "บทที่ 4: ผลการวิจัย",
      "บทที่ 5: สรุป อภิปรายผล และข้อเสนอแนะ",
    ],
  },
  kasetsart: {
    key: "kasetsart",
    name: { th: "มหาวิทยาลัยเกษตรศาสตร์", en: "Kasetsart University" },
    fonts: { thai: "TH Sarabun New", english: "Times New Roman", size: 16 },
    margins: { top: "1.5in", bottom: "1in", left: "1.5in", right: "1in" },
    line_spacing: 1.5,
    year_format: "พ.ศ.",
    citation_style: "APA นามปี",
    abstract_length: { thai: "300-500 words", english: "250-400 words" },
    chapters: [
      "บทที่ 1: บทนำ",
      "บทที่ 2: ทฤษฎีและงานวิจัยที่เกี่ยวข้อง",
      "บทที่ 3: วิธีการวิจัย",
      "บทที่ 4: ผลการวิจัย",
      "บทที่ 5: สรุปผลการวิจัยและข้อเสนอแนะ",
    ],
  },
  kmutt: {
    key: "kmutt",
    name: { th: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี", en: "KMUTT" },
    fonts: { thai: "TH Sarabun New", english: "Times New Roman", size: 16 },
    margins: { top: "1.5in", bottom: "1in", left: "1.5in", right: "1in" },
    line_spacing: 1.5,
    year_format: "พ.ศ.",
    citation_style: "APA นามปี",
    abstract_length: { thai: "300-500 words", english: "250-400 words" },
    chapters: [
      "บทที่ 1: บทนำ",
      "บทที่ 2: ทบทวนวรรณกรรม",
      "บทที่ 3: วิธีการวิจัย",
      "บทที่ 4: ผลการวิจัย",
      "บทที่ 5: สรุป อภิปราย และข้อเสนอแนะ",
    ],
  },
  chiangmai: {
    key: "chiangmai",
    name: { th: "มหาวิทยาลัยเชียงใหม่", en: "Chiang Mai University" },
    fonts: { thai: "TH Sarabun New", english: "Times New Roman", size: 16 },
    margins: { top: "1.5in", bottom: "1in", left: "1.5in", right: "1in" },
    line_spacing: 1.5,
    year_format: "พ.ศ.",
    citation_style: "APA นามปี",
    abstract_length: { thai: "300-500 words", english: "250-400 words" },
    chapters: [
      "บทที่ 1: บทนำ",
      "บทที่ 2: เอกสารและงานวิจัยที่เกี่ยวข้อง",
      "บทที่ 3: วิธีดำเนินการวิจัย",
      "บทที่ 4: ผลการวิจัย",
      "บทที่ 5: สรุป อภิปรายผล และข้อเสนอแนะ",
    ],
  },
  generic: {
    key: "generic",
    name: { th: "มาตรฐานทั่วไป", en: "Generic Thai Thesis" },
    fonts: { thai: "TH Sarabun New", english: "Times New Roman", size: 16 },
    margins: { top: "1.5in", bottom: "1in", left: "1.5in", right: "1in" },
    line_spacing: 1.5,
    year_format: "พ.ศ.",
    citation_style: "APA นามปี",
    abstract_length: { thai: "300-500 words", english: "250-400 words" },
    chapters: [
      "บทที่ 1: บทนำ",
      "บทที่ 2: เอกสารและงานวิจัยที่เกี่ยวข้อง",
      "บทที่ 3: วิธีดำเนินการวิจัย",
      "บทที่ 4: ผลการวิจัย",
      "บทที่ 5: สรุป อภิปรายผล และข้อเสนอแนะ",
    ],
  },
};

// ─── ISO 29110 Document Templates ────────────────────────────────────────────

const ISO_DOCUMENTS = {
  "project-plan": {
    name: "01-Project-Plan",
    name_th: "แผนโครงการ",
    sections: [
      "Project Overview",
      "Objectives",
      "Scope",
      "Deliverables",
      "Timeline",
      "Resources",
      "Risks",
    ],
  },
  srs: {
    name: "02-SRS",
    name_th: "ความต้องการซอฟต์แวร์",
    sections: [
      "Introduction",
      "Functional Requirements",
      "Non-Functional Requirements",
      "Use Cases",
      "Constraints",
    ],
  },
  sdd: {
    name: "03-SDD",
    name_th: "การออกแบบซอฟต์แวร์",
    sections: [
      "Architecture Overview",
      "Component Design",
      "Data Design",
      "Interface Design",
      "Deployment Design",
    ],
  },
  "test-plan": {
    name: "04-Test-Plan",
    name_th: "แผนการทดสอบ",
    sections: [
      "Test Strategy",
      "Test Cases",
      "Test Data",
      "Test Environment",
      "Schedule",
    ],
  },
  "test-record": {
    name: "05-Test-Record",
    name_th: "บันทึกการทดสอบ",
    sections: [
      "Test Execution Log",
      "Defects Found",
      "Test Results Summary",
      "Sign-off",
    ],
  },
  traceability: {
    name: "06-Traceability-Record",
    name_th: "บันทึกการสืบย้อน",
    sections: [
      "Requirements to Design",
      "Design to Code",
      "Code to Tests",
    ],
  },
  "change-request": {
    name: "07-Change-Request",
    name_th: "คำขอเปลี่ยนแปลง",
    sections: [
      "Change Description",
      "Impact Analysis",
      "Approval Status",
      "Implementation Notes",
    ],
  },
  progress: {
    name: "08-Progress-Status-Record",
    name_th: "บันทึกความคืบหน้า",
    sections: [
      "Work Completed",
      "Work In Progress",
      "Issues",
      "Next Steps",
    ],
  },
  "config-plan": {
    name: "09-Configuration-Plan",
    name_th: "แผนการจัดการคอนฟิก",
    sections: [
      "Configuration Items",
      "Version Control",
      "Change Control",
      "Backup Strategy",
    ],
  },
  "user-manual": {
    name: "10-User-Manual",
    name_th: "คู่มือผู้ใช้",
    sections: [
      "Getting Started",
      "Features",
      "Troubleshooting",
      "FAQ",
    ],
  },
};

// ─── Tool Definitions ─────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "thai_thesis_init",
        description: "เริ่มโปรเจค thesis ใหม่ - Initialize a new Thai thesis project with university-specific configuration",
        inputSchema: {
          type: "object",
          properties: {
            university: {
              type: "string",
              description: "มหาวิทยาลัย (จุฬา, เกษตร, KMUTT, มช., generic)",
            },
            title: {
              type: "string",
              description: "ชื่อวิทยานิพนธ์ (ภาษาไทย)",
            },
            title_en: {
              type: "string",
              description: "Thesis title (English)",
            },
            author: {
              type: "string",
              description: "ชื่อผู้วิจัย",
            },
            advisor: {
              type: "string",
              description: "ชื่ออาจารย์ที่ปรึกษา",
            },
          },
          required: ["university", "title", "author"],
        },
      },
      {
        name: "thai_thesis_chapter",
        description: "สร้าง/แก้ไขบทวิทยานิพนธ์ - Generate or revise a specific thesis chapter (1-5)",
        inputSchema: {
          type: "object",
          properties: {
            chapter: {
              type: "integer",
              minimum: 1,
              maximum: 5,
              description: "หมายเลขบท (1-5)",
            },
            content: {
              type: "string",
              description: "เนื้อหาหรือ outline ของบท",
            },
            mode: {
              type: "string",
              enum: ["generate", "revise", "expand", "condense"],
              description: "โหมดการทำงาน",
            },
            university: {
              type: "string",
              description: "มหาวิทยาลัย (optional - ใช้ default ถ้าไม่ระบุ)",
            },
          },
          required: ["chapter", "mode"],
        },
      },
      {
        name: "thai_deai",
        description: "ลบลายนิ้วมือ AI - De-AI processing with 30 detection patterns for Thai and English",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "ข้อความที่ต้องการประมวลผล",
            },
            mode: {
              type: "string",
              enum: ["detect", "edit", "rewrite"],
              description: "detect: ตรวจจับเท่านั้น, edit: แก้ไขจุด, rewrite: เขียนใหม่ทั้งหมด",
            },
            language: {
              type: "string",
              enum: ["thai", "english", "both"],
              description: "ภาษาที่ต้องการตรวจ",
            },
          },
          required: ["text", "mode"],
        },
      },
      {
        name: "thai_citation",
        description: "จัดการการอ้างอิง APA นามปี - Manage citations in APA นามปี format",
        inputSchema: {
          type: "object",
          properties: {
            action: {
              type: "string",
              enum: ["cite", "bibliography", "audit", "validate"],
              description: "cite: สร้าง in-text citation, bibliography: สร้างบรรณานุกรม, audit: ตรวจสอบ, validate: ตรวจสอบ metadata",
            },
            source: {
              type: "object",
              description: "Source metadata (for cite/bibliography actions)",
            },
            sources: {
              type: "array",
              description: "Array of sources (for bibliography action)",
            },
            cited_keys: {
              type: "array",
              description: "Citation keys found in text (for audit action)",
            },
            year_system: {
              type: "string",
              enum: ["phc", "ce"],
              description: "ระบบปี: phc (พ.ศ.) หรือ ce (ค.ศ.)",
            },
          },
          required: ["action"],
        },
      },
      {
        name: "thai_format",
        description: "จัดฟอร์แมทตามมหาวิทยาลัย - Format text according to university standards",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "ข้อความที่ต้องการจัดฟอร์แมท",
            },
            university: {
              type: "string",
              description: "มหาวิทยาลัย",
            },
            format_type: {
              type: "string",
              enum: ["chapter", "abstract", "bibliography", "full"],
              description: "ประเภทของเอกสาร",
            },
          },
          required: ["university"],
        },
      },
      {
        name: "iso_document",
        description: "สร้างเอกสาร ISO 29110 - Generate ISO 29110 documentation",
        inputSchema: {
          type: "object",
          properties: {
            document_type: {
              type: "string",
              enum: [
                "project-plan", "srs", "sdd", "test-plan", "test-record",
                "traceability", "change-request", "progress", "config-plan", "user-manual"
              ],
              description: "ประเภทเอกสาร ISO",
            },
            project_info: {
              type: "object",
              description: "Project information",
            },
            language: {
              type: "string",
              enum: ["thai", "english", "bilingual"],
              description: "ภาษาของเอกสาร",
            },
          },
          required: ["document_type"],
        },
      },
      {
        name: "thesis_review",
        description: "ตรวจสอบคุณภาพวิทยานิพนธ์ - Quality review from กรรมการสอบ perspective",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "เนื้อหาที่ต้องการตรวจสอบ",
            },
            chapter: {
              type: "integer",
              description: "หมายเลขบท (optional)",
            },
            perspective: {
              type: "string",
              enum: ["advisor", "committee", "iso_auditor"],
              description: "มุมมองผู้ตรวจ",
            },
          },
          required: ["text"],
        },
      },
      {
        name: "thesis_audit",
        description: "ตรวจสอบคุณภาพวิทยานิพนธ์แบบครบถ้วน - Full thesis quality audit with scoring, consistency checks, and gap detection",
        inputSchema: {
          type: "object",
          properties: {
            scope: {
              type: "string",
              enum: ["full", "chapter", "iso", "consistency"],
              description: "ขอบเขตการตรวจ: full=ทั้งเล่ม, chapter=บทเดียว, iso=ISO เอกสาร, consistency=ตรวจความสอดคล้อง",
            },
            chapter: {
              type: "integer",
              description: "หมายเลขบท (เฉพาะ scope=chapter)",
            },
            text: {
              type: "string",
              description: "เนื้อหาที่ต้องการตรวจ (optional - ถ้าไม่ใส่จะใช้ไฟล์)",
            },
            university: {
              type: "string",
              description: "มหาวิทยาลัย (optional)",
            },
          },
          required: ["scope"],
        },
      },
      {
        name: "thesis_score",
        description: "ให้คะแนนบทหรือวิทยานิพนธ์ - Quick quantitative scoring using 6-dimension rubric (100 points)",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "เนื้อหาบทที่ต้องการให้คะแนน",
            },
            chapter: {
              type: "integer",
              description: "หมายเลขบท",
            },
            university: {
              type: "string",
              description: "มหาวิทยาลัย (optional)",
            },
          },
          required: ["text"],
        },
      },
      {
        name: "thesis_consistency",
        description: "ตรวจสอบความสอดคล้องข้ามเอกสาร - Cross-document consistency check for numbers, terms, and facts",
        inputSchema: {
          type: "object",
          properties: {
            documents: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", description: "ชื่อเอกสาร" },
                  content: { type: "string", description: "เนื้อหาเอกสาร" },
                },
              },
              description: "เอกสารที่ต้องการตรวจสอบ",
            },
            check_types: {
              type: "array",
              items: {
                type: "string",
                enum: ["numbers", "terminology", "facts", "versions", "dates"],
              },
              description: "ประเภทการตรวจ (default: ทุกประเภท)",
            },
          },
          required: ["documents"],
        },
      },
      {
        name: "thesis_traceability",
        description: "สร้าง traceability matrix - Generate requirements traceability matrix from thesis and ISO documents",
        inputSchema: {
          type: "object",
          properties: {
            requirements: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", description: "รหัส requirement (เช่น FR-001)" },
                  description: { type: "string", description: "คำอธิบาย requirement" },
                  design_ref: { type: "string", description: "อ้างอิง design component" },
                  impl_ref: { type: "string", description: "อ้างอิง implementation module" },
                  test_ref: { type: "string", description: "อ้างอิง test case" },
                  test_result: { type: "string", description: "ผลการทดสอบ" },
                },
              },
              description: "รายการ requirements",
            },
            include_coverage: {
              type: "boolean",
              description: "รวมรายงาน coverage metrics (default: true)",
            },
          },
          required: ["requirements"],
        },
      },
    ],
  };
});

// ─── Tool Handlers ────────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "thai_thesis_init": {
        const university = normalizeUniversityName((args?.university as string) ?? "generic");
        const profile = UNIVERSITY_PROFILES[university];
        const displayName = universityDisplayName(university);

        const result = {
          university: displayName,
          config: profile,
          message: `✅ โปรเจค thesis ถูกสร้างสำหรับ ${displayName.th}`,
          next_steps: [
            "1. กำหนดโครงสร้างบท (ใช้ thai_thesis_chapter)",
            "2. เขียนบทที่ 1: บทนำ",
            "3. ตั้งค่า citations (ใช้ thai_citation)",
            "4. สร้างเอกสาร ISO (ใช้ iso_document)",
          ],
        };

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "thai_thesis_chapter": {
        const chapter = args?.chapter as number;
        const mode = args?.mode as string;
        const university = normalizeUniversityName((args?.university as string) ?? "generic");
        const profile = UNIVERSITY_PROFILES[university];

        const chapterNames: Record<number, string> = {
          1: "บทนำ",
          2: "เอกสารและงานวิจัยที่เกี่ยวข้อง",
          3: "วิธีดำเนินการวิจัย",
          4: "ผลการวิจัย",
          5: "สรุป อภิปรายผล และข้อเสนอแนะ",
        };

        const result = {
          chapter: `บทที่ ${chapter}: ${chapterNames[chapter]}`,
          mode,
          university: profile.name,
          sections: getChapterSections(chapter),
          guidelines: getChapterGuidelines(chapter),
        };

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "thai_deai": {
        const text = args?.text as string;
        const mode = args?.mode as string;

        const burstiness = analyzeSentenceLengths(text);
        const bannedPatterns = detectThaBannedPatterns(text);
        const register = analyzeRegister(text);
        const typography = checkThaiTypography(text);
        const yearMixing = detectYearSystemMixing(text);

        const report = [
          "# De-AI Analysis Report",
          "",
          formatBurstinessReport(burstiness),
          "",
          formatBannedPatternReport(bannedPatterns),
          "",
          "## Register Analysis",
          ...register.findings,
          "",
          formatTypographyReport(typography),
          "",
          "## Year System Check",
          yearMixing.message,
          "",
          "---",
          `*Analysis complete. ${bannedPatterns.length} patterns found, burstiness CV: ${burstiness.cv}%*`,
        ].join("\n");

        if (mode === "detect") {
          return {
            content: [{ type: "text", text: report }],
          };
        }

        const guidance = [
          report,
          "",
          "## Recommendations",
          "",
          mode === "edit"
            ? "ใช้รายการด้านบนเพื่อแก้ไขจุดที่พบ โดยเปลี่ยนคำตามที่แนะนำ"
            : "พิจารณาเขียนใหม่ทั้งหมดโดยใช้เทคนิค soul injection และหลีกเลี่ยง patterns ที่พบ",
        ];

        return {
          content: [{ type: "text", text: guidance.join("\n") }],
        };
      }

      case "thai_citation": {
        const action = args?.action as string;
        const yearSystem = (args?.year_system as "phc" | "ce") ?? "phc";
        const opts: CitationOptions = { year_system: yearSystem };

        switch (action) {
          case "cite": {
            const source = args?.source as SourceMeta;
            if (!source) {
              throw new McpError(ErrorCode.InvalidParams, "Missing 'source' parameter");
            }
            const citation = formatInTextCitation(source, "narrative", opts);
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  narrative: citation.text,
                  parenthetical: formatInTextCitation(source, "parenthetical", opts).text,
                  notes: citation.notes,
                }, null, 2),
              }],
            };
          }

          case "bibliography": {
            const sources = args?.sources as SourceMeta[];
            if (!sources || sources.length === 0) {
              throw new McpError(ErrorCode.InvalidParams, "Missing 'sources' parameter");
            }
            const { entries, notes } = formatBibliography(sources, opts);
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  entries: entries.map(e => ({ key: e.key, text: e.text })),
                  notes,
                }, null, 2),
              }],
            };
          }

          case "audit": {
            const citedKeys = args?.cited_keys as string[];
            const sources = args?.sources as SourceMeta[];
            if (!citedKeys || !sources) {
              throw new McpError(ErrorCode.InvalidParams, "Missing 'cited_keys' or 'sources' parameter");
            }
            const result = auditCitations(citedKeys, sources, opts);
            return {
              content: [{ type: "text", text: renderAuditReport(result) }],
            };
          }

          case "validate": {
            const source = args?.source as SourceMeta;
            if (!source) {
              throw new McpError(ErrorCode.InvalidParams, "Missing 'source' parameter");
            }
            const problems = validateSourceMeta(source);
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  valid: problems.length === 0,
                  problems,
                }, null, 2),
              }],
            };
          }

          default:
            throw new McpError(ErrorCode.InvalidParams, `Unknown action: ${action}`);
        }
      }

      case "thai_format": {
        const university = normalizeUniversityName((args?.university as string) ?? "generic");
        const profile = UNIVERSITY_PROFILES[university];
        const formatType = args?.format_type as string;

        const result = {
          university: profile.name,
          format_specification: {
            fonts: profile.fonts,
            margins: profile.margins,
            line_spacing: profile.line_spacing,
            year_format: profile.year_format,
            citation_style: profile.citation_style,
          },
          format_type: formatType,
          message: `ข้อมูลฟอร์แมทสำหรับ ${profile.name.th}`,
        };

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "iso_document": {
        const docType = args?.document_type as string;
        const language = (args?.language as string) ?? "bilingual";
        const docInfo = ISO_DOCUMENTS[docType as keyof typeof ISO_DOCUMENTS];

        if (!docInfo) {
          throw new McpError(ErrorCode.InvalidParams, `Unknown document type: ${docType}`);
        }

        const template = {
          document: docInfo.name,
          name_thai: docInfo.name_th,
          language,
          sections: docInfo.sections,
          template: generateISOTemplate(docInfo, language),
        };

        return {
          content: [{ type: "text", text: JSON.stringify(template, null, 2) }],
        };
      }

      case "thesis_review": {
        const text = args?.text as string;
        const perspective = (args?.perspective as string) ?? "committee";

        const burstiness = analyzeSentenceLengths(text);
        const bannedPatterns = detectThaBannedPatterns(text);
        const register = analyzeRegister(text);
        const typography = checkThaiTypography(text);

        const issues = [
          ...bannedPatterns.map(p => ({ type: "banned_pattern", severity: "warning", message: `พบ "${p.pattern}"` })),
          ...typography.map(t => ({ type: "typography", severity: "warning", message: t.description })),
          ...register.findings.map(f => ({ type: "register", severity: "info", message: f })),
        ];

        if (!burstiness.burstinessOk) {
          issues.push({ type: "burstiness", severity: "warning", message: `CV ต่ำเกินไป (${burstiness.cv}%)` });
        }

        const score = Math.max(0, 100 - issues.filter(i => i.severity === "warning").length * 10);

        const review = {
          perspective: perspective === "advisor" ? "อาจารย์ที่ปรึกษา" :
                       perspective === "committee" ? "กรรมการสอบ" : "ISO Auditor",
          score,
          issues_found: issues.length,
          issues,
          recommendation: score >= 80 ? "✅ พร้อมส่ง" :
                         score >= 60 ? "⚠️ ต้องปรับปรุงบางส่วน" :
                         "❌ ต้องแก้ไขมาก",
          summary: `คะแนนรวม: ${score}/100 - ${issues.length} ประเด็นที่ต้องพิจารณา`,
        };

        return {
          content: [{ type: "text", text: JSON.stringify(review, null, 2) }],
        };
      }

      case "thesis_audit": {
        const scope = args?.scope as string;
        const chapter = args?.chapter as number | undefined;
        const text = args?.text as string | undefined;
        const university = normalizeUniversityName((args?.university as string) ?? "generic");

        const rubric = {
          dimensions: [
            { name: "Content & Argument Quality", max: 25, weight: "highest" },
            { name: "Academic References", max: 20, weight: "high" },
            { name: "Thai Language Quality", max: 20, weight: "high" },
            { name: "Formatting & Structure", max: 15, weight: "medium" },
            { name: "Data Consistency", max: 10, weight: "medium" },
            { name: "De-AI Score", max: 10, weight: "medium" },
          ],
          total: 100,
          grading: {
            A: "90-100 (Submission-ready)",
            B: "80-89 (Strong, targeted improvements)",
            "C+": "70-79 (Acceptable, significant revision)",
            C: "60-69 (Below standard, major revision)",
            D: "50-59 (Weak, restructuring needed)",
            F: "<50 (Fundamental problems)",
          },
        };

        let auditResult: Record<string, unknown>;

        if (scope === "consistency" && !text) {
          auditResult = {
            scope: "consistency",
            message: "Provide document contents via the 'thesis_consistency' tool for cross-document consistency checks.",
            rubric,
          };
        } else if (scope === "chapter" && chapter) {
          let analysis: Record<string, unknown> = {};
          if (text) {
            const burstiness = analyzeSentenceLengths(text);
            const bannedPatterns = detectThaBannedPatterns(text);
            const register = analyzeRegister(text);
            analysis = {
              burstiness_score: burstiness.cv,
              banned_patterns_found: bannedPatterns.length,
              register_findings: register.findings.length,
              text_length: text.length,
            };
          }

          auditResult = {
            scope: "chapter",
            chapter,
            university: universityDisplayName(university),
            rubric,
            analysis,
            instructions: [
              "1. Score this chapter on each of the 6 dimensions using the rubric above",
              "2. Identify all [TBD], [VERIFY REQUIRED], and [CITATION NEEDED] markers",
              "3. Check numbers and facts against other thesis documents",
              "4. List critical findings (must fix), important findings (should fix), optional improvements",
              "5. Provide a prioritized action plan with estimated score impact",
            ],
          };
        } else {
          auditResult = {
            scope: scope ?? "full",
            university: universityDisplayName(university),
            rubric,
            gate_framework: {
              gate_1: "Structural Completeness - all required components exist",
              gate_2: "Content Quality - every chapter >= 60/100, average >= 70/100",
              gate_3: "Citation Integrity - zero citation-reference mismatches",
              gate_4: "Thai Language Quality - zero critical register issues",
              gate_5: "De-AI Compliance - all chapters >= 7/10 on De-AI dimension",
              gate_6: "Data Consistency - zero conflicts in consistency matrix",
              gate_7: "Formatting Compliance - university template applied",
              gate_8: "ISO 29110 Compliance - (if software thesis)",
            },
            instructions: [
              "1. Read all chapter files and supporting documents",
              "2. Build a fact registry (all numbers, names, dates, versions)",
              "3. Score each chapter using the 6-dimension rubric",
              "4. Run consistency checks across documents",
              "5. Identify all gaps ([TBD], [VERIFY REQUIRED], [CITATION NEEDED])",
              "6. Generate the full audit report with dashboard and action plan",
            ],
          };
        }

        return {
          content: [{ type: "text", text: JSON.stringify(auditResult, null, 2) }],
        };
      }

      case "thesis_score": {
        const text = args?.text as string;
        const chapter = args?.chapter as number | undefined;
        const university = normalizeUniversityName((args?.university as string) ?? "generic");

        const burstiness = analyzeSentenceLengths(text);
        const bannedPatterns = detectThaBannedPatterns(text);
        const register = analyzeRegister(text);
        const typography = checkThaiTypography(text);
        const yearMixing = detectYearSystemMixing(text);

        const burstinessScore = burstiness.cv > 30 ? 8 :
                                 burstiness.cv > 20 ? 6 :
                                 burstiness.cv > 10 ? 4 : 2;

        const deaiScore = Math.max(0, 10 - bannedPatterns.length);
        const registerIssues = register.findings.length;
        const typographyIssues = typography.length;

        const result = {
          chapter: chapter ? `Chapter ${chapter}` : "Provided text",
          university: universityDisplayName(university),
          text_stats: {
            length: text.length,
            estimated_words: Math.round(text.length / 2.5),
          },
          automated_analysis: {
            burstiness: {
              average_variation: burstiness.cv,
              assessment: burstinessScore >= 7 ? "Natural (human-like)" :
                          burstinessScore >= 5 ? "Moderate" : "Uniform (AI-like)",
              auto_score: burstinessScore,
            },
            deai: {
              banned_patterns_found: bannedPatterns.length,
              patterns: bannedPatterns.slice(0, 10).map(p => ({ pattern: p.pattern, category: p.category })),
              auto_score: deaiScore,
            },
            register: {
              issues_found: registerIssues,
              findings: register.findings.slice(0, 5),
            },
            typography: {
              issues_found: typographyIssues,
              issues: typography.slice(0, 5),
            },
            year_system: yearMixing,
          },
          rubric: {
            "Content & Argument Quality": { max: 25, note: "Score manually based on logical flow, evidence, depth" },
            "Academic References": { max: 20, note: "Score manually based on citation density and quality" },
            "Thai Language Quality": { max: 20, note: `Auto-detected: ${registerIssues} register issues, ${typographyIssues} typography issues` },
            "Formatting & Structure": { max: 15, note: "Score manually based on heading hierarchy and template compliance" },
            "Data Consistency": { max: 10, note: "Score manually by cross-checking with other documents" },
            "De-AI Score": { max: 10, note: `Auto-score: ${deaiScore}/10 (${bannedPatterns.length} banned patterns, burstiness: ${burstinessScore}/10)` },
          },
          grading_scale: { A: "90-100", B: "80-89", "C+": "70-79", C: "60-69", D: "50-59", F: "<50" },
        };

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "thesis_consistency": {
        const documents = args?.documents as Array<{ name: string; content: string }>;
        const checkTypes = (args?.check_types as string[]) ?? ["numbers", "terminology", "facts", "versions", "dates"];

        const findings: Array<{ type: string; fact: string; documents: Array<{ name: string; value: string }>; status: string }> = [];

        const numberPatterns = [
          { regex: /(\d+)\s*(test cases?|กรณีทดสอบ|test)/gi, label: "Test case count" },
          { regex: /(\d+)\s*(unit tests?|หน่วยทดสอบ)/gi, label: "Unit test count" },
          { regex: /(\d+[,.]?\d*)\s*(LOC|lines? of code|บรรทัด)/gi, label: "Lines of code" },
          { regex: /(\d+\.?\d*)\s*%\s*(coverage|ครอบคลุม)/gi, label: "Coverage percentage" },
          { regex: /(\d+)\s*(files?|ไฟล์)/gi, label: "File count" },
          { regex: /(\d+)\s*(modules?|โมดูล)/gi, label: "Module count" },
          { regex: /(\d+)\s*(requirements?|ข้อกำหนด|FR|NFR)/gi, label: "Requirements count" },
          { regex: /v(\d+\.\d+\.?\d*)/gi, label: "Version" },
        ];

        if (checkTypes.includes("numbers")) {
          for (const pattern of numberPatterns) {
            const docMatches: Array<{ name: string; value: string }> = [];

            for (const doc of documents) {
              const matches = [...doc.content.matchAll(pattern.regex)];
              if (matches.length > 0) {
                docMatches.push({ name: doc.name, value: matches[0][1] });
              }
            }

            if (docMatches.length > 1) {
              const values = new Set(docMatches.map(m => m.value));
              if (values.size > 1) {
                findings.push({
                  type: "number",
                  fact: pattern.label,
                  documents: docMatches,
                  status: "CONFLICT",
                });
              } else {
                findings.push({
                  type: "number",
                  fact: pattern.label,
                  documents: docMatches,
                  status: "MATCH",
                });
              }
            }
          }
        }

        const markerPatterns = [
          { regex: /\[TBD\]/gi, label: "[TBD] marker" },
          { regex: /\[VERIFY REQUIRED[^\]]*\]/gi, label: "[VERIFY REQUIRED] marker" },
          { regex: /\[CITATION NEEDED[^\]]*\]/gi, label: "[CITATION NEEDED] marker" },
        ];

        const markers: Array<{ type: string; document: string; count: number }> = [];
        for (const doc of documents) {
          for (const pattern of markerPatterns) {
            const matches = [...doc.content.matchAll(pattern.regex)];
            if (matches.length > 0) {
              markers.push({ type: pattern.label, document: doc.name, count: matches.length });
            }
          }
        }

        const conflicts = findings.filter(f => f.status === "CONFLICT");
        const result = {
          documents_analyzed: documents.length,
          check_types: checkTypes,
          summary: {
            total_facts_checked: findings.length,
            conflicts: conflicts.length,
            matches: findings.length - conflicts.length,
            unresolved_markers: markers.reduce((sum, m) => sum + m.count, 0),
          },
          conflicts,
          matches: findings.filter(f => f.status === "MATCH"),
          markers,
          action_required: conflicts.length > 0
            ? `Found ${conflicts.length} data conflicts. Review each conflict, determine the authoritative value, and update all documents to match.`
            : "No conflicts detected in the checked dimensions.",
        };

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "thesis_traceability": {
        const requirements = args?.requirements as Array<{
          id: string;
          description: string;
          design_ref?: string;
          impl_ref?: string;
          test_ref?: string;
          test_result?: string;
        }>;
        const includeCoverage = (args?.include_coverage as boolean) ?? true;

        const matrix = requirements.map(req => {
          const hasDesign = !!req.design_ref && req.design_ref.trim() !== "";
          const hasImpl = !!req.impl_ref && req.impl_ref.trim() !== "";
          const hasTest = !!req.test_ref && req.test_ref.trim() !== "";
          const hasResult = !!req.test_result && req.test_result.trim() !== "";

          let status: string;
          if (hasDesign && hasImpl && hasTest && hasResult) {
            status = "Fully Traced";
          } else if (hasDesign || hasImpl || hasTest || hasResult) {
            status = "Partially Traced";
          } else {
            status = "Not Traced";
          }

          const gaps: string[] = [];
          if (!hasDesign) gaps.push("missing design reference");
          if (!hasImpl) gaps.push("missing implementation reference");
          if (!hasTest) gaps.push("missing test case");
          if (!hasResult) gaps.push("missing test result");

          return {
            id: req.id,
            description: req.description,
            design_ref: req.design_ref ?? "[MISSING]",
            impl_ref: req.impl_ref ?? "[MISSING]",
            test_ref: req.test_ref ?? "[MISSING]",
            test_result: req.test_result ?? "[MISSING]",
            status,
            gaps,
          };
        });

        let coverage: Record<string, unknown> = {};
        if (includeCoverage) {
          const total = matrix.length;
          const fullyTraced = matrix.filter(r => r.status === "Fully Traced").length;
          const partiallyTraced = matrix.filter(r => r.status === "Partially Traced").length;
          const notTraced = matrix.filter(r => r.status === "Not Traced").length;
          const withDesign = matrix.filter(r => r.design_ref !== "[MISSING]").length;
          const withTest = matrix.filter(r => r.test_ref !== "[MISSING]").length;
          const withResult = matrix.filter(r => r.test_result !== "[MISSING]").length;

          coverage = {
            total_requirements: total,
            fully_traced: { count: fullyTraced, percentage: `${Math.round((fullyTraced / total) * 100)}%` },
            partially_traced: { count: partiallyTraced, percentage: `${Math.round((partiallyTraced / total) * 100)}%` },
            not_traced: { count: notTraced, percentage: `${Math.round((notTraced / total) * 100)}%` },
            design_coverage: `${Math.round((withDesign / total) * 100)}%`,
            test_coverage: `${Math.round((withTest / total) * 100)}%`,
            result_coverage: `${Math.round((withResult / total) * 100)}%`,
            targets: {
              design_mapping: "100%",
              test_coverage: ">=90%",
              result_coverage: "100%",
              full_chain_traceability: ">=80%",
            },
            assessment: fullyTraced / total >= 0.8 ? "Good traceability"
              : fullyTraced / total >= 0.5 ? "Moderate traceability - gaps need attention"
              : "Poor traceability - significant work needed",
          };
        }

        const result = {
          matrix,
          coverage,
          gap_summary: matrix.filter(r => r.gaps.length > 0).map(r => ({
            requirement: r.id,
            description: r.description,
            gaps: r.gaps,
            severity: r.status === "Not Traced" ? "High" : "Medium",
          })),
        };

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof McpError) throw error;
    throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${error}`);
  }
});

// ─── Resource Definitions ─────────────────────────────────────────────────────

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "templates://chulalongkorn",
        name: "จุฬาลงกรณ์มหาวิทยาลัย - Thesis Template",
        mimeType: "application/json",
      },
      {
        uri: "templates://kasetsart",
        name: "มหาวิทยาลัยเกษตรศาสตร์ - Thesis Template",
        mimeType: "application/json",
      },
      {
        uri: "templates://kmutt",
        name: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี - Thesis Template",
        mimeType: "application/json",
      },
      {
        uri: "templates://chiangmai",
        name: "มหาวิทยาลัยเชียงใหม่ - Thesis Template",
        mimeType: "application/json",
      },
      {
        uri: "templates://generic",
        name: "มาตรฐานทั่วไป - Generic Thai Thesis Template",
        mimeType: "application/json",
      },
      {
        uri: "patterns://deai-thai",
        name: "De-AI Patterns - Thai",
        mimeType: "application/json",
      },
      {
        uri: "patterns://deai-english",
        name: "De-AI Patterns - English",
        mimeType: "application/json",
      },
      {
        uri: "scoring://rubric",
        name: "Thesis Scoring Rubric - 6-dimension 100-point system",
        mimeType: "application/json",
      },
      {
        uri: "scoring://quality-gate",
        name: "Quality Gate Framework - 8-gate pre-submission checklist",
        mimeType: "application/json",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri.startsWith("templates://")) {
    const uniKey = uri.replace("templates://", "");
    const profile = UNIVERSITY_PROFILES[uniKey];
    if (!profile) {
      throw new McpError(ErrorCode.InvalidRequest, `Unknown university: ${uniKey}`);
    }
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify(profile, null, 2),
      }],
    };
  }

  if (uri === "patterns://deai-thai") {
    const { THAI_BANNED_PATTERNS } = await import("./utils/thai-text.js");
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify({
          patterns: THAI_BANNED_PATTERNS,
          total: THAI_BANNED_PATTERNS.length,
          categories: [...new Set(THAI_BANNED_PATTERNS.map(([, , c]) => c))],
        }, null, 2),
      }],
    };
  }

  if (uri === "patterns://deai-english") {
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify({
          tier1: ["delve", "tapestry", "leverage", "multifaceted", "paramount", "pivotal", "nuanced", "intricate", "holistic"],
          tier2: ["robust", "comprehensive", "foster", "bolster", "facilitate", "elucidate", "profound", "meticulous", "crucial"],
          tier3: ["underscore", "unveil", "culminate", "accentuate", "ameliorate", "perpetuate", "scrutinize", "traverse", "endeavor"],
          note: "Words appearing 50-700x more frequently in AI-generated text",
        }, null, 2),
      }],
    };
  }

  if (uri === "scoring://rubric") {
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify({
          name: "Thai Thesis Quality Rubric",
          version: "1.0",
          total_points: 100,
          dimensions: [
            {
              name: "Content & Argument Quality",
              max: 25,
              levels: {
                "21-25": "Clear thesis, every claim backed by evidence, logical flow, original contribution",
                "16-20": "Most claims backed, minor logical gaps, contribution stated",
                "11-15": "Several unsupported claims, some logical jumps",
                "6-10": "Many claims unsupported, structure unclear",
                "0-5": "No clear argument, disconnected sections",
              },
            },
            {
              name: "Academic References",
              max: 20,
              levels: {
                "17-20": "15+ citations per chapter, mix of seminal and recent, proper APA",
                "13-16": "10-15 citations, mostly relevant, some format issues",
                "9-12": "5-10 citations, several irrelevant or outdated",
                "5-8": "<5 citations, mostly outdated or irrelevant",
                "0-4": "Minimal or no citations",
              },
            },
            {
              name: "Thai Language Quality",
              max: 20,
              levels: {
                "17-20": "Formal register, natural rhythm, varied vocabulary, no filler",
                "13-16": "Mostly formal, occasional slips, minor filler",
                "9-12": "Mixed register, noticeable filler, some unnatural phrasing",
                "5-8": "Inconsistent register, significant filler, machine-like",
                "0-4": "Informal or machine-generated throughout",
              },
            },
            {
              name: "Formatting & Structure",
              max: 15,
              levels: {
                "13-15": "Full university template compliance, correct hierarchy",
                "10-12": "Mostly compliant, minor formatting issues",
                "7-9": "Several formatting violations",
                "4-6": "Significant formatting problems",
                "0-3": "No template compliance",
              },
            },
            {
              name: "Data Consistency",
              max: 10,
              levels: {
                "9-10": "All numbers match, no contradictions, stable terminology",
                "7-8": "Minor discrepancies (1-2 instances)",
                "5-6": "Several discrepancies, some terminology drift",
                "3-4": "Multiple contradictions, unstable naming",
                "0-2": "Widespread inconsistency",
              },
            },
            {
              name: "De-AI Score",
              max: 10,
              levels: {
                "9-10": "No detectable AI patterns, varied structure, natural rhythm",
                "7-8": "Minimal AI signals (1-2 suspicious passages)",
                "5-6": "Noticeable AI patterns (uniform transitions, predictable structure)",
                "3-4": "Strong AI signals (repetitive openings, formulaic paragraphs)",
                "0-2": "Obviously machine-generated",
              },
            },
          ],
          grading_scale: {
            A: { range: "90-100", meaning: "Submission-ready" },
            B: { range: "80-89", meaning: "Strong, targeted improvements" },
            "C+": { range: "70-79", meaning: "Acceptable, significant revision" },
            C: { range: "60-69", meaning: "Below standard, major revision" },
            D: { range: "50-59", meaning: "Weak, restructuring needed" },
            F: { range: "<50", meaning: "Fundamental problems" },
          },
        }, null, 2),
      }],
    };
  }

  if (uri === "scoring://quality-gate") {
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify({
          name: "Thesis Quality Gate Framework",
          version: "1.0",
          gates: [
            { gate: 1, name: "Structural Completeness", pass: "All required components exist with substantive content" },
            { gate: 2, name: "Content Quality Threshold", pass: "Every chapter >= 60/100, average >= 70/100, zero [TBD] markers" },
            { gate: 3, name: "Citation & Bibliography Integrity", pass: "Zero citation-reference mismatches, >= 5 citations per chapter" },
            { gate: 4, name: "Thai Language Quality", pass: "Zero critical register issues, formal Thai throughout" },
            { gate: 5, name: "De-AI Compliance", pass: "All chapters >= 7/10 De-AI score" },
            { gate: 6, name: "Data Consistency", pass: "Zero conflicts in consistency matrix" },
            { gate: 7, name: "Formatting Compliance", pass: "University template applied, zero critical format issues" },
            { gate: 8, name: "ISO 29110 Compliance", pass: "All 10 baseline documents exist and are sufficiently supported (software theses only)" },
          ],
          readiness_levels: {
            submit: "All 8 gates PASS",
            submit_with_revisions: "6-7 gates PASS, no critical blockers",
            revise_and_recheck: "4-5 gates PASS",
            major_revision: "<4 gates PASS",
          },
        }, null, 2),
      }],
    };
  }

  throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
});

// ─── Helper Functions ─────────────────────────────────────────────────────────

function getChapterSections(chapter: number): string[] {
  const sections: Record<number, string[]> = {
    1: [
      "ความเป็นมาและความสำคัญของปัญหา",
      "วัตถุประสงค์การวิจัย",
      "ขอบเขตการวิจัย",
      "ประโยชน์ที่คาดว่าจะได้รับ",
      "นิยามศัพท์เฉพาะ",
    ],
    2: [
      "ทฤษฎีที่เกี่ยวข้อง",
      "งานวิจัยที่เกี่ยวข้อง",
      "กรอบแนวคิดการวิจัย",
    ],
    3: [
      "ระเบียบวิธีวิจัย",
      "ประชากรและกลุ่มตัวอย่าง",
      "เครื่องมือวิจัย",
      "วิธีเก็บรวบรวมข้อมูล",
      "วิธีวิเคราะห์ข้อมูล",
    ],
    4: [
      "ผลการวิจัย",
      "การวิเคราะห์ข้อมูล",
      "การทดสอบสมมติฐาน",
    ],
    5: [
      "สรุปผลการวิจัย",
      "อภิปรายผล",
      "ข้อจำกัดของการวิจัย",
      "ข้อเสนอแนะ",
    ],
  };
  return sections[chapter] ?? [];
}

function getChapterGuidelines(chapter: number): string[] {
  const guidelines: Record<number, string[]> = {
    1: [
      "เริ่มด้วยปัญหาจริง ไม่ใช่ cliche opener",
      "ระบุวัตถุประสงค์ให้ชัดเจนและวัดได้",
      "กำหนดขอบเขตให้ชัดเจน",
    ],
    2: [
      "ใช้ APA นามปี ในการอ้างอิง",
      "เชื่อมโยงงานวิจัยกับปัญหาที่ศึกษา",
      "สร้าง gap analysis ชัดเจน",
    ],
    3: [
      "อธิบายวิธีการให้ทำซ้ำได้",
      "เชื่อมโยงกับ ISO 29110 documents",
      "ระบุเครื่องมือและเทคโนโลยีที่ใช้",
    ],
    4: [
      "นำเสนอผลอย่างเป็นกลาง",
      "ใช้ตารางและรูปภาพประกอบ",
      "เชื่อมโยงกับ test records",
    ],
    5: [
      "สรุปให้ตรงกับวัตถุประสงค์",
      "อภิปรายเปรียบเทียบกับงานวิจัยอื่น",
      "เสนอแนะอย่างเป็นรูปธรรม",
    ],
  };
  return guidelines[chapter] ?? [];
}

function generateISOTemplate(docInfo: { name: string; name_th: string; sections: string[] }, language: string): string {
  const header = language === "thai"
    ? `# ${docInfo.name_th}\n\nเอกสารนี้จัดทำตามมาตรฐาน ISO/IEC 29110\n`
    : language === "english"
    ? `# ${docInfo.name}\n\nThis document is prepared according to ISO/IEC 29110 standard\n`
    : `# ${docInfo.name_th} / ${docInfo.name}\n\nเอกสารนี้จัดทำตามมาตรฐาน ISO/IEC 29110\n`;

  const sections = docInfo.sections.map(s => `## ${s}\n\n[เนื้อหา - กรอกที่นี่]\n`).join("\n");

  return header + "\n" + sections;
}

// ─── Start Server ─────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`${SERVER_NAME} v${SERVER_VERSION} started`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
