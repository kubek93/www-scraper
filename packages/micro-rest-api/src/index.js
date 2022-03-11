require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const queryRoutes = require('./routes/v1/query.route');

const app = express();
app.use(cors()) //https://www.npmjs.com/package/cors
app.use(express.json()); //https://expressjs.com/en/api.html#express.json


async function main() {
    const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_URL}`;
    const client = await MongoClient.connect(url);
    const db = client.db(process.env.MONGO_DB_NAME);
    const collection = db.collection(process.env.MONGO_DB_TABLE);
    app.locals.collection = collection;

    const server = app.listen(process.env.MICRO_SERVICE_PORT, () => {
        app.use('/v1', queryRoutes);
        return `Listening to port ${process.env.MICRO_SERVICE_PORT}`;
    });

    return 'Server started...';
}

main()
    .then(console.log)
    .catch(console.error)
    // .finally(() => client.close());

module.exports = app;
