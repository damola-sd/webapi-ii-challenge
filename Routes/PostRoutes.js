const express = require('express');
const DB = require('../data/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await DB.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving the Posts'
        })
    }
})

router.get('/:id', async (req, res) => {
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
            error: error.toString()
        })
    }
})


router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await DB.findPostComments(req.params.id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving the Comments',
            error: error.toString()
        })
    }
})

router.post('/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const comments = await DB.insertComment({ text, post_id: id});
        console.log(comments);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        })
    }
})

router.post('/', async (req, res) => {
   try {
    const post = await DB.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
    });
  }
})

router.put('/:id', async (req, res) => {
    const { title, contents } = req.body;
    const { id } = req.params;
   try {
    const post = await DB.update(id, {title, contents});
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
    });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const count = await DB.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The post has been removed' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  }
});

module.exports = router; 
