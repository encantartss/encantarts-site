import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Encantart's Papelaria Criativa",
    short_name: "Encantart's",
    description: 'A fantástica arte de encantar. Papelaria personalizada, festas e brindes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdf7fb',
    theme_color: '#f4a6c8',
    icons: [
      {
        src: '/images/encantinha-mascote.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/encantinha-mascote.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
