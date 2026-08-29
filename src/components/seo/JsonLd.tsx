export function WebAppJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TxtCraft - TXT File Maker & Online Notepad',
    url: 'https://txtcraft.site',
    description: 'Free online TXT file maker, editor, and notepad. Create, format, and download plain text (.txt) files in your browser with multi-encoding and line-ending controls.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Interactive online plain text editor with live telemetry',
      'Instant .txt file creator and downloader',
      'Batch TXT file generator with custom variables and ZIP export',
      'Multi-encoding support (UTF-8, UTF-8 BOM, UTF-16LE, Windows-1252, ASCII)',
      'Line endings conversion (CRLF for Windows, LF for Unix/macOS)',
      'Case converter and string sanitizer',
      'Line manipulation and deduplication tools',
      'Curated library of 25+ plain text templates',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HowToJsonLd({
  name = 'How to Create and Download a .TXT File Online',
  description = 'Step-by-step guide to writing text in an online notepad and downloading it as a plain text (.txt) file.',
  steps,
}: {
  name?: string;
  description?: string;
  steps?: { name: string; text: string }[];
}) {
  const defaultSteps = [
    {
      name: 'Write or paste your text',
      text: 'Type your plain text directly into the online notepad editor or paste existing content from your clipboard.',
    },
    {
      name: 'Choose file name, encoding & line endings',
      text: 'Set your preferred filename (e.g., document.txt), choose character encoding (UTF-8, UTF-16, ANSI), and select line endings (CRLF for Windows, LF for Linux/macOS).',
    },
    {
      name: 'Download your .TXT file',
      text: 'Click the Download button or press Ctrl+S to save your newly created .txt file directly to your device with 100% privacy.',
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    step: (steps || defaultSteps).map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  authorName: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TxtCraft',
      logo: {
        '@type': 'ImageObject',
        url: 'https://txtcraft.site/icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}