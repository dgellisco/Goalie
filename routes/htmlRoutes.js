var db = require("../models");
var financialsData = require('../public/js/financials');

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Users.findAll({}).then(function(usersData) {
      let logout = false;
      if (req.user) {
        logout = true;
      }
        
        res.render("index", {
          // msg: "Welcome!",
          usersData: usersData,  
        });
      
    });
  });

  app.get("/newuser", function(req, res) {
    db.Users.findAll({}).then(function(usersData) {
      res.render("newuser", {
        usersData: usersData
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
    console.log("~~Running get user request~~");
    // if (req.params.id != "POST") {
      console.log("~~Running get user request~~");
      financialsData(req.params.id, function(userDetails) {
        res.render("financials", userDetails);
      });
    // }
  });

    

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

}
