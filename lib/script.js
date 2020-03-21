$(document).ready(function() {
  let APIKey = "90f9ad18fcea71233c7f241b5eed7ac0";

  let recentSearchEL = $("#recentSearch");
  let userInputEl = $("#userInput");
  let searchButton = $("#searchBtn");
  let clearButton = $("#clearBtn");

  addEventListener("load", function() {
    $("#currentForecast").css("display", "block");
    $("#futureForecast").css("display", "none");
  });
});
