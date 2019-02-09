const bCrypt = require("bcrypt-nodejs");
const db = require("../models");

// PASSPORT: No need to edit this file unless you want to change from email login to username login
module.exports = passport => {
  const LocalStrategy = require("passport-local").Strategy;

  passport.serializeUser((user, done) => {
    console.log("user id =", user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.Users.findByPk(id).then(user => {
      // findByPk is the new way to write findById in sequelize
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      (req, email, password, done) => {
        const generateHash = password => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        db.Users.findOne({
          where: {
            email: email
          }
        }).then(user => {
          if (user) {
            return done(null, false, {
              message: "That email is already taken"
            });
          } else {
            const userPassword = generateHash(password);
            const data = {
              email: email,
              password: userPassword,
              firstname: req.body.firstname,
              lastname: req.body.lastname
            };

            db.Users.create(data).then(newUser => {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        // by default local strategy uses username and password but we'll override it with email instead
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // const User = user;
        const isValidPassword = (userpass, password) => {
          return bCrypt.compareSync(password, userpass);
        };

        db.Users.findOne({
          where: {
            email: email
          }
        })
          .then(user => {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist"
              });
            }
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect Password."
              });
            }
            const userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(err => {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
};
