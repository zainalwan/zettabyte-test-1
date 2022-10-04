'use strict';

const Comment = require('../../models/Comment');

const createComment = async ({content}) => {
    let comment = await Comment.create({
        content: content
    });
    return comment;
};

const comment = async ({id}) => {
    let comment = await Comment.findById(id).exec();
    return comment;
};

const comments = async () => {
    let comments = await Comment.find();
    return comments;
};

const updateComment = async ({id, content}) => {
    let comment = await Comment.findById(id).exec();
    comment.content = content;
    await comment.save();
    return comment;
};

const deleteComment = async ({id}) => {
    let comment = await Comment.findById(id).exec();
    await comment.remove();
    return comment;
};

module.exports = {
    createComment,
    comment,
    comments,
    updateComment,
    deleteComment,
};
