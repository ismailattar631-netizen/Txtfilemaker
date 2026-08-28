export function WebAppJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TxtCraft Pro',
    url: 'https://txtcraft.site',
    description: 'Professional online plain text file maker, editor, batch generator, and converter with character encoding options and line ending controls.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Interactive online plain text editor with live metrics',
      'Batch TXT file generator with custom variables and ZIP export',
      'Encoding conversion (UTF-8, UTF-8 BOM, UTF-16LE, Windows-1252, ASCII)',
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
      name: 'TxtCraft Pro',
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