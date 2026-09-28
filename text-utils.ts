export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  emptyLines: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  readabilityScore: number;
  readingGradeLevel: string;
  byteSizeUtf8: number;
}

export function computeTextStats(text: string): TextStats {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  
  const trimmed = text.trim();
  const words = trimmed ? (trimmed.match(/\b[\w'-]+\b/g)?.length || 0) : 0;
  const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+(\s|$)/g)?.length || (words > 0 ? 1 : 0)) : 0;
  
  const rawLines = text.split(/\r\n|\r|\n/);
  const lines = rawLines.length;
  const emptyLines = rawLines.filter((l) => l.trim().length === 0).length;
  
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  const readingTimeMinutes = Math.ceil(words / 200); // 200 WPM
  const speakingTimeMinutes = Math.ceil(words / 130); // 130 WPM

  // Flesch-Kincaid Grade Level approximation
  const syllables = countSyllablesInText(text);
  let readabilityScore = 100;
  let readingGradeLevel = 'Easy / Elementary';

  if (words > 0 && sentences > 0) {
    const avgSentenceLength = words / sentences;
    const avgSyllablesPerWord = syllables / words;
    readabilityScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord)
      )
    );

    if (readabilityScore >= 90) readingGradeLevel = '5th Grade (Very Easy)';
    else if (readabilityScore >= 80) readingGradeLevel = '6th Grade (Easy)';
    else if (readabilityScore >= 70) readingGradeLevel = '7th Grade (Fairly Easy)';
    else if (readabilityScore >= 60) readingGradeLevel = '8th-9th Grade (Standard)';
    else if (readabilityScore >= 50) readingGradeLevel = '10th-12th Grade (Fairly Difficult)';
    else if (readabilityScore >= 30) readingGradeLevel = 'College Level (Difficult)';
    else readingGradeLevel = 'College Graduate (Very Difficult)';
  }

  // UTF-8 Byte Size
  const byteSizeUtf8 = new TextEncoder().encode(text).length;

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs: paragraphs || (words > 0 ? 1 : 0),
    lines,
    emptyLines,
    readingTimeMinutes: readingTimeMinutes || (words > 0 ? 1 : 0),
    speakingTimeMinutes: speakingTimeMinutes || (words > 0 ? 1 : 0),
    readabilityScore,
    readingGradeLevel,
    byteSizeUtf8,
  };
}

function countSyllablesInWord(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const cleaned = w.replace(/(?:[^laeiouy]|ed|es|e)$/, '').replace(/^y/, '');
  const matches = cleaned.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

function countSyllablesInText(text: string): number {
  const words = text.match(/\b[A-Za-z]+\b/g) || [];
  return words.reduce((acc, word) => acc + countSyllablesInWord(word), 0);
}

// Case transformations
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

export function toSentenceCase(text: string): string {
  return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}

export function toCamelCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/[\s\-_]+/g, '');
}

export function toPascalCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/[\s\-_]+/g, '');
}

export function toSnakeCase(text: string): string {
  return text
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    .join('_') || '';
}

export function toKebabCase(text: string): string {
  return text
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    .join('-') || '';
}

export function toConstantCase(text: string): string {
  return toSnakeCase(text).toUpperCase();
}

export function toAlternatingCase(text: string): string {
  return text
    .split('')
    .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
    .join('');
}

export function toInverseCase(text: string): string {
  return text
    .split('')
    .map((char) =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    )
    .join('');
}

// Line manipulation
export function sortLines(
  text: string,
  mode: 'az' | 'za' | 'length-asc' | 'length-desc' | 'natural' = 'az'
): string {
  const lines = text.split(/\r?\n/);
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

  switch (mode) {
    case 'az':
      lines.sort((a, b) => a.localeCompare(b));
      break;
    case 'za':
      lines.sort((a, b) => b.localeCompare(a));
      break;
    case 'length-asc':
      lines.sort((a, b) => a.length - b.length || a.localeCompare(b));
      break;
    case 'length-desc':
      lines.sort((a, b) => b.length - a.length || a.localeCompare(b));
      break;
    case 'natural':
      lines.sort((a, b) => collator.compare(a, b));
      break;
  }
  return lines.join('\n');
}

export function reverseLines(text: string): string {
  return text.split(/\r?\n/).reverse().join('\n');
}

export function removeDuplicateLines(text: string, caseSensitive = true): string {
  const lines = text.split(/\r?\n/);
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    const key = caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(line);
    }
  }
  return result.join('\n');
}

export function removeEmptyLines(text: string): string {
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .join('\n');
}

export function trimLines(text: string): string {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .join('\n');
}

export function addPrefixSuffix(
  text: string,
  prefix: string = '',
  suffix: string = '',
  skipEmpty = true
): string {
  return text
    .split(/\r?\n/)
    .map((line) => {
      if (skipEmpty && line.trim().length === 0) return line;
      return `${prefix}${line}${suffix}`;
    })
    .join('\n');
}

export function numberLines(
  text: string,
  format: '1.' | '1)' | '[1]' | '001.' = '1.',
  startFrom = 1
): string {
  const lines = text.split(/\r?\n/);
  const total = lines.length + startFrom - 1;
  const padLength = String(total).length;

  return lines
    .map((line, idx) => {
      const num = idx + startFrom;
      let label = '';
      if (format === '1.') label = `${num}. `;
      else if (format === '1)') label = `${num}) `;
      else if (format === '[1]') label = `[${num}] `;
      else if (format === '001.') label = `${String(num).padStart(Math.max(3, padLength), '0')}. `;
      return `${label}${line}`;
    })
    .join('\n');
}

// Find & Replace
export function executeFindReplace(
  text: string,
  search: string,
  replaceWith: string,
  options: { regex?: boolean; caseSensitive?: boolean; matchWholeWord?: boolean } = {}
): { result: string; matchesCount: number } {
  if (!search) return { result: text, matchesCount: 0 };

  try {
    let flags = 'g';
    if (!options.caseSensitive) flags += 'i';

    let pattern: RegExp;
    if (options.regex) {
      pattern = new RegExp(search, flags);
    } else {
      let escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (options.matchWholeWord) {
        escaped = `\\b${escaped}\\b`;
      }
      pattern = new RegExp(escaped, flags);
    }

    const matches = text.match(pattern);
    const count = matches ? matches.length : 0;
    const result = text.replace(pattern, replaceWith);

    return { result, matchesCount: count };
  } catch {
    return { result: text, matchesCount: 0 };
  }
}

// Clean and Sanitize
export function stripHtmlTags(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function stripMarkdown(md: string): string {
  return md
    .replace(/^#+\s+/gm, '') // Headers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // Italic
    .replace(/~~(.*?)~~/g, '$1') // Strikethrough
    .replace(/`{3}[\s\S]*?`{3}/g, '') // Code blocks
    .replace(/`(.+?)`/g, '$1') // Inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Images
    .replace(/^\s*[-*+]\s+/gm, '') // Lists
    .replace(/^\s*\d+\.\s+/gm, '') // Numbered lists
    .replace(/^\s*>\s+/gm, ''); // Blockquotes
}

export function stripNonAscii(text: string): string {
  // eslint-disable-next-line no-control-regex
  return text.replace(/[^\x00-\x7F]/g, '');
}

// Simple Diff computation for Diff Checker
export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  originalLineNumber?: number;
  newLineNumber?: number;
}

export function computeLineDiff(originalText: string, newText: string): DiffLine[] {
  const origLines = originalText.split(/\r?\n/);
  const newLines = newText.split(/\r?\n/);
  const result: DiffLine[] = [];

  let i = 0;
  let j = 0;
  let origLineNum = 1;
  let newLineNum = 1;

  while (i < origLines.length || j < newLines.length) {
    if (i < origLines.length && j < newLines.length && origLines[i] === newLines[j]) {
      result.push({
        type: 'unchanged',
        content: origLines[i],
        originalLineNumber: origLineNum++,
        newLineNumber: newLineNum++,
      });
      i++;
      j++;
    } else if (j >= newLines.length || (i < origLines.length && !newLines.includes(origLines[i]))) {
      result.push({
        type: 'removed',
        content: origLines[i],
        originalLineNumber: origLineNum++,
      });
      i++;
    } else {
      result.push({
        type: 'added',
        content: newLines[j],
        newLineNumber: newLineNum++,
      });
      j++;
    }
  }

  return result;
}