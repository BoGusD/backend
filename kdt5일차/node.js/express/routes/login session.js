// @ts-check

const express = require('express');

const passport = require('passport');

const mongoClient = require('./mongo');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});
module.exports = router;
