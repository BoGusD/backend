// @ts-check

const express = require('express');

const multer = require('multer');

const router = express.Router();

const fs = require('fs');

const mongoClient = require('./mongo');

const login = require('./login');

const dir = 'uploads';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now());
  },
});

const limits = {
  fileSize: 1024 * 1024 * 2,
};

const upload = multer({ storage, limits });

// '/' ='localhost:4000/board/'
router.get('/', login.isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('review');
  const ARTICLE = await cursor.find({}).toArray();

  const articleLen = ARTICLE.length;
  res.render('review', {
    ARTICLE,
    articleCounts: articleLen,
    userId: req.session.userId
      ? req.session.userId
      : req.user?.id
      ? req.user?.id
      : req.signedCookies.user,
  });
});

router.get('/write', (req, res) => {
  res.render('review_write');
});

router.post('/write', login.isLogin, upload.single('img'), async (req, res) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  console.log(req.file);
  if (req.body.title && req.body.content) {
    const newArticle = {
      id: req.session.userId ? req.session.userId : req.user.id,
      userName: req.user?.name ? req.user.name : req.user?.id,
      title: req.body.title,
      content: req.body.content,
      img: req.file ? req.file.filename : null,
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
router.get('/modify/title/:title', login.isLogin, async (req, res) => {
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

router.post('/modify/title/:title', login.isLogin, async (req, res) => {
  console.log(req.user);
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('review');
  await cursor.updateOne(
    { title: req.params.title },
    { $set: { title: req.body.title, content: req.body.content } }
  );
  res.redirect('/review');
});

router.delete('/delete/title/:title', login.isLogin, async (req, res) => {
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
