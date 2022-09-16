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
// MongoClient.connect(uri, (err, db) => {
//   const data = db.db('kdt1').collection('review');

//   data.find({}).toArray((err, result) => {
//     const ARTICLE = result;
//     const articlelen = ARTICLE.length;
//     res.render('review', { ARTICLE, articleCounts: articlelen });
//   });
// });

// 글 전체 목록 보여주기
// html을 보여줄 때
//   res.write('<h1>Welcome</h1>');

// router.get('/write', isLogin, (req, res) => {
//   res.render('review_write');
//   // 글 쓰기 모드로 이동
// });

router.get('/write', (req, res) => {
  res.render('review_write');
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
router.get('/modify/:title', isLogin, async (req, res) => {
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

router.post('/modify/:title', isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('review');
  await cursor.updateOne(
    { title: req.params.title },
    { $set: { title: req.body.title, content: req.body.content } }
  );
  res.redirect('/review');
});

// if (req.body.title && req.body.content) {
//   MongoClient.connect(uri, (err, db) => {
//     const data = db.db('kdt1').collection('review');
//     data.updateOne(
//       { title: req.params.title },
//       {
//         $set: {
//           title: req.body.title,
//           content: req.body.content,
//         },
//       },
//       (err, result) => {
//         if (err) {
//           throw err;
//         } else {
//           res.redirect('/review');
//         }
//       }
//     );
//   });
//   const arrIndex = ARTICLE.findIndex(
//     (article) => article.title === req.params.title
//   );
//   ARTICLE[arrIndex].title = req.body.title;
//   ARTICLE[arrIndex].content = req.body.content;
//   res.redirect('/review');

// 글 수정 기능 수행

router.delete('/delete/:title', isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('review');
  const result = await cursor.deleteOne({ title: req.params.title });

  if (result.acknowledged) {
    res.send('삭제완료');
  } else {
    const err = new Error('삭제 실패');
    err.statusCode = 404;
    throw err;
  }
});

// MongoClient.connect(uri, (err, db) => {
//   const data = db.db('kdt1').collection('review');

//   data.deleteOne({ title: req.params.title }, (err, result) => {
//     if (err) {
//       throw err;
//     } else {
//       res.send('삭제 완료');
//     }
//   });

// const arrIndex = ARTICLE.findIndex(
//   (article) => article.title === req.params.title
// );
// // findIndex는 값을 못찾았을 때 -1값을 반환함
// if (arrIndex !== -1) {
//   ARTICLE.splice(arrIndex, 1);
//   res.send('삭제 완료');
// } else {
//   const err = new Error('해당 제목을 가진 글이 없습니다.');
//   err.statusCode = 404;
//   throw err;
// }
// 글 삭제 기능 수행

// 실제 기능들

module.exports = router;
