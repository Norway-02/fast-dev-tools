import { describe, it, expect } from 'vitest';
import { jsonToYaml, yamlToJson } from '@/lib/tools/yaml';

describe('YAML Tools — Security & Correctness Audit Test Suite (Item 7)', () => {
  it('converts happy path JSON to YAML and back', () => {
    const jsonStr = '{"name":"FastTools","ports":[80,443],"active":true}';
    const yamlRes = jsonToYaml(jsonStr);
    expect(yamlRes.error).toBeNull();
    expect(yamlRes.result).toContain('name: FastTools');

    const jsonRes = yamlToJson(yamlRes.result);
    expect(jsonRes.error).toBeNull();
    expect(JSON.parse(jsonRes.result).name).toBe('FastTools');
  });

  it('safely parses malicious-looking YAML tags without code execution', () => {
    const maliciousYaml = `
    !!js/function >
      function () { return "pwned"; }
    `;
    const res = yamlToJson(maliciousYaml);
    expect(res.result).not.toBe('');
    const parsed = JSON.parse(res.result);
    // Verified: Safe YAML parser converts dangerous tags to plain text strings without executing code
    expect(typeof parsed).toBe('string');
    expect(parsed).toContain('function ()');
  });

  it('handles empty input gracefully', () => {
    expect(jsonToYaml('').error).toBe('Input is empty.');
    expect(yamlToJson('').error).toBe('Input is empty.');
  });
});
