# micro-scraper

## Parameters

- `puppeter:headless`

## MongoDb driver

## How to keep connection with database

```sh
const { MongoClient } = require('mongodb');

const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_URL}`;
const client = await MongoClient.connect(url);
const db = client.db(process.env.MONGO_DB_NAME);
const collection = db.collection(process.env.MONGO_DB_TABLE);
app.locals.collection = collection;

const collection = req.app.locals.collection;
const insertData = await collection.insertMany([ req.body ]);
```

## How to stop running

```sh
await page.evaluate(() => {
    debugger;
});
```
