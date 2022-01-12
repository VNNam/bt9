var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
  try {
    const { token } = req.signedCookies;
    if (token) {
      const decoded = jwt.verify(token, 'jwt-secret');
      return res.render('index', { title: `Hello ${decoded.name}` });
    }
  } catch (error) {
    res.clearCookie('token');
    return res.redirect('/users/login');
  }
});

module.exports = router;
