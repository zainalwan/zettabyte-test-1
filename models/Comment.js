'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    content: String,
});

const Comment = new mongoose.model('Comment', schema);

module.exports = Comment;
