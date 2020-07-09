const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { db } = require("./conf");

passport.use(
  new LocalStrategy(
    {
      usernameField: "mail",
      passwordField: "pass",
    },
    (formMail, formPass, done) => {
      db.query(
        "SELECT id, mail, pass FROM user WHERE mail=?",
        [formMail],
        (err, res) => {
          if (err) {
            console.log("----");
            console.log(err.sql);
            console.error(err.message);
            return done(err);
          }
          if (!res.length) {
            console.log("----");
            console.log("No user");
            return done(null, false, {
              msg: "Incorrect user!",
            });
          }
          const user = res[0];
          const isPasswordOk = bcrypt.compareSync(formPass, user.pass);

          if (!isPasswordOk) {
            return done(null, false, {
              msg: "Incorrect password!",
            });
          }

          return done(null, { ...user });
        }
      );
    }
  )
);
