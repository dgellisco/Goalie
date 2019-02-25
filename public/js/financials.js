// PURPOSE: To perform calculations (locally) based on the budget, income, etc.
// Performing these calculations locally reduces the number of calls we need to make to our database.

// Pull in dependencies
var db = require("../../models");
var moment = require("moment");

// When get function recieved for a user's ID, gather their personal data and run calculations based off of that, then return to htmlRoutes file to pass into handlebars files
module.exports = function(userid, callback) {
  console.log("running callback function to run calcs");
  if (userid == "POST") {
    return console.log("userid is " + userid + ", error");
    console.log("cancelling callback function to run calcs");
  }
  // Query User database.  Return the first entry that matches the userID.
  db.Users.findOne({
    where: { id: userid }
  }).then(function(userData) {
    // Query Financials database.  Return every entry that matches the userID.
    db.Financials.findAll({
      where: { userid: userid }
    }).then(function(finData) {
      var userFinancials = {};
      // Loop through every financial data entry for this user
      for (i = 0; i < finData.length; i++) {
        // BALANCE
        // Get start balance (the first entry)
        userFinancials.balancestart = finData[0].balance;
        // Get current balance
        var x = finData.length - 1;
        userFinancials.balance = finData[x].balance;
        // Get previous balance
        if (finData.length > 1) {
          var x = finData.length - 2;
          userFinancials.balanceprevious = finData[x].balance;
          userFinancials.balanceremaining =
            userData.goalamount - userFinancials.balance;
        } else {
          userFinancials.balanceprevious = finData[0].balance;
          userFinancials.balanceremaining =
            userData.goalamount - userFinancials.balance;
        }

        // INCOME
        // Get income
        userFinancials.income = finData[0].income;
      }
      // RATE OF SAVINGS & PROGRESS
      // Calculate rate of savings (recommended rate)
      userFinancials.rosrecommended = (userFinancials.income * 0.15).toFixed(2);
      // Calculate rate of savings (rate since start)
      userFinancials.rossincestart = (
        userFinancials.balance - userFinancials.balancestart
      ).toFixed(2);
      // Calculate rate of savings (since last entry)
      userFinancials.rossinceprevious = (
        userFinancials.balance - userFinancials.balanceprevious
      ).toFixed(2);
      // Calculate progress
      userFinancials.progress = (
        (userFinancials.balance / userData.goalamount) *
        100
      ).toFixed(1);

      // calculate savings per week
      var timeBefore = moment();
      // console.log(timeBefore);
      var timeNow = moment();
      var timeDifference = timeNow.diff(timeBefore, "days");
      // amount saved since last time, divided by, time since last check-in, equals savings per day
      // times by seven equals savings per week

      // Calculate days remaining
      console.log("balance is " + userFinancials.balance);
      console.log("progress is " + userFinancials.progress);
      console.log("ros " + userFinancials.rosrecommended);
      var goalDaysRemaining = (
        (userFinancials.balanceremaining / userFinancials.rosrecommended) *
        7
      ).toFixed(0);

      console.log("days remaining " + goalDaysRemaining);
      userData.goaldate = 0;
      userData.goaldate = moment()
        .add(goalDaysRemaining, "days")
        .format("dddd, MMMM Do YYYY");

      userFinancials.goaltimeremaining = goalDaysRemaining;

      var userDetails = {
        userFinancials: userFinancials,
        userData: userData
      };

      console.log(userFinancials);
      console.log("finished callback function to run calcs");
      callback(userDetails);
    });
  });
};
