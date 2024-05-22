// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

// middleware
app.use(bodyParser.json());

// generate comment array
const comments = [
  { id: 1, author: 'user1', content: 'comment1' },
  { id: 2, author: 'user2', content: 'comment2' },
  { id: 3, author: 'user3', content: 'comment3' }
];

// GET /comments
// get all comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// POST /comments
// add a comment
app.post('/comments', (req, res) => {
  const { author, content } = req.body;
  const id = comments.length + 1;
  const newComment = { id, author, content };
  comments.push(newComment);
  res.send(newComment);
});

// PUT /comments/:id
// modify a comment
app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { author, content } = req.body;
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    comment.author = author;
    comment.content = content;
    res.send(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// DELETE /comments/:id
// delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Comment not found');
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});