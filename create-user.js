#! /usr/bin/env node

// script to create a user in the database

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userArgs = process.argv.slice(2);

const username = userArgs[0];
const password = userArgs[1];

bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.log('Error while creating a hashed password, try again.');
    mongoose.connection.close();
    process.exit();
    return;
  }
  const user = new User({
    username,
    password: hashedPassword,
  });
  User.findOne({ username }).exec((error, result) => {
    if (error) {
      console.log('Error while querying database for username, try again.');
      mongoose.connection.close();
      process.exit();
      return;
    }
    if (result) {
      console.log('Username exists, try another.');
      mongoose.connection.close();
      process.exit();
      return;
    }
    user.save((er) => {
      if (er) {
        console.log('Error while saving user, try again.');
        mongoose.connection.close();
        process.exit();
        return;
      }
      console.log('User created.');
      mongoose.connection.close();
      process.exit();
    });
  });
});
