'use strict';

const Comment = require('../../models/Comment');
const Article = require('../../models/Article');

const articles = async ({title, sortBy, skip, limit}) => {
    let articles = Article.find();
    if (title) articles.where({title: new RegExp(title, 'g')});
    if (sortBy) articles.sort(sortBy);
    if (skip) articles.skip(skip);
    if (limit) articles.limit(limit);
    articles = await articles.exec();
    articles = articles.map(async article => {
        let comments = await Comment.find({_id: {$in: article.comments}});
        article.comments = comments;
        return article;
    });
    return articles;
};

const deleteArticle = async ({id}) => {
    let article = await Article.findById(id).exec();
    await article.remove();
    return article;
};

module.exports = {
    articles,
    deleteArticle,
};
