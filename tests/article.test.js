'use strict';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Article = require('../models/Article');

describe('Article resource test', () => {
    let articles;

    beforeEach(async () => {
        articles = await Article.insertMany([
            {
                title: 'First',
                content: 'The first article',
            },
            {
                title: 'Second',
                content: 'The second article',
            },
            {
                title: 'Third',
                content: 'The third article',
            },
            {
                title: 'Fourth',
                content: 'The fourth article',
            },
            {
                title: 'Fifth',
                content: 'The fifth article',
            },
            {
                title: 'Sixth',
                content: 'The sixth article',
            },
        ]);
    });

    afterEach(async () => {
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
            articles(title: "First") {
                id
                title
                content
            }
        }`;
        let response = await request(app).post('/graphql').send({query: query});
        expect(response.status).toBe(200);
        expect(response.body.data.articles)
            .toEqual(expect.arrayContaining([{
                id: articles[0]._id.toString(),
                title: articles[0].title,
                content: articles[0].content,
            }]));
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
