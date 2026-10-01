import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  const html = await page.content();
  console.log(html.substring(0, 2000));
  await browser.close();
})();
