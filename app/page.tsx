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
  return (<>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://portfolio-d33.vercel.app/#person",
      "name": "Deekshith A",
      "alternateName": [
        "Deekshith",
        "D33",
        "28D33"
      ],
      "url": "https://portfolio-d33.vercel.app/",
      "image": "https://portfolio-d33.vercel.app/og-image.png",
      "jobTitle": "AI Security Engineer & Penetration Tester",
      "description": "CPENT-certified security engineer and AI builder in Bangalore. Penetration testing, AI agent harnesses, MCP servers, LLM red teaming, and secure production delivery.",
      "knowsAbout": [
        "AI Security",
        "AI Agents & Agent Harnesses",
        "Model Context Protocol (MCP)",
        "LLM Red Teaming",
        "Agentic Workflows & Automation",
        "Prompt & Token Optimization",
        "Penetration Testing",
        "Red Teaming",
        "Web Application Security",
        "Active Directory Attacks",
        "Threat Intelligence",
        "Digital Forensics",
        "Incident Response",
        "SIEM & Log Analysis",
        "Zero-Trust Architecture"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Certified Penetration Testing Professional (CPENT)",
          "alternateName": "CPENT",
          "credentialCategory": "Professional Certification",
          "recognizedBy": {
            "@type": "Organization",
            "name": "EC-Council",
            "url": "https://www.eccouncil.org/"
          },
          "url": "https://www.eccouncil.org/train-certify/certified-penetration-testing-professional-cpent/"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Ethical Hacker",
          "credentialCategory": "Professional Certification",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Cisco Networking Academy",
            "url": "https://www.netacad.com/"
          }
        }
      ],
      "award": "Ranked in the top 2% globally on TryHackMe",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "University Visvesvaraya College of Engineering (UVCE)"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://github.com/28d33",
        "https://www.linkedin.com/in/d33kshithanand",
        "https://tryhackme.com/p/28D33"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://portfolio-d33.vercel.app/#website",
      "url": "https://portfolio-d33.vercel.app/",
      "name": "Deekshith (D33) \u2014 AI Security & Penetration Testing",
      "publisher": {
        "@id": "https://portfolio-d33.vercel.app/#person"
      },
      "inLanguage": "en"
    },
    {
      "@type": "ProfilePage",
      "@id": "https://portfolio-d33.vercel.app/#webpage",
      "url": "https://portfolio-d33.vercel.app/",
      "name": "Deekshith (D33) | AI Security & Penetration Testing",
      "description": "Deekshith (D33) is a CPENT-certified security engineer and AI builder in Bangalore: penetration testing, agent harnesses, MCP servers, and secure delivery.",
      "isPartOf": {
        "@id": "https://portfolio-d33.vercel.app/#website"
      },
      "about": {
        "@id": "https://portfolio-d33.vercel.app/#person"
      },
      "mainEntity": {
        "@id": "https://portfolio-d33.vercel.app/#person"
      },
      "primaryImageOfPage": {
        "@id": "https://portfolio-d33.vercel.app/#primaryimage"
      },
      "inLanguage": "en"
    },
    {
      "@type": "ImageObject",
      "@id": "https://portfolio-d33.vercel.app/#primaryimage",
      "url": "https://portfolio-d33.vercel.app/og-image.png",
      "contentUrl": "https://portfolio-d33.vercel.app/og-image.png",
      "width": 1200,
      "height": 630,
      "caption": "Deekshith (D33) \u2014 CPENT-certified AI security and penetration testing"
    }
  ]
}) }}
    />
    <PortfolioClient />
  </>);
}
