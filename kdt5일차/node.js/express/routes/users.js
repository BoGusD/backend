// @ts-check

const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'animal',
    name: '강지훈',
    email: 'animal@naver.com',
  },
  {
    id: 'test',
    name: '테스트맨',
    email: 'test@naver.com',
  },
];

router.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('index', { USER, userCounts: userLen, imgName: 'image1.jpg' });
  // res.write('<h1>Hello, Dynmaic Web page</h1>');
  // i++ = i + = 1
  // for (let i = 0; i < USER.length; i++) {
  //   res.write(`<h2>USER ID는 ${USER[i].id}`);
  //   res.write(`<h2>USER ID는 ${USER[i].name}`);
  // }
  // res.send(USER);
});

router.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
      email: req.query.email,
    };
    USER.push(newUser);
    res.send('회원 등록 완료!');
  } else {
    const err = new Error('unexpeted query');
    err.statusCode = 404;
    throw err;
  }
});

router.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const userData = USER.findIndex((user) => user.id === req.params.id);

    if (userData) {
      const arrIndex = USER.findIndex((user) => user.id === req.params.id);
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[arrIndex] = modifyUser;
      res.send('수정이 완료되었습니다.');
    } else {
      const err = new Error('ID not found');
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
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('삭제 완료되었습니다.');
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
