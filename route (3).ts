import { NextResponse } from 'next/server';
import { TEMPLATES } from '@/lib/templates-data';

export async function GET() {
  return NextResponse.json({
    total: TEMPLATES.length,
    templates: TEMPLATES.map((t) => ({
      slug: t.slug,
      title: t.title,
      category: t.category,
      description: t.description,
      defaultFilename: t.defaultFilename,
      recommendedEncoding: t.recommendedEncoding,
      tags: t.tags,
    })),
  });
}