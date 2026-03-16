/**
 * thai-text.ts
 * Thai text analysis and transformation utilities for the Thai Thesis MCP Server.
 * Provides burstiness analysis, banned-pattern detection, register checking,
 * year-system conversion, and typography validation helpers.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SentenceLengthStats {
  lengths: number[];
  mean: number;
  stdDev: number;
  cv: number; // coefficient of variation (%)
  min: number;
  max: number;
  count: number;
  burstinessOk: boolean; // true when CV >= 30
}

export interface BannedPatternMatch {
  pattern: string;
  category: string;
  replacement: string;
  index: number;
  context: string;
}

export interface RegisterAnalysis {
  hasFormalFirstPerson: boolean;   // ผู้วิจัย detected
  hasInformalFirstPerson: boolean; // ผม/ฉัน/เรา detected
  hasMarketingLanguage: boolean;
  hasFillerPhrases: boolean;
  hasRepetitiveOpeners: boolean;
  findings: string[];
}

export interface TypographyIssue {
  type: string;
  description: string;
  example: string;
  fix: string;
}

export interface YearConversionResult {
  original: string;
  converted: string;
  system: "พ.ศ." | "ค.ศ.";
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Thai Buddhist Era offset from Common Era */
const BE_OFFSET = 543;

/**
 * Thai banned filler phrases — cause P22 filler pattern.
 * Each entry: [pattern, replacement, category]
 */
export const THAI_BANNED_PATTERNS: Array<[string, string, string]> = [
  // Filler & redundancy
  ["ในการที่จะ", "เพื่อ", "filler"],
  ["สำหรับในเรื่องของ", "เรื่อง", "filler"],
  ["ในส่วนที่เกี่ยวข้องกับ", "เกี่ยวกับ", "filler"],
  ["ไม่อาจปฏิเสธได้ว่า", "(ตัดออก — กล่าวตรง ๆ)", "filler"],
  ["เป็นที่ทราบกันดีว่า", "(ตัดออก — เริ่มเนื้อหาเลย)", "filler"],
  ["อีกทั้งยังเป็นปัจจัยหลักที่ส่งผลกระทบ", "ส่งผลต่อ", "filler"],
  ["ในปัจจุบันนี้", "ปัจจุบัน", "filler"],
  ["ทำการ", "(ตัดออก — ใช้กริยาโดยตรง)", "filler"],
  ["ได้มีการ", "(ตัดออก — ใช้กริยาโดยตรง)", "filler"],
  ["ได้ทำการดำเนินการ", "ดำเนินการ", "filler"],

  // Significance inflation
  ["ซึ่งถือเป็นสิ่งสำคัญอย่างยิ่ง", "สำคัญ", "inflation"],
  ["ซึ่งนับเป็นก้าวสำคัญ", "(ระบุผลลัพธ์จริงแทน)", "inflation"],
  ["ถือเป็นหมุดหมายสำคัญ", "(ระบุผลลัพธ์จริงแทน)", "inflation"],
  ["สะท้อนให้เห็นถึง", "แสดงให้เห็น", "inflation"],
  ["ซึ่งมีบทบาทสำคัญอย่างมาก", "มีบทบาทสำคัญ", "inflation"],
  ["จึงนับได้ว่าเป็นสิ่งที่ขาดไม่ได้", "จำเป็น", "inflation"],
  ["เป็นกุญแจสำคัญที่จะนำไปสู่", "ช่วยให้", "inflation"],
  ["ก่อให้เกิดผลกระทบในวงกว้าง", "ส่งผลกระทบ", "inflation"],
  ["มีความจำเป็นอย่างยิ่งยวดที่จะต้อง", "จำเป็นต้อง", "inflation"],

  // Marketing language
  ["ปฏิวัติวงการ", "เปลี่ยนแปลง", "marketing"],
  ["พลิกโฉม", "ปรับปรุง", "marketing"],
  ["ล้ำสมัย", "ทันสมัย", "marketing"],
  ["ก้าวล้ำ", "ใหม่", "marketing"],
  ["ไร้รอยต่อ", "ราบรื่น", "marketing"],
  ["ระดับโลก", "(ระบุมาตรฐานที่เทียบ)", "marketing"],
  ["ตอบโจทย์ความต้องการ", "ตอบสนองความต้องการ", "marketing"],
  ["ครบวงจร", "(ระบุสิ่งที่มีจริง)", "marketing"],
  ["ยกระดับ", "ปรับปรุง", "marketing"],

  // Generic AI summary endings
  ["ซึ่งจะเป็นประโยชน์ต่อไปในอนาคต", "(ระบุประโยชน์จริง)", "ai-ending"],
  ["อันจะนำไปสู่การพัฒนาที่ดีขึ้น", "(ระบุการพัฒนาที่คาดหวัง)", "ai-ending"],
  ["เป็นรากฐานสำคัญสำหรับงานต่อไป", "(ระบุงานต่อไปที่ตั้งใจ)", "ai-ending"],
  ["ช่วยส่งเสริมประสิทธิภาพโดยรวม", "(ระบุประสิทธิภาพที่วัดได้)", "ai-ending"],
  ["อนาคตที่สดใส", "(ระบุแผนหรือผลลัพธ์ที่คาดหวัง)", "ai-ending"],

  // Stacked hedging
  ["อาจจะเป็นไปได้ว่า", "อาจ", "hedging"],
  ["น่าจะสามารถ", "น่าจะ", "hedging"],
  ["ค่อนข้างจะมีแนวโน้ม", "มีแนวโน้ม", "hedging"],

  // Repetitive openers (flagged as context-dependent)
  ["นอกจากนี้", "(พิจารณาสลับ)", "opener"],
  ["อีกทั้ง", "(พิจารณาสลับ)", "opener"],
  ["ทั้งนี้", "(พิจารณาสลับ)", "opener"],
];

/** Informal first-person pronouns to flag in formal thesis */
export const INFORMAL_PRONOUNS = ["ผม", "ฉัน", "เรา", "หนู", "กระผม"];

/** Preferred formal pronouns */
export const FORMAL_PRONOUNS = ["ผู้วิจัย", "งานวิจัยนี้", "คณะผู้วิจัย"];

/** Repetitive paragraph openers to detect */
export const REPETITIVE_OPENERS = [
  "นอกจากนี้", "อีกทั้ง", "ทั้งนี้", "อย่างไรก็ตาม",
  "กล่าวคือ", "จากนั้น", "ในขณะเดียวกัน", "ยิ่งไปกว่านั้น",
  "เพิ่มเติมจากนั้น", "ดังนั้น", "ดังกล่าว",
];

// ─── Sentence Analysis ────────────────────────────────────────────────────────

/**
 * Split Thai text into approximate sentences.
 * Thai does not use sentence-ending punctuation consistently,
 * so we split on line breaks and certain patterns.
 */
export function splitIntoSentences(text: string): string[] {
  return text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Estimate the word count of a Thai sentence.
 * Since Thai has no spaces between words, we approximate using
 * syllable boundaries and common particle lengths.
 */
export function estimateThaiWordCount(sentence: string): number {
  // Remove English words and numbers to estimate separately
  const englishMatches = sentence.match(/[a-zA-Z0-9]+/g) ?? [];
  const englishWordCount = englishMatches.length;

  // Remove English from text for Thai counting
  const thaiOnly = sentence.replace(/[a-zA-Z0-9]+/g, "").trim();

  // Approximate: average Thai word is ~3 characters
  const thaiWordCount = Math.max(1, Math.round(thaiOnly.length / 3));

  return thaiWordCount + englishWordCount;
}

/**
 * Compute sentence length statistics for burstiness analysis.
 * A CV >= 30% is considered "bursty" enough to pass human-like variance.
 */
export function analyzeSentenceLengths(text: string): SentenceLengthStats {
  const sentences = splitIntoSentences(text);
  const lengths = sentences.map(estimateThaiWordCount);

  if (lengths.length === 0) {
    return {
      lengths: [],
      mean: 0,
      stdDev: 0,
      cv: 0,
      min: 0,
      max: 0,
      count: 0,
      burstinessOk: false,
    };
  }

  const count = lengths.length;
  const mean = lengths.reduce((a, b) => a + b, 0) / count;
  const variance = lengths.reduce((sum, l) => sum + Math.pow(l - mean, 2), 0) / count;
  const stdDev = Math.sqrt(variance);
  const cv = mean > 0 ? (stdDev / mean) * 100 : 0;
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);

  return {
    lengths,
    mean: Math.round(mean * 10) / 10,
    stdDev: Math.round(stdDev * 10) / 10,
    cv: Math.round(cv * 10) / 10,
    min,
    max,
    count,
    burstinessOk: cv >= 30,
  };
}

/**
 * Format a burstiness report as a markdown string.
 */
export function formatBurstinessReport(stats: SentenceLengthStats): string {
  const status = stats.burstinessOk ? "✅ ผ่าน" : "⚠️ ต้องปรับ";
  return [
    `**Burstiness Analysis**`,
    `- ประโยคทั้งหมด: ${stats.count} ประโยค`,
    `- ความยาวเฉลี่ย: ${stats.mean} คำ`,
    `- ส่วนเบี่ยงเบนมาตรฐาน: ${stats.stdDev}`,
    `- CV (Coefficient of Variation): ${stats.cv}%`,
    `- สั้นสุด: ${stats.min} คำ, ยาวสุด: ${stats.max} คำ`,
    `- สถานะ: ${status} (เป้าหมาย CV ≥ 30%)`,
    stats.burstinessOk
      ? `- ความยาวประโยคมีความหลากหลายเพียงพอ`
      : `- ควรผสมประโยคสั้น-กลาง-ยาวเพื่อลดสัญญาณ AI`,
  ].join("\n");
}

// ─── Banned Pattern Detection ─────────────────────────────────────────────────

/**
 * Scan text for Thai banned patterns.
 * Returns all matches with context.
 */
export function detectThaBannedPatterns(text: string): BannedPatternMatch[] {
  const matches: BannedPatternMatch[] = [];

  for (const [pattern, replacement, category] of THAI_BANNED_PATTERNS) {
    let searchStart = 0;
    while (true) {
      const index = text.indexOf(pattern, searchStart);
      if (index === -1) break;

      const contextStart = Math.max(0, index - 20);
      const contextEnd = Math.min(text.length, index + pattern.length + 20);
      const context = text.slice(contextStart, contextEnd);

      matches.push({
        pattern,
        category,
        replacement,
        index,
        context: `...${context}...`,
      });

      searchStart = index + pattern.length;
    }
  }

  return matches;
}

/**
 * Format banned pattern detection results as a markdown report.
 */
export function formatBannedPatternReport(matches: BannedPatternMatch[]): string {
  if (matches.length === 0) {
    return "✅ ไม่พบ Thai banned patterns";
  }

  const byCategory = new Map<string, BannedPatternMatch[]>();
  for (const match of matches) {
    const group = byCategory.get(match.category) ?? [];
    group.push(match);
    byCategory.set(match.category, group);
  }

  const CATEGORY_LABELS: Record<string, string> = {
    filler: "คำฟุ่มเฟือย (Filler)",
    inflation: "พูดเกินจริง (Significance Inflation)",
    marketing: "ภาษาโฆษณา (Marketing Language)",
    "ai-ending": "สรุปแบบ AI (Generic AI Ending)",
    hedging: "เลี่ยงการยืนยัน (Hedging Overload)",
    opener: "คำนำซ้ำ (Repetitive Openers)",
  };

  const lines: string[] = [`⚠️ พบ ${matches.length} banned patterns:`, ""];
  for (const [category, items] of byCategory) {
    lines.push(`### ${CATEGORY_LABELS[category] ?? category}`);
    for (const item of items) {
      lines.push(`- **"${item.pattern}"** → ใช้แทน: "${item.replacement}"`);
      lines.push(`  Context: \`${item.context}\``);
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ─── Register Analysis ────────────────────────────────────────────────────────

/**
 * Analyze the Thai register (formal vs informal) of a text passage.
 */
export function analyzeRegister(text: string): RegisterAnalysis {
  const findings: string[] = [];

  const hasFormalFirstPerson = FORMAL_PRONOUNS.some((p) => text.includes(p));
  const informalFound = INFORMAL_PRONOUNS.filter((p) => text.includes(p));
  const hasInformalFirstPerson = informalFound.length > 0;

  if (hasInformalFirstPerson) {
    findings.push(
      `⚠️ พบสรรพนามไม่เป็นทางการ: ${informalFound.join(", ")} → ใช้ "ผู้วิจัย" แทน`
    );
  }

  if (!hasFormalFirstPerson && !hasInformalFirstPerson) {
    findings.push(`✅ ไม่พบสรรพนามบุคคลที่หนึ่ง (ดี)`);
  }

  // Check marketing language
  const marketingPatterns = THAI_BANNED_PATTERNS
    .filter(([, , cat]) => cat === "marketing")
    .map(([p]) => p)
    .filter((p) => text.includes(p));

  const hasMarketingLanguage = marketingPatterns.length > 0;
  if (hasMarketingLanguage) {
    findings.push(
      `⚠️ พบภาษาโฆษณา: ${marketingPatterns.slice(0, 3).join(", ")}${marketingPatterns.length > 3 ? "..." : ""}`
    );
  }

  // Check filler phrases
  const fillerPatterns = THAI_BANNED_PATTERNS
    .filter(([, , cat]) => cat === "filler")
    .map(([p]) => p)
    .filter((p) => text.includes(p));

  const hasFillerPhrases = fillerPatterns.length > 0;
  if (hasFillerPhrases) {
    findings.push(
      `⚠️ พบคำฟุ่มเฟือย: ${fillerPatterns.slice(0, 3).join(", ")}${fillerPatterns.length > 3 ? "..." : ""}`
    );
  }

  // Check repetitive openers
  const openerCounts = new Map<string, number>();
  const sentences = splitIntoSentences(text);
  for (const sentence of sentences) {
    for (const opener of REPETITIVE_OPENERS) {
      if (sentence.startsWith(opener)) {
        openerCounts.set(opener, (openerCounts.get(opener) ?? 0) + 1);
      }
    }
  }

  const repeatedOpeners = [...openerCounts.entries()].filter(([, count]) => count >= 2);
  const hasRepetitiveOpeners = repeatedOpeners.length > 0;
  if (hasRepetitiveOpeners) {
    const openerList = repeatedOpeners.map(([o, c]) => `"${o}" (${c} ครั้ง)`).join(", ");
    findings.push(`⚠️ พบคำนำซ้ำ: ${openerList}`);
  }

  if (findings.length === 0) {
    findings.push("✅ ระดับภาษาอยู่ในเกณฑ์ดี");
  }

  return {
    hasFormalFirstPerson,
    hasInformalFirstPerson,
    hasMarketingLanguage,
    hasFillerPhrases,
    hasRepetitiveOpeners,
    findings,
  };
}

// ─── Year System Conversion ───────────────────────────────────────────────────

/**
 * Convert a single CE year to Thai Buddhist Era.
 */
export function ceToBE(year: number): number {
  return year + BE_OFFSET;
}

/**
 * Convert a single BE year to Common Era.
 */
export function beToCE(year: number): number {
  return year - BE_OFFSET;
}

/**
 * Detect all years in a text and convert between systems.
 * Works with 4-digit years that look like CE (1900-2099) or BE (2443-2642).
 */
export function convertYearsInText(
  text: string,
  targetSystem: "พ.ศ." | "ค.ศ."
): YearConversionResult[] {
  const results: YearConversionResult[] = [];
  const yearRegex = /\b(1[0-9]{3}|2[0-9]{3})\b/g;
  let match: RegExpExecArray | null;

  while ((match = yearRegex.exec(text)) !== null) {
    const year = parseInt(match[1], 10);
    const isBE = year >= 2443 && year <= 2643; // approximate range for BE years 1900-2100 CE
    const isCE = year >= 1900 && year <= 2100;

    if (targetSystem === "พ.ศ." && isCE && !isBE) {
      const converted = ceToBE(year).toString();
      results.push({ original: match[1], converted, system: "พ.ศ." });
    } else if (targetSystem === "ค.ศ." && isBE && !isCE) {
      const converted = beToCE(year).toString();
      results.push({ original: match[1], converted, system: "ค.ศ." });
    }
  }

  return results;
}

/**
 * Check whether a text inconsistently mixes พ.ศ. and ค.ศ. markers.
 */
export function detectYearSystemMixing(text: string): {
  hasMixing: boolean;
  beCount: number;
  ceCount: number;
  message: string;
} {
  const beMarkers = (text.match(/พ\.ศ\./g) ?? []).length;
  const ceMarkers = (text.match(/ค\.ศ\./g) ?? []).length;
  const hasMixing = beMarkers > 0 && ceMarkers > 0;

  return {
    hasMixing,
    beCount: beMarkers,
    ceCount: ceMarkers,
    message: hasMixing
      ? `⚠️ พบการผสม พ.ศ. (${beMarkers} ครั้ง) และ ค.ศ. (${ceMarkers} ครั้ง) ในข้อความเดียวกัน — ควรเลือกระบบเดียวให้สอดคล้อง`
      : `✅ ใช้ระบบปีเดียว (${beMarkers > 0 ? "พ.ศ." : ceMarkers > 0 ? "ค.ศ." : "ไม่พบ"})`,
  };
}

// ─── Typography Rules ─────────────────────────────────────────────────────────

/**
 * Check common Thai typography mistakes in thesis prose.
 */
export function checkThaiTypography(text: string): TypographyIssue[] {
  const issues: TypographyIssue[] = [];

  // Check for ไม้ยมก without space before it (ต่างๆ should be ต่าง ๆ)
  if (/\S[ๆ]/.test(text)) {
    issues.push({
      type: "ไม้ยมก",
      description: "ต้องเว้นวรรคก่อน ๆ (ไม้ยมก)",
      example: '"ต่างๆ" → "ต่าง ๆ"',
      fix: "เพิ่มช่องว่างก่อน ๆ ทุกครั้ง",
    });
  }

  // Check for Thai period (จุด) ending Thai sentences
  if (/[ก-๙]\.[^0-9\s]/.test(text)) {
    issues.push({
      type: "จุดจบประโยคไทย",
      description: "ภาษาไทยไม่ใช้จุด (.) ปิดประโยค — ใช้เว้นวรรคหรือขึ้นบรรทัดใหม่",
      example: '"เสร็จสิ้นแล้ว." → "เสร็จสิ้นแล้ว"',
      fix: "ลบจุดที่ปิดประโยคภาษาไทย",
    });
  }

  // Check for em dash usage (strong AI signal)
  if (/—/.test(text)) {
    issues.push({
      type: "Em Dash",
      description: "Em dash (—) คือสัญญาณ AI ที่ชัดเจนที่สุด — ห้ามใช้ในวิทยานิพนธ์ไทย",
      example: '"ผลลัพธ์ — ดีกว่า" → "ผลลัพธ์ดีกว่า" หรือ "(ดีกว่า)"',
      fix: "แทนด้วยจุลภาค วงเล็บ ทวิภาค หรือแยกเป็นประโยคใหม่",
    });
  }

  // Check for bold mid-paragraph (P14 pattern)
  if (/[^#]\*\*[^*]+\*\*/.test(text)) {
    issues.push({
      type: "Bold กลางย่อหน้า",
      description: "การ bold คำกลางย่อหน้าเป็นสัญญาณ AI — ใช้เฉพาะในหัวข้อ",
      example: '"**สำคัญ**มาก" → "สำคัญมาก"',
      fix: "ลบ bold ออกจากเนื้อหา คงไว้เฉพาะหัวข้อ",
    });
  }

  // Check for mixing Thai and English quotation styles
  if (/["""]/.test(text)) {
    issues.push({
      type: "Curly Quotes",
      description: 'Curly quotes (" ") เป็น fingerprint ของ ChatGPT — ใช้ straight quotes (")',
      example: '"ผล" → "ผล"',
      fix: 'แทนด้วย straight quotes (" ")',
    });
  }

  return issues;
}

/**
 * Format a typography check report as markdown.
 */
export function formatTypographyReport(issues: TypographyIssue[]): string {
  if (issues.length === 0) {
    return "✅ ไม่พบปัญหา Thai typography";
  }

  const lines: string[] = [`⚠️ พบ ${issues.length} ปัญหา typography:`];
  for (const issue of issues) {
    lines.push(`\n**${issue.type}**`);
    lines.push(`- ปัญหา: ${issue.description}`);
    lines.push(`- ตัวอย่าง: ${issue.example}`);
    lines.push(`- แก้ไข: ${issue.fix}`);
  }

  return lines.join("\n");
}

// ─── University Name Normalization ────────────────────────────────────────────

const UNIVERSITY_ALIASES: Record<string, string> = {
  // Chulalongkorn
  "จุฬา": "chulalongkorn",
  "จุฬาลงกรณ์": "chulalongkorn",
  "chula": "chulalongkorn",
  "chulalongkorn": "chulalongkorn",
  "chulalong": "chulalongkorn",
  // Kasetsart
  "เกษตร": "kasetsart",
  "มก": "kasetsart",
  "kaset": "kasetsart",
  "kasetsart": "kasetsart",
  "ku": "kasetsart",
  // KMUTT
  "มจธ": "kmutt",
  "kmutt": "kmutt",
  "king mongkut thonburi": "kmutt",
  "พระจอมเกล้าธนบุรี": "kmutt",
  // Chiang Mai
  "มช": "chiangmai",
  "chiang mai": "chiangmai",
  "cmu": "chiangmai",
  "chiangmai": "chiangmai",
  "เชียงใหม่": "chiangmai",
  // Generic
  "generic": "generic",
  "ทั่วไป": "generic",
  "มาตรฐาน": "generic",
};

/**
 * Normalize a university name string to the canonical profile key.
 * Returns "generic" if no match is found.
 */
export function normalizeUniversityName(input: string): string {
  const normalized = input.trim().toLowerCase();
  return UNIVERSITY_ALIASES[normalized] ?? "generic";
}

/**
 * Return the Thai display name for a university profile key.
 */
export function universityDisplayName(profileKey: string): { th: string; en: string } {
  const names: Record<string, { th: string; en: string }> = {
    chulalongkorn: {
      th: "จุฬาลงกรณ์มหาวิทยาลัย",
      en: "Chulalongkorn University",
    },
    kasetsart: {
      th: "มหาวิทยาลัยเกษตรศาสตร์",
      en: "Kasetsart University",
    },
    kmutt: {
      th: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
      en: "King Mongkut's University of Technology Thonburi",
    },
    chiangmai: {
      th: "มหาวิทยาลัยเชียงใหม่",
      en: "Chiang Mai University",
    },
    generic: {
      th: "มาตรฐานทั่วไป (Generic Thai Thesis)",
      en: "Generic Thai Thesis Profile",
    },
  };

  return names[profileKey] ?? { th: profileKey, en: profileKey };
}

// ─── Comprehensive Text Scan ──────────────────────────────────────────────────

export interface ThaiTextScanResult {
  burstiness: SentenceLengthStats;
  bannedPatterns: BannedPatternMatch[];
  register: RegisterAnalysis;
  typography: TypographyIssue[];
  yearMixing: { hasMixing: boolean; beCount: number; ceCount: number; message: string };
  summary: {
    totalIssues: number;
    burstinessOk: boolean;
    hasBannedPatterns: boolean;
    hasTypographyIssues: boolean;
  };
}

/**
 * Run a comprehensive scan on Thai thesis text.
 * Combines all analysis functions into one result.
 */
export function scanThaiText(text: string): ThaiTextScanResult {
  const burstiness = analyzeSentenceLengths(text);
  const bannedPatterns = detectThaBannedPatterns(text);
  const register = analyzeRegister(text);
  const typography = checkThaiTypography(text);
  const yearMixing = detectYearSystemMixing(text);

  const totalIssues =
    bannedPatterns.length +
    typography.length +
    (register.hasInformalFirstPerson ? 1 : 0) +
    (register.hasMarketingLanguage ? 1 : 0) +
    (register.hasFillerPhrases ? 1 : 0) +
    (register.hasRepetitiveOpeners ? 1 : 0) +
    (yearMixing.hasMixing ? 1 : 0) +
    (!burstiness.burstinessOk ? 1 : 0);

  return {
    burstiness,
    bannedPatterns,
    register,
    typography,
    yearMixing,
    summary: {
      totalIssues,
      burstinessOk: burstiness.burstinessOk,
      hasBannedPatterns: bannedPatterns.length > 0,
      hasTypographyIssues: typography.length > 0,
    },
  };
}

/**
 * Generate a comprehensive markdown report from a scan result.
 */
export function formatComprehensiveReport(result: ThaiTextScanResult): string {
  const lines: string[] = [
    "# Thai Text Analysis Report",
    "",
    "## Summary",
    "",
    `- **Total Issues Found**: ${result.summary.totalIssues}`,
    `- **Burstiness**: ${result.summary.burstinessOk ? "✅ OK" : "⚠️ Needs improvement"} (CV: ${result.burstiness.cv}%)`,
    `- **Banned Patterns**: ${result.summary.hasBannedPatterns ? "⚠️ Found" : "✅ None"}`,
    `- **Typography**: ${result.summary.hasTypographyIssues ? "⚠️ Issues found" : "✅ OK"}`,
    "",
    "---",
    "",
    formatBurstinessReport(result.burstiness),
    "",
    formatBannedPatternReport(result.bannedPatterns),
    "",
    "## Register Analysis",
    ...result.register.findings,
    "",
    formatTypographyReport(result.typography),
    "",
    "## Year System Check",
    result.yearMixing.message,
    "",
    "---",
    "*Generated by Thai Thesis MCP Server - thai-text utility*",
  ];

  return lines.join("\n");
}
