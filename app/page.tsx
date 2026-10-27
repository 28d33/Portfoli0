import PortfolioClient from './PortfolioClient';

/* -------------------------------------------------------------------
 * SEO / Social metadata – mirrors the original static index.html
 * ------------------------------------------------------------------- */
const SITE = 'https://portfolio-d33.vercel.app';

export const viewport = {
  themeColor: '#050507',
  colorScheme: 'dark',
};

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'Deekshith (D33) | AI Security & Penetration Testing',
  description:
    'Deekshith (D33) is a CPENT-certified security engineer and AI builder in Bangalore: penetration testing, agent harnesses, MCP servers, and secure delivery.',
  keywords:
    'Deekshith, D33, CPENT, AI Security, AI Agents, MCP, LLM Security, Penetration Testing, Red Teaming, Cybersecurity, Ethical Hacking, Bangalore',
  authors: [{ name: 'Deekshith A (D33)' }],
  robots: 'index, follow, max-image-preview:large',
  alternates: { canonical: SITE },
  openGraph: {
    title: 'Deekshith (D33) | AI Security & Penetration Testing',
    description:
      'CPENT-certified security engineer and AI builder in Bangalore. Penetration testing, AI agents, MCP servers, and secure production-grade delivery.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Deekshith (D33) — CPENT-certified AI security and penetration testing portfolio',
      },
    ],
    type: 'profile',
    siteName: 'Deekshith (D33)',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deekshith (D33) | AI Security & Penetration Testing',
    description:
      'CPENT-certified security engineer and AI builder in Bangalore. Penetration testing, AI agents, MCP servers, and secure delivery.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return <PortfolioClient />;
}
