module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING
    },
    goaldescr: DataTypes.STRING,
    goalamount: DataTypes.INTEGER,
    goaldate: DataTypes.STRING
  });
  return Users;
};
