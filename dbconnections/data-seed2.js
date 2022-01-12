// const faker = require('faker');
// const {
//   User,
//   dbconnection,
//   Categories,
//   Classroom,
//   Course,
//   Videos,
// } = require('./dbschema2');
// const { random } = require('lodash');
// const generateData = async () => {
//   // drop collection
//   dbconnection.dropCollection('users');
//   dbconnection.dropCollection('classrooms');
//   dbconnection.dropCollection('courses');
//   dbconnection.dropCollection('videos');
//   dbconnection.dropCollection('categories');
//   const users = await User.insertMany(
//     Array.from(
//       (function* () {
//         for (let i = 0; i < 500; i++) {
//           yield {
//             name: faker.name.findName(),
//             birthday: faker.date.between('1983', '2000'),
//             address: faker.address.city(),
//             phone: faker.phone.phoneNumber(),
//             email: faker.internet.email(),
//             role: faker.random.arrayElement(['teacher', 'user']).toString(),
//             hashedPwd: faker.random.word(),
//           };
//         }
//       })()
//     )
//   );

//   const ctgs = await Categories.insertMany(
//     Array.from(
//       (function* () {
//         for (let i = 0; i < 10; i++) {
//           yield {
//             title: faker.random.word(),
//             description: faker.random.words(10),
//           };
//         }
//       })()
//     )
//   );
//   const courses = await Course.insertMany(
//     Array.from(
//       (function* () {
//         for (let i = 0; i < 200; i++) {
//           yield {
//             title: faker.random.words(3),
//             description: faker.lorem.sentences(3),
//             tableOfContents: faker.lorem.lines(10),
//             category: ctgs[random(0, 9)]._id,
//             teacher: ((lst) => {
//               const res = lst.filter((user) => user.role === 'teacher');
//               return faker.random.arrayElement(res.map((e) => e._id));
//             })(users),
//             duration: faker.datatype.number({ min: 2, max: 5 }),
//             price: faker.datatype.number({ min: 15, max: 199 }),
//           };
//         }
//       })()
//     )
//   );

//   const videos = await Videos.insertMany(
//     Array.from(
//       (function* () {
//         for (let i = 0; i < 200; i++) {
//           yield {
//             fileName: `${faker.datatype.uuid()}.mp4`,
//             duration: random(3, 120),
//             transcript: faker.lorem.lines(10),
//             link: faker.internet.url(),
//             course: courses[i]._id,
//           };
//         }
//       })()
//     )
//   );

//   const classroom = await Classroom.insertMany(
//     Array.from(
//       (function* () {
//         for (let i = 0; i < 500; i++) {
//           yield {
//             score: faker.datatype.number({ min: 0, max: 100 }),
//             rating: faker.datatype.number({ min: 1, max: 5 }),
//             payment: faker.datatype.number({ min: 15, max: 199 }),
//             course: courses[random(0, 99)]._id,
//             student: ((lst) => {
//               const res = lst.filter((user) => user.role === 'user');
//               return faker.random.arrayElement(res.map((e) => e._id));
//             })(users),
//             openAt: new Date(),
//           };
//         }
//       })()
//     )
//   );
// };
// const printLog = (err, docs) => {
//   if (err) return console.log(err);
//   console.log(docs);
// };
// generateData();
