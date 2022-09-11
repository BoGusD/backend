// @ts-check

const express = require('express');

const router = express.Router();

const reqBoard = require('./board');

const Board = reqBoard.Board;

router.get('/', (req, res) => {
  const BoardData = Board.find((board) => board.title === req.body.title);
  const BoardLen = Board.length;
  res.render('modify', {
    BoardData,
    pageCounts: BoardLen,
    imageName: 'image2.png',
  });
});

router.get('/', (req, res) => {
  const BoardData = Board.find((board) => board.title === req.body.title);
  if (BoardData) {
    res.send(BoardData);
  } else {
    const err = new Error('Board not found');
    err.statusCode = 404;
    throw err;
  }
});
// router.post('/', (req, res) => {
//   if (Object.keys(req.body).length >= 1) {
//     if (req.body.title && req.body.content) {
//   const newUser = {
//     title: req.body.title,
//     content: req.body.content,
//   };
//   Board.push(newUser);
//   res.redirect('/board');
// } else {
//       const err = new Error('unexpeted query');
//       err.statusCode = 404;
//       throw err;
//     }
//   } else if (req.body) {
//     if (req.body.title && req.body.content) {
//       const newBoard = {
//         title: req.body.title,
//         content: req.body.content,
//       };
//       Board.push(newBoard);
//       res.redirect('/board');
//     } else {
//       const err = new Error('unexpeted Form data');
//       err.statusCode = 404;
//       throw err;
//     }
//   } else {
//     const err = new Error('No data');
//     err.statusCode = 404;
//     throw err;
//   }
// });

router.post('/', (req, res) => {
  console.log(req.body);
  if (req.body.title && req.body.content) {
    const boardData = Board.findIndex(
      (board) => board.title === req.body.title
    );

    if (boardData) {
      const arrIndex = Board.findIndex(
        (board) => board.title === req.body.title
      );
      const modifyBoard = {
        title: req.body.title,
        content: req.body.content,
      };
      Board[arrIndex] = modifyBoard;
      Board.splice(arrIndex, 1);
      Board.splice(arrIndex, 0, modifyBoard);
      res.redirect('board');
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
  console.log(req.body.title);
});

module.exports = router;
