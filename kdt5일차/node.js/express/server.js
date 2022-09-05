// @ts-check

const express = require('express');

const app = express();
const PORT = 4000;

const userRouter = require('./routes/users');

const postsRouter = express.Router();

// view engine 세팅
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/users', userRouter);
app.use('/posts', postsRouter);

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.end(err.message);
});

// postsRouter.get('/', (req, res) => {
//   res.send('블로그 글 목록');
// });

// postsRouter.post('/:title', (req, res) => {
//   res.send(`제목이 ${req.params.title} 인 글이 등록 되었습니다.`);
// });

// app.get('/', (req, res) => {
//   res.send('GET request');
// });

// app.post('/', (req, res) => {
//   res.send('POST request');
// });

// app.put('/', (req, res) => {
//   res.send('PUT request');
// });

// app.delete('/', (req, res) => {
//   res.send('DELETE request');
// });

// app.get('/:email/:password/:name/:gender', (req, res) => {
//   console.log(req.params);

//   res.send(req.params);
// });

// app.get('/', (req, res) => {
//   const q = req.query;
//   if (q.email && q.password && q.name && q.gender) {
//     res.send(req.query);
//   } else {
//     res.send('unexpected query');
//   }
//   console.log(req.query);

//   res.send(req.query);
// });

// app.use('/', async (req, res, next) => {
//   console.log('미들웨어 1번');

//   req.reqTime = new Date();
//   req.fileContent = await fs.promises.readFile('package.json', 'utf-8');

//   next();
// });

// app.use((req, res, next) => {
//   console.log(req.reqTime);
//   console.log(req.fileContent);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('미들웨어 3번');
//   res.send('통신 종료');
//   next();
// });

app.listen(PORT, () => {
  console.log(`The express server is running at ${PORT}`);
});
