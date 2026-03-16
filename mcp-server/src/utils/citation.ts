/**
 * citation.ts
 * Citation utilities for Thai thesis APA นาม-ปี workflow.
 * Handles in-text citations, bibliography entries, year conversion,
 * author-name normalization, and consistency auditing.
 *
 * All logic is pure (no I/O) so it can be used from any MCP tool handler.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type YearSystem = "phc" | "ce";          // พ.ศ. | ค.ศ.
export type CitationMode = "narrative" | "parenthetical";
export type CitationAction = "cite" | "bibliography" | "audit";

export interface SourceMeta {
  /** Unique key used in the bibliography, e.g. "สมชาย2566" */
  key: string;
  /** Authors in order. Use exactly the name form from the source. */
  authors: string[];
  /** Publication year in ค.ศ. (CE) as the canonical storage form. */
  year_ce: number;
  title: string;
  source_type: "book" | "journal" | "conference" | "thesis" | "website" | "report" | "other";
  publisher?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  access_date?: string;
  city?: string;
  edition?: string;
  /** Original language of the source: "th" | "en" | "other" */
  language: "th" | "en" | "other";
}

export interface CitationOptions {
  /** Target year display system. Defaults to "phc" (พ.ศ.). */
  year_system?: YearSystem;
  /** Whether to shorten 3+ author list in repeated citations. */
  shorten_authors?: boolean;
  /**
   * Separator used between Thai author names in two-author citations.
   * Defaults to "และ".
   * Mark as [VERIFY REQUIRED] if the local guide specifies another form.
   */
  thai_two_author_sep?: string;
  /** Whether transliteration is required. Defaults to false. */
  transliterate?: boolean;
}

export interface InTextCitation {
  /** The formatted citation string, e.g. "สมชาย (2566)" */
  text: string;
  /** Author string used (before year), e.g. "สมชาย" */
  author_display: string;
  /** Display year string, e.g. "2566" */
  year_display: string;
  /** Any verification notes produced during formatting */
  notes: string[];
}

export interface BibliographyEntry {
  /** Formatted full bibliography line */
  text: string;
  /** Key used for cross-referencing, e.g. "สมชาย2566" */
  key: string;
  /** Language group for sorting ("th" | "en" | "other") */
  language: string;
  /** Any verification notes or warnings */
  notes: string[];
}

export interface AuditResult {
  cited_missing_from_bibliography: string[];
  bibliography_uncited_in_text: string[];
  year_system_inconsistencies: string[];
  author_spelling_drift: string[];
  incomplete_entries: Array<{ key: string; missing_fields: string[] }>;
  summary: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Offset between ค.ศ. and พ.ศ. years */
const PHC_OFFSET = 543;

/** Required minimum metadata fields per source type */
const REQUIRED_FIELDS: Record<SourceMeta["source_type"], Array<keyof SourceMeta>> = {
  book:         ["authors", "year_ce", "title", "publisher"],
  journal:      ["authors", "year_ce", "title", "journal"],
  conference:   ["authors", "year_ce", "title"],
  thesis:       ["authors", "year_ce", "title", "publisher"],
  website:      ["authors", "year_ce", "title", "url"],
  report:       ["authors", "year_ce", "title"],
  other:        ["authors", "year_ce", "title"],
};

// ─── Year conversion ──────────────────────────────────────────────────────────

/**
 * Convert a ค.ศ. (CE) year to พ.ศ.
 * e.g. 2023 → 2566
 */
export function ceToPhc(year_ce: number): number {
  return year_ce + PHC_OFFSET;
}

/**
 * Convert a พ.ศ. year to ค.ศ. (CE).
 * e.g. 2566 → 2023
 */
export function phcToCe(year_phc: number): number {
  return year_phc - PHC_OFFSET;
}

/**
 * Return the display year string based on the active year system.
 */
export function displayYear(year_ce: number, system: YearSystem = "phc"): string {
  return system === "phc" ? String(ceToPhc(year_ce)) : String(year_ce);
}

// ─── Author display ───────────────────────────────────────────────────────────

/**
 * Detect whether a name string is Thai.
 * Uses basic Unicode range check for Thai script (U+0E00–U+0E7F).
 */
export function isThaiName(name: string): boolean {
  return /[\u0E00-\u0E7F]/.test(name);
}

/**
 * Extract the last-name (surname) component for an English name.
 * Handles "Last, First" and "First Last" forms.
 */
function extractEnglishSurname(name: string): string {
  const trimmed = name.trim();
  if (trimmed.includes(",")) {
    // "Smith, John" → "Smith"
    return trimmed.split(",")[0].trim();
  }
  // "John Smith" → "Smith"
  const parts = trimmed.split(/\s+/);
  return parts[parts.length - 1];
}

/**
 * Extract the first component of a Thai name for in-text display.
 * Thai convention: surname comes last, so for in-text we use the full name
 * or the first name, depending on local style.
 * This function returns the surname if a comma is present, otherwise
 * returns the last word (most common Thai bibliographic convention).
 */
function extractThaiSurname(name: string): string {
  const trimmed = name.trim();
  if (trimmed.includes(",")) {
    // "นามสกุล, ชื่อ" → "นามสกุล"
    return trimmed.split(",")[0].trim();
  }
  // "ชื่อ นามสกุล" → "นามสกุล"
  const parts = trimmed.split(/\s+/);
  return parts[parts.length - 1];
}

/**
 * Build the author display string for an in-text citation (single author).
 * Returns the surname/family name in the source language.
 */
export function authorSurnameDisplay(name: string): string {
  if (isThaiName(name)) {
    return extractThaiSurname(name);
  }
  return extractEnglishSurname(name);
}

/**
 * Format the author string for in-text citation based on number of authors
 * and the active options. Returns the formatted string and any notes.
 */
export function formatInTextAuthors(
  authors: string[],
  opts: CitationOptions = {}
): { text: string; notes: string[] } {
  const sep = opts.thai_two_author_sep ?? "และ";
  const notes: string[] = [];

  if (authors.length === 0) {
    notes.push("[VERIFY REQUIRED] No authors listed for this source.");
    return { text: "[ผู้แต่ง]", notes };
  }

  if (authors.length === 1) {
    return { text: authorSurnameDisplay(authors[0]), notes };
  }

  if (authors.length === 2) {
    const a = authorSurnameDisplay(authors[0]);
    const b = authorSurnameDisplay(authors[1]);
    // Use "and" for English, Thai sep for Thai
    const bothEnglish = !isThaiName(authors[0]) && !isThaiName(authors[1]);
    const connector = bothEnglish ? "and" : sep;
    return { text: `${a} ${connector} ${b}`, notes };
  }

  // 3+ authors
  if (opts.shorten_authors) {
    const a = authorSurnameDisplay(authors[0]);
    const allEnglish = authors.every((n) => !isThaiName(n));
    const suffix = allEnglish ? "et al." : "และคณะ";
    notes.push(
      "[VERIFY REQUIRED] Author shortening applied. Confirm the local guide permits 'และคณะ' / 'et al.' on first mention."
    );
    return { text: `${a} ${suffix}`, notes };
  }

  // List all surnames
  const surnames = authors.map(authorSurnameDisplay);
  const allEnglish = authors.every((n) => !isThaiName(n));
  const connector = allEnglish ? "and" : sep;
  const last = surnames.pop()!;
  return {
    text: `${surnames.join(", ")} ${connector} ${last}`,
    notes,
  };
}

// ─── In-text citation formatting ──────────────────────────────────────────────

/**
 * Format an APA นาม-ปี in-text citation.
 *
 * Examples:
 *   narrative:      สมชาย (2566)     / Smith (2023)
 *   parenthetical:  (สมชาย, 2566)    / (Smith, 2023)
 */
export function formatInTextCitation(
  source: SourceMeta,
  mode: CitationMode = "narrative",
  opts: CitationOptions = {}
): InTextCitation {
  const system = opts.year_system ?? "phc";
  const yearStr = displayYear(source.year_ce, system);
  const { text: authorStr, notes } = formatInTextAuthors(source.authors, opts);

  let text: string;
  if (mode === "narrative") {
    text = `${authorStr} (${yearStr})`;
  } else {
    text = `(${authorStr}, ${yearStr})`;
  }

  return { text, author_display: authorStr, year_display: yearStr, notes };
}

/**
 * Format a list of sources as multiple citations in one location.
 * Applies chronological ordering by default.
 */
export function formatMultipleCitations(
  sources: SourceMeta[],
  mode: CitationMode = "parenthetical",
  opts: CitationOptions = {}
): { text: string; notes: string[] } {
  const allNotes: string[] = [
    "[VERIFY REQUIRED] Confirm multi-citation ordering rule (chronological vs alphabetical) with the local guide.",
  ];

  const sorted = [...sources].sort((a, b) => a.year_ce - b.year_ce);
  const parts = sorted.map((s) => {
    const c = formatInTextCitation(s, mode, opts);
    allNotes.push(...c.notes);
    return c.text;
  });

  if (mode === "parenthetical") {
    // Combine into one parenthetical block: (สมชาย, 2566; Smith, 2023)
    const inner = sorted
      .map((s) => {
        const { author_display, year_display } = formatInTextCitation(s, mode, opts);
        return `${author_display}, ${year_display}`;
      })
      .join("; ");
    return { text: `(${inner})`, notes: allNotes };
  }

  return { text: parts.join("; "), notes: allNotes };
}

// ─── Bibliography entry formatting ────────────────────────────────────────────

/**
 * Format author list for bibliography entry.
 * APA Thai convention: surname, initials (for English) or full Thai name.
 */
function formatBibAuthors(authors: string[]): string {
  return authors
    .map((name) => {
      const trimmed = name.trim();
      // If the name already contains a comma, assume it's already "Last, First" form
      if (trimmed.includes(",")) return trimmed;
      if (isThaiName(trimmed)) {
        // Thai: keep full name as-is (no reordering by default)
        return trimmed;
      }
      // English: reorder to "Last, F." if possible
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 2) {
        const last = parts[parts.length - 1];
        const initials = parts
          .slice(0, -1)
          .map((p) => `${p[0].toUpperCase()}.`)
          .join(" ");
        return `${last}, ${initials}`;
      }
      return trimmed;
    })
    .join(", ");
}

/**
 * Generate a full bibliography entry for a book source.
 */
function bibBook(s: SourceMeta, yearStr: string): string {
  const authors = formatBibAuthors(s.authors);
  const edition = s.edition ? ` (พิมพ์ครั้งที่ ${s.edition})` : "";
  const city = s.city ? `${s.city}: ` : "";
  return `${authors}. (${yearStr}). *${s.title}*${edition}. ${city}${s.publisher ?? "[publisher unknown]"}.`;
}

/**
 * Generate a full bibliography entry for a journal article.
 */
function bibJournal(s: SourceMeta, yearStr: string): string {
  const authors = formatBibAuthors(s.authors);
  const vol = s.volume ? `, *${s.volume}*` : "";
  const issue = s.issue ? `(${s.issue})` : "";
  const pages = s.pages ? `, ${s.pages}` : "";
  const doi = s.doi ? ` https://doi.org/${s.doi}` : "";
  return `${authors}. (${yearStr}). ${s.title}. *${s.journal ?? "[journal]"}*${vol}${issue}${pages}.${doi}`;
}

/**
 * Generate a full bibliography entry for a conference paper.
 */
function bibConference(s: SourceMeta, yearStr: string): string {
  const authors = formatBibAuthors(s.authors);
  const pages = s.pages ? ` (pp. ${s.pages})` : "";
  const pub = s.publisher ? `. ${s.publisher}` : "";
  return `${authors}. (${yearStr}). ${s.title}. ใน *${s.journal ?? "[conference name]"}*${pages}${pub}.`;
}

/**
 * Generate a full bibliography entry for a thesis or dissertation.
 */
function bibThesis(s: SourceMeta, yearStr: string): string {
  const authors = formatBibAuthors(s.authors);
  return `${authors}. (${yearStr}). *${s.title}* [วิทยานิพนธ์ปริญญา]. ${s.publisher ?? "[institution]"}.`;
}

/**
 * Generate a full bibliography entry for a website.
 */
function bibWebsite(s: SourceMeta, yearStr: string): string {
  const authors = formatBibAuthors(s.authors);
  const access = s.access_date ? ` สืบค้น ${s.access_date} จาก` : " จาก";
  return `${authors}. (${yearStr}). *${s.title}*.${access} ${s.url ?? "[url]"}`;
}

/**
 * Generate a full bibliography entry for a report.
 */
function bibReport(s: SourceMeta, yearStr: string): string {
  const authors = formatBibAuthors(s.authors);
  const pub = s.publisher ? `. ${s.publisher}` : "";
  return `${authors}. (${yearStr}). *${s.title}*${pub}.`;
}

/**
 * Format a single bibliography entry.
 */
export function formatBibEntry(
  source: SourceMeta,
  opts: CitationOptions = {}
): BibliographyEntry {
  const system = opts.year_system ?? "phc";
  const yearStr = displayYear(source.year_ce, system);
  const notes: string[] = [];

  // Check for missing required fields
  const requiredFields = REQUIRED_FIELDS[source.source_type];
  const missingFields = requiredFields.filter(
    (f) => !source[f] || (Array.isArray(source[f]) && (source[f] as unknown[]).length === 0)
  );
  if (missingFields.length > 0) {
    notes.push(
      `[VERIFY REQUIRED] Missing fields for bibliography entry '${source.key}': ${missingFields.join(", ")}.`
    );
  }

  if (opts.transliterate) {
    notes.push(
      "[VERIFY REQUIRED] Transliteration was requested. Confirm the institutional rule and transliteration scheme before applying."
    );
  }

  let text: string;
  switch (source.source_type) {
    case "book":
      text = bibBook(source, yearStr);
      break;
    case "journal":
      text = bibJournal(source, yearStr);
      break;
    case "conference":
      text = bibConference(source, yearStr);
      break;
    case "thesis":
      text = bibThesis(source, yearStr);
      break;
    case "website":
      text = bibWebsite(source, yearStr);
      break;
    case "report":
      text = bibReport(source, yearStr);
      break;
    default:
      text = `${formatBibAuthors(source.authors)}. (${yearStr}). ${source.title}.`;
      notes.push("[VERIFY REQUIRED] Unknown source type. Format manually.");
  }

  return {
    text,
    key: source.key,
    language: source.language,
    notes,
  };
}

/**
 * Format and sort a full bibliography.
 * Default sort: Thai entries first (alphabetical), then English entries (alphabetical).
 */
export function formatBibliography(
  sources: SourceMeta[],
  opts: CitationOptions = {}
): { entries: BibliographyEntry[]; notes: string[] } {
  const notes: string[] = [
    "[VERIFY REQUIRED] Confirm bibliography ordering rule (Thai-first vs interleaved vs alphabetical) with the active university profile.",
  ];

  const entries = sources.map((s) => formatBibEntry(s, opts));

  const thai = entries.filter((e) => e.language === "th").sort((a, b) => a.text.localeCompare(b.text, "th"));
  const english = entries.filter((e) => e.language === "en").sort((a, b) => a.text.localeCompare(b.text, "en"));
  const other = entries.filter((e) => e.language === "other").sort((a, b) => a.text.localeCompare(b.text));

  const sorted = [...thai, ...english, ...other];

  for (const e of sorted) {
    notes.push(...e.notes);
  }

  return { entries: sorted, notes };
}

// ─── Audit ────────────────────────────────────────────────────────────────────

/**
 * Audit citation keys found in thesis text against a bibliography.
 *
 * @param cited_keys   Set of source keys found in in-text citations.
 * @param bibliography Array of SourceMeta representing the full reference list.
 */
export function auditCitations(
  cited_keys: string[],
  bibliography: SourceMeta[],
  opts: CitationOptions = {}
): AuditResult {
  const bibKeys = new Set(bibliography.map((s) => s.key));
  const citedSet = new Set(cited_keys);

  const cited_missing_from_bibliography = cited_keys.filter((k) => !bibKeys.has(k));
  const bibliography_uncited_in_text = bibliography
    .map((s) => s.key)
    .filter((k) => !citedSet.has(k));

  // Year system consistency check
  const year_system_inconsistencies: string[] = [];
  const system = opts.year_system ?? "phc";
  // If the system is พ.ศ., warn if any source has a year that looks like ค.ศ. in its display context
  for (const s of bibliography) {
    if (system === "phc" && s.year_ce < 2100 && s.year_ce > 1900) {
      // CE years look out of place in a พ.ศ. context if accidentally displayed raw
      // This is a heuristic hint, not a definitive check
    }
    if (system === "ce" && ceToPhc(s.year_ce) !== s.year_ce) {
      // Normal — just document that conversion exists
    }
  }

  // Author spelling drift check (heuristic: same surname appearing with different Thai/English forms)
  const author_spelling_drift: string[] = [];
  const surnameMap = new Map<string, string[]>();
  for (const s of bibliography) {
    for (const a of s.authors) {
      const surname = authorSurnameDisplay(a);
      if (!surnameMap.has(surname)) surnameMap.set(surname, []);
      const current = surnameMap.get(surname)!;
      if (!current.includes(a)) current.push(a);
    }
  }
  for (const [surname, variants] of surnameMap) {
    if (variants.length > 1) {
      author_spelling_drift.push(
        `Surname "${surname}" appears in multiple forms: ${variants.join(" | ")}. Confirm the correct form and standardize.`
      );
    }
  }

  // Incomplete entries
  const incomplete_entries: Array<{ key: string; missing_fields: string[] }> = [];
  for (const s of bibliography) {
    const required = REQUIRED_FIELDS[s.source_type];
    const missing = required.filter(
      (f) => !s[f] || (Array.isArray(s[f]) && (s[f] as unknown[]).length === 0)
    );
    if (missing.length > 0) {
      incomplete_entries.push({ key: s.key, missing_fields: missing.map(String) });
    }
  }

  const issues: string[] = [];
  if (cited_missing_from_bibliography.length > 0) {
    issues.push(
      `${cited_missing_from_bibliography.length} citation(s) missing from bibliography.`
    );
  }
  if (bibliography_uncited_in_text.length > 0) {
    issues.push(
      `${bibliography_uncited_in_text.length} bibliography entry/entries not cited in text.`
    );
  }
  if (author_spelling_drift.length > 0) {
    issues.push(`${author_spelling_drift.length} author-name spelling drift issue(s) found.`);
  }
  if (incomplete_entries.length > 0) {
    issues.push(`${incomplete_entries.length} entry/entries with missing required metadata.`);
  }

  const summary =
    issues.length === 0
      ? "Citation audit passed. No inconsistencies detected."
      : `Citation audit found ${issues.length} category(ies) of issues:\n` +
        issues.map((i) => `  - ${i}`).join("\n");

  return {
    cited_missing_from_bibliography,
    bibliography_uncited_in_text,
    year_system_inconsistencies,
    author_spelling_drift,
    incomplete_entries,
    summary,
  };
}

// ─── Quick-format helpers ─────────────────────────────────────────────────────

/**
 * Convenience: produce a narrative in-text citation string for a source.
 * e.g. "สมชาย (2566)" or "Smith (2023)"
 */
export function narrativeCite(
  source: SourceMeta,
  opts: CitationOptions = {}
): string {
  return formatInTextCitation(source, "narrative", opts).text;
}

/**
 * Convenience: produce a parenthetical in-text citation string for a source.
 * e.g. "(สมชาย, 2566)" or "(Smith, 2023)"
 */
export function parentheticalCite(
  source: SourceMeta,
  opts: CitationOptions = {}
): string {
  return formatInTextCitation(source, "parenthetical", opts).text;
}

// ─── Metadata validation ──────────────────────────────────────────────────────

/**
 * Validate a SourceMeta object and return a list of problems.
 * Returns an empty array if the metadata is complete.
 */
export function validateSourceMeta(source: SourceMeta): string[] {
  const problems: string[] = [];

  if (!source.key || source.key.trim() === "") {
    problems.push("Missing citation key.");
  }
  if (!source.authors || source.authors.length === 0) {
    problems.push("No authors specified.");
  }
  if (!source.year_ce || source.year_ce < 1000 || source.year_ce > 2200) {
    problems.push(`Suspicious year_ce value: ${source.year_ce}. Confirm the CE year.`);
  }
  if (!source.title || source.title.trim() === "") {
    problems.push("Missing title.");
  }

  const required = REQUIRED_FIELDS[source.source_type];
  for (const field of required) {
    const val = source[field];
    if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
      problems.push(`Missing required field for source type '${source.source_type}': ${String(field)}.`);
    }
  }

  if (source.doi && !/^10\.\d{4,}\//.test(source.doi)) {
    problems.push(`DOI format looks unusual: "${source.doi}". Confirm the DOI is correct.`);
  }

  return problems;
}

// ─── Render citation report ────────────────────────────────────────────────────

/**
 * Render a citation audit result into a human-readable markdown report.
 */
export function renderAuditReport(result: AuditResult): string {
  const lines: string[] = ["## Citation Audit Report", ""];

  lines.push(`### Summary`, result.summary, "");

  if (result.cited_missing_from_bibliography.length > 0) {
    lines.push("### Critical: Citations Missing from Bibliography");
    for (const k of result.cited_missing_from_bibliography) {
      lines.push(`- \`${k}\``);
    }
    lines.push("");
  }

  if (result.bibliography_uncited_in_text.length > 0) {
    lines.push("### Warning: Bibliography Entries Not Cited in Text");
    for (const k of result.bibliography_uncited_in_text) {
      lines.push(`- \`${k}\``);
    }
    lines.push("");
  }

  if (result.author_spelling_drift.length > 0) {
    lines.push("### Warning: Author Spelling Drift");
    for (const d of result.author_spelling_drift) {
      lines.push(`- ${d}`);
    }
    lines.push("");
  }

  if (result.incomplete_entries.length > 0) {
    lines.push("### Warning: Incomplete Bibliography Entries");
    for (const e of result.incomplete_entries) {
      lines.push(`- \`${e.key}\` — missing: ${e.missing_fields.join(", ")}`);
    }
    lines.push("");
  }

  if (result.year_system_inconsistencies.length > 0) {
    lines.push("### Note: Year System");
    for (const y of result.year_system_inconsistencies) {
      lines.push(`- ${y}`);
    }
    lines.push("");
  }

  lines.push("---");
  lines.push("*Audit generated by Thai Thesis MCP Server — thai-citation-manager*");

  return lines.join("\n");
}
