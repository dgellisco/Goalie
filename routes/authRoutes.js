// PASSPORT: These are the main passport routes for handling signup, signin,logout, and to show the users dashboard
module.exports = (app, passport) => {
  // Load sign up page for authentication
  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  // Sends sign up data through the passport authentication model which will redirect to the dashboard or to the signup route
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    })
  );

  // Load sign in page for authentication
  app.get("/signin", (req, res) => {
    res.render("signin");
  });

  // Sends signin to passport the authentication method and redirects based on it's result
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );

  // Load logout route to destroy passport session
  app.get("/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.redirect("/error"); // will render a 404 since that route doesn't exist
      }
      res.redirect("/");
    });
  });

  // Load dashboard page after authentication
  app.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard");
  });

  // Passport function that checks if the user is logged in or not.  If not then it redirects them to the signin page
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
