
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hawkinsig.com';

  // Static pages
  const staticRoutes = [
    '/',
    '',
    '/about',
    '/certifications',
    '/contact',
    '/ecosystem',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  return [...staticRoutes];
}
