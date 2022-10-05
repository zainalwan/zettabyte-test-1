'use strict';

const Article = require('../../models/Article');

const articles = async ({title, sortBy}) => {
    let articles = Article.find();
    if (title) articles.where({title: new RegExp(title, 'g')});
    if (sortBy) articles.sort(sortBy);
    articles = await articles.exec();
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
