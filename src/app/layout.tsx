import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import '../styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
