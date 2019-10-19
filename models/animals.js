module.exports = function(sequelize, DataTypes) {
  const Animals = sequelize.define("animal", {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    size: DataTypes.STRING,
    specialNeeds: DataTypes.BOOLEAN,
    children: DataTypes.BOOLEAN,
    dogs: DataTypes.BOOLEAN,
    cats: DataTypes.BOOLEAN,
    photo: DataTypes.STRING,
    url: DataTypes.STRING
  });
  return Animals;
};
