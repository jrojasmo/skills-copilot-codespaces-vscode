// Create web server using express
// Create a route for GET /comments
// Create a route for POST /comments
// Create a route for PUT /comments/:id
// Create a route for DELETE /comments/:id
// Create a route for GET /comments/:id

// Import express
const express = require('express');

// Create a router
const router = express.Router();

// Import database
const db = require('../db');

// Import uuid
const uuid = require('uuid/v4');

// Create a route for GET /comments
router.get('/', (req, res) => {
    // Get all comments from db
    const comments = db.get('comments').value();

    // Response with comments
    res.send(comments);
});

// Create a route for POST /comments
router.post('/', (req, res) => {
    // Get content from req.body
    const content = req.body.content;

    // Create a new comment
    const newComment = {
        id: uuid(),
        content: content,
        createdAt: new Date().getTime()
    };

    // Insert new comment to db
    db.get('comments').push(newComment).write();

    // Response with new comment
    res.send(newComment);
});

// Create a route for PUT /comments/:id
router.put('/:id', (req, res) => {
    // Get id from req.params
    const id = req.params.id;

    // Get content from req.body
    const content = req.body.content;

    // Update comment
    const updatedComment = db.get('comments').find({ id: id }).assign({ content: content }).write();

    // Response with updated comment
    res.send(updatedComment);
});

// Create a route for DELETE /comments/:id
router.delete('/:id', (req, res) => {
    // Get id from req.params
    const id = req.params.id;

    // Remove comment
    db.get('comments').remove({ id: id }).write();

    // Response with deleted comment
    res.send({ id: id });
});

// Create a route for GET /comments/:id
router.get('/:id', (req, res) => {
    // Get id from req.params
    const id = req.params.id;

    // Get comment
    const comment = db.get('comments').find({ id: id }).value();

    // Response with comment
    res.send(comment);
});

//