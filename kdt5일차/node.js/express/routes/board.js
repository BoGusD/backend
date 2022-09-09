// @ts-check

const express = require('express');

const router = express.Router();

const Board = [
  {
    title: 'richman',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Itaque a sapientia praecipitur se ipsam, si usus sit, sapiens ut relinquat. Quod cum accidisset ut alter alterum necopinato videremus, surrexit statim. Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. An vero, inquit, quisquam potest probare, quod perceptfum, quod',
  },
  {
    title: 'weapon',
    content:
      'lWeapons of Reason is a four-year, bi-annual magazine project by Creative agency "Human After All" based in London (UK). The 116-page magazine is using longform storytelling, illustration and striking data visualisations. Leading illustrators, including Jean Jullien and Adrian Johnson, were commissioned to provide an accessible way to approach the huge topic with great visual thinking.',
  },
];

router.get('/', (req, res) => {
  const BoardLen = Board.length;
  res.render('board', { Board, pageCounts: BoardLen, imageName: 'image2.png' });
});

router.get('/:title', (req, res) => {
  const BoardData = Board.find((board) => board.title === req.params.title);
  if (BoardData) {
    res.send(BoardData);
  } else {
    const err = new Error('Board not found');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const newBoard = {
        title: req.query.title,
        content: req.query.content,
      };

      Board.pop(newBoard);
      res.redirect('/Board');
    } else {
      const err = new Error('Board not found');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newBoard = {
        title: req.body.title,
        content: req.body.content,
      };

      Board.push(newBoard);
      res.redirect('/Board');
    } else {
      const err = new Error('Board not found');
      err.statusCode = 404;
      throw err;
    }
  }
});
router.post('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const BoardData = Board.findIndex(
      (board) => board.title === req.params.title
    );
    if (BoardData) {
      const arrIndex = Board.findIndex(
        (board) => board.title === req.params.title
      );
      const modifyBoard = {
        title: req.query.title,
        content: req.query.content,
      };
      Board[arrIndex] = modifyBoard;
      res.redirect('/Board');
    } else {
      const err = new Error('Board not found');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('unexpeted query');
    err.statusCode = 404;
    throw err;
  }
});
router.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const BoardData = Board.findIndex(
      (board) => board.title === req.params.title
    );

    if (BoardData) {
      const arrIndex = Board.findIndex(
        (board) => board.title === req.params.title
      );
      const modifyBoard = {
        title: req.query.title,
        content: req.query.content,
      };
      Board[arrIndex] = modifyBoard;
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

router.delete('/:title', (req, res) => {
  const arrIndex = Board.findIndex((board) => board.title === req.params.title);
  if (arrIndex !== -1) {
    Board.splice(arrIndex, 1);
    res.send('삭제 완료');
  } else {
    const err = new Error('Board not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = { router, Board };
