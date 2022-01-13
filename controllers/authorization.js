const jwt = require('jsonwebtoken');
exports.authorized = function (req, res, next) {
  const { token } = req.signedCookies;
  if (token) {
    try {
      const decoded = jwt.verify(token, 'jwt-secret');
      next({ user: decoded.name });
    } catch (error) {
      res.redirect('/users/login');
    }
  } else {
    res.redirect('/users/login');
  }
};
exports.authorization = (req, res, next) => {
  const { token } = req.signedCookies;
  if (token) {
    try {
      const decoded = jwt.verify(token, 'jwt-secret');
      res.cookie('user', decoded.name);
      next({ user: decoded.name });
    } catch (error) {
      console.log('at error');
      next({});
    }
  } else {
    console.log('at no token');
    next({});
  }
};
