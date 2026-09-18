const puppeteer = require('puppeteer');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
    
    // Wait for GSAP preloader to finish
    await sleep(5500);
    
    // Hero section
    await page.screenshot({ path: '/tmp/s1_hero.png', fullPage: false });
    
    // Scroll to about
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await sleep(1500);
    await page.screenshot({ path: '/tmp/s2_about.png', fullPage: false });
    
    // Scroll to credentials/certs
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 4.5));
    await sleep(1500);
    await page.screenshot({ path: '/tmp/s4_certs.png', fullPage: false });
    
    // Scroll to experience
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 7));
    await sleep(1500);
    await page.screenshot({ path: '/tmp/s5_experience.png', fullPage: false });
    
    await browser.close();
    console.log('Done');
})();
