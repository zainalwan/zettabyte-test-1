'use strict';

const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type Comment {
        id: String
        content: String
    }

    type Query {
        comment(id: String!): Comment
        comments: [Comment]
    }

    type Mutation {
        createComment(content: String): Comment
        updateComment(id: String!, content: String): Comment
        deleteComment(id: String!): Comment
    }
`);

module.exports = schema;
