var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Get all examples
  app.get("/api/financials", function(req, res) {
    db.Financials.findAll({}).then(function(dbFinancials) {
      res.json(dbFinancials);
    });
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Update financials ledger
  app.post("/api/financials", function(req, res) {
    console.log("req.body");
    console.log(JSON.stringify(req.body));
    console.log(req.params.id);
    db.Financials.create(req.body).then(function(dbFinancials) {
      console.log(dbFinancials);
      // res.set("Content-Type", "text/html");
      res.json(dbFinancials);
    });
  });

  // Delete an example by id
  app.delete("/api/users/:id", function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
};
