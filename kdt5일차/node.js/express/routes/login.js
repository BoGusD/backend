// @ts-check
const express = require('express');

const passport = require('passport');

const mongoClient = require('./mongo');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});
// passport로 로그인 체크 구현.
router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) {
      return res.send(
        `${info.message}<br><a href="/login">로그인 페이지로 이동</a>`
      );
    }
    req.logIn(user, (err) => {
      if (err) next(err);
      res.redirect('/review');
    });
  })(req, res, next);
});
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
});

// session을 통해 로그인을 구현 한거
// router.post('/', async (req, res) => {
//   const client = await mongoClient.connect();
//   const userCursor = client.db('kdt1').collection('users');
//   const idResult = await userCursor.findOne({
//     id: req.body.id,
//   });
//   if (idResult !== null) {
//     if (idResult.password === req.body.password) {
//       req.session.login = true;
//       req.session.userId = req.body.id;
//       res.redirect('/board');
//     } else {
//       res.status(404);
//       res.send(
//         '비밀번호가 틀렸습니다.<br><a href="/login">로그인 페이지로 이동</a>'
//       );
//     }
//   } else {
//     res.status(404);
//     res.send(
//       '해당 id 가 없습니다.<br><a href="/login">로그인 페이지로 이동</a>'
//     );
//   }
// });
// router.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) throw err;
//     res.redirect('/');
//   });
// });

module.exports = router;
