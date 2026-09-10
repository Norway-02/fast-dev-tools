import { MetadataRoute } from 'next';
import { TOOLS_LIST } from '@/lib/constants/tools-list';
import { GUIDES_LIST } from '@/lib/constants/guides-list';

export const dynamic = 'force-static';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devpocket.dpdns.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/dev-tools`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/json-tools`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/encoding-tools`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/developer-utilities`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  // Tool detail pages
  TOOLS_LIST.forEach((tool) => {
    routes.push({
      url: `${SITE_URL}/${tool.slug}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Guide article pages
  GUIDES_LIST.forEach((guide) => {
    routes.push({
      url: `${SITE_URL}/guides/${guide.slug}`,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  });

  return routes;
}
