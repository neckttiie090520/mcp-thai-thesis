---
name: thai-de-ai
description: >
  Detect and reduce AI-writing signals in Thai and English thesis prose using the 30-pattern framework,
  Thai banned-pattern scanning, burstiness checks, and humanization strategies.
tags: [Thai, De-AI, Editing, Thesis]
version: 0.1.0
---

# Thai De-AI Skill

This skill post-processes thesis prose to reduce AI-writing signals without changing facts, citations, or technical meaning. It is intended for thesis chapters, abstracts, literature reviews, ISO-linked reports, and other submission-ready academic writing.

## 1. Purpose

Use this skill when the draft already contains the correct ideas, evidence, and citations, but the writing still sounds machine-generated, overly smooth, repetitive, inflated, or unnaturally generic.

The goal is not to "make it fancy". The goal is to make it read like careful human academic writing.

## 2. Core principles

### 2.1 Meaning preservation

- Preserve all facts, claims, numbers, citations, and technical intent.
- Do not add invented examples or unsupported details.
- Do not weaken the logic just to sound less like AI.
- If a sentence is vague because the source is vague, flag the weakness instead of fabricating specificity.

### 2.2 Minimal necessary intervention

- If a sentence already sounds natural, leave it alone.
- Edit only where there is a clear AI-style signal, filler, rhythm problem, or register problem.
- Prefer surgical edits before paragraph rewrites.

### 2.3 Thesis-safe editing

- Maintain academic Thai suitable for graduate-level writing.
- Preserve terminology consistency across chapters.
- Keep citation formatting unchanged unless a citation manager is also being used.
- Never turn evidence-based writing into conversational prose.

## 3. Operating modes

### 3.1 `scan`

Use when the user wants diagnosis only.

Output:
1. detected AI signals
2. risk level by passage
3. recommended actions

### 3.2 `edit`

Use when the draft is mostly good but needs sentence-level cleanup.

Output:
1. marked problem summary
2. revised text
3. residual concerns

### 3.3 `rewrite`

Use when a passage has strong AI fingerprints across structure, rhythm, wording, and paragraph logic.

Output:
1. rewrite rationale
2. rewritten passage
3. verification notes confirming preserved facts and citations

## 4. Detection framework

This skill inherits the 30-pattern anti-AI framework from `documentation-writer/SKILL.md`. Apply that framework first, then apply the Thai-specific workflow below.

## 5. Thai-specific AI signal checklist

### 5.1 Inflated significance language

Flag phrases that overstate importance without evidence, such as:

- ซึ่งนับเป็นก้าวสำคัญ
- ถือเป็นหมุดหมายสำคัญ
- มีความสำคัญอย่างยิ่งยวด
- เป็นกุญแจสำคัญที่จะนำไปสู่
- สะท้อนให้เห็นถึงความสำเร็จอันโดดเด่น

Preferred action:
- replace with direct, evidence-based wording
- specify what changed, improved, or mattered

### 5.2 Marketing tone

Flag promotional language such as:

- ล้ำสมัย
- ก้าวล้ำ
- ปฏิวัติวงการ
- พลิกโฉม
- ระดับโลก
- ไร้รอยต่อ
- ตอบโจทย์ความต้องการ

Preferred action:
- replace with neutral academic wording
- describe capability, scope, or result directly

### 5.3 Filler phrases

Flag empty connectors and word-padding, such as:

- ในการที่จะ
- สำหรับในเรื่องของ
- ในส่วนที่เกี่ยวข้องกับ
- ไม่อาจปฏิเสธได้ว่า
- เป็นที่ทราบกันดีว่า
- อีกทั้งยังเป็นปัจจัยหลักที่ส่งผลกระทบ
- ในปัจจุบันนี้
- ได้มีการ
- ทำการ
- ได้ทำการดำเนินการ

Preferred action:
- shorten aggressively
- prefer direct verbs

### 5.4 Repetitive paragraph openers

Flag repeated openers across consecutive sentences or paragraphs, such as:

- นอกจากนี้
- อีกทั้ง
- ทั้งนี้
- อย่างไรก็ตาม
- กล่าวคือ
- จากนั้น
- ในขณะเดียวกัน

Preferred action:
- vary openings naturally
- start with the actual topic sentence instead of a connector

### 5.5 Hedging overload

Flag stacked uncertainty language, such as:

- อาจจะเป็นไปได้ว่า
- น่าจะสามารถ
- ค่อนข้างจะมีแนวโน้ม
- อาจกล่าวได้ว่า

Preferred action:
- keep only the level of uncertainty the evidence really supports

### 5.6 Summary endings with no information

Flag paragraph endings like:

- ซึ่งจะเป็นประโยชน์ต่อไปในอนาคต
- อันจะนำไปสู่การพัฒนาที่ดีขึ้น
- เป็นรากฐานสำคัญสำหรับงานต่อไป
- ช่วยส่งเสริมประสิทธิภาพโดยรวม

Preferred action:
- replace with a concrete implication, limitation, or next step
- if nothing concrete exists, end earlier

## 6. English AI signal checklist inside Thai theses

Thai theses often contain English passages, captions, abstracts, or technical discussion. Scan those for:

- banned words such as `delve`, `leverage`, `multifaceted`, `paramount`, `nuanced`, `holistic`, `robust` used as filler
- em dash overuse
- repetitive `Furthermore`, `Moreover`, `Additionally`
- slogan-like conclusions
- uniform sentence rhythm
- vague academic padding such as `it is important to note that`

Preferred action:
- replace with direct, plain academic English
- preserve technical precision

## 7. Burstiness and rhythm control

AI text often has suspiciously even pacing. This skill should explicitly test for rhythm monotony.

### 7.1 Target

Aim for natural variation in sentence length and clause structure.

- preferred coefficient of variation: greater than 30 percent per paragraph when feasible
- avoid 3 or more consecutive sentences with highly similar length
- mix short, medium, and long sentences where natural

### 7.2 Symptoms of low burstiness

- every sentence feels equally long
- every sentence uses similar clause shape
- every sentence ends with similar abstract phrasing
- paragraph reads smoothly but mechanically

### 7.3 Correction methods

- split one overloaded sentence
- merge two choppy sentences if rhythm is too fragmented
- alternate direct and subordinated sentence structures
- vary topic-sentence density
- end some sentences with concrete nouns rather than abstractions

## 8. Soul injection techniques

Use these carefully. They are not decorative. They exist to restore human specificity and natural judgment.

1. Replace abstract summaries with concrete observations.
2. Prefer domain nouns over vague umbrella words.
3. Use direct verbs instead of `การ + verb` nominalization when possible.
4. Preserve asymmetry where natural; not every sentence needs parallel structure.
5. Allow one sentence in a paragraph to be notably shorter.
6. Use contrast only when there is a real trade-off.
7. End with implication, limitation, or evidence, not optimism.
8. Retain discipline-specific phrasing that real researchers actually use.
9. Remove ornamental transitions that do not carry logic.
10. Keep the writer's original voice if it already feels human.

## 9. Safe rewrite policy

Before editing, verify the following mentally:

1. What is the exact claim?
2. What evidence or citation supports it?
3. Which words are only style padding?
4. Can I reduce AI flavor without changing meaning?
5. If I rewrite the paragraph, did I preserve all factual content?

If any answer is uncertain, choose `scan` or `edit` instead of full `rewrite`.

## 10. Rewrite priorities

When multiple problems appear together, fix them in this order:

1. factual-risk language
2. citation-sensitive wording
3. inflated or promotional tone
4. filler and redundancy
5. monotone rhythm
6. repetitive transitions
7. weak paragraph endings

## 11. Output format

For each run, produce:

### Part 1 — Detection Summary

Include:
- passage or section reviewed
- detected pattern categories
- severity: low, medium, or high
- whether `scan`, `edit`, or `rewrite` mode was used

### Part 2 — Revised Text

Provide the cleaned passage with:
- facts preserved
- citations preserved
- terminology preserved
- Thai academic register maintained

### Part 3 — Residual Risks

List anything that still needs human review, such as:
- unsupported claim
- weak evidence
- unverifiable institutional wording
- citation that may need source checking
- paragraph whose argument is still too generic

## 12. Integration points

Use together with:

- `documentation-writer` for the full 30-pattern anti-AI framework
- `thai-thesis-writing` for chapter context and thesis structure
- `thai-citation-manager` when citation wording may be affected

## 13. Anti-patterns

Do not do the following:

- rewrite everything just to sound different
- add emotional or literary flourishes
- change citation meaning
- replace precise technical words with vague simpler words
- force informal Thai into academic chapters
- turn paragraphs into bullet lists without reason
- hide factual uncertainty behind smoother wording
- remove limitations to make the text sound stronger

## 14. Quick decision rules

Use `scan` when:
- the user wants diagnosis
- the passage may contain unsupported content
- the text is short and still under development

Use `edit` when:
- the argument is sound
- the structure mostly works
- the main issue is wording, repetition, or filler

Use `rewrite` when:
- the passage shows repeated AI signals across multiple sentences
- the paragraph structure is generic and formulaic
- the text sounds polished but unnatural from start to finish

## 15. Final standard

A successful result should read like this:

- clear, not robotic
- formal, not stiff
- specific, not inflated
- natural, not chaotic
- human, not theatrical

If the passage would sound credible when read aloud in a thesis defense, the skill has done its job.
