import type { Metadata } from 'next';
import { Crimson_Pro, Inter } from 'next/font/google';
import Providers from '~/components/providers';
import { Toaster } from '~/components/ui/sonner';

import '../styles/globals.css';

const crimson = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Life in Pages',
  description: 'Write a little each day. Watch your story unfold as chapters — powered by AI, guided by your emotions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${crimson.variable} ${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
