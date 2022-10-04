// @ts-check

const express = require('express');

const server = express();

const PORT = 5000;

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
server.set('view engine', 'ejs');
server.set('views', 'views');

server.use('/index', indexRouter);
server.use('/user', userRouter);

server.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.end(err.message);
});

server.listen(PORT, () => {
  console.log(`지금은 ${PORT}로 작동중입니다.`);
});
