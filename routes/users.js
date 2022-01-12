var express = require('express');
var router = express.Router();
const userController = require('../controllers/userControllers');
const jwt = require('jsonwebtoken');


router.get('/login', (req, res) => {
  res.render('login');
});
/* GET users listing. */
router.get('/', userController.userList);
router.get('/register', (rep, res) => {
  res.render('register');
});
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.userDetails);
router.get('/:id/mycourse', userController.myCourse);

module.exports = router;
