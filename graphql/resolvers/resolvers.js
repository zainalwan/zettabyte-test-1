'use strict';

const {
    articles
} = require('./article');
const {
    createComment,
    comment,
    comments,
    updateComment,
    deleteComment,
} = require('./comment');

module.exports = {
    articles,
    createComment,
    comment,
    comments,
    updateComment,
    deleteComment,
}
