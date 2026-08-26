export interface TextTemplate {
  slug: string;
  title: string;
  category: 'developer' | 'webmaster' | 'legal' | 'productivity' | 'business';
  description: string;
  defaultFilename: string;
  recommendedEncoding: string;
  content: string;
  tags: string[];
}

export const TEMPLATES: TextTemplate[] = [
  {
    slug: 'readme-txt',
    title: 'Standard README.txt Project Documentation',
    category: 'developer',
    description: 'Clean, universal plain-text documentation template for open-source repositories and standalone software packages.',
    defaultFilename: 'README.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['readme', 'documentation', 'developer', 'github'],
    content: `========================================================================
PROJECT NAME: My Application / Tool
VERSION: 1.0.0
AUTHOR: Jane Doe <jane.doe@example.com>
WEBSITE: https://example.com
LICENSE: MIT License
========================================================================

1. OVERVIEW
------------------------------------------------------------------------
Briefly describe what this software or project accomplishes. Explain the
core problem it solves, its target audience, and main capabilities.

2. SYSTEM REQUIREMENTS
------------------------------------------------------------------------
- Operating System: Windows 10/11, macOS 12+, or Ubuntu 22.04+
- Runtime: Node.js 18.x or Python 3.10+
- Memory: Minimum 2GB RAM
- Storage: 100MB free disk space

3. QUICK START / INSTALLATION
------------------------------------------------------------------------
Step 1: Clone or extract the project archive
        git clone https://github.com/username/project.git
        cd project

Step 2: Install dependencies
        npm install (or pip install -r requirements.txt)

Step 3: Run the application
        npm start (or python main.py)

4. CONFIGURATION
------------------------------------------------------------------------
Copy the example configuration file and adjust your settings:
        cp config.example.json config.json

Key parameters:
- PORT: Port to bind the server on (default: 8080)
- API_KEY: Your external service authentication secret
- DEBUG_MODE: Set to true for verbose logging output

5. TROUBLESHOOTING & FAQ
------------------------------------------------------------------------
Q: I get "Permission Denied" when executing scripts.
A: Ensure file permissions are set: chmod +x ./scripts/*.sh

Q: How do I change the default storage path?
A: Edit the STORAGE_DIR variable inside config.json.

6. CONTRIBUTING & BUG REPORTS
------------------------------------------------------------------------
Please submit issues and pull requests to:
https://github.com/username/project/issues

7. CHANGELOG & UPDATES
------------------------------------------------------------------------
See CHANGELOG.txt for detailed version history and release notes.
========================================================================`,
  },
  {
    slug: 'robots-txt-standard',
    title: 'Standard Webmaster robots.txt Template',
    category: 'webmaster',
    description: 'Universal crawler control file following the Robots Exclusion Standard to guide Googlebot, Bingbot, and protect private routes.',
    defaultFilename: 'robots.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['seo', 'robots', 'webmaster', 'googlebot', 'crawlers'],
    content: `# ====================================================================
# Robots Exclusion Protocol (robots.txt)
# Website: https://www.example.com
# Generated: 2026-08-26
# ====================================================================

# Rule 1: Allow all reputable search engines full access to public pages
User-agent: *
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/private/
Disallow: /checkout/
Disallow: /cart/
Disallow: /account/
Disallow: /search?*
Disallow: /*.json$
Disallow: /*.xml$
Allow: /sitemap.xml
Allow: /assets/
Allow: /static/

# Rule 2: Explicit instructions for Googlebot
User-agent: Googlebot
Disallow: /admin/
Disallow: /temp/
Allow: /

# Rule 3: Explicit instructions for Bingbot
User-agent: Bingbot
Disallow: /admin/
Crawl-delay: 1

# Rule 4: Block aggressive AI scrapers (Optional)
User-agent: GPTBot
Disallow: /private-docs/

User-agent: CCBot
Disallow: /private-docs/

# XML Sitemap Location (Crucial for SEO discovery)
Sitemap: https://www.example.com/sitemap.xml
Sitemap: https://www.example.com/sitemap-articles.xml`,
  },
  {
    slug: 'security-txt',
    title: 'Vulnerability Disclosure Policy (security.txt)',
    category: 'webmaster',
    description: 'RFC 9116 compliant security.txt template to allow ethical security researchers to report vulnerabilities responsibly.',
    defaultFilename: 'security.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['security', 'rfc9116', 'webmaster', 'compliance'],
    content: `# RFC 9116 Security Disclosure Contact File
# Place in /.well-known/security.txt or /security.txt

Contact: mailto:security@example.com
Contact: https://example.com/security/report
Expires: 2027-12-31T23:59:59.000Z
Encryption: https://example.com/pgp-key.txt
Preferred-Languages: en, es, fr
Canonical: https://example.com/.well-known/security.txt
Policy: https://example.com/security-policy.html
Hiring: https://example.com/careers/security
Acknowledgments: https://example.com/security/hall-of-fame`,
  },
  {
    slug: 'humans-txt',
    title: 'humans.txt (The People Behind the Website)',
    category: 'webmaster',
    description: 'Standard plain text file honoring the developers, designers, copywriters, and technology stack behind a digital product.',
    defaultFilename: 'humans.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['humans', 'credits', 'webmaster', 'team'],
    content: `/* TEAM */
  Lead Architect: Alex Rivera
  Contact: alex [at] example.com
  Twitter: @alexrivera
  From: San Francisco, CA, USA

  UI/UX Designer: Sarah Jenkins
  Portfolio: https://sarahj.design
  From: London, UK

  Content Strategist: Michael Chen
  From: Toronto, Canada

/* THANKS */
  Open Source Community
  Tailwind CSS & Next.js Core Teams
  All early beta testers and contributors

/* SITE */
  Last update: 2026/08/26
  Language: English
  Doctype: HTML5
  IDE: VS Code, Antigravity
  Standards: HTML5, CSS3, ES2024, TypeScript`,
  },
  {
    slug: 'mit-license',
    title: 'MIT Open Source License (LICENSE.txt)',
    category: 'legal',
    description: 'The standard, permissive, and universally recognized MIT software license.',
    defaultFilename: 'LICENSE.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['license', 'mit', 'legal', 'open-source'],
    content: `MIT License

Copyright (c) 2026 [Full Name or Organization]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
  },
  {
    slug: 'apache-license',
    title: 'Apache License 2.0 (LICENSE.txt)',
    category: 'legal',
    description: 'Comprehensive open-source license providing explicit grants of patent rights and trademark protections.',
    defaultFilename: 'LICENSE.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['license', 'apache', 'legal', 'patents'],
    content: `                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.
      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      patent license to make, have made, use, offer to sell, sell, import,
      and otherwise transfer the Work.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, provided that You give any other recipients of the
      Work a copy of this License.`,
  },
  {
    slug: 'changelog-standard',
    title: 'Changelog Standard (CHANGELOG.txt)',
    category: 'developer',
    description: 'Clean plaintext changelog formatted according to Keep a Changelog and Semantic Versioning specifications.',
    defaultFilename: 'CHANGELOG.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['changelog', 'semver', 'release-notes', 'developer'],
    content: `CHANGELOG
=========
All notable changes to this project will be documented in this file.
The format is based on Keep a Changelog (https://keepachangelog.com/en/1.0.0/)
and this project adheres to Semantic Versioning (https://semver.org/).

[Unreleased]
------------------------------------------------------------------------
Added:
- Real-time collaborative text editing support
- Direct cloud backup integration with WebDAV

[1.2.0] - 2026-08-20
------------------------------------------------------------------------
Added:
- Support for UTF-16LE and Windows-1252 character encodings
- Regex-powered Find & Replace modal with match preview
- Batch TXT generation pipeline with customizable template placeholders

Changed:
- Optimized line deduplication algorithm for large files (>10MB)
- Updated UI styling with accessible high-contrast dark theme

Fixed:
- Resolved CRLF carriage return strip bug when saving on Windows
- Fixed memory spike during simultaneous multi-file exports

[1.1.0] - 2026-07-15
------------------------------------------------------------------------
Added:
- Flesch-Kincaid readability scoring meter
- Word, sentence, and paragraph telemetry

[1.0.0] - 2026-06-01
------------------------------------------------------------------------
Initial Public Release of the Plain Text Studio.`,
  },
  {
    slug: 'todo-txt-format',
    title: 'Productivity Task List (todo.txt)',
    category: 'productivity',
    description: 'Formatted according to Gina Trapani’s todo.txt CLI standard with project tags (+), context tags (@), and priorities (A-Z).',
    defaultFilename: 'todo.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['todo', 'productivity', 'tasks', 'gtd'],
    content: `(A) Finalize quarterly software release notes +Release2026 @work
(A) Deploy new SSL certificate to production server +DevOps @cloud
(B) Review pull request #402 for performance regressions +Backend @review
(B) Draft technical blog article on text encoding standards +Content @writing
(C) Schedule weekly sync meeting with frontend engineers +Management @calendar
(C) Backup database cluster to offsite cold storage +SysAdmin @maintenance
x 2026-08-25 2026-08-20 Fix bug with newline parsing in CSV import +TxtMaker @code
x 2026-08-24 2026-08-18 Audit open-source dependencies for security CVEs +Security @audit`,
  },
  {
    slug: 'meeting-notes',
    title: 'Executive Meeting Notes & Action Items',
    category: 'business',
    description: 'Structured corporate meeting minutes template with attendance, agenda topics, key decisions, and assigned action items.',
    defaultFilename: 'meeting-notes.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['business', 'meeting', 'notes', 'agile'],
    content: `========================================================================
MEETING MINUTES: PRODUCT ARCHITECTURE & ROADMAP Q3
DATE: August 26, 2026 | TIME: 10:00 AM - 11:30 AM EST
LOCATION: Conference Room B / Zoom Room #882-991
CHAIRPERSON: David Kim | SCRIBE: Lisa Vance
========================================================================

1. ATTENDEES
------------------------------------------------------------------------
Present: David Kim, Lisa Vance, Marcus Brody, Elena Rostova, Sam Patel
Apologies: Claire Bennett (Annual Leave)

2. AGENDA TOPICS
------------------------------------------------------------------------
1. Review of Q2 Infrastructure Migration Milestones
2. Performance Bottlenecks in Batch File Generation Pipeline
3. Security Compliance Audit Requirements for RFC 9116
4. Open Discussion & Task Assignments

3. KEY DISCUSSIONS & DECISIONS
------------------------------------------------------------------------
- Topic 1: Marcus confirmed that 100% of services have migrated to modern
  stateless containers with zero observed downtime.
- Topic 2: Elena demonstrated that client-side Web Workers reduce CPU load
  on the backend API by 78% for text files under 25MB.
  DECISION: Adopt client-side stream generation for files < 50MB.
- Topic 3: Sam presented draft security.txt and PGP key rotation strategy.
  DECISION: Deploy security.txt to /.well-known/ before end of week.

4. ACTION ITEMS
------------------------------------------------------------------------
[ ] Elena Rostova  : Benchmark JSZip streaming worker on mobile browsers (Due: Aug 29)
[ ] Sam Patel      : Publish signed PGP key to keyserver (Due: Aug 28)
[ ] Marcus Brody   : Configure CDN cache headers for static text assets (Due: Sep 01)
[ ] Lisa Vance     : Distribute finalized roadmap document to stakeholders (Due: Aug 27)

5. NEXT MEETING
------------------------------------------------------------------------
Date: September 2, 2026 | 10:00 AM EST
Focus: Sprint 44 Demo & Release Readiness Review
========================================================================`,
  },
  {
    slug: 'ascii-art-borders',
    title: 'ASCII Art Headers, Dividers & Box Borders',
    category: 'productivity',
    description: 'Collection of retro ASCII banners, ornate line dividers, double-line boxes, and comment decorations.',
    defaultFilename: 'ascii-borders.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['ascii', 'borders', 'retro', 'formatting'],
    content: `########################################################################
#                          TXT CRAFT PRO STUDIO                        #
#              Universal Plain Text Generator & Processor             #
########################################################################

╔══════════════════════════════════════════════════════════════════════╗
║                        DOUBLE-LINE BOX HEADER                        ║
║           Use for prominent sections, titles, and warnings           ║
╚══════════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────────────┐
│                        SINGLE-LINE BOX FRAME                         │
│           Ideal for documentation sidebars and notes                 │
└──────────────────────────────────────────────────────────────────────┘

+----------------------------------------------------------------------+
|                         COMPATIBILITY ASCII BOX                      |
|           Works flawlessly across all legacy 7-bit terminals         |
+----------------------------------------------------------------------+

/* ====================================================================
 * SECTION DIVIDER: DATABASE CONNECTION CONFIGURATION
 * ==================================================================== */

//////////////////////////////////////////////////////////////////////////
// LOGICAL STEP 01: INITIALIZE STREAMS
//////////////////////////////////////////////////////////////////////////

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
........................................................................
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *`,
  },
  {
    slug: 'csv-plain-table',
    title: 'Plain Text ASCII Data Table & Metrics',
    category: 'business',
    description: 'Monospace aligned data table template with column separators for terminal reports, logs, and system summaries.',
    defaultFilename: 'data-table.txt',
    recommendedEncoding: 'UTF-8',
    tags: ['table', 'ascii-table', 'data', 'metrics'],
    content: `+-----+----------------------+---------------+------------+------------+
| ID  | SERVER / NODE NAME   | REGION        | CPU USAGE  | STATUS     |
+-----+----------------------+---------------+------------+------------+
| 001 | prod-api-cluster-01  | us-east-1     |     24.5%  | ACTIVE     |
| 002 | prod-api-cluster-02  | us-west-2     |     18.2%  | ACTIVE     |
| 003 | prod-db-primary      | us-east-1     |     62.1%  | OPTIMAL    |
| 004 | prod-db-replica-01   | eu-central-1  |     41.0%  | OPTIMAL    |
| 005 | cache-redis-node-a   | us-east-1     |     09.8%  | IDLE       |
| 006 | worker-queue-batch   | us-east-1     |     88.4%  | HIGH LOAD  |
+-----+----------------------+---------------+------------+------------+
| TOTAL NODES: 6             | AVERAGE CPU: 40.67%        | HEALTH: OK |
+-----+----------------------+---------------+------------+------------+`,
  },
  {
    slug: 'gitignore-standard',
    title: 'Universal Git Ignore Template (.gitignore)',
    category: 'developer',
    description: 'Comprehensive ignore rule list for Node.js, Python, OS metadata files, logs, and environment secrets.',
    defaultFilename: '.gitignore',
    recommendedEncoding: 'UTF-8',
    tags: ['git', 'gitignore', 'developer', 'config'],
    content: `# Dependencies
node_modules/
jspm_packages/
__pycache__/
*.py[cod]
.venv/
env/

# Production Builds
.next/
out/
build/
dist/

# Logs and Debugging
logs/
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# Environment Secrets
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
*.pem
*.key

# Operating System Files
.DS_Store
Thumbs.db
Desktop.ini
.idea/
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json`,
  },
];

export function getTemplateBySlug(slug: string): TextTemplate | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}