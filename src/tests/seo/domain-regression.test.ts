import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { constructToolMetadata } from '@/lib/utils/seo';
import { getToolBySlug } from '@/lib/constants/tools-list';

describe('SEO & Domain Regression Tests', () => {
  const PRODUCTION_DOMAIN = 'https://devpocket.dpdns.org';
  const FORBIDDEN_DOMAINS = [
    'fastdevtools.vercel.app',
    'vercel.app',
    'pages.dev',
    'workers.dev',
  ];

  it('sitemap contains only valid production canonical URLs', () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(10);

    entries.forEach((entry) => {
      expect(entry.url).toBeTypeOf('string');
      expect(entry.url.startsWith(PRODUCTION_DOMAIN)).toBe(true);

      FORBIDDEN_DOMAINS.forEach((forbidden) => {
        expect(entry.url).not.toContain(forbidden);
      });
    });
  });

  it('robots.txt points to devpocket.dpdns.org sitemap', () => {
    const rules = robots();
    expect(rules.sitemap).toBe(`${PRODUCTION_DOMAIN}/sitemap.xml`);

    FORBIDDEN_DOMAINS.forEach((forbidden) => {
      expect(rules.sitemap).not.toContain(forbidden);
    });
  });

  it('constructToolMetadata generates DevPocket branding and canonical URLs', () => {
    const tool = getToolBySlug('json-formatter')!;
    const meta = constructToolMetadata(tool);

    expect(meta.alternates?.canonical).toBe(`${PRODUCTION_DOMAIN}/json-formatter`);
    expect(meta.openGraph?.url).toBe(`${PRODUCTION_DOMAIN}/json-formatter`);
    expect(meta.openGraph?.siteName).toBe('DevPocket');

    FORBIDDEN_DOMAINS.forEach((forbidden) => {
      expect(meta.alternates?.canonical).not.toContain(forbidden);
    });
  });
});
