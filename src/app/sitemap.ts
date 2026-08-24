import { MetadataRoute } from 'next';
import { TOOLS_LIST } from '@/lib/constants/tools-list';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastdevtools.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  TOOLS_LIST.forEach((tool) => {
    routes.push({
      url: `${SITE_URL}/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  return routes;
}
