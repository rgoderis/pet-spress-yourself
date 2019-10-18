var db = require("../models");
var petfinder = require("@petfinder/petfinder-js");
var passport = require("../config/passport");

require("dotenv").config();

var client = new petfinder.Client({
  apiKey: process.env.petKey,
  secret: process.env.petSecret
});

var animalsCall = function(type, size, gender) {
  client.animal
    .search({
      type: type,
      location: "Orlando, Fl",
      size: size,
      gender: gender,
      limit: 100
    })
    .then(function(response) {
      for (var i = 0; i < response.data.animals.length; i++) {
        if (response.data.animals[i].photos[0] === undefined) {
          console.log("No Photo");
        } else {
          db.animal
            .create({
              type: response.data.animals[i].type,
              name: response.data.animals[i].name,
              breed: response.data.animals[i].breeds.primary,
              age: response.data.animals[i].age,
              gender: response.data.animals[i].gender,
              size: response.data.animals[i].size,
              specialNeeds: response.data.animals[i].attributes.special_needs,
              children: response.data.animals[i].environment.children,
              dogs: response.data.animals[i].environment.dogs,
              cats: response.data.animals[i].environment.cats,
              photo: response.data.animals[i].photos[0].medium,
              url: response.data.animals[i].url
            })
            .then(function() {
              console.log("Scraping API for new data...");
            });
        }
      }
      console.log("finished");
    })
    .catch(function(error) {
      console.log(error);
    });
};

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    console.log(req.user);
    
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  
  app.post("/api/signup", function(req, res) {
    db.User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      preferredAnimal: req.body.preferredAnimal,
      livingSituation: req.body.livingSituation,
      children: req.body.children,
      otherCats: req.body.otherCats,
      otherDogs: req.body.otherDogs,
      activityLevel: req.body.activityLevel
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // post to favorites table
  app.post("/api/favorites/:userName", function(req, res){
    db.User.findOne({ where: { userName: req.params.userName } }).then(function(
      userResult
    ){
      console.log(req.body.animalId)
      db.animal.findOne({ where: { id: req.body.animalId } }).then(function(
        animalResult
      ){
        db.favorite.create({
          name: animalResult.name,
          breed: animalResult.breed,
          age: animalResult.age,
          gender: animalResult.gender,
          size: animalResult.size,
          photo: animalResult.photo,
          url: animalResult.url,
          userId: userResult.id,
          animalId: animalResult.id
        }).then(function(){
          console.log("animal favorited");
        });
      });
    });
  });

  // get request to /favorites/:userName
  app.get("/favorites/:userName", function(req, res){
    db.User.findOne({ where: { userName: req.params.userName } }).then(function(
      result
    ){
      db.favorite.findAll({ where: { userId: result.id } }).then(function(dbFavs){
        var favObj = {
          favorites: dbFavs,
          result: result.userName
        }
        res.render("favorites", favObj);
      });
    });
  });

  // retrieve information from user
  app.get("/results/:userName", function(req, res) {
    db.User.findOne({ where: { userName: req.params.userName } }).then(function(
      results
    ) {
      let livingArr = results.livingSituation.split(" ");
      if(livingArr.indexOf('Large') !== -1){
        livingArr.push("Extra Large");
      }
      const childrenArr = results.children.split("-").map(Number);
      const catsArr = results.otherCats.split("-").map(Number);
      const dogsArr = results.otherDogs.split("-").map(Number);
      const ageArr = results.activityLevel.split(" ");
      db.animal
        .findAll({
          where: {
            type: results.preferredAnimal,
            children: {
              [db.Sequelize.Op.or]: childrenArr
            },
            cats: {
              [db.Sequelize.Op.or]: catsArr
            },
            dogs: {
              [db.Sequelize.Op.or]: dogsArr
            },
            age: {
              [db.Sequelize.Op.or]: ageArr
            },
            size: {
              [db.Sequelize.Op.or]: livingArr
            }
          },
          limit:15
        })
        .then(function(dbAnimals) {
          var animalObj = {
            animals: dbAnimals,
            results: results.userName
          }
          res.render("results", animalObj)
        });
    });
  });

  // Create Animals DB
  app.post("/api/scraper", function() {
    animalsCall("dog", "small", "male");
    animalsCall("dog", "medium", "male");
    animalsCall("dog", "large", "male");
    animalsCall("dog", "xlarge", "male");
    animalsCall("dog", "small", "female");
    animalsCall("dog", "medium", "female");
    animalsCall("dog", "large", "female");
    animalsCall("dog", "xlarge", "female");
    animalsCall("cat", "small", "male");
    animalsCall("cat", "medium", "male");
    animalsCall("cat", "large", "male");
    animalsCall("cat", "xlarge", "male");
    animalsCall("cat", "small", "female");
    animalsCall("cat", "medium", "female");
    animalsCall("cat", "large", "female");
    animalsCall("cat", "xlarge", "female");
  });
};
