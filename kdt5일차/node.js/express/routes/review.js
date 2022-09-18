// @ts-check

const express = require('express');

const router = express.Router();

const mongoClient = require('./mongo');

function isLogin(req, res, next) {
  if (req.session.login || req.user) {
    next();
  } else {
    res.status(300);
    res.send(
      '로그인이 필요한 서비스 입니다.<br><a href="/login">로그인 페이지로 이동</a>'
    );
  }
}

// '/' ='localhost:4000/board/'
router.get('/', isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('review');
  const ARTICLE = await cursor.find({}).toArray();
  const articlelen = ARTICLE.length;
  res.render('review', {
    ARTICLE,
    articleCounts: articlelen,
    userId: req.session.userId ? req.session.userId : req.user.id,
  });
});

router.get('/write', (req, res) => {
  res.render('/review_write');
});

router.post('/write', isLogin, async (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      id: req.session.userId,
      title: req.body.title,
      content: req.body.content,
    };

    const client = await mongoClient.connect();
    const cursor = client.db('kdt1').collection('review');
    await cursor.insertOne(newArticle);
    res.redirect('/review');

    // MongoClient.connect(uri, (err, db) => {
    //   const data = db.db('kdt1').collection('review');

    //   data.insertOne(newArticle, (err, result) => {
    //     res.redirect('/review');
    //   });
    // });
  } else {
    const err = new Error('데이터가 없습니다');
    err.statusCode = 404;
    throw err;
  }
});
router.get('/modify/title/:title', isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('review');
  const selectedArticle = await cursor.findOne({ title: req.params.title });
  res.render('review_modify', { selectedArticle });
});

// 글 기존 데이터를 수정 데이터 페이지에 받아오려면
// MongoClient.connect(uri, (err, db) => {
//   const data = db.db('kdt1').collection('review');
//   data.findOne({ title: req.params.title }, (err, result) => {
//     if (err) {
//       throw err;
//     } else {
//       const selectedArticle = result;
//       res.render('review_modify', { selectedArticle });
//     }
//   });
// });
// 글 수정 모드로 이동

router.post('/modify/title/:title', isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('review');
  await cursor.updateOne(
    { title: req.params.title },
    { $set: { title: req.body.title, content: req.body.content } }
  );
  res.redirect('/review');
});

router.delete('/delete/title/:title', isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('review');
  const result = await cursor.deleteOne({ title: req.params.title });

  if (result) {
    res.send('삭제완료');
  } else {
    const err = new Error('삭제 실패');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
