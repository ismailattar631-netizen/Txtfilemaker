export type LineEnding = 'CRLF' | 'LF' | 'CR';

export type SupportedEncoding =
  | 'utf-8'
  | 'utf-8-bom'
  | 'utf-16le'
  | 'utf-16be'
  | 'ascii'
  | 'windows-1252';

export interface EncodingOption {
  id: SupportedEncoding;
  label: string;
  description: string;
  mimeType: string;
}

export const ENCODING_OPTIONS: EncodingOption[] = [
  {
    id: 'utf-8',
    label: 'UTF-8 (Standard)',
    description: 'Universal standard encoding for web, Linux, macOS, and modern Windows apps',
    mimeType: 'text/plain;charset=utf-8',
  },
  {
    id: 'utf-8-bom',
    label: 'UTF-8 with BOM',
    description: 'Includes Byte Order Mark (EF BB BF) for legacy Microsoft Excel & Notepad compatibility',
    mimeType: 'text/plain;charset=utf-8',
  },
  {
    id: 'utf-16le',
    label: 'UTF-16 LE (Unicode)',
    description: 'Little-endian Unicode with BOM (FF FE), used by Windows APIs and PowerShell output',
    mimeType: 'text/plain;charset=utf-16le',
  },
  {
    id: 'utf-16be',
    label: 'UTF-16 BE',
    description: 'Big-endian Unicode with BOM (FE FF)',
    mimeType: 'text/plain;charset=utf-16be',
  },
  {
    id: 'windows-1252',
    label: 'ANSI / Windows-1252',
    description: 'Western European single-byte legacy encoding',
    mimeType: 'text/plain;charset=windows-1252',
  },
  {
    id: 'ascii',
    label: 'Pure ASCII (7-bit)',
    description: 'Strict 7-bit ASCII characters (0-127), replaces foreign characters with ?',
    mimeType: 'text/plain;charset=us-ascii',
  },
];

export function applyLineEndings(text: string, lineEnding: LineEnding): string {
  // First normalize all line endings to LF
  const normalized = text.replace(/\r\n|\r|\n/g, '\n');

  switch (lineEnding) {
    case 'CRLF':
      return normalized.replace(/\n/g, '\r\n');
    case 'CR':
      return normalized.replace(/\n/g, '\r');
    case 'LF':
    default:
      return normalized;
  }
}

export function createEncodedBlob(
  text: string,
  encoding: SupportedEncoding = 'utf-8',
  lineEnding: LineEnding = 'LF'
): Blob {
  const formattedText = applyLineEndings(text, lineEnding);

  switch (encoding) {
    case 'utf-8-bom': {
      const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
      const encoder = new TextEncoder();
      const content = encoder.encode(formattedText);
      return new Blob([bom, content], { type: 'text/plain;charset=utf-8' });
    }
    case 'utf-16le': {
      const bom = new Uint8Array([0xff, 0xfe]);
      const buffer = new ArrayBuffer(formattedText.length * 2);
      const view = new DataView(buffer);
      for (let i = 0; i < formattedText.length; i++) {
        view.setUint16(i * 2, formattedText.charCodeAt(i), true); // true = little-endian
      }
      return new Blob([bom, buffer], { type: 'text/plain;charset=utf-16le' });
    }
    case 'utf-16be': {
      const bom = new Uint8Array([0xfe, 0xff]);
      const buffer = new ArrayBuffer(formattedText.length * 2);
      const view = new DataView(buffer);
      for (let i = 0; i < formattedText.length; i++) {
        view.setUint16(i * 2, formattedText.charCodeAt(i), false); // false = big-endian
      }
      return new Blob([bom, buffer], { type: 'text/plain;charset=utf-16be' });
    }
    case 'ascii': {
      const asciiBytes = new Uint8Array(formattedText.length);
      for (let i = 0; i < formattedText.length; i++) {
        const code = formattedText.charCodeAt(i);
        asciiBytes[i] = code <= 127 ? code : 63; // '?' for non-ascii
      }
      return new Blob([asciiBytes], { type: 'text/plain;charset=us-ascii' });
    }
    case 'windows-1252': {
      // Windows-1252 encoding mapping (basic fallback to byte representation)
      const bytes = new Uint8Array(formattedText.length);
      for (let i = 0; i < formattedText.length; i++) {
        const code = formattedText.charCodeAt(i);
        bytes[i] = code <= 255 ? code : 63;
      }
      return new Blob([bytes], { type: 'text/plain;charset=windows-1252' });
    }
    case 'utf-8':
    default: {
      return new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    }
  }
}

export function downloadTextFile(
  filename: string,
  content: string,
  encoding: SupportedEncoding = 'utf-8',
  lineEnding: LineEnding = 'LF'
): void {
  const safeFilename = filename.endsWith('.txt') ? filename : `${filename}.txt`;
  const blob = createEncodedBlob(content, encoding, lineEnding);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = safeFilename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}