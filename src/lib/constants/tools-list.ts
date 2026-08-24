export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolMetadata {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'JSON' | 'Encoding' | 'Identifiers & Time' | 'Security & Web' | 'Developer Utilities';
  icon: string;
  keywords: string[];
  relatedSlugs: string[];
  nextToolSlugs?: string[];
  faqs: ToolFaq[];
  sampleInput: string;
  invalidSampleInput?: string;
  isPopular?: boolean;
}

export const TOOLS_LIST: ToolMetadata[] = [
  // --- JSON Category ---
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    title: 'JSON Formatter',
    shortDescription: 'Format and beautify unformatted or minified JSON with customizable indentation.',
    fullDescription: 'Fast, secure online JSON Formatter and beautifier. Indent JSON strings with custom spaces or tabs 100% in your browser.',
    category: 'JSON',
    icon: 'FileCode',
    isPopular: true,
    keywords: ['json formatter', 'json beautifier', 'format json', 'pretty print json', 'json indent'],
    relatedSlugs: ['json-validator', 'json-minifier', 'json-viewer', 'json-to-yaml', 'json-to-csv'],
    nextToolSlugs: ['json-validator', 'json-minifier', 'json-to-yaml'],
    faqs: [
      {
        question: 'Is my JSON data sent to any server?',
        answer: 'No. All JSON formatting happens entirely inside your browser using standard JavaScript APIs.',
      },
      {
        question: 'What indentation options are supported?',
        answer: 'You can choose between 2 spaces, 4 spaces, or tab indentation.',
      },
    ],
    sampleInput: '{"name":"FastDevTools","features":["fast","secure","no signup"],"stats":{"users":10000,"online":true}}',
    invalidSampleInput: '{\n  "title": "Developer Micro-Tools",\n  "status": "active",\n  "count": 21,\n}',
  },
  {
    id: 'json-validator',
    slug: 'json-validator',
    title: 'JSON Validator',
    shortDescription: 'Validate JSON syntax and locate line and column syntax errors.',
    fullDescription: 'Check JSON syntax validity with immediate line and column error indicators.',
    category: 'JSON',
    icon: 'CheckCircle2',
    isPopular: true,
    keywords: ['json validator', 'json lint', 'check json', 'json syntax error', 'json parser'],
    relatedSlugs: ['json-formatter', 'json-minifier', 'json-viewer'],
    nextToolSlugs: ['json-formatter', 'json-minifier', 'json-viewer'],
    faqs: [
      {
        question: 'How does error location work?',
        answer: 'When JSON parsing fails, the validator analyzes the error trace and computes approximate line and column numbers.',
      },
    ],
    sampleInput: '{\n  "title": "Developer Micro-Tools",\n  "status": "active",\n  "count": 21\n}',
    invalidSampleInput: '{\n  "title": "Developer Micro-Tools",\n  "status": "active",\n  "count": 21,\n}',
  },
  {
    id: 'json-minifier',
    slug: 'json-minifier',
    title: 'JSON Minifier',
    shortDescription: 'Compress and minify JSON files by removing unnecessary whitespace.',
    fullDescription: 'Safely compress JSON data into a single dense line for storage or network transmission.',
    category: 'JSON',
    icon: 'Minimize2',
    keywords: ['json minifier', 'compress json', 'minify json', 'json compact'],
    relatedSlugs: ['json-formatter', 'json-validator', 'json-viewer'],
    nextToolSlugs: ['json-formatter', 'json-to-yaml'],
    faqs: [
      {
        question: 'Will minifying JSON alter my data?',
        answer: 'No. The minifier parses JSON into an object and stringifies it without whitespace.',
      },
    ],
    sampleInput: '{\n  "app": "MicroTools",\n  "enabled": true,\n  "version": 1\n}',
  },
  {
    id: 'json-viewer',
    slug: 'json-viewer',
    title: 'JSON Viewer',
    shortDescription: 'Interactive tree viewer to explore nested JSON objects.',
    fullDescription: 'Visualize complex nested JSON structures in an interactive tree view with expand and collapse controls.',
    category: 'JSON',
    icon: 'FolderTree',
    keywords: ['json viewer', 'json tree', 'json inspect', 'explore json', 'json structure'],
    relatedSlugs: ['json-formatter', 'json-validator', 'json-to-yaml'],
    nextToolSlugs: ['json-formatter', 'json-to-yaml'],
    faqs: [
      {
        question: 'Can I expand or collapse nodes?',
        answer: 'Yes, the tree view includes click-to-expand and global Expand/Collapse All buttons.',
      },
    ],
    sampleInput: '{"project":{"name":"Fast Tools","config":{"debug":false,"tags":["dev","prod"]},"modules":[{"id":1,"type":"utility"}]}}',
  },
  {
    id: 'json-to-yaml',
    slug: 'json-to-yaml',
    title: 'JSON to YAML',
    shortDescription: 'Convert JSON objects and arrays into clean YAML configurations.',
    fullDescription: 'Convert JSON data structures directly into human-readable YAML for Kubernetes or Docker Compose.',
    category: 'JSON',
    icon: 'FileSpreadsheet',
    keywords: ['json to yaml', 'convert json yaml', 'json2yaml', 'yaml generator'],
    relatedSlugs: ['yaml-to-json', 'json-formatter', 'json-to-csv'],
    nextToolSlugs: ['yaml-to-json', 'json-formatter'],
    faqs: [
      {
        question: 'Does this handle arrays and objects?',
        answer: 'Yes, all valid JSON data types are accurately mapped to YAML equivalents.',
      },
    ],
    sampleInput: '{"service":"api-gateway","port":8080,"routes":["/health","/v1/tools"],"database":{"host":"localhost","port":5432}}',
  },
  {
    id: 'yaml-to-json',
    slug: 'yaml-to-json',
    title: 'YAML to JSON',
    shortDescription: 'Convert YAML configuration files into valid, formatted JSON.',
    fullDescription: 'Parse YAML configurations into valid JSON strings for API consumption.',
    category: 'JSON',
    icon: 'FileJson',
    keywords: ['yaml to json', 'convert yaml json', 'yaml2json', 'parse yaml'],
    relatedSlugs: ['json-to-yaml', 'json-formatter', 'json-validator'],
    nextToolSlugs: ['json-to-yaml', 'json-formatter'],
    faqs: [
      {
        question: 'Is YAML code executed during parsing?',
        answer: 'Never. The parser uses strict data parsing without safe-eval tags.',
      },
    ],
    sampleInput: 'service: api-gateway\nport: 8080\nroutes:\n  - /health\n  - /v1/tools\ndatabase:\n  host: localhost\n  port: 5432',
  },
  {
    id: 'json-to-csv',
    slug: 'json-to-csv',
    title: 'JSON to CSV',
    shortDescription: 'Convert JSON arrays or objects into downloadable RFC 4180 CSV files.',
    fullDescription: 'Transform JSON datasets into CSV format for Excel, Google Sheets, or data analysis.',
    category: 'JSON',
    icon: 'Table',
    keywords: ['json to csv', 'json2csv', 'json csv converter', 'export json excel'],
    relatedSlugs: ['json-to-yaml', 'json-formatter'],
    nextToolSlugs: ['json-formatter', 'json-to-yaml'],
    faqs: [
      {
        question: 'What JSON formats are accepted?',
        answer: 'An array of objects or a single object.',
      },
    ],
    sampleInput: '[{"id":1,"name":"Alice","role":"Engineer","location":"San Francisco"},{"id":2,"name":"Bob","role":"Designer","location":"New York"}]',
  },

  // --- Encoding Category ---
  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    title: 'Base64 Encoder',
    shortDescription: 'Encode plain text or UTF-8 Unicode strings into Base64.',
    fullDescription: 'Encode text strings to Base64 with full UTF-8 Unicode support.',
    category: 'Encoding',
    icon: 'Binary',
    isPopular: true,
    keywords: ['base64 encoder', 'encode base64', 'base64 text', 'utf8 base64'],
    relatedSlugs: ['base64-decoder', 'url-encoder', 'html-encoder'],
    nextToolSlugs: ['base64-decoder', 'url-encoder'],
    faqs: [
      {
        question: 'Does this support emojis and international text?',
        answer: 'Yes! It uses TextEncoder to convert UTF-8 characters into bytes before encoding.',
      },
    ],
    sampleInput: 'Hello World! 🚀 Fast Developer Tools',
  },
  {
    id: 'base64-decoder',
    slug: 'base64-decoder',
    title: 'Base64 Decoder',
    shortDescription: 'Decode Base64 encoded strings back into UTF-8 plain text.',
    fullDescription: 'Decode Base64 strings to readable UTF-8 text with strict error reporting.',
    category: 'Encoding',
    icon: 'Unlock',
    isPopular: true,
    keywords: ['base64 decoder', 'decode base64', 'base64 to text', 'utf8 decode base64'],
    relatedSlugs: ['base64-encoder', 'url-decoder', 'jwt-decoder'],
    nextToolSlugs: ['base64-encoder', 'jwt-decoder'],
    faqs: [
      {
        question: 'What happens if the input is invalid?',
        answer: 'The decoder will display a clear error message indicating invalid characters or malformed padding.',
      },
    ],
    sampleInput: 'SGVsbG8gV29ybGQhIPCZu4AgRmFzdCBEZXZlbG9wZXIgVG9vbHM=',
  },
  {
    id: 'url-encoder',
    slug: 'url-encoder',
    title: 'URL Encoder',
    shortDescription: 'Encode URLs or query string parameters to percent-encoded format.',
    fullDescription: 'Percent-encode URL components or full URL addresses for safe HTTP GET transmission.',
    category: 'Encoding',
    icon: 'Link',
    keywords: ['url encoder', 'percent encoding', 'encode uri', 'urlencode'],
    relatedSlugs: ['url-decoder', 'base64-encoder', 'html-encoder'],
    nextToolSlugs: ['url-decoder', 'base64-encoder'],
    faqs: [
      {
        question: 'What is the difference between Component and Full URL mode?',
        answer: 'Component mode encodes special characters like "?", "&", "=". Full mode preserves URL structure.',
      },
    ],
    sampleInput: 'https://example.com/search?query=hello world & developer tools!',
  },
  {
    id: 'url-decoder',
    slug: 'url-decoder',
    title: 'URL Decoder',
    shortDescription: 'Decode percent-encoded URL strings back into plain text.',
    fullDescription: 'Decode percent-encoded URL parameters and URLs back to human-readable strings.',
    category: 'Encoding',
    icon: 'Unlink',
    keywords: ['url decoder', 'urldecode', 'decode uri', 'percent decode'],
    relatedSlugs: ['url-encoder', 'base64-decoder', 'html-decoder'],
    nextToolSlugs: ['url-encoder', 'base64-decoder'],
    faqs: [
      {
        question: 'Does this handle malformed percent sequences?',
        answer: 'Yes, invalid percent sequences trigger readable error messages.',
      },
    ],
    sampleInput: 'https%3A%2F%2Fexample.com%2Fsearch%3Fquery%3Dhello%20world%20%26%20developer%20tools%21',
  },
  {
    id: 'html-encoder',
    slug: 'html-encoder',
    title: 'HTML Encoder',
    shortDescription: 'Convert HTML special characters into safe entity references.',
    fullDescription: 'Encode special HTML characters to entity equivalents (&amp;, &lt;, &gt;) to prevent XSS.',
    category: 'Encoding',
    icon: 'Code2',
    keywords: ['html encoder', 'escape html', 'html entity encoder', 'xss prevent html'],
    relatedSlugs: ['html-decoder', 'url-encoder', 'base64-encoder'],
    nextToolSlugs: ['html-decoder', 'url-encoder'],
    faqs: [
      {
        question: 'Why encode HTML characters?',
        answer: 'Encoding prevents browsers from interpreting input as live HTML or JavaScript markup.',
      },
    ],
    sampleInput: '<script>alert("XSS Attack!");</script>\n<div class="test">Body & Mind</div>',
  },
  {
    id: 'html-decoder',
    slug: 'html-decoder',
    title: 'HTML Decoder',
    shortDescription: 'Decode HTML entities back into plain text safely.',
    fullDescription: 'Safely convert HTML entities back to raw characters without executing scripts.',
    category: 'Encoding',
    icon: 'Code',
    keywords: ['html decoder', 'unescape html', 'html entity decoder'],
    relatedSlugs: ['html-encoder', 'url-decoder', 'base64-decoder'],
    nextToolSlugs: ['html-encoder', 'url-decoder'],
    faqs: [
      {
        question: 'Is HTML decoding safe from XSS?',
        answer: 'Yes. Output is rendered strictly as plain text nodes, never injected into innerHTML.',
      },
    ],
    sampleInput: '&lt;script&gt;alert(&quot;XSS Attack!&quot;);&lt;/script&gt;\n&lt;div class=&quot;test&quot;&gt;Body &amp; Mind&lt;/div&gt;',
  },

  // --- Identifiers & Time Category ---
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    title: 'UUID Generator',
    shortDescription: 'Generate random RFC 4122 v4 UUIDs individually or in bulk.',
    fullDescription: 'Generate cryptographically strong Version-4 Universally Unique Identifiers (UUIDs).',
    category: 'Identifiers & Time',
    icon: 'Fingerprint',
    isPopular: true,
    keywords: ['uuid generator', 'v4 uuid', 'guid generator', 'random uuid', 'bulk uuid'],
    relatedSlugs: ['uuid-validator', 'hash-generator', 'unix-timestamp'],
    nextToolSlugs: ['uuid-validator', 'unix-timestamp'],
    faqs: [
      {
        question: 'Are these UUIDs cryptographically secure?',
        answer: 'Yes, generated using Web Crypto API (`crypto.randomUUID()`).',
      },
    ],
    sampleInput: '',
  },
  {
    id: 'uuid-validator',
    slug: 'uuid-validator',
    title: 'UUID Validator',
    shortDescription: 'Validate UUID syntax and determine version and variant compliance.',
    fullDescription: 'Validate UUID format against RFC 4122 standards. Identifies UUID version (v1-v5) and hyphenless formats.',
    category: 'Identifiers & Time',
    icon: 'ShieldCheck',
    keywords: ['uuid validator', 'check uuid', 'uuid version detector', 'validate guid'],
    relatedSlugs: ['uuid-generator', 'unix-timestamp'],
    nextToolSlugs: ['uuid-generator', 'unix-timestamp'],
    faqs: [
      {
        question: 'Which UUID versions are detected?',
        answer: 'Versions 1 through 5, Nil UUID, and 32-character hexadecimal strings.',
      },
    ],
    sampleInput: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  },
  {
    id: 'unix-timestamp',
    slug: 'unix-timestamp',
    title: 'Unix Timestamp',
    shortDescription: 'Convert between Unix timestamps and ISO 8601 UTC / Local dates.',
    fullDescription: 'Convert Unix epoch timestamps to human-readable dates, UTC strings, ISO 8601, and relative time.',
    category: 'Identifiers & Time',
    icon: 'Clock',
    isPopular: true,
    keywords: ['unix timestamp', 'epoch converter', 'timestamp to date', 'date to timestamp'],
    relatedSlugs: ['cron-generator', 'uuid-generator'],
    nextToolSlugs: ['cron-generator', 'uuid-generator'],
    faqs: [
      {
        question: 'Does this handle seconds and milliseconds?',
        answer: 'Yes, the converter auto-detects whether the input is in seconds or milliseconds.',
      },
    ],
    sampleInput: '1700000000',
  },

  // --- Security & Web Category ---
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    title: 'JWT Decoder',
    shortDescription: 'Decode JSON Web Tokens to inspect Header, Payload claims, and expiration.',
    fullDescription: 'Decode JWT tokens locally in your browser. Inspect JOSE header parameters, payload claims, and token expiration state.',
    category: 'Security & Web',
    icon: 'KeyRound',
    isPopular: true,
    keywords: ['jwt decoder', 'decode jwt', 'parse jwt', 'jwt claims', 'jwt token viewer'],
    relatedSlugs: ['base64-decoder', 'hash-generator', 'json-formatter'],
    nextToolSlugs: ['hash-generator', 'base64-decoder', 'json-formatter'],
    faqs: [
      {
        question: 'Does decoding a JWT verify its signature?',
        answer: 'NO. Decoding extracts the payload for inspection but DOES NOT verify the secret key or public key signature.',
      },
      {
        question: 'Is my JWT sent to a remote server?',
        answer: 'Never. Decoding is done 100% locally in your browser.',
      },
    ],
    sampleInput: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjIwMDAwMDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    title: 'Hash Generator',
    shortDescription: 'Generate SHA-256, SHA-384, SHA-512, and SHA-1 hashes.',
    fullDescription: 'Compute secure cryptographic message digests for text using native Web Crypto APIs.',
    category: 'Security & Web',
    icon: 'Hash',
    keywords: ['hash generator', 'sha256 generator', 'sha512 generator', 'crypto hash', 'web crypto digest'],
    relatedSlugs: ['jwt-decoder', 'uuid-generator', 'base64-encoder'],
    nextToolSlugs: ['jwt-decoder', 'base64-encoder'],
    faqs: [
      {
        question: 'Which hash algorithms are supported?',
        answer: 'SHA-256, SHA-384, SHA-512, and SHA-1 (with a security deprecation warning).',
      },
    ],
    sampleInput: 'Fast developer tools. No installation. No signup.',
  },

  // --- Developer Utilities Category ---
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    title: 'Regex Tester',
    shortDescription: 'Test regular expressions with match indices, flags, and capture groups in a Web Worker.',
    fullDescription: 'Test JavaScript Regular Expressions with real-time match highlighting, match count, and group extraction.',
    category: 'Developer Utilities',
    icon: 'Regex',
    isPopular: true,
    keywords: ['regex tester', 'regular expression test', 'js regex', 'regexp match', 'regex debugger'],
    relatedSlugs: ['cron-generator', 'json-validator'],
    nextToolSlugs: ['cron-generator', 'json-validator'],
    faqs: [
      {
        question: 'Does this tester safeguard against catastrophic backtracking?',
        answer: 'Yes. An isolated Web Worker with a 300ms termination timeout prevents browser freezing.',
      },
    ],
    sampleInput: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})',
  },
  {
    id: 'cron-generator',
    slug: 'cron-generator',
    title: 'Cron Generator',
    shortDescription: 'Build and explain 5-field Unix cron schedule expressions in plain English.',
    fullDescription: 'Generate standard 5-field cron expressions with visual builders and plain English descriptions.',
    category: 'Developer Utilities',
    icon: 'CalendarClock',
    keywords: ['cron generator', 'cron expression', 'cron schedule', 'cron text explainer', 'crontab generator'],
    relatedSlugs: ['unix-timestamp', 'regex-tester'],
    nextToolSlugs: ['unix-timestamp', 'regex-tester'],
    faqs: [
      {
        question: 'What cron dialect is used?',
        answer: 'Standard 5-field Unix cron syntax: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), Day of Week (0-6).',
      },
      {
        question: 'How are timezones handled?',
        answer: 'Cron syntax does not define a universal timezone; your scheduler determines which timezone is used.',
      },
    ],
    sampleInput: '0 9 * * 1',
  },
  {
    id: 'color-converter',
    slug: 'color-converter',
    title: 'Color Converter',
    shortDescription: 'Convert colors between HEX, RGB(a), HSL(a), and CMYK formats.',
    fullDescription: 'Convert color values between HEX, RGB, HSL, and CMYK formats with a live color preview card.',
    category: 'Developer Utilities',
    icon: 'Palette',
    keywords: ['color converter', 'hex to rgb', 'rgb to hsl', 'hex to cmyk', 'css color converter'],
    relatedSlugs: ['regex-tester', 'json-formatter'],
    nextToolSlugs: ['regex-tester', 'json-formatter'],
    faqs: [
      {
        question: 'Does it support 3-digit shorthand HEX codes?',
        answer: 'Yes! Shorthand HEX codes like `#fff` or `#09f` are automatically expanded and converted.',
      },
    ],
    sampleInput: '#3b82f6',
  },
];

export function getToolBySlug(slug: string): ToolMetadata | undefined {
  return TOOLS_LIST.find((t) => t.slug === slug);
}
