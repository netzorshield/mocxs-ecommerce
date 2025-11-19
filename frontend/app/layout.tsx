import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MOCXS - Redefine Comfort. Redefine You.',
  description: 'Premium Indian clothing and lifestyle brand. Shop men\'s, women\'s, kids wear, innerwear, sportswear, and accessories.',
  keywords: 'MOCXS, clothing, fashion, India, premium, lifestyle, innerwear, sportswear',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

