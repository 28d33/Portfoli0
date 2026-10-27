import type { Metadata } from 'next';
import './globals.css';

/* -------------------------------------------------------------------
 * Root layout – Tailwind + the custom stylesheet from `/style.css`.
 * ------------------------------------------------------------------- */
export const metadata: Metadata = {
  title: 'Deekshith (D33) | AI Security & Penetration Testing',
  description:
    'Deekshith (D33) is a CPENT-certified security engineer and AI builder in Bangalore: penetration testing, agent harnesses, MCP servers, and secure delivery.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  themeColor: '#050507',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-[#050507] text-white antialiased">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
