$(".delete-btn").on("click", function(event) {
  var animalId = $(this).attr("data-id");
  $.ajax("/api/favorites/" + animalId, {
    type: "DELETE"
  }).then(function() {
    location.reload();
  });
});
