$(".delete-favorite").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/favorites/userName/" + id, {
      type: "DELETE",
      
    }).then(
      function() {
        console.log("deleted favorite", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });