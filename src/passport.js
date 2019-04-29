const { users } = require('../models');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;


module.exports = (passport) => {

  /**
   * Handles Serializing a user to the session
   * translates { user: 'Chris' ...} to { id: 1 }
   */
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  /**
   * Handles deserializing a user from the session (translating the { id: 1 } -> { user: 'Chris' email: {...}})
   */
  passport.deserializeUser((id, done) => {
    console.log('[INFO] Deserializing user from session: ', id);
    users.findByPk(id).then(user => {
      done(null, user);
    }).catch(err => {
      done(err, null);
    });
  });


  /**
   * This is how we validate a user's username and password is
   * correct
   */
  passport.use(new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    users.findOne({ where: { email: username }}).then(user => {
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      // Validate password (remember it is hashed in our database)
      bcrypt.compare(password, user.password, (err, res) => {
        if(!res) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      });
    }).catch(err => {
      console.log('[ERROR] Error Authenticating user', err.message);
      return done(null, false, { message: 'Incorrect username or password (Serious Error).' });
    });
  }));

  // This is just 1 big function after all lets return passport at the end of it to be used in app.js
  return passport;
};
