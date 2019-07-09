const express = require('express');
const server = express();


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



server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});