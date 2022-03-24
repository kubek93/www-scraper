const schedule = require('node-schedule');
const express = require('express');
const cors = require('cors')

const fetchMethods = require('./utils/fetchMethods');
const checkSingleWebsite = require('./jobs/checkSingleWebsite');
const app = express();
app.use(cors())
app.use(express.json())

const main = async () => {
    console.log('START SCRAPER CORE...');

    try {
        const queries = await fetchMethods.getQueries();

        queries.forEach(async (query) => {
            if (query.status === 'RUNNING') {
                schedule.scheduleJob(query.cron, function() {
                    checkSingleWebsite(query);
                });
            }
        });
    } catch (error) {
        console.error('errorerrorerrorerror', error);
        throw new Error(error);
    }
}

app.get('/manualRun', async function (req, res, next) {
    const { queryId } = req.query;

    try {
        const queries = await fetchMethods.getQueries();
        const queryData = queries.find(query => query._id === queryId);
        const response = await checkSingleWebsite(queryData);

        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

// app.get('/restart', function (req, res, next) {
//     console.info('RESTART - SERVER START');
//     browser
//         .close()
//         .then(() => {
//             console.info('RESTART - CLOSE BROWSER');
//             res.send({ status: "ok" });
//             process.exit(1);
//         })
//         .catch(error => {
//             console.error('RESTART - ERROR - DO NOT CLOSED BROWSER...');
//             console.error(error);
//         });
// });

app.get('/scheduledJobs', function (req, res, next) {
    const listOfCurrentJobs = Object.values(schedule.scheduledJobs).map(job => ({
        name: job.name
    }))
    res.send(listOfCurrentJobs);
});

app.get('/ping', function (req, res, next) {
    res.send('pong');
});

app.listen(process.env.CONFIG_MICRO_SERVICE_PORT, () => {
    main();
    console.info(`Listening to port ${process.env.CONFIG_MICRO_SERVICE_PORT}.`);
});
