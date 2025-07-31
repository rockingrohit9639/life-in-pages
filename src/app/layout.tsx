import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Providers from '~/components/providers'
import { Toaster } from '~/components/ui/sonner'

import '../styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Life in Pages',
  description: 'Write a little each day. Watch your story unfold as chapters — powered by AI, guided by your emotions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${playfair.variable} ${inter.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </Providers>
  )
}
