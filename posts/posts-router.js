// global variables
const express = require('express');
const db = require('../data/db');
const router = express.Router();

// middleware
router.use(express.json());

// get db
router.get('/', (req, res) => {
  db.find()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({
      error: "The posts information could not be retrieved."
    }));
});
// get by id
router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(data => {
      if (data.length) {
        res.json(data);
      }
      else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => res.status(500).json({
      error: "The posts information could not be retrieved."
    }));
});
// post new post
router.post('/', (req, res) => {
  const reqBodyData = { "title": req.body.title, "contents": req.body.contents };
  const reqBodyDataIsComplete = req.body.title && req.body.contents;

  if (reqBodyDataIsComplete) {
    db.insert(reqBodyData)
    .then(data => req.status(201).json(data))
    .catch(err => res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    }))
  }
  else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  }
});
// update current post
router.put('/:id', (req, res) => {
  const reqBodyData = { "title": req.body.title, "contents": req.body.contents };
  const reqBodyDataIsComplete = req.body.title && req.body.contents;

  if (reqBodyDataIsComplete) {
    db.update(req.params.id, reqBodyData)
    .then(data => {
      if (data.length) {
        req.status(201).json(data);
      }
      else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    }))
  }
  else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  }
});
// delete post by id
router.delete('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(data => {
      if (data.length) {
        db.find()
          .then(data => {
            const newData = data.filter(d => d.id !== Number(req.params.id))
            res.json(newData);
          })
      }
      else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => res.status(500).json({
      error: "The post could not be removed"
    }));
});

module.exports = router;