const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create connection
const Uri = 'mongodb://localhost:27017/K18Nodejs2';
mongoose
  .connect(Uri)
  .catch((err) => console.error.bind(console, 'Error on connect to db'));
const dbconnection = mongoose.connection;

//define schema
const catSchema = new Schema({
  title: String,
  description: String,
});
const userSchema = new Schema({
  name: String,
  birthday: Date,
  address: String,
  phone: String,
  email: String,
  role: String,
  hashedPwd: String
});
const courseSchema = new Schema({
  title: String,
  category: { type: Schema.Types.ObjectId, ref: 'Categories' },
  description: String,
  tableOfContents: String,
  teacher: { type: Schema.Types.ObjectId, ref: 'Users' },
  price: Number,
  duration: Number,
});
const videoSchema = new Schema({
  fileName: String,
  duration: Number,
  transcript: String,
  link: String,
  course: { type: Schema.Types.ObjectId, ref: 'Courses' },
});

const classroomSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Courses' },
  student: { type: Schema.Types.ObjectId, ref: 'Users' },
  score: Number,
  rating: Number,
  payment: Number,
  openAt: Date,
});

const User = mongoose.model('Users', userSchema);
const Course = mongoose.model('Courses', courseSchema);
const Videos = mongoose.model('Videos', videoSchema);
const Categories = mongoose.model('Categories', catSchema);
const Classroom = mongoose.model('Classrooms', classroomSchema);

module.exports = {
  User,
  Course,
  Videos,
  Categories,
  Classroom,
  dbconnection,
};
