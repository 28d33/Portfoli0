'use client';

import { useEffect } from 'react';
import { portfolioHtml } from './content';

/* -------------------------------------------------------------------
 * The original static portfolio, rendered exactly as it was.
 * After mount, the five vendored bundles plus `main.js` are appended
 * to <body> in the order the original <head> used.
 * ------------------------------------------------------------------- */
export default function PortfolioClient() {
  useEffect(() => {
    const vendors = [
      '/assets/vendor/lucide.min.js',
      '/assets/vendor/three.min.js',
      '/assets/vendor/gsap.min.js',
      '/assets/vendor/ScrollTrigger.min.js',
      '/assets/vendor/lenis.min.js',
    ];

    /* Load each bundle in order; `main.js` runs only after all of them. */
    const loadSequential = (i: number = 0) => {
      if (i >= vendors.length) {
        const main = document.createElement('script');
        main.src = '/main.js';
        main.defer = true;
        document.body.appendChild(main);
        return;
      }
      const el = document.createElement('script');
      el.src = vendors[i];
      el.defer = true;
      el.onload = () => loadSequential(i + 1);
      document.body.appendChild(el);
    };
    loadSequential();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: portfolioHtml }} />;
}
