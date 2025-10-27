let apiKey = '9505fd1df737e20152fbd78cdb289b6a';
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey;
let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + apiKey;

let form = document.querySelector("form");
let valueSearch = document.getElementById("name");
let city = document.querySelector(".name");
let temperature = document.querySelector(".temperature");
let description = document.querySelector(".description");
let clouds = document.getElementById("clouds");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let main = document.querySelector("main");
let forecastGrid = document.querySelector(".forecast-grid");

// Event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (valueSearch.value.trim() !== "") {
    getWeather(valueSearch.value.trim());
  }
});

// Fetch current weather
function getWeather(cityName) {
  fetch(weatherUrl + "&q=" + cityName)
    .then(res => res.json())
    .then(data => {
      if (data.cod == 200) {
        city.querySelector("figcaption").innerText = data.name;
        city.querySelector("img").src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
        temperature.querySelector("img").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        temperature.querySelector("span").innerText = data.main.temp.toFixed(1);
        description.innerText = data.weather[0].description;
        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;

        getForecast(cityName);
      } else {
        showError();
      }
    })
    .catch(showError);
}

// Fetch 5-day forecast
function getForecast(cityName) {
  fetch(forecastUrl + "&q=" + cityName)
    .then(res => res.json())
    .then(data => {
      if (data.cod == "200") {
        displayForecast(data);
      }
    });
}

// Display forecast cards
function displayForecast(data) {
  forecastGrid.innerHTML = "";
  let dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  dailyData.forEach(day => {
    let date = new Date(day.dt * 1000);
    let weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    let icon = day.weather[0].icon;
    let temp = Math.round(day.main.temp);
    let desc = day.weather[0].description;

    let card = document.createElement("div");
    card.classList.add("forecast-day");
    card.innerHTML = `
      <h4>${weekday}</h4>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
      <p>${temp}°C</p>
      <small>${desc}</small>
    `;
    forecastGrid.appendChild(card);
  });
}

// Error animation
function showError() {
  main.classList.add("error");
  setTimeout(() => main.classList.remove("error"), 1000);
}

// Default city
function init() {
  valueSearch.value = "Washington";
  getWeather("Washington");
}
init();
