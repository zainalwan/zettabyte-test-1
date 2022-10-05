'use strict';

const {
    articles,
    deleteArticle,
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
    deleteArticle,
    createComment,
    comment,
    comments,
    updateComment,
    deleteComment,
}
