var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preferredAnimal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    livingSituation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    children: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    otherCats: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    otherDogs: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    activityLevel: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
