# micro-rest-api

## How to find item by id

```sh
const mongo = require('mongodb');
# or just ObjectId object
const ObjectId = require('mongodb').ObjectID;

const item = await req.app.locals.collection.find({ _id: new mongo.ObjectID(queryId) }).toArray();
# or
const item = await req.app.locals.collection.find({ _id: new ObjectID(queryId) }).toArray();
```
