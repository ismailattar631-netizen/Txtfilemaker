import { NextRequest, NextResponse } from 'next/server';
import { computeTextStats } from '@/lib/text-utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text = '' } = body;

    const stats = computeTextStats(text);

    // Calculate top 10 most frequent words
    const words = text.toLowerCase().match(/\b[a-z0-9'-]+\b/g) || [];
    const freqMap: Record<string, number> = {};
    for (const w of words) {
      if (w.length > 2) {
        freqMap[w] = (freqMap[w] || 0) + 1;
      }
    }
    const topKeywords = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    return NextResponse.json({
      success: true,
      stats,
      topKeywords,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Analysis failed', details: String(error) },
      { status: 500 }
    );
  }
}