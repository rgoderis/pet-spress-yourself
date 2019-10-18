$(".fav-btn").on("click", function(event) {
  var animalId = $(this).attr("data-id");

  var favAnimal = {
    animalId: animalId
  };

  $.ajax("/api/favorites/" + $("h3").attr("data-name"), {
    type: "POST",
    data: favAnimal
  }).then(function(data) {
    location.reload();
  });
});
