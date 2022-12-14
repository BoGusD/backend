// @ts-check

const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const session = require('express-session');

const passport = require('passport');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

// cookieparser
app.use(cookieParser('bogus'));
// session
app.use(
  session({
    secret: 'BoGus',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
// passport
app.use(passport.initialize());
app.use(passport.session());

const router = require('./routes/index');
// const userRouter = require('./routes/users');
// const postRouter = require('./routes/post');
// const boardRouter = require('./routes/board');
// const writeRouter = require('./routes/write');
// const modifyRouter = require('./routes/modify');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const passportRouter = require('./routes/passport');
const chatRouter = require('./routes/chat');

passportRouter();

// review
const reviewRouter = require('./routes/review');

// view engine 세팅
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', router);
// app.use('/users', userRouter);
// app.use('/post', postRouter);
// app.use('/board', boardRouter.router);
// app.use('/write', writeRouter);
// app.use('/modify', modifyRouter);
app.use('/register', registerRouter.router);
app.use('/login', loginRouter.router);
app.use('/chat', chatRouter);
// review
app.use('/review', reviewRouter);

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
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
