const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { sendResult } = require('../utils/fetchMethods');

const checkSingleWebsite = async (queryData) => {
    console.info(`START TASK: "${queryData.name}" using CRON: "${queryData.cron}". Date: ${new Date()}`);

    const browser = await puppeteer.launch({
        // args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--ignore-certificate-errors', '--disable-web-security', '--disable-features=IsolateOrigins', '--disable-site-isolation-trials'],
        args: [
            '--no-sandbox', //added because of https://stackoverflow.com/questions/50662388/running-headless-chrome-puppeteer-with-no-sandbox
            '--disable-dev-shm-usage', //added because of https://github.com/puppeteer/puppeteer/issues/6258
            '--single-process'
        ],
        // executablePath: '/usr/bin/chromium-browser', //not default browser executable path
        headless: true,
    });
    const page = await browser.newPage();

    try {
        const { url, selector, _id } = queryData;
        await page.setViewport({
            width: 1600,
            height: 900,
            deviceScaleFactor: 1,
        });
        await page.goto(url, {
            timeout: 0
        });

        const content = await page.content();
        const $ = cheerio.load(content);
        const foundElement = $(selector);

        if (foundElement.length === 0) {
            await sendResult(_id, 'SELECTOR NOT FOUND', true);
        } else {
            const value = foundElement.text();
            await sendResult(_id, value);
        }

        await page.close();
        await browser.close();
        console.log('BROWSER CLOSED.');
        return { ok: true };
    } catch(error) {
        await page.close();
        throw new Error(error);
    }
}

module.exports = checkSingleWebsite;
