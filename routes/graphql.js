const express = require('express');
const router = express.Router();
const {graphql} = require('graphql');
const schema = require('../graphql/schema');
const resolvers = require('../graphql/resolvers/resolvers');

router.post('/', async (req, res, next) => {
    let result = await graphql({
        source: req.body.query,
        schema: schema,
        rootValue: resolvers,
    });
    res.json(result);
});

module.exports = router;
