'use strict';

const Article = require('../../models/Article');

const articles = async () => {
    let articles = await Article.find();
    console.log(articles);
    return articles;
};

module.exports = {
    articles,
};
