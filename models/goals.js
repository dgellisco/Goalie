module.exports = function(sequelize, DataTypes) {
  var Goals = sequelize.define("Goals", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userid: DataTypes.INTEGER,
    goaldescr: DataTypes.STRING,
    goalamount: DataTypes.INTEGER,
    goaldate: DataTypes.STRING
  });
  return Goals;
};
