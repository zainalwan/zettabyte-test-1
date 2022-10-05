'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Comment = require('./models/Comment');
const Article = require('./models/Article');

(async () => {
    await mongoose.connect(process.env.DB_URL, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
    });

    let comments = await Comment.insertMany([
        {
            content: 'This is the first comment',
        },
        {
            content: 'This is the second comment',
        },
        {
            content: 'This is the third comment',
        },
        {
            content: 'This is the fourth comment',
        },
        {
            content: 'This is the fifth comment',
        },
        {
            content: 'This is the sixth comment',
        },
    ]);

    let articles = await Article.insertMany([
        {
            title: 'First',
            content: 'The first article',
            comments: [comments[0]._id],
        },
        {
            title: 'Second',
            content: 'The second article',
            comments: [comments[1]._id],
        },
        {
            title: 'Third',
            content: 'The third article',
            comments: [comments[2]._id],
        },
        {
            title: 'Fourth',
            content: 'The fourth article',
            comments: [comments[3]._id],
        },
        {
            title: 'Fifth',
            content: 'The fifth article',
            comments: [comments[4]._id],
        },
        {
            title: 'Sixth',
            content: 'The sixth article',
            comments: [comments[5]._id],
        },
    ]);

    await mongoose.disconnect();
})();
