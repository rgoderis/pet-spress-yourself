$(document).ready(function() {
  var loginForm = $("form.login");
  var userNameInput = $("input#userName");
  var emailInput = $("input#userEmail");
  var passwordInput = $("input#userPassword");
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      userName: userNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.userName || !userData.email || !userData.password) {
      return;
    }
    loginUser(userData.userName, userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });
  function loginUser(userName, email, password) {
    $.post("/api/login", {
      userName: userName,
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/results/" + email);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
