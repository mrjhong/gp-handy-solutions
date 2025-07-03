import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: {
    default: 'GP Handy Solutions LLC - No Limits, Only Results',
    template: '%s | GP Handy Solutions LLC'
  },
  description: 'Professional handyman services led by a woman. Painting, flooring, carpentry, and repairs. No limits, only results!',
  keywords: 'handyman, woman-led business, home repairs, painting, flooring, carpentry, GP Handy Solutions',
  authors: [{ name: 'GP Handy Solutions LLC' }],
  openGraph: {
    title: 'GP Handy Solutions LLC - No Limits, Only Results',
    description: 'Professional handyman services led by a woman. Painting, flooring, carpentry, and repairs.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}