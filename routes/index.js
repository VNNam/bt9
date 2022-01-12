var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
  try {
    const { token } = req.signedCookies;
    const decoded = jwt.verify(token, 'jwt-secret');

    res.render('index', { title: `Hello ${decoded.name}` });
  } catch (error) {
    res.render('index');
  }
});

module.exports = router;
