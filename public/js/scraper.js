$("#scrapeBtn").on("click", function() {
  $.ajax({
    method: "POST",
    url: "/api/scraper"
  }).then(function() {
    console.log("Scraping API for new data...");
  });
});
