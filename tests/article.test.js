'use strict';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Comment = require('../models/Comment');
const Article = require('../models/Article');

describe('Article resource test', () => {
    let comments;
    let articles;

    beforeEach(async () => {
        comments = await Comment.insertMany([
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

        articles = await Article.insertMany([
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
    });

    afterEach(async () => {
        for (let comment of comments) {
            await comment.remove();
        }
        for (let article of articles) {
            await article.remove();
        }
    });

    afterAll(async () => {
        mongoose.disconnect();
    });

    it('Should get all articles', async () => {
        let query = `query {
            articles {
                id
                title
                content
            }
        }`;
        let response = await request(app).post('/graphql').send({query: query});
        expect(response.status).toBe(200);
        expect(response.body.data.articles)
            .toEqual(expect.arrayContaining(articles.map(article => {
                return {
                    id: article._id.toString(),
                    title: article.title,
                    content: article.content,
                };
            })));
    });

    it('Should get filtered articles', async () => {
        let query = `query {
            articles(title: "Second") {
                id
                title
                content
            }
        }`;
        let response = await request(app).post('/graphql').send({query: query});
        expect(response.status).toBe(200);
        expect(response.body.data.articles[0].title).toBe('Second');
    });

    it('Should get and sort articles', async () => {
        let query = `query {
            articles(sortBy: "title") {
                title
            }
        }`;
        let response = await request(app).post('/graphql').send({query: query});
        expect(response.status).toBe(200);
        expect(response.body.data.articles[0].title).toBe('Fifth');
    });

    it('Should delete an article', async () => {
        let articleId = articles[0]._id.toString();
        let query = `mutation {
            deleteArticle(id: "${articleId}") {
                id
                title
                content
            }
        }`;
        let response = await request(app).post('/graphql').send({query: query});
        expect(response.status).toBe(200);
        let article = await Article.findById(articleId).exec();
        expect(article).toBeNull();
    });
});
