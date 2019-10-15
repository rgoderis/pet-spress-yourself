var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Create Animals DB
//   app.get("/api/scraper", function(res, res) {
//     db.Example.create(req.body).then(function(results) {
//       res.josn(results);
//     });
//   });
// };

var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({
  apiKey: "1a5C4LXq8WziAjDesbcInMcJcdJyJCKXp0gasXyMWE1qtDaJjy",
  secret: "ybnkuHt223mDH0S5taohO68J7Fkxom1XwuVC449b"
});

client.animal
  .search({ type: "dog", location: "Orlando, fl", size: "large" })
  .then(function(response) {
    for (var i = 0; i < response.data.animals.length; i++) {
      var type = response.data.animals[i].type;
      var name = response.data.animals[i].name;
      var breed = response.data.animals[i].breeds.primary;
      var age = response.data.animals[i].age;
      var gender = response.data.animals[i].gender;
      var size = response.data.animals[i].size;
      var specialNeeds = response.data.animals[i].attributes.special_needs;
      var children = response.data.animals[i].environment.children;
      var dogs = response.data.animals[i].environment.dogs;
      var cats = response.data.animals[i].environment.cats;
      var photo = response.data.animals[i].photos;
      var url = response.data.animals[i].url;
      // console.log(response.data.animals[i]);
      console.log("Type: " + type);
      console.log("Name: " + name);
      console.log("Gender: " + gender);
      console.log("Size: " + size);
      console.log("Breed: " + breed);
      console.log("Age: " + age);
      console.log("Special Needs: " + specialNeeds);
      console.log("Children: " + children);
      console.log("Dogs: " + dogs);
      console.log("Cats: " + cats);
      console.log("Photo: " + JSON.stringify(photo));
      console.log("Url: " + url);
    }
  })
  .catch(function(error) {
    console.log(error);
  });
