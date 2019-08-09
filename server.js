// global variables
const express = require("express");
const postsRouter = require('./posts/posts-router.js');
const server = express();

// Middleware
server.use(express.json());
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send("<h1>Welcome to the posts page</h1>")
});

module.exports = server;