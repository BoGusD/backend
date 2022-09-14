// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://bogus:1234@cluster0.ghdzd.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;

// async function main() {
//   await client.connect();

//   const users = client.db('kdt1').collection('users');

//   await users.deleteMany({});
//   // insertone을 사용시에는 await를 사용해야함
//   //   await users.insertOne({

//   await users.insertMany([
//     {
//       name: '강지훈',
//       age: 29,
//       tribe: 'animal',
//     },
//     {
//       name: '모승환',
//       age: 27,
//       tribe: 'insect',
//     },
//     {
//       name: '천해성',
//       age: 30,
//       tribe: 'human',
//     },
//   ]);
//   await users.updateMany(
//     {
//       age: { $gte: 29 },
//     },
//     {
//       $set: {
//         age: '29살 이상',
//         gender: 'M',
//       },
//     }
//   );
//   // findone을 사용할 떄는 await를 추가해줘야함(데이터가 바로 통신하기때문)
//   //   const data = await users.findOne({
//   //     name: '강지훈',
//   //   });
//   const data = users.find({
//     name: '강지훈',
//   });
//   const arr = await data.toArray();
//   console.log(arr);

//   await client.close();
// }

// main();
// // client.connect((err) => {
// //   const collection = client.db('test').collection('devices');
// //   // perform actions on the collection object
// //   client.close();
// // });
