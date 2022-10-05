'use strict';

const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type Comment {
        id: String
        content: String
    }

    type Article {
        id: String
        title: String
        content: String
        comments: [Comment]
    }

    type Query {
        comment(id: String!): Comment
        comments: [Comment]
        articles(title: String): [Article]
    }

    type Mutation {
        createComment(content: String): Comment
        updateComment(id: String!, content: String): Comment
        deleteComment(id: String!): Comment
        deleteArticle(id: String!): Article
    }
`);

module.exports = schema;
