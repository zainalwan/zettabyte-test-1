'use strict';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Comment = require('../models/Comment');

describe('Comment resource test', () => {
    let comments;

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
    });

    afterEach(async () => {
        for (let comment of comments) {
            await comment.remove();
        }
    });

    afterAll(async () => {
        mongoose.disconnect();
    })

    it('Should get comment by ID', async () => {
        let commentId = comments[0]._id.toString();
        let query = `query {
            comment(id: "${commentId}") {
                id
                content
            }
        }`;
        let response = await request(app).post('/graphql').send({query: query});
        expect(response.status).toBe(200);
        expect(response.body.data.comment.id).toBe(commentId);
    });

    it('Should get all comments', async () => {
        let query = `query {
            comments {
                id
                content
            }
        }`;
        let response = await request(app).post('/graphql').send({query: query});
        expect(response.status).toBe(200);
        expect(response.body.data.comments)
            .toEqual(expect.arrayContaining(comments.map(comment => {
                return {
                    id: comment._id.toString(),
                    content: comment.content
                };
            })));
    });

    it('Should create a comment', async () => {
        let query = `mutation {
            createComment(content: "This is a new comment") {
                id
                content
            }
        }`;
        let response = await request(app).post('/graphql').send({query: query});
        expect(response.status).toBe(200);
        expect(response.body.data.createComment.content)
            .toBe('This is a new comment');

        await Comment.findByIdAndDelete(response.body.data.createComment.id)
            .exec();
    });

    it('Should update a comment', async () => {
        let commentId = comments[0]._id.toString();
        let query = `mutation {
            updateComment(id: "${commentId}", content: "Updated") {
                id
                content
            }
        }`;
        let response = await request(app).post('/graphql').send({query: query});
        expect(response.status).toBe(200);
        let comment = await Comment.findById(commentId).exec();
        expect(comment.content).toBe('Updated');
    });

    it('Should delete a comment', async () => {
        let commentId = comments[0]._id.toString();
        let query = `mutation {
            deleteComment(id: "${commentId}") {
                id
                content
            }
        }`;
        let response = await request(app).post('/graphql').send({query: query});
        expect(response.status).toBe(200);
        let comment = await Comment.findById(commentId).exec();
        expect(comment).toBeNull();
    });
});
