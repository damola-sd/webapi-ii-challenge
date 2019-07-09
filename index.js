const express = require('express');
const server = express();
const DB = require('./data/db.js');

server.use(express.json())


server.get('api/posts', async (req, res) => {
    try {
        const posts = await DB.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving the Posts',
            error: error.toString();
        })
    }
})

server.get('api/posts/:id', async (req, res) => {
    try {
        const post = await DB.findById(req.params.id)
        if (post) {
            res.status(200).json(post);
        }else {
            res.status(404).json({ message: 'Post not found' });
        }   
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving the post',
            error: error.toString();
        })
    }
})


server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});