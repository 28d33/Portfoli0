const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    
    console.log('Navigating to http://127.0.0.1:3000 ...');
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded', timeout: 10000 });
    
    // Wait for preloader animation to complete (3.2 seconds)
    console.log('Waiting for preloader animation...');
    await new Promise(r => setTimeout(r, 3500));
    
    // 1. Screenshot Hero Section
    await page.screenshot({ path: '/tmp/screenshot_1_hero.png' });
    console.log('Saved /tmp/screenshot_1_hero.png');

    // 2. Scroll to Manifesto Section (#about)
    await page.evaluate(() => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: '/tmp/screenshot_2_manifesto.png' });
    console.log('Saved /tmp/screenshot_2_manifesto.png');

    // 3. Scroll to Horizontal Showcase Section (#horizontal-work)
    await page.evaluate(() => {
        const el = document.getElementById('horizontal-work');
        if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: '/tmp/screenshot_3_showcase_start.png' });
    console.log('Saved /tmp/screenshot_3_showcase_start.png');

    // 4. Scroll down through Horizontal Showcase
    await page.evaluate(() => {
        window.scrollBy(0, 1000);
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: '/tmp/screenshot_4_showcase_mid.png' });
    console.log('Saved /tmp/screenshot_4_showcase_mid.png');

    // 5. Scroll to Capabilities (#capabilities)
    await page.evaluate(() => {
        const el = document.getElementById('capabilities');
        if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: '/tmp/screenshot_5_capabilities.png' });
    console.log('Saved /tmp/screenshot_5_capabilities.png');

    await browser.close();
    console.log('All screenshots captured successfully.');
})();
