/// dependencies
var moment = require("moment");
var db = require("../../models");

module.exports = function(id, callback) {
  db.Users.findOne({
    where: { id: id }
  }).then(function(userData) {
    db.Financials.findAll({
      where: { userid: id }
    }).then(function(dbFin) {
      var userFinancials = {
        balancestart: 99999999,
        balanceprevious: 99999999,
        balance: 9999999
      };
      for (i = 0; i < dbFin.length; i++) {
        userFinancials.balancestart = dbFin[0].balance;
        if (dbFin.length > 1) {
          var x = dbFin.length - 2;
          userFinancials.balanceprevious = dbFin[x].balance;
        } else {
          userFinancials.balanceprevious = dbFin[0].balance;
        }
        var x = dbFin.length - 1;
        userFinancials.balance = dbFin[x].balance;
        userFinancials.income = dbFin[x].income;
        userFinancials.rosRecommended = (userFinancials.income * 0.15).toFixed(
          2
        );

        // RATE OF SAVINGS
        // Since start
        userFinancials.rosSinceStart = (
          userFinancials.balance - userFinancials.balancestart
        ).toFixed(2);
        // Since last
        userFinancials.rosSincePrevious = (
          userFinancials.balance - userFinancials.balanceprevious
        ).toFixed(2);
      }

      console.log(userData);
      // HOW DO I ACCESS THIS OBJECT???
      userFinancials.progress = (
        (userFinancials.balance / userData.goalamount) *
        100
      ).toFixed(1);

      // calculate savings per week
      // var timeBefore = moment([2019, 0, 1]);
      // console.log(timeBefore);
      var timeNow = moment();
      console.log(timeNow);
      // var timeDifference = timeNow.diff(timeBefore, "days");
      // console.log(timeDifference); //36 days
      // amount saved since last time, divided by, time since last check-in, equals savings per day
      // times by seven equals savings per week

      // calculate

      var goalDateDaysToGo = (
        ((userFinancials.balance * userFinancials.progress) /
          userFinancials.rosRecommended) *
        7
      ).toFixed(0);

      var goalDate = moment()
        .add(goalDateDaysToGo, "days")
        .format("dddd, MMMM Do YYYY");
      // console.log(goalDate);
      userData.goaldate = goalDate;

      // console.log(userFinancials);
      callback(userFinancials);
    });
  });
};
