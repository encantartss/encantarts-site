import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/carrinho', '/api/'],
    },
    sitemap: 'https://encantarts.com.br/sitemap.xml',
  }
}
