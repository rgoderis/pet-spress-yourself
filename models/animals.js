module.exports = function(sequelize, DataTypes) {
  var Animals = sequelize.define("animals", {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    size: DataTypes.STRING,
    specialNeeds: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    children: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dogs: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    cats: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phota: DataTypes.STRING,
    url: DataTypes.STRING
  });
  return Animals;
};
