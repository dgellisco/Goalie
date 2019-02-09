module.exports = function(sequelize, DataTypes) {
  var UsersXXX = sequelize.define("UsersXXX", {
<<<<<<< HEAD
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    lastname: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    username: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastLogin: {
      type: DataTypes.DATE
    }
  });
  return UsersXXX;
};
=======
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstname: {
        type: DataTypes.STRING,
        notEmpty: true
      },
      lastname: {
        type: DataTypes.STRING,
        notEmpty: true
      },
      username: {
        type: DataTypes.TEXT
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastLogin: {
        type: DataTypes.DATE
      }
    });
    return UsersXXX;
  };
  
>>>>>>> 1b5dcdd5f3e42655f45d84bf9e9ecd2bcdef8a1a
