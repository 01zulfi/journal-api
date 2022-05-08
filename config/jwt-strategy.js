const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const strategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  },
  (payload, done) =>
    User.findById(payload.user._id).exec((err, user) => {
      console.log('hello');
      if (err) return done(err, false);
      return done(null, user);
    }),
);

module.exports = strategy;
