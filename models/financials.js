module.exports = function(sequelize, DataTypes) {
  var Financials = sequelize.define("Financials", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userid: DataTypes.INTEGER,
    balance: DataTypes.FLOAT,
    date: DataTypes.DATE,
    income: DataTypes.FLOAT,
    rateofsaving: DataTypes.FLOAT
  });
  return Financials;
};
