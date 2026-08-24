import { Metadata } from 'next';
import { ToolMetadata } from '@/lib/constants/tools-list';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastdevtools.vercel.app';
const SITE_NAME = 'FastDevTools';

export function constructToolMetadata(tool: ToolMetadata): Metadata {
  const url = `${SITE_URL}/${tool.slug}`;
  const title = `${tool.title} — Fast Developer Tools (No Signup)`;
  const description = tool.fullDescription;

  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
