// @ts-check

const express = require('express');

const router = express.Router();

const POST = [
  {
    id: 'money',
    title: 'richman',
    content: 'richman life',
  },
  {
    id: 'war',
    title: 'weapon',
    content: 'weapon',
  },
];

router.get('/', (req, res) => {
  const postLen = POST.length;
  res.render('main', { POST, pageCounts: postLen, imageName: 'image2.png' });
});

router.get('/:id', (req, res) => {
  const postData = POST.find((post) => post.id === req.params.id);
  if (postData) {
    res.send(postData);
  } else {
    const err = new Error('POST not found');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (req.query.id && req.query.title && req.query.content) {
    const newPost = {
      id: req.query.id,
      title: req.query.title,
      content: req.query.content,
    };
    POST.push(newPost);
    res.send('새로운 글 등록 완료');
  } else {
    const err = new Error('POST not found');
    err.statusCode = 404;
    throw err;
  }
});
router.post('/:id', (req, res) => {
  if (req.query.id && req.query.title && req.query.content) {
    const postData = POST.findIndex((post) => post.id === req.params.id);
    if (postData) {
      const arrIndex = POST.findIndex((post) => post.id === req.params.id);
      const modifyPost = {
        id: req.query.id,
        title: req.query.title,
        content: req.query.content,
      };
      POST[arrIndex] = modifyPost;
      res.send('수정이 완료되었습니다');
    } else {
      const err = new Error('POST not found');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('unexpeted query');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/:id', (req, res) => {
  const arrIndex = POST.findIndex((post) => post.id === req.params.id);
  if (arrIndex !== -1) {
    POST.splice(arrIndex, 1);
    res.send('삭제 완료되었습니다.');
  } else {
    const err = new Error('POST not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
