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

    it('Should get all comments', async () => {
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
            .toEqual(expect.arrayContaining(comments.map(article => {
                return {
                    id: article._id.toString(),
                    title: article.title,
                    content: article.content,
                };
            })));
    });
});
