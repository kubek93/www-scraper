const express = require("express");
const mongo = require('mongodb');
const router = express.Router();
const fetch = require('node-fetch');

router
    .route('/queries')
        .get(async (req, res) => {
            const collection = req.app.locals.collection;
            const findResult = await collection.find({}).toArray();

            res.send(findResult);
        })
        .post(async (req, res) => {
            try {
                const collection = req.app.locals.collection;
                const insertData = await collection.insertMany([ req.body ]);

                res.send(insertData);
            }
            catch(err) {
                console.error(err);
                res.send("error");
            }
        })
        .patch(async (req, res) => {
            try {
                const { queryId } = req.query;
                const { status } = req.body;
                const foundItem = await req.app.locals.collection.find({ _id: new mongo.ObjectID(queryId) }).toArray();
                Object.assign(foundItem[0], {
                    status
                });

                await req.app.locals.collection.updateOne({ _id: new mongo.ObjectID(queryId) }, { $set: foundItem[0] });
                // TODO: Fix restart app
                // await fetch('http://localhost:5001/restart');
                res.send(foundItem[0]);
            }
            catch(err) {
                console.error(err);
                res.send("error");
            }
        })
        .delete(async (req, res) => {
            try {
                const { queryId } = req.query;
                const collection = req.app.locals.collection;
                await collection.deleteMany({ _id: new mongo.ObjectID(queryId) });

                res.send({ queryId });
            }
            catch(err) {
                console.error(err);
                res.send("error");
            }
        })

router
    .route('/queries/:queryId/results')
    .post(async (req, res) => {
        try {
            const { queryId } = req.params;
            const { isError, value } = req.body;
            const foundItem = await req.app.locals.collection.find({ _id: new mongo.ObjectID(queryId) }).toArray();
            const lastValues = (foundItem && foundItem.length) && foundItem[0].values || [];

            Object.assign(foundItem[0], {
                isError,
                lastResult: value,
                values: [ ...lastValues, {
                    date: new Date(),
                    value
                }]
            });

            await req.app.locals.collection.updateOne({ _id: new mongo.ObjectID(queryId) }, { $set: foundItem[0] });
            res.send(foundItem[0]);
        }
        catch(err) {
            console.error(err);
            res.send("error");
        }
    });

module.exports = router;
