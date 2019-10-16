module.exports = function(sequelize, DataTypes) {
  var Animals = sequelize.define("animal", {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    size: DataTypes.STRING,
    specialNeeds: {
      type: DataTypes.BOOLEAN
    },
    children: {
      type: DataTypes.BOOLEAN
    },
    dogs: {
      type: DataTypes.BOOLEAN
    },
    cats: {
      type: DataTypes.BOOLEAN
    },
    photo: {
      type: DataTypes.STRING
    },
    url: DataTypes.STRING
  });
  Animals.associate = function(models) {
    Animals.hasMany(models.User);
  };
  return Animals;
};
