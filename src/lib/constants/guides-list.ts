export interface GuideMetadata {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'JSON' | 'Encoding' | 'Security' | 'Time & Scheduling' | 'Regex';
  categorySlug: 'json-tools' | 'encoding-tools' | 'developer-utilities';
  publishedDate: string;
  readTime: string;
  relatedToolSlugs: string[];
  relatedGuideSlugs: string[];
  content: string;
}

export const GUIDES_LIST: GuideMetadata[] = [
  {
    slug: 'how-to-format-json',
    title: 'How to Format & Beautify JSON: Complete Developer Guide',
    subtitle: 'Learn how to format JSON programmatically in JavaScript, Python, Bash/jq, and in modern code editors.',
    description: 'Master JSON formatting across programming languages and tools. Learn about indentation, RFC 8259 standards, minification vs beautification, and CLI formatting.',
    category: 'JSON',
    categorySlug: 'json-tools',
    publishedDate: '2026-09-01',
    readTime: '6 min read',
    relatedToolSlugs: ['json-formatter', 'json-validator', 'json-minifier', 'json-viewer'],
    relatedGuideSlugs: ['json-vs-json5', 'how-to-validate-malformed-json'],
    content: `
## What is JSON Formatting?

JSON (JavaScript Object Notation) is a lightweight, language-independent data interchange format defined by **RFC 8259** and **ECMA-404**. While computers process minified single-line JSON effortlessly, human developers require proper indentation, line breaks, and structural spacing to read, debug, and maintain JSON files effectively.

JSON formatting (also known as **JSON beautification** or **pretty-printing**) transforms raw or minified JSON strings into clean, human-readable multiline structures without altering the underlying data values or hierarchy.

---

## Why Formatting JSON Matters

1. **Faster API Debugging**: Inspect complex nested HTTP API payload responses in seconds instead of scrolling across single-line strings.
2. **Safer Code Reviews**: Visualizing field additions and modifications in Git diffs prevents subtle data structure bugs.
3. **Configuration Auditability**: Properly formatted \`package.json\`, \`tsconfig.json\`, and Kubernetes config maps reduce deployment misconfigurations.

---

## How to Format JSON Programmatically

### 1. In JavaScript / TypeScript (Node.js & Browser)
Standard JavaScript provides built-in JSON stringification options via \`JSON.stringify(value, replacer, space)\`.

\`\`\`javascript
const rawJson = '{"name":"DevPocket","tools":["formatter","validator"],"active":true}';

// Parse string into object
const parsed = JSON.parse(rawJson);

// Beautify with 2-space indentation
const formatted2Spaces = JSON.stringify(parsed, null, 2);

// Beautify with 4-space indentation
const formatted4Spaces = JSON.stringify(parsed, null, 4);

// Beautify with Tab indentation
const formattedTabs = JSON.stringify(parsed, null, '\\t');

console.log(formatted2Spaces);
\`\`\`

### 2. In Python (CLI & Scripts)
Python's standard library includes the \`json\` module with the \`indent\` parameter.

\`\`\`python
import json

raw_json = '{"name":"DevPocket","status":"active","count":21}'
data = json.loads(raw_json)

# Pretty print with 2 spaces and sorted keys
pretty_json = json.dumps(data, indent=2, sort_keys=True)
print(pretty_json)
\`\`\`

**CLI Quick Command**:
\`\`\`bash
echo '{"foo":"bar","baz":123}' | python3 -m json.tool
\`\`\`

### 3. In Linux / macOS Terminal using \`jq\`
\`jq\` is the gold standard command-line utility for processing JSON.

\`\`\`bash
# Pretty-print a JSON file
jq '.' data.json

# Compact/Minify a JSON file
jq -c '.' data.json > minified.json

# Format JSON from a cURL request directly
curl -s https://api.github.com/repos/open-gsd/gsd-core | jq '.stargazers_count, .forks_count'
\`\`\`

---

## Common JSON Formatting Pitfalls

- **Trailing Commas**: RFC 8259 explicitly forbids trailing commas after the last array item or object key.
- **Single Quotes**: JSON key names and string values **must** use double quotes (\`"\`). Single quotes (\`'\`) cause \`SyntaxError: Unexpected token\`.
- **Unquoted Object Keys**: JavaScript allows \`{ name: "value" }\`, but strict JSON requires \`{ "name": "value" }\`.
- **Comments**: Standard JSON does not support line comments (\`//\`) or block comments (\`/* */\`). Use JSON5 if comments are required in your build toolchain.

---

## Online Client-Side JSON Formatting

When pasting sensitive API keys, tokens, or environment payloads into web utilities, privacy is paramount. Ensure your online formatter executes **100% in-browser** using JavaScript's native \`JSON.parse()\` without posting data to third-party tracking servers.
`,
  },
  {
    slug: 'json-vs-json5',
    title: 'JSON vs JSON5: Syntax Differences & Feature Comparison',
    subtitle: 'Understand the key differences between standard RFC 8259 JSON and human-friendly JSON5.',
    description: 'Detailed comparison of standard JSON vs JSON5. Learn about single quotes, unquoted keys, trailing commas, comments, hexadecimal numbers, and multi-line strings.',
    category: 'JSON',
    categorySlug: 'json-tools',
    publishedDate: '2026-09-02',
    readTime: '5 min read',
    relatedToolSlugs: ['json-formatter', 'json-validator', 'json-to-yaml', 'yaml-to-json'],
    relatedGuideSlugs: ['how-to-format-json', 'how-to-validate-malformed-json'],
    content: `
## Overview: Standard JSON vs JSON5

Standard **JSON** (RFC 8259) was designed to be easily machine-parsable. However, as developers began using JSON for human-edited configuration files (such as \`tsconfig.json\` and \`babelrc\`), its strict syntactic constraints became a source of friction.

**JSON5** is an official extension of JSON that expands its syntax to include features directly supported by ECMAScript 5 (ES5).

---

## Feature Comparison Matrix

| Feature | Standard JSON (RFC 8259) | JSON5 (ES5 Extension) |
| :--- | :---: | :---: |
| **Object Keys** | Must be double-quoted (\`"key"\`) | Can be unquoted or single-quoted |
| **String Quotation** | Double quotes only (\`"text"\`) | Double quotes or single quotes (\`'text'\`) |
| **Trailing Commas** | ❌ Strictly forbidden | ✅ Allowed in objects & arrays |
| **Comments** | ❌ Forbidden | ✅ Single-line (\`//\`) & Multi-line (\`/* */\`) |
| **Numeric Formats** | Decimal integers & floats only | Hexadecimal (\`0xFF\`), leading/trailing dots (\`.5\`, \`5.\`) |
| **Multi-line Strings** | Must use \`\\n\` escape sequence | Can use escaped newlines (\`\\\`) |
| **Infinity & NaN** | ❌ Forbidden | ✅ \`Infinity\`, \`-Infinity\`, \`NaN\` allowed |

---

## Code Example Comparison

### Standard JSON Syntax
\`\`\`json
{
  "title": "DevPocket Tool Suite",
  "version": 1,
  "features": [
    "client-side execution",
    "zero tracking"
  ],
  "isProduction": true
}
\`\`\`

### Equivalent JSON5 Syntax
\`\`\`json5
// Configuration settings for DevPocket
{
  title: 'DevPocket Tool Suite',
  version: 1,
  features: [
    'client-side execution',
    'zero tracking', // Trailing comma allowed!
  ],
  isProduction: true,
  maxMemory: 0xFF, // Hexadecimal number
}
\`\`\`

---

## When to Use Which?

- **Use Standard JSON for**: Inter-service REST APIs, GraphQL payloads, database storage, public data exchanges, and language-agnostic data pipelines.
- **Use JSON5 for**: Project configuration files, developer tooling options, local CLI config defaults, and hand-written settings where comments enhance team documentation.
`,
  },
  {
    slug: 'how-to-validate-malformed-json',
    title: 'How to Fix & Validate Malformed JSON: Step-by-Step Diagnostic Guide',
    subtitle: 'Identify line and column syntax errors, unescaped characters, and quote mismatches instantly.',
    description: 'Learn how to diagnose and fix invalid JSON errors including SyntaxError: Unexpected token, unexpected end of JSON input, trailing commas, and encoding issues.',
    category: 'JSON',
    categorySlug: 'json-tools',
    publishedDate: '2026-09-03',
    readTime: '7 min read',
    relatedToolSlugs: ['json-validator', 'json-formatter', 'json-minifier'],
    relatedGuideSlugs: ['how-to-format-json', 'json-vs-json5'],
    content: `
## Diagnosing Common JSON Syntax Errors

When parsing JSON via \`JSON.parse()\` or an API consumer, JavaScript throws explicit \`SyntaxError\` exceptions. Understanding these error signatures allows developers to fix malformed files immediately.

---

## 1. SyntaxError: Unexpected token ' in JSON at position X

### Cause
Single quotes (\`'\`) were used instead of double quotes (\`"\`).

### Bad Input
\`\`\`json
{ 'user': 'Alice', 'role': 'admin' }
\`\`\`

### Correct Fixed Input
\`\`\`json
{ "user": "Alice", "role": "admin" }
\`\`\`

---

## 2. SyntaxError: Unexpected token } in JSON at position X

### Cause
A **trailing comma** was left after the last element in an array or object key-value pair.

### Bad Input
\`\`\`json
{
  "name": "DevPocket",
  "status": "online",
}
\`\`\`

### Correct Fixed Input
\`\`\`json
{
  "name": "DevPocket",
  "status": "online"
}
\`\`\`

---

## 3. SyntaxError: Unexpected token / in JSON at position X

### Cause
Comments (\`//\` or \`/* */\`) were inserted into a standard JSON file.

### Fixing Strategy
Remove comments before parsing or use a dedicated JSON5/Hjson parser if your framework permits.

---

## 4. Unescaped Special Characters in Strings

### Cause
Control characters like newlines (\`\\n\`), tabs (\`\\t\`), or unescaped double quotes inside string fields.

### Bad Input
\`\`\`json
{ "bio": "Software developer at "Acme Corp"" }
\`\`\`

### Correct Fixed Input
\`\`\`json
{ "bio": "Software developer at \\"Acme Corp\\"" }
\`\`\`

---

## Quick Diagnostic Checklist

1. Validate that all property keys are enclosed in **double quotes**.
2. Check for missing commas between key-value pairs or array elements.
3. Remove trailing commas at the end of lists/objects.
4. Replace raw newline characters inside string literals with \`\\n\`.
5. Run your string through an online client-side **JSON Validator** to pinpoint line and column numbers.
`,
  },
  {
    slug: 'how-to-decode-a-jwt',
    title: 'How to Decode & Inspect JWT Tokens Safely',
    subtitle: 'Learn the internal anatomy of JSON Web Tokens (Header, Payload, Signature) and how base64url decoding works.',
    description: 'Comprehensive guide to JSON Web Tokens (JWT). Learn how to decode JWT headers and payloads, check token expiration (exp), inspect claim scopes, and verify signatures.',
    category: 'Security',
    categorySlug: 'developer-utilities',
    publishedDate: '2026-09-04',
    readTime: '6 min read',
    relatedToolSlugs: ['jwt-decoder', 'base64-decoder', 'hash-generator'],
    relatedGuideSlugs: ['base64-explained'],
    content: `
## What is a JSON Web Token (JWT)?

A **JSON Web Token (JWT)** (RFC 7519) is an open standard for securely transmitting information between parties as a compact, self-contained JSON object. JWTs are widely used for HTTP Authorization headers (\`Bearer <token>\`) in modern single-page applications (SPAs) and microservices.

---

## The Anatomy of a JWT

A JWT string consists of three distinct parts separated by dots (\`.\`):

\`\`\`text
HEADER.PAYLOAD.SIGNATURE
\`\`\`

### Example JWT String:
\`\`\`text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjIwMDAwMDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
\`\`\`

---

## 1. Header (JOSE Header)
The header contains metadata about the token type and cryptographic algorithm used to sign it.

\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

---

## 2. Payload (Claims)
The payload contains statements about an entity (typically the user) along with additional metadata claims:
- \`sub\` (Subject): Unique user ID or account identifier.
- \`iat\` (Issued At): Unix timestamp when token was created.
- \`exp\` (Expiration Time): Unix timestamp when token expires.
- \`iss\` (Issuer): Identity provider URI.
- Custom claims: Roles, email, scope permissions (\`"role": "admin"\`).

\`\`\`json
{
  "sub": "1234567890",
  "name": "John Doe",
  "role": "admin",
  "iat": 1516239022,
  "exp": 2000000000
}
\`\`\`

---

## 3. Signature
The signature is created by hashing the Base64Url-encoded Header and Payload with a secret key (HMAC SHA-256) or RSA/ECDSA private key:

\`\`\`text
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)
\`\`\`

---

## Critical Security Rule: Decoding vs Verifying

- **Decoding** a JWT converts the Base64Url strings back into readable JSON. **Anyone with access to the token string can decode it.**
- **Verifying** a JWT checks the signature against a secret key or public key to guarantee that the payload has not been tampered with.

> [!WARNING]
> Never store sensitive unencrypted passwords, credit card numbers, or PII inside JWT payload claims, because JWT payloads are easily readable by decoding!
`,
  },
  {
    slug: 'how-unix-timestamps-work',
    title: 'How Unix Timestamps Work: Seconds, Milliseconds & Y2038',
    subtitle: 'Master Unix Epoch time conversion, ISO 8601 formatting, timezone handling, and the 2038 bug.',
    description: 'Learn everything about Unix timestamps (Epoch time). Understand seconds vs milliseconds, UTC conversion formulas, ISO 8601 formatting, and the 32-bit Year 2038 problem.',
    category: 'Time & Scheduling',
    categorySlug: 'developer-utilities',
    publishedDate: '2026-09-05',
    readTime: '6 min read',
    relatedToolSlugs: ['unix-timestamp', 'cron-generator', 'uuid-generator'],
    relatedGuideSlugs: ['cron-expression-examples'],
    content: `
## What is a Unix Timestamp?

The **Unix Timestamp** (also known as **Epoch Time** or **POSIX time**) measures time as the total number of elapsed seconds since **January 1, 1970 00:00:00 UTC** (excluding leap seconds).

Because Unix timestamps are plain integers, they provide a universal, timezone-agnostic standard for storing timestamps in SQL databases, microservices, log aggregation systems, and caching headers.

---

## Seconds vs. Milliseconds

A common source of bugs in web development is mixing up **10-digit second timestamps** with **13-digit millisecond timestamps**.

- **Seconds (10 Digits)**: Used by Linux CLI (\`date +%s\`), Python (\`time.time()\`), PHP (\`time()\`), and SQL databases (\`UNIX_TIMESTAMP()\`).
  - *Example*: \`1700000000\` (November 14, 2023)
- **Milliseconds (13 Digits)**: Used natively by JavaScript (\`Date.now()\`), Java (\`System.currentTimeMillis()\`), and Elasticsearch.
  - *Example*: \`1700000000000\`

---

## Programmatic Code Cheat Sheet

### JavaScript / TypeScript
\`\`\`javascript
// Current timestamp in milliseconds
const msNow = Date.now();

// Current timestamp in seconds
const secNow = Math.floor(Date.now() / 1000);

// Convert timestamp (seconds) to Date object
const date = new Date(1700000000 * 1000);
console.log(date.toISOString()); // 2023-11-14T22:13:20.000Z
\`\`\`

### Python
\`\`\`python
import time
from datetime import datetime, timezone

# Current seconds
timestamp = int(time.time())

# Convert to UTC datetime string
utc_date = datetime.fromtimestamp(1700000000, tz=timezone.utc)
print(utc_date.strftime('%Y-%m-%d %H:%M:%S UTC'))
\`\`\`

---

## The Year 2038 Problem (Y2038 / Y2K38)

On **January 19, 2038 at 03:14:07 UTC**, 32-bit signed integer Unix timestamps will overflow their maximum capacity (\`2,147,483,647\`) and wrap around to negative numbers (\`-2,147,483,648\`), representing December 13, 1901.

Modern operating systems, 64-bit programming runtimes, and databases use 64-bit integers (\`BIGINT\`), extending timestamp capacity for over 290 billion years.
`,
  },
  {
    slug: 'cron-expression-examples',
    title: 'Cron Expression Examples & 5-Field Reference Guide',
    subtitle: 'Copy-paste 20+ common crontab schedule expressions and learn 5-field syntax rules.',
    description: 'Complete cron expression reference guide with 20+ copy-paste examples. Learn standard 5-field Unix crontab syntax, special characters (*, /, -, ,), and timezone handling.',
    category: 'Time & Scheduling',
    categorySlug: 'developer-utilities',
    publishedDate: '2026-09-06',
    readTime: '5 min read',
    relatedToolSlugs: ['cron-generator', 'unix-timestamp', 'regex-tester'],
    relatedGuideSlugs: ['how-unix-timestamps-work'],
    content: `
## Standard 5-Field Cron Syntax

Unix \`crontab\` schedules tasks using a 5-field expression layout separated by spaces:

\`\`\`text
 ┌───────────── minute (0 - 59)
 │ ┌───────────── hour (0 - 23)
 │ │ ┌───────────── day of month (1 - 31)
 │ │ │ ┌───────────── month (1 - 12)
 │ │ │ │ ┌───────────── day of week (0 - 6) (Sunday = 0)
 │ │ │ │ │
 * * * * *
\`\`\`

---

## 20+ Common Cron Schedule Examples

### Frequent Intervals
- **Every minute**: \`* * * * *\`
- **Every 5 minutes**: \`*/5 * * * *\`
- **Every 15 minutes**: \`*/15 * * * *\`
- **Every 30 minutes**: \`0,30 * * * *\`
- **Every hour (at minute 0)**: \`0 * * * *\`

### Daily & Workday Schedules
- **Every day at midnight (00:00)**: \`0 0 * * *\`
- **Every day at 9:00 AM**: \`0 9 * * *\`
- **Every workday (Mon-Fri) at 8:00 AM**: \`0 8 * * 1-5\`
- **Twice daily (9 AM and 5 PM)**: \`0 9,17 * * *\`

### Weekly & Monthly Schedules
- **Every Monday at 6:00 AM**: \`0 6 * * 1\`
- **Every Sunday midnight**: \`0 0 * * 0\`
- **1st day of every month at midnight**: \`0 0 1 * *\`
- **Quarterly (Jan 1, Apr 1, Jul 1, Oct 1)**: \`0 0 1 1,4,7,10 *\`

---

## Special Operators Explained

- \`*\` (Asterisk): Matches any value.
- \`,\` (Comma): Value list separator (e.g. \`1,3,5\` = 1st, 3rd, and 5th day).
- \`-\` (Hyphen): Range indicator (e.g. \`1-5\` = Monday through Friday).
- \`/\` (Slash): Step value (e.g. \`*/10\` = every 10 units).
`,
  },
  {
    slug: 'base64-explained',
    title: 'Base64 Encoding Explained: How Binary-to-Text Encoding Works',
    subtitle: 'Learn the 6-bit index table, padding with =, UTF-8 character handling, and security use cases.',
    description: 'Deep dive into Base64 encoding. Understand 6-bit binary translation, Base64 character index tables, padding with =, URL-safe Base64, and UTF-8 string encoding.',
    category: 'Encoding',
    categorySlug: 'encoding-tools',
    publishedDate: '2026-09-07',
    readTime: '6 min read',
    relatedToolSlugs: ['base64-encoder', 'base64-decoder', 'url-encoder', 'jwt-decoder'],
    relatedGuideSlugs: ['how-to-decode-a-jwt'],
    content: `
## What is Base64 Encoding?

**Base64** is a binary-to-text encoding scheme defined by **RFC 4648**. It represents binary data (such as files, images, or raw byte arrays) using a strict set of 64 printable ASCII characters:
- \`A-Z\` (26 characters)
- \`a-z\` (26 characters)
- \`0-9\` (10 characters)
- \`+\` and \`/\` (2 characters)

---

## How Base64 Algorithm Works

1. The input string or binary stream is divided into groups of **3 bytes (24 bits)**.
2. The 24 bits are split into **4 groups of 6 bits** each.
3. Each 6-bit integer (value 0 to 63) maps to its corresponding character in the Base64 alphabet table.
4. If the input is not evenly divisible by 3 bytes, **padding equal signs (\`=\`)** are appended to align the 4-character output blocks.

---

## Step-by-Step Example: Encoding "Man"

1. Character bytes: \`M\` (77), \`a\` (97), \`n\` (110)
2. 8-bit Binary: \`01001101  01100001  01101110\`
3. Group into 6-bits: \`010011 | 010110 | 000101 | 101110\`
4. Decimal indexes: \`19 | 22 | 5 | 46\`
5. Base64 Output: \`T | W | F | n\` -> **\`TWFn\`**

---

## Standard Base64 vs. URL-Safe Base64

Standard Base64 contains \`+\` and \`/\` characters, which have special meanings in HTTP URLs and query string parameters.

- **Standard Base64**: Uses \`+\` and \`/\` with \`=\` padding.
- **URL-Safe Base64**: Replaces \`+\` with \`-\` (hyphen) and \`/\` with \`_\` (underscore), and frequently omits \`=\` padding.

---

## Key Takeaway

Base64 is an **encoding format**, NOT an encryption algorithm. Anyone can instantly decode Base64 back into raw bytes without a key. Never use Base64 to obscure passwords or sensitive data!
`,
  },
  {
    slug: 'regex-testing-guide',
    title: 'Regex Testing & Optimization Guide for Developers',
    subtitle: 'Master regular expressions, character classes, flags, lookaheads, and catastrophic backtracking prevention.',
    description: 'Comprehensive guide to testing regular expressions in JavaScript. Learn character classes, flags (g, i, m, s, u), capture groups, lookaheads, and how to avoid catastrophic backtracking.',
    category: 'Regex',
    categorySlug: 'developer-utilities',
    publishedDate: '2026-09-07',
    readTime: '7 min read',
    relatedToolSlugs: ['regex-tester', 'json-validator', 'cron-generator'],
    relatedGuideSlugs: ['cron-expression-examples'],
    content: `
## Regular Expression Cheat Sheet

Regular expressions (Regex) match patterns within text strings.

### Character Classes
- \`.\`: Any character except newline.
- \`\\d\`: Digit (\`[0-9]\`).
- \`\\w\`: Word character (\`[a-zA-Z0-9_]\`).
- \`\\s\`: Whitespace (space, tab, newline).
- \`[abc]\`: Any character in set.
- \`[^abc]\`: Any character NOT in set.

### Quantifiers
- \`*\`: 0 or more (greedy).
- \`+\`: 1 or more (greedy).
- \`?\`: 0 or 1 (optional).
- \`{n,m}\`: Between \`n\` and \`m\` occurrences.

---

## Essential JavaScript Regex Flags

- \`g\` (Global): Retain lastIndex and find all matches rather than stopping at the first.
- \`i\` (Ignore Case): Case-insensitive matching.
- \`m\` (Multiline): \`^\` and \`$\` match line starts and ends, not just document start/end.
- \`s\` (DotAll): Allows \`.\` to match newline characters (\`\\n\`).
- \`u\` (Unicode): Treat pattern as full Unicode code points.

---

## Preventing Catastrophic Backtracking (ReDoS)

When writing nested quantifiers like \`(a+)+\`, regex engines evaluate an exponential number of permutations when given non-matching strings (e.g. \`aaaaaaaaaaaaaaaaaaaaaaaaX\`). This causes CPU utilization to spike to 100% and freezes the execution thread.

### Prevention Rules:
1. Avoid nested quantifiers (e.g., \`(a+)+\` or \`([a-z]+)*\`).
2. Use specific character classes rather than overlapping wildcard dot quantifiers (\`.*?\`).
3. Test regular expressions in isolated **Web Workers** with execution timeout guards.
`,
  },
];

export function getGuideBySlug(slug: string): GuideMetadata | undefined {
  return GUIDES_LIST.find((g) => g.slug === slug);
}

export function getGuidesByCategory(categorySlug: string): GuideMetadata[] {
  return GUIDES_LIST.filter((g) => g.categorySlug === categorySlug);
}
