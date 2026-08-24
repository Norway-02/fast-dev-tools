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
  faqs: ToolFaq[];
  sampleInput: string;
}

export const TOOLS_LIST: ToolMetadata[] = [
  // --- JSON Category ---
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    title: 'JSON Formatter',
    shortDescription: 'Format and beautify unformatted or minified JSON with customizable 2-space, 4-space, or tab indentation.',
    fullDescription: 'Fast, secure online JSON Formatter and beautifier. Indent JSON strings with custom spaces or tabs, calculate string depth, byte size, and validate syntax 100% in your browser.',
    category: 'JSON',
    icon: 'FileCode',
    keywords: ['json formatter', 'json beautifier', 'format json', 'pretty print json', 'json indent'],
    relatedSlugs: ['json-validator', 'json-minifier', 'json-viewer', 'json-to-yaml', 'json-to-csv'],
    faqs: [
      {
        question: 'Is my JSON data sent to any server?',
        answer: 'No. All JSON formatting happens entirely inside your browser using standard JavaScript engine APIs. Zero data is transmitted.',
      },
      {
        question: 'What indentation options are supported?',
        answer: 'You can choose between 2 spaces, 4 spaces, or tab indentation depending on your coding style preference.',
      },
    ],
    sampleInput: '{"name":"FastDevTools","features":["fast","secure","no signup"],"stats":{"users":10000,"online":true}}',
  },
  {
    id: 'json-validator',
    slug: 'json-validator',
    title: 'JSON Validator',
    shortDescription: 'Validate JSON syntax and locate syntax errors with exact line and column pointers.',
    fullDescription: 'Check JSON syntax validity with immediate line and column error indicators. Detect missing commas, unescaped strings, trailing commas, and invalid brackets instantly.',
    category: 'JSON',
    icon: 'CheckCircle2',
    keywords: ['json validator', 'json lint', 'check json', 'json syntax error', 'json parser'],
    relatedSlugs: ['json-formatter', 'json-minifier', 'json-viewer'],
    faqs: [
      {
        question: 'How does line/column error detection work?',
        answer: 'When JSON parsing fails, the validator analyzes the V8 parse error trace and computes exact line and column numbers.',
      },
      {
        question: 'Does this validator support large JSON payloads?',
        answer: 'Yes, it processes large JSON structures locally in the browser efficiently without UI lag.',
      },
    ],
    sampleInput: '{\n  "title": "Developer Micro-Tools",\n  "status": "active",\n  "count": 21,\n}', // Has intentional trailing comma for validation testing
  },
  {
    id: 'json-minifier',
    slug: 'json-minifier',
    title: 'JSON Minifier',
    shortDescription: 'Compress and minify JSON files by removing unnecessary whitespace and line breaks.',
    fullDescription: 'Safely compress JSON data into a single dense line for storage or network transmission. Guarantees zero alteration of string values or keys.',
    category: 'JSON',
    icon: 'Minimize2',
    keywords: ['json minifier', 'compress json', 'minify json', 'json compact'],
    relatedSlugs: ['json-formatter', 'json-validator', 'json-viewer'],
    faqs: [
      {
        question: 'Will minifying JSON alter my data?',
        answer: 'No. The minifier parses JSON into a structured AST and stringifies it without whitespace, maintaining exact data integrity.',
      },
    ],
    sampleInput: '{\n  "app": "MicroTools",\n  "enabled": true,\n  "version": 1\n}',
  },
  {
    id: 'json-viewer',
    slug: 'json-viewer',
    title: 'JSON Viewer',
    shortDescription: 'Interactive tree viewer to explore, expand, and collapse complex nested JSON objects.',
    fullDescription: 'Visualize complex nested JSON structures in an interactive tree view. Search keys, expand/collapse nodes, and inspect primitive values.',
    category: 'JSON',
    icon: 'FolderTree',
    keywords: ['json viewer', 'json tree', 'json inspect', 'explore json', 'json structure'],
    relatedSlugs: ['json-formatter', 'json-validator', 'json-to-yaml'],
    faqs: [
      {
        question: 'Can I expand or collapse all nodes at once?',
        answer: 'Yes, the controls toolbar includes "Expand All" and "Collapse All" actions.',
      },
    ],
    sampleInput: '{"project":{"name":"Fast Tools","config":{"debug":false,"tags":["dev","prod"]},"modules":[{"id":1,"type":"utility"}]}}',
  },
  {
    id: 'json-to-yaml',
    slug: 'json-to-yaml',
    title: 'JSON to YAML Converter',
    shortDescription: 'Convert JSON objects and arrays into clean, valid YAML configurations.',
    fullDescription: 'Convert JSON data structures directly into human-readable YAML for Kubernetes, Docker Compose, CI/CD pipelines, and configuration files.',
    category: 'JSON',
    icon: 'FileSpreadsheet',
    keywords: ['json to yaml', 'convert json yaml', 'json2yaml', 'yaml generator'],
    relatedSlugs: ['yaml-to-json', 'json-formatter', 'json-to-csv'],
    faqs: [
      {
        question: 'Does this handle nested objects and arrays?',
        answer: 'Yes, all valid JSON data types (strings, numbers, booleans, null, arrays, objects) are accurately mapped to YAML equivalents.',
      },
    ],
    sampleInput: '{"service":"api-gateway","port":8080,"routes":["/health","/v1/tools"],"database":{"host":"localhost","port":5432}}',
  },
  {
    id: 'yaml-to-json',
    slug: 'yaml-to-json',
    title: 'YAML to JSON Converter',
    shortDescription: 'Convert YAML configuration files into valid, formatted JSON.',
    fullDescription: 'Parse YAML configurations (Kubernetes manifests, Docker files, Ansible playbooks) into valid JSON strings for API consumption or inspectable structures.',
    category: 'JSON',
    icon: 'FileJson',
    keywords: ['yaml to json', 'convert yaml json', 'yaml2json', 'parse yaml'],
    relatedSlugs: ['json-to-yaml', 'json-formatter', 'json-validator'],
    faqs: [
      {
        question: 'Is YAML code executed during parsing?',
        answer: 'Never. The parser uses strict data parsing without safe-eval or custom type execution tags.',
      },
    ],
    sampleInput: 'service: api-gateway\nport: 8080\nroutes:\n  - /health\n  - /v1/tools\ndatabase:\n  host: localhost\n  port: 5432',
  },
  {
    id: 'json-to-csv',
    slug: 'json-to-csv',
    title: 'JSON to CSV Converter',
    shortDescription: 'Convert JSON arrays or objects into downloadable RFC 4180 compliant CSV spreadsheets.',
    fullDescription: 'Transform JSON datasets into CSV format for Excel, Google Sheets, or data analysis. Automatically escapes quotes, commas, and multiline values.',
    category: 'JSON',
    icon: 'Table',
    keywords: ['json to csv', 'json2csv', 'json csv converter', 'export json excel'],
    relatedSlugs: ['json-to-yaml', 'json-formatter'],
    faqs: [
      {
        question: 'What JSON formats are accepted?',
        answer: 'An array of objects (e.g. `[{"id": 1}, {"id": 2}]`) or a single object. Nested objects will be stringified in cell values.',
      },
    ],
    sampleInput: '[{"id":1,"name":"Alice","role":"Engineer","location":"San Francisco"},{"id":2,"name":"Bob","role":"Designer","location":"New York"}]',
  },

  // --- Encoding Category ---
  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    title: 'Base64 Encoder',
    shortDescription: 'Encode plain text or UTF-8 Unicode strings into Base64 format.',
    fullDescription: 'Encode text strings to Base64 with full UTF-8 Unicode support. Safe for international text, emojis, and binary string representations.',
    category: 'Encoding',
    icon: 'Binary',
    keywords: ['base64 encoder', 'encode base64', 'base64 text', 'utf8 base64'],
    relatedSlugs: ['base64-decoder', 'url-encoder', 'html-encoder'],
    faqs: [
      {
        question: 'Does this Base64 encoder support emojis and non-ASCII text?',
        answer: 'Yes! It uses TextEncoder to convert UTF-8 characters into bytes before encoding, avoiding character corruption.',
      },
    ],
    sampleInput: 'Hello World! 🚀 Fast Developer Tools',
  },
  {
    id: 'base64-decoder',
    slug: 'base64-decoder',
    title: 'Base64 Decoder',
    shortDescription: 'Decode Base64 encoded strings back into UTF-8 plain text.',
    fullDescription: 'Decode Base64 strings to readable UTF-8 text. Validates input format and reports decoding errors clearly.',
    category: 'Encoding',
    icon: 'Unlock',
    keywords: ['base64 decoder', 'decode base64', 'base64 to text', 'utf8 decode base64'],
    relatedSlugs: ['base64-encoder', 'url-decoder', 'jwt-decoder'],
    faqs: [
      {
        question: 'What happens if the Base64 input is invalid?',
        answer: 'The decoder will display a clear error message indicating invalid Base64 characters or malformed UTF-8 byte sequences.',
      },
    ],
    sampleInput: 'SGVsbG8gV29ybGQhIPCZu4AgRmFzdCBEZXZlbG9wZXIgVG9vbHM=',
  },
  {
    id: 'url-encoder',
    slug: 'url-encoder',
    title: 'URL Encoder',
    shortDescription: 'Encode URLs or query string parameters to percent-encoded format.',
    fullDescription: 'Percent-encode URL components or full URL addresses for safe HTTP GET transmission. Supports URI Component and Full URI encoding modes.',
    category: 'Encoding',
    icon: 'Link',
    keywords: ['url encoder', 'percent encoding', 'encode uri', 'urlencode'],
    relatedSlugs: ['url-decoder', 'base64-encoder', 'html-encoder'],
    faqs: [
      {
        question: 'What is the difference between Component and Full URL encoding?',
        answer: 'Component mode encodes special characters like "?", "&", "=", "/" (ideal for query parameters). Full mode preserves URL structures.',
      },
    ],
    sampleInput: 'https://example.com/search?query=hello world & developer tools!',
  },
  {
    id: 'url-decoder',
    slug: 'url-decoder',
    title: 'URL Decoder',
    shortDescription: 'Decode percent-encoded URL strings back into human-readable text.',
    fullDescription: 'Decode percent-encoded URL parameters and URLs. Converts %20 to spaces and resolves encoded UTF-8 character sequences.',
    category: 'Encoding',
    icon: 'Unlink',
    keywords: ['url decoder', 'urldecode', 'decode uri', 'percent decode'],
    relatedSlugs: ['url-encoder', 'base64-decoder', 'html-decoder'],
    faqs: [
      {
        question: 'Does this handle malformed percent sequences?',
        answer: 'Yes, invalid or truncated % sequences display readable error messages without breaking the UI.',
      },
    ],
    sampleInput: 'https%3A%2F%2Fexample.com%2Fsearch%3Fquery%3Dhello%20world%20%26%20developer%20tools%21',
  },
  {
    id: 'html-encoder',
    slug: 'html-encoder',
    title: 'HTML Encoder',
    shortDescription: 'Convert HTML special characters (&, <, >, ", \') into entity references.',
    fullDescription: 'Encode special HTML characters to their entity equivalents (&amp;, &lt;, &gt;, &quot;, &#39;) to prevent XSS vulnerabilities in code displays.',
    category: 'Encoding',
    icon: 'Code2',
    keywords: ['html encoder', 'escape html', 'html entity encoder', 'xss prevent html'],
    relatedSlugs: ['html-decoder', 'url-encoder', 'base64-encoder'],
    faqs: [
      {
        question: 'Why encode HTML characters?',
        answer: 'Encoding prevents web browsers from interpreting user input as live HTML or JavaScript markup, protecting against XSS attacks.',
      },
    ],
    sampleInput: '<script>alert("XSS Attack!");</script>\n<div class="test">Body & Mind</div>',
  },
  {
    id: 'html-decoder',
    slug: 'html-decoder',
    title: 'HTML Decoder',
    shortDescription: 'Decode HTML entities back into plain text safely without script execution.',
    fullDescription: 'Safely convert HTML entities (&amp;, &lt;, &gt;, &quot;, &#x2F;) back to raw characters without executing scripts or injecting DOM markup.',
    category: 'Encoding',
    icon: 'Code',
    keywords: ['html decoder', 'unescape html', 'html entity decoder'],
    relatedSlugs: ['html-encoder', 'url-decoder', 'base64-decoder'],
    faqs: [
      {
        question: 'Is HTML decoding safe from XSS?',
        answer: 'Yes. Decoded output is rendered strictly as plain text nodes or code blocks. Never injected into innerHTML.',
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
    fullDescription: 'Generate cryptographically strong Version-4 Universally Unique Identifiers (UUIDs) using browser crypto API. Supports bulk generation up to 100 UUIDs.',
    category: 'Identifiers & Time',
    icon: 'Fingerprint',
    keywords: ['uuid generator', 'v4 uuid', 'guid generator', 'random uuid', 'bulk uuid'],
    relatedSlugs: ['uuid-validator', 'hash-generator', 'unix-timestamp'],
    faqs: [
      {
        question: 'Are these UUIDs cryptographically secure?',
        answer: 'Yes, UUIDs are generated using Web Crypto API (`crypto.randomUUID()`), ensuring strong randomness.',
      },
    ],
    sampleInput: '',
  },
  {
    id: 'uuid-validator',
    slug: 'uuid-validator',
    title: 'UUID Validator',
    shortDescription: 'Validate UUID syntax and determine version (v1-v5) and variant compliance.',
    fullDescription: 'Validate UUID format against RFC 4122 standards. Identifies UUID version (v1, v2, v3, v4, v5) and detects non-hyphenated 32-character hex variants.',
    category: 'Identifiers & Time',
    icon: 'ShieldCheck',
    keywords: ['uuid validator', 'check uuid', 'uuid version detector', 'validate guid'],
    relatedSlugs: ['uuid-generator', 'unix-timestamp'],
    faqs: [
      {
        question: 'Which UUID versions are detected?',
        answer: 'Versions 1 through 5, Nil UUID, and non-hyphenated 32-character hexadecimal strings.',
      },
    ],
    sampleInput: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  },
  {
    id: 'unix-timestamp',
    slug: 'unix-timestamp',
    title: 'Unix Timestamp Converter',
    shortDescription: 'Convert between Unix timestamps (seconds/ms) and ISO 8601 UTC / Local dates.',
    fullDescription: 'Convert Unix epoch timestamps (seconds and milliseconds) to human-readable dates, UTC strings, ISO 8601, and relative time representations.',
    category: 'Identifiers & Time',
    icon: 'Clock',
    keywords: ['unix timestamp', 'epoch converter', 'timestamp to date', 'date to timestamp'],
    relatedSlugs: ['cron-generator', 'uuid-generator'],
    faqs: [
      {
        question: 'Does this handle seconds and milliseconds automatically?',
        answer: 'Yes, the converter auto-detects whether the input is in seconds or milliseconds, with explicit override toggles.',
      },
    ],
    sampleInput: '1700000000',
  },

  // --- Security & Web Category ---
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    title: 'JWT Decoder',
    shortDescription: 'Decode JSON Web Tokens to inspect Header, Payload claims, and expiration status.',
    fullDescription: 'Decode JWT tokens locally in your browser. Inspect JOSE header parameters, payload claims (exp, iat, nbf, sub, iss), and verify token expiration state.',
    category: 'Security & Web',
    icon: 'KeyRound',
    keywords: ['jwt decoder', 'decode jwt', 'parse jwt', 'jwt claims', 'jwt token viewer'],
    relatedSlugs: ['base64-decoder', 'hash-generator', 'json-formatter'],
    faqs: [
      {
        question: 'Does decoding a JWT verify its cryptographic signature?',
        answer: 'NO. Decoding extracts the payload for inspection but DOES NOT verify the secret key or public key signature. Anyone can create an unverified JWT payload.',
      },
      {
        question: 'Is my JWT sent to a remote server?',
        answer: 'Never. Decoding is done 100% locally in your browser. No JWTs or authorization credentials ever leave your machine.',
      },
    ],
    sampleInput: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjIwMDAwMDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    title: 'Hash Generator',
    shortDescription: 'Generate cryptographic hashes using Web Crypto (SHA-256, SHA-384, SHA-512, SHA-1).',
    fullDescription: 'Compute secure cryptographic message digests for text using native Web Crypto APIs. Generates hexadecimal and Base64 hash outputs.',
    category: 'Security & Web',
    icon: 'Hash',
    keywords: ['hash generator', 'sha256 generator', 'sha512 generator', 'crypto hash', 'web crypto digest'],
    relatedSlugs: ['jwt-decoder', 'uuid-generator', 'base64-encoder'],
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
    shortDescription: 'Test regular expressions against strings with match indices, flags, and capture groups.',
    fullDescription: 'Test JavaScript Regular Expressions with real-time match highlighting, match count, start/end indices, and named/numbered capture group extraction.',
    category: 'Developer Utilities',
    icon: 'Regex',
    keywords: ['regex tester', 'regular expression test', 'js regex', 'regexp match', 'regex debugger'],
    relatedSlugs: ['cron-generator', 'json-validator'],
    faqs: [
      {
        question: 'Does this tester safeguard against catastrophic backtracking?',
        answer: 'Yes. Pattern length limits, iteration timeouts (200ms), and max match limits prevent complex expressions from freezing your browser.',
      },
    ],
    sampleInput: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})',
  },
  {
    id: 'cron-generator',
    slug: 'cron-generator',
    title: 'Cron Expression Generator',
    shortDescription: 'Build and explain standard 5-field Unix cron schedule expressions in human-readable text.',
    fullDescription: 'Generate standard 5-field cron expressions for cron jobs, CI/CD pipelines, and cloud schedulers. View instant plain English descriptions and preset schedules.',
    category: 'Developer Utilities',
    icon: 'CalendarClock',
    keywords: ['cron generator', 'cron expression', 'cron schedule', 'cron text explainer', 'crontab generator'],
    relatedSlugs: ['unix-timestamp', 'regex-tester'],
    faqs: [
      {
        question: 'What cron dialect is used?',
        answer: 'Standard 5-field Unix cron syntax: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), Day of Week (0-6).',
      },
      {
        question: 'How are timezones handled?',
        answer: 'Cron expressions themselves do not contain timezone info; execution depends on your server or system clock (typically configured to UTC).',
      },
    ],
    sampleInput: '0 9 * * 1',
  },
  {
    id: 'color-converter',
    slug: 'color-converter',
    title: 'Color Converter',
    shortDescription: 'Convert colors between HEX (#fff/ffffff), RGB(a), HSL(a), and CMYK formats.',
    fullDescription: 'Convert color values between HEX, RGB, HSL, and CMYK formats with a live color preview card and instant one-click CSS copy buttons.',
    category: 'Developer Utilities',
    icon: 'Palette',
    keywords: ['color converter', 'hex to rgb', 'rgb to hsl', 'hex to cmyk', 'css color converter'],
    relatedSlugs: ['regex-tester', 'json-formatter'],
    faqs: [
      {
        question: 'Does it support 3-digit shorthand HEX codes?',
        answer: 'Yes! Shorthand HEX codes like `#fff` or `#09f` are automatically expanded and converted correctly.',
      },
    ],
    sampleInput: '#3b82f6',
  },
];

export function getToolBySlug(slug: string): ToolMetadata | undefined {
  return TOOLS_LIST.find((t) => t.slug === slug);
}
