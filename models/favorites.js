module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("favorite", {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    size: DataTypes.STRING,
    photo: DataTypes.STRING,
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    animalId: DataTypes.INTEGER
  });
  return Favorites;
};
