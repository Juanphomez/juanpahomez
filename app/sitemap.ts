import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/**
 * Only routes that actually exist. Listing planned pages here would send
 * crawlers to 404s and cost ranking.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
