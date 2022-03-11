const puppeteer = require('puppeteer');
const cron = require('node-cron');
const express = require('express');
const cors = require('cors')

const fetchMethods = require('./utils/fetchMethods');
const checkSingleWebsite = require('./jobs/checkSingleWebsite');
const app = express();
app.use(cors())

puppeteer.launch({
    headless: false,
    // headless: true,
})
    .then(browser => {
        fetchMethods
            .getQueries()
            .then(queries => {
                queries.forEach(query => {
                    console.log('query', query);

                    if (query.status === 'RUNNING') {
                        console.log(`START TASK: "${query.name}" using CRON: "${query.cron}".`);
                        checkSingleWebsite(query, browser);

                        cron.schedule(query.cron, () => {
                            checkSingleWebsite(query, browser);
                        });
                    }
                });
            });

        app.get('/restart', function (req, res, next) {
            console.log('RESTART - SERVER START');
            browser
                .close()
                .then(() => {
                    console.log('RESTART - CLOSE BROWSER');
                    res.send({ status: "ok" });
                    process.exit(1);
                })
                .catch(error => {
                    console.error('RESTART - ERROR - DO NOT CLOSED BROWSER...');
                    console.error(error);
                });
        });

        app.listen(5001, () => {
            console.info(`Listening to port 5001.`);
        });
    })
