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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
