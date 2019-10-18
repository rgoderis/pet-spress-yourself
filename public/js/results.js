$(".fav-btn").on("click", function(event) {
  var animalId = $(this).attr("data-id");

  $(this).attr("disabled", true);
  $(this).html("Added to Favorites!");

  var favAnimal = {
    animalId: animalId
  };

  $.ajax("/api/favorites/" + $("h3").attr("data-name"), {
    type: "POST",
    data: favAnimal
  }).then(function() {
    location.reload();
  });
});
