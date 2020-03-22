let APIKey = "90f9ad18fcea71233c7f241b5eed7ac0";

let currentTempC = document.createElement("h2");
let currentTempF = document.createElement("h2");
let currentHumidity = document.createElement("h2");
let currentWindSpeed = document.createElement("h2");
let currentUV = document.createElement("h2");
let uvIndex = document.createElement("label");
let currentForecast = document.getElementById("currentForecast");
let searchButton = document.getElementById("searchBtn");
let clearButton = document.getElementById("clearBtn");

let cities = [];

function searchHistory(city) {
  let cityList = document.getElementById("cityList");
  cityList.textContent = "";

  cities.forEach(function(city) {
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    let cityButton = document.createElement("button");
    cityButton.setAttribute("data", city);
    cityButton.textContent = city;

    cityList.appendChild(li);
    li.appendChild(cityButton);
  });
}

searchButton.addEventListener("click", function() {
  event.preventDefault();
  let city = document.getElementById("userInput").value.trim();

  if (city !== "") {
    cities.push(city);
    searchHistory();
  }
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      APIKey
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let cityName = document.getElementById("cityName");
      let date = new Date();
      let weatherImg = document.createElement("img");
      weatherImg.setAttribute("class", "bg");
      let tempC = data.main.temp - 273.15;
      let tempF = tempC * (9 / 5) + 32;

      currentTempC.textContent = "Temperature: " + tempC.toFixed(1) + "°C";
      currentTempF.textContent = "Temperature: " + tempF.toFixed(1) + "°F";
      currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
      currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";

      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDay();
      let weatherID = data.weather[0].icon;
      let displayWeather =
        "http://openweathermap.org/img/wn/" + weatherID + "@2x.png";
      weatherImg.src = displayWeather;

      cityName.textContent =
        city + " " + "(" + year + "/" + month + "/" + day + ")";

      cityName.appendChild(weatherImg);
      currentForecast.appendChild(currentTempC);
      currentForecast.appendChild(currentTempF);
      currentForecast.appendChild(currentHumidity);
      currentForecast.appendChild(currentWindSpeed);

      let latitude = data.coord.lat;
      let longitude = data.coord.lon;

      fetch(
        "https://api.openweathermap.org/data/2.5/uvi?appid=" +
          APIKey +
          "&lat=" +
          latitude +
          "&lon=" +
          longitude
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          currentUV.textContent = "UV Index: ";
          uvIndex.textContent = data.value;

          if (uvIndex.textContent < 2) {
            uvIndex.setAttribute("class", "lowUV");
          } else if (uvIndex.textContent > 2 && uvIndex.textContent < 7) {
            uvIndex.setAttribute("class", "midUV");
          } else if (uvIndex.textContent > 7) {
            uvIndex.setAttribute("class", "highUV");
          }

          currentForecast.appendChild(currentUV);
          currentForecast.appendChild(uvIndex);
        });

      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=" +
          APIKey
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data.list);
          let dayOneEl = document.getElementById("dayOne");
          dayOneEl.textContent = data.list[4].dt_txt;
          let dayOneImgEl = data.list[4].weather[0].icon;
          let imgLink1 =
            "http://openweathermap.org/img/wn/" + dayOneImgEl + "@2x.png";
          let imgSrc1 = document.getElementById("dayOneImg");
          imgSrc1.src = imgLink1;

          let tempOne = document.getElementById("tempOne");
          let tempCOne = Math.round(data.list[4].main.temp - 273.15);
          tempOne.textContent = "Tempurature: " + tempCOne.toFixed(1) + "°C";

          let humidityOne = document.getElementById("humidityOne");
          humidityOne.textContent =
            "Humidity: " + data.list[4].main.humidity + "%";

          let dayTwoEl = document.getElementById("dayTwo");
          dayTwoEl.textContent = data.list[12].dt_txt;
          let dayTwoImgEl = data.list[12].weather[0].icon;
          let imgLink2 =
            "http://openweathermap.org/img/wn/" + dayTwoImgEl + "@2x.png";
          let imgSrc2 = document.getElementById("dayTwoImg");
          imgSrc2.src = imgLink2;

          let tempTwo = document.getElementById("tempTwo");
          let tempCTwo = Math.round(data.list[12].main.temp - 273.15);
          tempTwo.textContent = "Tempurature: " + tempCTwo + "°C";

          let humidityTwo = document.getElementById("humidityTwo");
          humidityTwo.textContent =
            "Humidity: " + data.list[12].main.humidity + "%";

          let dayThreeEl = document.getElementById("dayThree");
          dayThreeEl.textContent = data.list[20].dt_txt;
          let dayThreeImgEl = data.list[20].weather[0].icon;
          let imgLink3 =
            "http://openweathermap.org/img/wn/" + dayThreeImgEl + "@2x.png";
          let imgSrc3 = document.getElementById("dayThreeImg");
          imgSrc3.src = imgLink3;

          let tempThree = document.getElementById("tempThree");
          let tempCThree = data.list[20].main.temp - 273.15;
          let tempFThree = Math.round(tempCThree * (9 / 5) + 32);
          tempThree.textContent = "Tempurature: " + tempFThree + "°C";

          let humidityThree = document.getElementById("humidityThree");
          humidityThree.textContent =
            "Humidity: " + data.list[20].main.humidity + "%";

          let dayFourEl = document.getElementById("dayFour");
          dayFourEl.textContent = data.list[28].dt_txt;
          let dayFourImgEl = data.list[28].weather[0].icon;
          let imgLink4 =
            "http://openweathermap.org/img/wn/" + dayFourImgEl + "@2x.png";
          let imgSrc4 = document.getElementById("dayFourImg");
          imgSrc4.src = imgLink4;

          let tempFour = document.getElementById("tempFour");
          let tempCFour = Math.round(data.list[28].main.temp - 273.15);
          tempFour.textContent = "Tempurature: " + tempCFour + "°C";

          let humidityFour = document.getElementById("humidityFour");
          humidityFour.textContent =
            "Humidity: " + data.list[28].main.humidity + "%";

          let dayFiveEl = document.getElementById("dayFive");
          dayFiveEl.textContent = data.list[36].dt_txt;
          let dayFiveImgEl = data.list[36].weather[0].icon;
          let imgLink5 =
            "http://openweathermap.org/img/wn/" + dayFiveImgEl + "@2x.png";
          let imgSrc5 = document.getElementById("dayFiveImg");
          imgSrc5.src = imgLink5;

          let tempFive = document.getElementById("tempFive");
          let tempCFive = Math.round(data.list[36].main.temp - 273.15);
          tempFive.textContent = "Tempurature: " + tempCFive + "°C";

          let humidityFive = document.getElementById("humidityFive");
          humidityFive.textContent =
            "Humidity: " + data.list[36].main.humidity + "%";
        });
    });
});

clearButton.addEventListener("click", function() {
  cityList.textContent = "";
});
