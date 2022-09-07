// @ts-check

const express = require('express');

const bodyParser = require('body-parser');

const server = express();
const PORT = 5000;
const postRouter = require('./routes/post');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.set('view engine', 'ejs');
server.set('views', 'views');

server.use('/post', postRouter);

server.use(express.static('public'));

server.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.end(err.message);
});

server.listen(PORT, () => {
  console.log(`The express server is running at ${PORT}`);
});
