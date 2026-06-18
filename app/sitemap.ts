import type { MetadataRoute } from 'next'
import { categories, products } from '@/lib/data'

const BASE_URL = 'https://encantarts.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/categorias', '/kit-festa', '/carrinho'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const categoryRoutes = categories.map((c) => ({
    url: `${BASE_URL}/categorias/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/produtos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
