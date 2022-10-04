const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'bogus',
    name: '천해성',
    email: 'qazxwd44@hanmail.net',
  },
  {
    id: 'test',
    name: 'test',
    email: 'test@naver.com',
  },
];
router.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('user', {
    USER,
    userCounts: userLen,
    imgName: './images/images1.jpeg',
  });
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
  if (Object.keys(req.query).length >= 1) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.redirect('/user');
    } else {
      const err = new Error('unexpeted query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.id && req.body.name && req.body.email) {
      const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      };
      USER.push(newUser);
      res.redirect('/user');
    } else {
      const err = new Error('unexpeted Form data');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
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
