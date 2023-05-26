$(document).ready(function () {
    $("#startgameBtn").click(function () {
      var username = $("#usernameInput").val().trim();
      var paircards = parseInt($("#pairCardsInput").val().trim());
      var errorText = $("#errorText");
  
      if (username && paircards >= 1 && paircards <= 30) {
        localStorage.setItem("usernameRequested", username);
        localStorage.setItem("pairsRequested", paircards);
        window.location.href = "memorygame.html";
      } else {
        errorText.text("Please enter a valid username and a valid number");
        errorText.show();
      }
    });
  });
  