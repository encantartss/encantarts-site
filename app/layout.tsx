import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Quicksand, Nunito, Geist_Mono } from 'next/font/google'
import './globals.css'

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  display: 'swap',
})
const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap',
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const siteUrl = 'https://encantarts.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Encantart's Papelaria Criativa | A fantástica arte de encantar",
    template: "%s | Encantart's Papelaria Criativa",
  },
  description:
    'Papelaria personalizada, kits festa e brindes criativos. Topos de bolo, agendas, bottons, chaveiros e muito mais. Criando momentos especiais há 8 anos.',
  keywords: [
    'papelaria personalizada',
    'topo de bolo',
    'kit festa',
    'agenda personalizada',
    'bottons',
    'chaveiros',
    'brindes personalizados',
    'Encantarts',
  ],
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: "Encantart's Papelaria Criativa",
    title: "Encantart's Papelaria Criativa | A fantástica arte de encantar",
    description:
      'Papelaria personalizada, kits festa e brindes criativos feitos com amor para encantar seus momentos especiais.',
    images: [{ url: '/images/hero-banner.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Encantart's Papelaria Criativa",
    description:
      'Papelaria personalizada, kits festa e brindes criativos para encantar seus momentos especiais.',
    images: ['/images/hero-banner.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdf2f8' },
    { media: '(prefers-color-scheme: dark)', color: '#2a1f28' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${quicksand.variable} ${nunito.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
