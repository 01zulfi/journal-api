const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) return res.status(401).json({ message: 'Auth failed.' });
    if (!user) {
      return res.status(401).json({ message: 'Username does not exist.' });
    }
    return bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (error) return res.status(401).json({ message: 'Auth failed.' });
      if (!result) {
        return res.status(401).json({ message: 'Incorrect password.' });
      }
      const token = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '30 days',
      });
      return res.status(200).json({ message: 'Auth successful', token });
    });
  });
};
