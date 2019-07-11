const express = require('express');
const server = express();

require('dotenv').config()

const port = process.env.PORT;

//Routes
const postRoutes = require('./Routes/PostRoutes.js');

server.use(express.json());
server.use('/api/posts', postRoutes);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});



server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port}***\n`);
});