var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { authorized, authorization } = require('../controllers/authorization');

/* GET home page. */
router.get('/', authorization, function ({ user }, req, res, next) {
  res.render('index', { title: `welcome home page ${user ?? ''}` });
});

module.exports = router;
