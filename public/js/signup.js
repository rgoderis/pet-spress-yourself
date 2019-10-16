$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#userEmail");
  var passwordInput = $("input#userPassword");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      preferredAnimal: $("input[name=preferredAnimal]:checked").val(),
      livingSituation: $("input[name=livingSituation]:checked").val(),
      children: $("input[name=children]:checked").val(),
      otherCats: $("input[name=otherCats]:checked").val(),
      otherDogs: $("input[name=otherDogs]:checked").val(),
      activityLevel: $("input[name=activityLevel]:checked").val()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.preferredAnimal,
      userData.livingSituation,
      userData.children,
      userData.otherCats,
      userData.otherDogs,
      userData.activityLevel
    );
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(
    email,
    password,
    preferredAnimal,
    livingSituation,
    children,
    otherCats,
    otherDogs,
    activityLevel
  ) {
    $.post("/api/signup", {
      email: email,
      password: password,
      preferredAnimal: preferredAnimal,
      livingSituation: livingSituation,
      children: children,
      otherCats: otherCats,
      otherDogs: otherDogs,
      activityLevel: activityLevel
    })
      .then(function(data) {
        window.location.replace("/results");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
