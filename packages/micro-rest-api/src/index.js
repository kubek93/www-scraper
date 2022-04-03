require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const queryRoutes = require('./routes/v1/query.route');

const app = express();
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true)
    },
    optionsSuccessStatus: 200
})) //https://www.npmjs.com/package/cors
app.use(express.json()); //https://expressjs.com/en/api.html#express.json

async function main() {
    console.log('CONNECTING WITH DATABASE...');
    const client = await MongoClient.connect(process.env.CONFIG_MONGODB_URL);
    const db = client.db(process.env.CONFIG_MONGO_DB_NAME);
    const collection = db.collection(process.env.CONFIG_MONGO_DB_TABLE);
    app.locals.collection = collection;

    const server = app.listen(process.env.CONFIG_MICRO_SERVICE_PORT, () => {
        app.use('/v1', queryRoutes);
        return `Listening to port ${process.env.CONFIG_MICRO_SERVICE_PORT}`;
    });

    return 'SERVER STARTED...';
}

main()
    .then(console.log)
    .catch(console.error)
    // .finally(() => client.close());

module.exports = app;
