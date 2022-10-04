'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const graphqlRouter = require('./routes/graphql');

(async () => {
    await mongoose.connect(process.env.DB_URL, {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
    });
})();

const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/graphql', graphqlRouter);

module.exports = app;
