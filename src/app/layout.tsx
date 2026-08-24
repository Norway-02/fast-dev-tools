import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fast Developer Micro-Tools — No Installation. No Signup.',
  description: 'Fast, secure, 100% browser-based developer utility platform. JSON formatters, JWT decoders, Base64 converters, UUID generators, regex testers, and more.',
  keywords: ['developer tools', 'json formatter', 'jwt decoder', 'uuid generator', 'base64 encoder', 'unix timestamp', 'regex tester'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
