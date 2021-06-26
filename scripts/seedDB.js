const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/chowNow",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

const chowSeed = [
  {
    firstName: "Thomas",
    lastName: "Lockwood",
    password: "asdf1234",
    email: "test@test.com"
  },
  {
    firstName: "Brian",
    lastName: "Moore",
    password: "asdf1234",
    email: "test1@test1.com"
  }

];
const orderItemsSeed = [
  {
    orderItemName: "test order item",
    orderItemPrice: "$5",
    orderItemNotes: "test order item notes"
  },
  {
    orderItemName: "this is another test",
    orderItemPrice: "$6.63",
    orderItemNotes: "testing decimals"
  },
  {
    orderItemName: "this test might break",
    orderItemPrice: "$7.4",
    orderItemNotes: "testing only 1 decimal value"
  },
  {
    orderItemName: "this test is pushing it",
    orderItemPrice: "99,000",
    orderItemNotes: "testing commas"
  },
]


db.User
  .deleteMany({})
  .then(() => db.User.collection.insertMany(chowSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    console.log(data);
    db.OrderItem
      .deleteMany({})
      .then(() => db.OrderItem.collection.insertMany(orderItemsSeed))
      .then(data2 => {
        console.log(data2.result.n + " records inserted!");
        console.log(data2);
        db.Order
          .deleteMany({})
          .then(() => db.Order.collection.insertMany([{
            users: [
              data.insertedIds["0"]
            ],
            orderItems: [
              data2.insertedIds["0", "1", "2", "3"]
            ]
          }]))
          .then(data3 => {
            console.log(data3.result.n + " records inserted!");
            console.log(data3);
            db.Run
              .deleteMany({})
              .then(() => db.Run.collection.insertMany([{
                runner: data.insertedIds["0"],
                orders: [data3.insertedIds["0"]],
                status: "started"
              }]))
              .then(data4 => {
                console.log(data4.result.n + " records inserted!");
                console.log(data4);
              });
            db.Group
              .deleteMany({})
              .then(() => db.Group.collection.insertMany([{
                admin: data.insertedIds["0"],
                users: [data.insertedIds["1"]],
                groupName: "test group"
              }]))
              .then(data5 => {
                console.log(data5.result.n + " records inserted!");
                console.log(data5);
              });
          });
      });

    // process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
  