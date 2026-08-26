export interface FaqItem {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  content: string;
  faqs: FaqItem[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'complete-guide-to-txt-files',
    title: 'The Complete Guide to Plain Text (.txt) Files: Architecture, Encodings, and Best Practices',
    excerpt: 'Explore why plain text remains the bedrock of computing, how text files work under the hood, and how to optimize them for data pipelines, scripts, and software documentation.',
    category: 'Fundamentals',
    readTime: '8 min read',
    publishDate: '2026-08-20',
    author: {
      name: 'Dr. Evelyn Reed',
      role: 'Principal Systems Architect',
    },
    tags: ['text-files', 'encodings', 'unicode', 'data-formats', 'standards'],
    faqs: [
      {
        question: 'What is a plain text file (.txt)?',
        answer: 'A plain text file is a computer file that contains only textual characters and control codes (like line breaks or tabs) without any embedded formatting, styling, fonts, or binary markup. It can be read by virtually any computing device or programming language.',
      },
      {
        question: 'Why should I use .txt instead of .docx or .pdf for documentation?',
        answer: 'Plain text files are lightweight, 100% human-readable, machine-parsable, version-control friendly with Git, and immune to format obsolescence. A text file created in 1970 is still readable on modern devices today.',
      },
      {
        question: 'What is the maximum file size for a .txt file?',
        answer: 'There is no theoretical limit to the size of a plain text file beyond the storage filesystem limits (e.g., Exabytes on NTFS/ext4). However, standard text editors like Notepad may struggle with files larger than a few gigabytes without streaming memory buffering.',
      },
    ],
    content: "### Introduction: The Enduring Power of Plain Text\n\nIn an era dominated by complex binary formats, cloud documents, and rich graphical files, the humble plain text file (.txt) remains the most resilient, universal, and essential standard in computer engineering. From configuration files and source code to system logs and legal disclosures, plain text is the lingua franca of digital systems.\n\nThis guide delves into the structural architecture of .txt files, how byte representations map to human glyphs, and the core rules for constructing bulletproof text files.\n\n---\n\n### The Fundamental Anatomy of a Text File\n\nAt its most fundamental layer, a text file is simply a continuous sequence of 8-bit bytes stored on a non-volatile medium. Unlike rich document formats like Microsoft Word (.docx) or Adobe PDF, a plain text file contains:\n\n1. **No Binary Headers:** There are no proprietary file signatures (except optional Unicode Byte Order Marks).\n2. **No Font or Styling Metadata:** Color, font family, italics, and layout margins do not exist in the raw file; rendering is entirely delegated to the viewing application.\n3. **Control Characters:** Structural layout is achieved purely through standardized ASCII/Unicode control characters: Line Feed (0x0A), Carriage Return (0x0D), Tab (0x09).\n\n---\n\n### Character Encodings: From ASCII to UTF-8\n\nA character encoding defines the lookup dictionary between binary bytes and human characters.\n\n1. **ASCII (1963):** 7 bits per character, supporting 128 unique symbols (English letters, numbers, and basic punctuation).\n2. **Extended ANSI / Windows-1252:** Uses 8 bits (256 characters) to support Western European accents and currency symbols.\n3. **Unicode (UTF-8):** The undisputed global standard today. UTF-8 is a variable-width encoding (1 to 4 bytes per character) backward compatible with ASCII that can encode over 149,000 characters spanning all world languages, technical symbols, and emojis.\n\n---\n\n### Best Practices for Creating Professional .txt Files\n\n1. **Always Default to UTF-8:** Unless dealing with specialized legacy mainframes, encode all modern text files in UTF-8 without BOM.\n2. **Respect the Monospace Grid:** When formatting text tables or ASCII headers, assume the reader is using a monospace font with an 80-character column limit for terminal readability.\n3. **Include a Consistent Line Ending:** Maintain either CRLF or LF across the entire document; never mix line terminators within the same file.\n4. **End Files with a Final Newline:** Many POSIX utilities (such as cat, grep, and wc) expect the final line of a text file to terminate with a newline character.",
  },
  {
    slug: 'crlf-vs-lf-line-endings',
    title: 'CRLF vs LF: Understanding Line Endings Across Windows, macOS, and Linux',
    excerpt: 'Demystifying the Carriage Return and Line Feed controversy. Learn how line terminators work, why git issues occur, and how to normalize text files across cross-platform environments.',
    category: 'DevOps & Systems',
    readTime: '6 min read',
    publishDate: '2026-08-21',
    author: {
      name: 'Marcus Brody',
      role: 'Lead Infrastructure Engineer',
    },
    tags: ['crlf', 'lf', 'line-endings', 'git', 'windows', 'linux'],
    faqs: [
      {
        question: 'What is the difference between CRLF and LF?',
        answer: 'CRLF stands for Carriage Return (\\r, ASCII 13) followed by Line Feed (\\n, ASCII 10), used primarily by Windows. LF is just Line Feed (\\n), used by Linux, macOS, and Unix-like operating systems.',
      },
      {
        question: 'Why does Git warn about "CRLF will be replaced by LF"?',
        answer: 'This warning occurs when core.autocrlf is enabled in Git. Git standardizes line endings to LF inside the repository while converting to CRLF when checked out on Windows to prevent cross-platform merge conflicts.',
      },
      {
        question: 'What happens if a bash script has CRLF line endings on Linux?',
        answer: 'Linux treats the \\r character as part of the command or path name, leading to errors like "/bin/bash^M: bad interpreter: No such file or directory". Converting to LF fixes the problem immediately.',
      },
    ],
    content: "### The Mechanical Origins of Line Endings\n\nThe discrepancy between operating system line endings dates back to electro-mechanical teleprinters and typewriters in the mid-20th century:\n\n- **Carriage Return (CR, 0x0D):** Mechanically rolled the typewriter carriage back to the extreme left margin without advancing the paper down.\n- **Line Feed (LF, 0x0A):** Rotated the typewriter platen roller to advance the paper one line downwards without moving the carriage.\n\nBecause physical typewriters required a brief millisecond delay to roll the heavy metal carriage back to the left, two separate signals were transmitted: CR followed by LF.\n\n---\n\n### Modern Operating System Standards\n\n1. **Windows OS (CRLF - \\r\\n):** Microsoft MS-DOS and Windows preserved the two-byte CRLF convention for compatibility with CP/M teleprinters.\n2. **Unix & Linux (LF - \\n):** Bell Labs engineers designed Unix to be lean and memory-efficient, standardizing on a single byte (LF) for end-of-line.\n3. **macOS (LF - \\n):** Apple Mac OS 9 and earlier used CR. When Apple transitioned to Darwin / BSD Unix in Mac OS X, macOS adopted standard LF.\n\n---\n\n### How to Convert Between CRLF and LF\n\nUsing **TxtCraft Pro**:\n1. Open the TxtCraft Editor or Line Tools.\n2. Use the Line Endings selector in the bottom status bar to toggle between CRLF (Windows) and LF (Unix/macOS).\n3. Download your normalized file with a single click.",
  },
  {
    slug: 'character-encodings-utf8-utf16-ascii',
    title: 'Character Encodings Explained: UTF-8, UTF-16, ASCII, and Windows-1252',
    excerpt: 'A comprehensive technical breakdown of character sets, Byte Order Marks (BOM), Unicode code points, and how to avoid mojibake text corruption.',
    category: 'Architecture',
    readTime: '10 min read',
    publishDate: '2026-08-22',
    author: {
      name: 'Dr. Evelyn Reed',
      role: 'Principal Systems Architect',
    },
    tags: ['encoding', 'utf-8', 'utf-16', 'ascii', 'mojibake', 'bom'],
    faqs: [
      {
        question: 'What is a Byte Order Mark (BOM)?',
        answer: 'A BOM is a special sequence of bytes at the very beginning of a text file (such as EF BB BF for UTF-8 or FF FE for UTF-16LE) that signals the character encoding and endianness to the software reading the file.',
      },
      {
        question: 'What is Mojibake and how do I fix it?',
        answer: 'Mojibake refers to corrupted or scrambled text (like Ã© instead of é) caused when a text file written in one encoding is decoded using a different encoding. Converting the file back to UTF-8 resolves it.',
      },
    ],
    content: "### What is Character Encoding?\n\nComputers do not store letters, emojis, or hieroglyphs; they only store binary zeros and ones (0 and 1). A character encoding is a standardized key table that translates integer numbers (known as Code Points) into sequences of bytes.\n\n---\n\n### The Evolution of Character Sets\n\n#### 1. ASCII (1963)\n- 7 bits per character (Range: 0x00 to 0x7F).\n- Total 128 characters.\n- Sufficient only for American English.\n\n#### 2. Windows-1252 / ANSI\n- 8 bits per character (Range: 0x00 to 0xFF).\n- Included accented vowels (é, à, ü) and typographical symbols (£, €, ©).\n- Flaw: Incompatible with Cyrillic, Greek, Arabic, and Asian scripts.\n\n#### 3. Unicode & UTF-8 (1993 - Present)\n- Universal character repertoire exceeding 1,114,112 code point slots.\n- **UTF-8:** Variable length from 1 to 4 bytes.\n  - ASCII characters (A-Z) = 1 byte.\n  - Greek, Arabic, Latin Extended = 2 bytes.\n  - CJK (Chinese, Japanese, Korean) = 3 bytes.\n  - Emojis and historical scripts = 4 bytes.\n- Over 98% of the modern internet is powered by UTF-8.",
  },
  {
    slug: 'batch-txt-generation-workflows',
    title: 'How to Generate TXT Files in Batch for Testing, Automation, and Data Workflows',
    excerpt: 'Master automated plain-text file creation. Discover how to generate hundreds of templated text files with dynamic variables, sequence numbers, and zip packaging.',
    category: 'Automation',
    readTime: '7 min read',
    publishDate: '2026-08-23',
    author: {
      name: 'Sam Patel',
      role: 'Automation & QA Engineer',
    },
    tags: ['batch-generator', 'automation', 'testing', 'devops', 'zip'],
    faqs: [
      {
        question: 'How do batch text generators work?',
        answer: 'Batch text generators take a template with placeholder tokens (such as {id}, {name}, {date}) and inject dataset rows or sequential numbers to output multiple distinct text files compiled into a single downloadable .zip archive.',
      },
      {
        question: 'What are typical use cases for batch txt files?',
        answer: 'Common use cases include mock data generation for load testing, bulk invoice/receipt generation, machine learning training text preparation, and IoT device configuration provisioning.',
      },
    ],
    content: "### Why Batch Plain Text Generation is Essential\n\nIn modern software development, QA testing, and systems administration, creating individual configuration files or synthetic test fixtures by hand is inefficient and error-prone.\n\nBatch text generation empowers engineers to:\n1. **Stress-test File Parsers:** Validate that your software can ingest 10,000 distinct log files without memory leaks.\n2. **Provision IoT and Microservices:** Generate unique credentials and configuration files per device node.\n3. **Prepare Synthetic NLP Datasets:** Produce randomized prompt datasets for language model training.\n\n---\n\n### Step-by-Step Guide: Using TxtCraft Pro Batch Generator\n\n1. Navigate to the Batch TXT Generator tool.\n2. Set the Filename Pattern, e.g. client_record_{id}.txt.\n3. Write your dynamic template with {id}, {name}, and {timestamp}.\n4. Configure variable ranges (e.g., Sequence from 1 to 100) or paste a CSV table of data.\n5. Click Generate & Download ZIP Archive.",
  },
  {
    slug: 'mastering-plain-text-formatting',
    title: 'Mastering Plain Text Formatting: Clean Data Pipelines, Regular Expressions, and Parsing',
    excerpt: 'Advanced techniques for sorting, deduplicating, transforming cases, and sanitizing text data without needing heavy desktop software.',
    category: 'Data Science',
    readTime: '9 min read',
    publishDate: '2026-08-24',
    author: {
      name: 'Lisa Vance',
      role: 'Data Pipeline Specialist',
    },
    tags: ['regex', 'text-processing', 'data-cleaning', 'sanitization'],
    faqs: [
      {
        question: 'What is the fastest way to remove duplicate lines from a text file?',
        answer: 'You can use the TxtCraft Line Tools page to instantly deduplicate lines with case-sensitive or case-insensitive matching in the browser with zero server latency.',
      },
    ],
    content: "### The Challenge of Dirty Plain Text\n\nData pipelines ingest unstructured text from diverse sources: web scrapers, database exports, legacy terminals, and user submissions. Common anomalies include:\n- Mixed uppercase/lowercase inconsistencies\n- Stray HTML tags and Markdown glyphs\n- Duplicate records\n- Inconsistent spacing and trailing tabs\n\n---\n\n### Key Text Transformation Strategies\n\n#### 1. Case Normalization\nConverting identifier fields to snake_case or kebab-case ensures cross-database indexing consistency.\n\n#### 2. Regex Cleaning\nUsing regular expression replacements to strip HTML tags, remove empty blank lines, and normalize whitespace.\n\n#### 3. Line-by-Line Operations\nAlphabetical sorting (A-Z / Z-A) and line numbering formatted for legal citations and log references.",
  },
  {
    slug: 'anatomy-of-robots-and-security-txt',
    title: 'The Anatomy of a Perfect robots.txt and security.txt File for Modern Webmasters',
    excerpt: 'Everything you need to know about search engine crawler governance and RFC 9116 security vulnerability reporting.',
    category: 'SEO & Security',
    readTime: '8 min read',
    publishDate: '2026-08-25',
    author: {
      name: 'Marcus Brody',
      role: 'Lead Infrastructure Engineer',
    },
    tags: ['seo', 'robots-txt', 'security-txt', 'rfc9116', 'googlebot'],
    faqs: [
      {
        question: 'Where should robots.txt and security.txt be hosted?',
        answer: 'robots.txt must be placed at the exact root of your domain (https://example.com/robots.txt). security.txt should be located at https://example.com/.well-known/security.txt (RFC 9116 standard) with an optional fallback at /security.txt.',
      },
      {
        question: 'Does robots.txt protect confidential data from public view?',
        answer: 'No! robots.txt is a voluntary advisory protocol for polite search engine bots. It does not secure or restrict web browser access. Never list sensitive hidden URLs in robots.txt as malicious bots can inspect it.',
      },
    ],
    content: "### The Critical Role of Root Protocol Files\n\nWeb servers rely on specialized plain text files placed in the root directory to communicate machine-readable policies with automated crawlers, search engines, and security researchers.\n\n---\n\n### Anatomy of robots.txt\n\nUser-agent: *\nDisallow: /private/\nDisallow: /admin/\nAllow: /public/\n\nUser-agent: Googlebot\nDisallow: /temp/\n\nSitemap: https://www.example.com/sitemap.xml\n\n#### Essential Directives:\n- **User-agent:** Specifies which bot the rule applies to (* = all bots).\n- **Disallow:** Paths search engines must not crawl.\n- **Allow:** Explicitly permits crawling of sub-directories within a disallowed parent.\n- **Sitemap:** Tells search engines where to find your XML sitemap.\n\n---\n\n### The RFC 9116 Standard: security.txt\n\nContact: mailto:security@example.com\nExpires: 2027-12-31T23:59:59.000Z\nCanonical: https://example.com/.well-known/security.txt\nPolicy: https://example.com/disclosure-policy.html\n\nThe security.txt file provides ethical security researchers an immediate, unambiguous channel to disclose potential security vulnerabilities before public exposure.",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
