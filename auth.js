const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const ObjectID = require('mongodb').ObjectID;
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./models/user.schema');

require('dotenv').config();

module.exports = function (app) {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({_id: new ObjectID(id)}, (err, doc) => {
      if (!err) done(null, doc);
    });
  });

  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({username: username}, (err, user) => {
        console.log('User '+ username +' attempted to log in.');
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!bcrypt.compareSync(password, user.password))
          return done (null, false);
        return done (null, user);
      });
    }
  ));

  let callbackURI = (process.env.PORT || 3333) === 3333 ? 'http://localhost:3333' : 'https://ate-chat.herokuapp.com'
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: callbackURI + '/auth/github/callback'//process.env.CALLBACK_URL
  }, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    User.findOneAndUpdate(
      { id: profile.id },
      {
        $setOnInsert: {
          id: profile.id,
          name: profile.displayName || 'John Doe',
          photo: profile.photos[0].value || '',
          email: Array.isArray(profile.emails)
            ? profile.emails[0].value
            : 'No public email',
          created_on: new Date(),
          provider: profile.provider || ''
        },
        $set: {
          last_login: new Date()
        },
        $inc: {
          login_count: 1
        }
      },
      { upsert: true, new: true },
      (err, doc) => {
        return cb(null, doc.value);
      }
    );
  }));

  
};