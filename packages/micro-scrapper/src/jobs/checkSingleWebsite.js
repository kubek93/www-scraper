const cheerio = require('cheerio');
const { sendResult } = require('../utils/fetchMethods');

const checkSingleWebsite = async (queryData, browser) => {
    const { url, selector, _id } = queryData;

    const page = await browser.newPage();

    await page.setViewport({
        width: 1600,
        height: 900,
        deviceScaleFactor: 1,
    });

    try {
        await page.goto(url, {
            timeout: 0
        });

        const content = await page.content();
        const $ = cheerio.load(content);
        await page.waitForSelector(selector);
        const foundElement = $(selector);

        if (foundElement.length === 0) {
            await sendResult(_id, 'SELECTOR NOT FOUND', true);
        } else {
            const value = foundElement.text();
            await sendResult(_id, value);
        }

        await page.close();
    } catch(error) {
        await page.close();
        await sendResult(_id, error.originalMessage ? error.originalMessage : "UNDEFINED ERROR MESSAGE", true);
    }
}

module.exports = checkSingleWebsite;
