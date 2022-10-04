'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers/resolvers');

(async () => {
    await mongoose.connect(process.env.DB_URL, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
    });
})();

const app = express();

app.use(logger('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.options('/graphql', cors());
app.get('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));
app.post('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: false,
}));

module.exports = app;
