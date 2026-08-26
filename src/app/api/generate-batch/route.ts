import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { applyLineEndings, LineEnding } from '@/lib/encodings';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      filenamePattern = 'file_{id}.txt',
      contentTemplate = 'Generated ID: {id}\nDate: {timestamp}',
      startNum = 1,
      count = 10,
      padZeroes = true,
      lineEnding = 'LF',
      customData,
    } = body;

    const zip = new JSZip();
    const timestamp = new Date().toISOString();
    const targetCount = Math.min(Math.max(1, count), 500);

    if (customData && Array.isArray(customData) && customData.length > 0) {
      customData.forEach((row: Record<string, string>, idx: number) => {
        let fname = filenamePattern;
        let content = contentTemplate;

        Object.entries(row).forEach(([key, val]) => {
          const regex = new RegExp(`\\{${key}\\}`, 'g');
          fname = fname.replace(regex, String(val));
          content = content.replace(regex, String(val));
        });

        fname = fname.replace(/\{timestamp\}/g, String(Date.now() + idx));
        content = content.replace(/\{timestamp\}/g, timestamp);

        const safeFname = fname.endsWith('.txt') ? fname : `${fname}.txt`;
        zip.file(safeFname, applyLineEndings(content, lineEnding as LineEnding));
      });
    } else {
      const padLength = padZeroes ? String(startNum + targetCount - 1).length : 1;
      for (let i = 0; i < targetCount; i++) {
        const id = startNum + i;
        const formattedId = padZeroes
          ? String(id).padStart(Math.max(3, padLength), '0')
          : String(id);

        const fname = filenamePattern
          .replace(/\{id\}/g, formattedId)
          .replace(/\{timestamp\}/g, String(Date.now()));

        const content = contentTemplate
          .replace(/\{id\}/g, formattedId)
          .replace(/\{timestamp\}/g, timestamp);

        const safeFname = fname.endsWith('.txt') ? fname : `${fname}.txt`;
        zip.file(safeFname, applyLineEndings(content, lineEnding as LineEnding));
      }
    }

    const zipBuffer = await zip.generateAsync({ type: 'uint8array' });

    return new NextResponse(zipBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="batch_files_${Date.now()}.zip"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate batch archive', details: String(error) },
      { status: 500 }
    );
  }
}