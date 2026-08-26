import { NextRequest, NextResponse } from 'next/server';
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  sortLines,
  removeDuplicateLines,
  removeEmptyLines,
  trimLines,
  stripHtmlTags,
  stripMarkdown,
} from '@/lib/text-utils';
import { applyLineEndings, LineEnding } from '@/lib/encodings';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text = '', action, lineEnding = 'LF' } = body;

    let result = text;

    switch (action) {
      case 'uppercase':
        result = toUpperCase(text);
        break;
      case 'lowercase':
        result = toLowerCase(text);
        break;
      case 'titlecase':
        result = toTitleCase(text);
        break;
      case 'sentencecase':
        result = toSentenceCase(text);
        break;
      case 'camelcase':
        result = toCamelCase(text);
        break;
      case 'snakecase':
        result = toSnakeCase(text);
        break;
      case 'kebabcase':
        result = toKebabCase(text);
        break;
      case 'sort-az':
        result = sortLines(text, 'az');
        break;
      case 'sort-za':
        result = sortLines(text, 'za');
        break;
      case 'deduplicate':
        result = removeDuplicateLines(text);
        break;
      case 'remove-empty':
        result = removeEmptyLines(text);
        break;
      case 'trim':
        result = trimLines(text);
        break;
      case 'strip-markdown':
        result = stripMarkdown(text);
        break;
      case 'strip-html':
        result = stripHtmlTags(text);
        break;
      default:
        break;
    }

    result = applyLineEndings(result, lineEnding as LineEnding);

    return NextResponse.json({
      success: true,
      originalLength: text.length,
      resultLength: result.length,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Conversion failed', details: String(error) },
      { status: 500 }
    );
  }
}