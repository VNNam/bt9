const ITEMS_PER_PAGE = 10;
const mongoose = require('mongoose');
const { User, Course, Classroom } = require('../dbconnections/dbschema2');
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken');
const { rearg } = require('lodash');

exports.userList = async function (req, res, next) {
  const { page } = req.query;
  if (isNaN(page)) return next();
  try {
    const sizeOfUser = await User.count();
    if (sizeOfUser === 0) throw Error('There is not any user!');
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const users = await User.find({}, { hashedPwd: 0 })
      .skip(startIndex)
      .limit(ITEMS_PER_PAGE);
    res.render('user_list', {
      page,
      pages: Math.ceil(sizeOfUser / ITEMS_PER_PAGE),
      users: users ?? [],
      originalUrl: req.originalUrl.split('?')[0].toString(),
    });
  } catch (error) {
    next(error);
  }
};

exports.userDetails = async function (req, res, next) {
  const { id } = req.params;
  const { edit } = req.query;
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const data = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $project: {
            name: 1,
            address: 1,
            phone: 1,
            email: 1,
            role: 1,
            born: {
              $dateToString: { format: '%Y-%m-%d', date: '$birthday' },
            },
          },
        },
      ]);
      console.log(data);
      if (data[0])
        return res.render('user_detail', {
          user: data[0],
          edit: edit ? false : true,
        });
    } catch (error) {
      res.json(error);
    }
  }
  next();
};

exports.myCourse = async function (req, res, next) {
  const { id } = req.params;
  const page = req.query.page ?? 1;
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const coursesOf = await Classroom.count({ student: id });
      const data = await Classroom.find({ student: id }, { student: 0 })
        .populate('course')
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(1);
      return res.render('my_course', {
        id,
        data: data ?? null,
        page,
        pages: Math.ceil(coursesOf / ITEMS_PER_PAGE),
        originalUrl: req.originalUrl.split('?')[0].toString(),
      });
    } catch (error) {
      next(error);
    }
  }
};

exports.login = async function (req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ email: username });
    // const hasedPwd = await bcrypt.hash(password, saltRound);
    if (!user) return res.status(400).send('has no user');
    const correctPwd = bcrypt.compareSync(password, user?.hashedPwd);
    if (correctPwd) {
      const token = jwt.sign({ _id: user._id, name: user.name }, 'jwt-secret', {
        algorithm: 'HS256',
        expiresIn: '2h',
      });

      res.cookie('token', token, { signed: true });

      return res.redirect('/');
    } else return res.status(400).json({ err: 'wrong password' });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.register = async function (req, res, next) {
  const { name, email, password, address, phone, birthday, role } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      hashedPwd: await bcrypt.hash(password, saltRound),
      address,
      phone,
      birthday,
      role,
    });
    if (user) return res.json(user);
  } catch (error) {
    return res.json(error);
  }
};
