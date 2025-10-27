const apiKey = '9505fd1df737e20152fbd78cdb289b6a';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey;
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + apiKey;

const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const locationBtn = document.getElementById('locationBtn');
let chartInstance = null;

// Elements
const city = document.querySelector('.name figcaption');
const flag = document.querySelector('.name img');
const temp = document.querySelector('.temperature span');
const icon = document.querySelector('.temperature img');
const desc = document.querySelector('.description');
const clouds = document.getElementById('clouds');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const forecastCanvas = document.getElementById('forecastChart');

// Search by city
form.addEventListener('submit', e => {
  e.preventDefault();
  if(cityInput.value) {
    getWeather(cityInput.value);
    getForecast(cityInput.value);
    cityInput.value = '';
  }
});

// Use location
locationBtn.addEventListener('click', () => {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      getWeatherByCoords(latitude, longitude);
      getForecastByCoords(latitude, longitude);
    }, () => alert("Location access denied"));
  } else alert("Geolocation not supported");
});

// Get weather
function getWeather(cityName){
  fetch(`${weatherURL}&q=${cityName}`)
    .then(res => res.json())
    .then(data => updateWeatherUI(data));
}

// Get weather by coords
function getWeatherByCoords(lat, lon){
  fetch(`${weatherURL}&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => updateWeatherUI(data));
}

// Update UI
function updateWeatherUI(data){
  if(data.cod !== 200) return alert("City not found!");
  city.innerText = data.name;
  flag.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
  temp.innerText = data.main.temp.toFixed(1);
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  desc.innerText = data.weather[0].description;
  clouds.innerText = data.clouds.all + '%';
  humidity.innerText = data.main.humidity + '%';
  pressure.innerText = data.main.pressure + ' hPa';
}

// Get forecast
function getForecast(cityName){
  fetch(`${forecastURL}&q=${cityName}`)
    .then(res => res.json())
    .then(data => drawForecastChart(data));
}

// Get forecast by coords
function getForecastByCoords(lat, lon){
  fetch(`${forecastURL}&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => drawForecastChart(data));
}

// Draw animated forecast
function drawForecastChart(data){
  const labels = [];
  const temps = [];

  data.list.forEach((item, index) => {
    if(index % 8 === 0){ // 1 per day
      const date = new Date(item.dt * 1000);
      labels.push(date.toLocaleDateString("en-US",{weekday:"short"}));
      temps.push(item.main.temp);
    }
  });

  const ctx = forecastCanvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0,0,0,250);
  gradient.addColorStop(0,'rgba(255,255,0,0.6)');
  gradient.addColorStop(1,'rgba(255,0,0,0.2)');

  if(chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Temperature (°C)',
        data: temps,
        fill:true,
        borderColor:'#ffcc00',
        backgroundColor: gradient,
        tension:0.4,
        pointRadius:6,
        pointBackgroundColor:'#fff',
        pointHoverRadius:10
      }]
    },
    options: {
      responsive:true,
      plugins:{
        legend:{display:false},
        tooltip:{enabled:true, mode:'index'}
      },
      animations:{
        tension:{
          duration:2000,
          easing:'easeInOutQuad',
          from:0.3,
          to:0.5,
          loop:true
        }
      },
      scales:{
        x:{ticks:{color:'#fff'}},
        y:{ticks:{color:'#fff'}}
      }
    }
  });
}

// Default load
getWeather('New York');
getForecast('New York');
