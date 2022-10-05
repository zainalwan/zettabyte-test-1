'use strict';

const Article = require('../../models/Article');

const articles = async ({title}) => {
    let articles;
    if (title) {
        articles = await Article.find({title: new RegExp(title, 'g')});
    } else {
        articles = await Article.find();
    }
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
