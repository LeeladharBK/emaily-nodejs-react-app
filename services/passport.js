const passport = require("passport");
const GoogleStratergy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStratergy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log("In here already exists!! ", profile.id);
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }).save().then(user => {
            done(null, user);
          });
          console.log("In here after execution!!");
        }
      });
    }
  )
);
