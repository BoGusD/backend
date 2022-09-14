// @ts-check

const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'title',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia delectus iustofugiat autem cupiditate adipisci quas, in consectetur repudiandae, soluta, suscipitdebitis veniam nobis aspernatur blanditiis ex ipsum tempore impedit.',
  },
  {
    title: 'title2',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia delectus iustofugiat autem cupiditate adipisci quas, in consectetur repudiandae, soluta, suscipitdebitis veniam nobis aspernatur blanditiis ex ipsum tempore impedit.',
  },
];

// '/' ='localhost:4000/board/'
router.get('/', (req, res) => {
  const articlelen = ARTICLE.length;
  res.render('review', { ARTICLE, articleCounts: articlelen });
  // 글 전체 목록 보여주기
  // html을 보여줄 때
  //   res.write('<h1>Welcome</h1>');
});

router.get('/write', (req, res) => {
  res.render('review_write');
  // 글 쓰기 모드로 이동
});

router.post('/write', (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newArticle);
    res.redirect('/review');
  } else {
    const err = new Error('데이터가 없습니다');
    err.statusCode = 404;
    throw err;
  }
  // 글 추가 기능 수행
});
router.get('/modify/title/:title', (req, res) => {
  // 글 기존 데이터를 수정 데이터 페이지에 받아오려면
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('review_modify', { selectedArticle });
  // 글 수정 모드로 이동
});

router.post('/modify/title/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/review');
  } else {
    const err = new Error('요청 값이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
  // 글 수정 기능 수행
});
router.delete('/delete/title/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  // findIndex는 값을 못찾았을 때 -1값을 반환함
  if (arrIndex !== -1) {
    ARTICLE.splice(arrIndex, 1);
    res.send('삭제 완료');
  } else {
    const err = new Error('해당 제목을 가진 글이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
  // 글 삭제 기능 수행
});

// 실제 기능들

module.exports = router;
