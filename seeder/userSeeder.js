const User = require("../models/User");
const mongoose = require("mongoose");

const firstDate = new Date();
const secondDate = new Date();

const newUsers = [
  new User({
    name: "Antonio Giachin",
    username: "AdminRoot",
    birthDate: firstDate,
    email: "root@outlook.com",
    password: "testtest",
  }),
  new User({
    name: "Federica Panzera",
    username: "PansiRoot",
    birthDate: secondDate,
    email: "pansi@outlook.com",
    password: "testtest",
  }),
];

const userSeeder = async () => {
  try {
    await User.deleteMany({});

    for (const user in newUsers) {
      await newUsers[user].save();
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { userSeeder };
