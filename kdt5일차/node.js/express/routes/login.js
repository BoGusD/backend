// @ts-check
const express = require('express');

const passport = require('passport');

const mongoClient = require('./mongo');

const router = express.Router();

const isLogin = (req, res, next) => {
  if (req.session.login || req.user || req.signedCookies.user) {
    next();
  } else {
    res.status(300);
    res.send(
      '로그인이 필요한 서비스 입니다.<br><a href="/login">로그인 페이지로 이동</a><br><a href="/">메인 페이지로 이동</a>'
    );
  }
};

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
    req.login(user, (err) => {
      if (err) next(err);
      res.cookie('user', req.body.id, {
        expires: new Date(Date.now() + 1000 * 60),
        httpOnly: true,
        signed: true,
      });
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

router.get('/auth/naver', passport.authenticate('naver'));

router.get(
  '/auth/naver/callback',
  passport.authenticate('naver', {
    successRedirect: '/review',
    failureRedirect: '/',
  })
);
router.get('/auth/kakao', passport.authenticate('kakao'));

router.get(
  '/auth/kakao/callback',
  passport.authenticate('kakao', {
    successRedirect: '/review',
    failureRedirect: '/',
  })
);

module.exports = { router, isLogin };
