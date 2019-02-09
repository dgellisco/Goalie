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
      console.log(req.body);
      res.json(dbUsers);
    });
  });

  // Create a new example
  app.post("/api/financials", function(req, res) {
    db.Financials.create(req.body).then(function(dbFinancials) {
      console.log(req.body);
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
