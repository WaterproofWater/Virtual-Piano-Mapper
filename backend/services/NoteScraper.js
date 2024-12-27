import puppeteer from 'puppeteer';

export const NoteScraper = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: 'shell' });

    const page = await browser.newPage();
    await page.goto(url);

    



    await browser.close();

    // Test data
    const songData = {
      title: 'a',
      author: 'b',
      notes: 'c',
    };

    return songData;
  } 
  catch (error) {
    console.error('Error scraping song:', error);
    throw new Error('Error scraping the song');
  }
};
