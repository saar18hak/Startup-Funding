const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../newproject/model/user-model'); // Import your User model

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // Move to the next middleware or route
    }
    res.status(401).json({ message: 'Not authenticated' });
  };


  
