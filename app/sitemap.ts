import type { MetadataRoute } from 'next'

const BASE_URL = 'https://aumentia.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/fr`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/it`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fr/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/fr/coaching`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fr/audit`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]
}
