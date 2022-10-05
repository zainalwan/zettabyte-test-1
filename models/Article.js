'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    content: String,
    comments: [{
        type: mongoose.ObjectId,
        ref: 'Comment'
    }]
});

const Article = new mongoose.model('Article', schema);

module.exports = Article;
