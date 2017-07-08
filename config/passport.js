/**
 * Created by Vishva on 7/7/2017.
 */
var JwtStrategy = require('passport-jwt').Strategy;

// load up the user model
var User = require('../models/user/datastore');
var config = require('app'); // get db config file

module.exports = function(passport) {
    var opts = {};
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.read(jwt_payload.id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};