<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Weather App</title>
  <link rel="stylesheet" href="style.css" />
  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <main class="container">
    <h1>🌤️ My Weather App</h1>

    <form id="searchForm">
      <input type="text" id="cityInput" placeholder="Enter city name..." />
      <button type="submit">Search</button>
    </form>

    <button id="locationBtn">📍 Use My Location</button>

    <section class="weather-info">
      <figure class="name">
        <figcaption>--</figcaption>
        <img src="" alt="Country Flag" />
      </figure>

      <div class="temperature">
        <img src="" alt="Weather Icon" />
        <span>--</span><sup>°C</sup>
      </div>

      <p class="description">--</p>

      <div class="details">
        <div class="detail-box">
          <h3>Clouds</h3>
          <p id="clouds">--</p>
        </div>
        <div class="detail-box">
          <h3>Humidity</h3>
          <p id="humidity">--</p>
        </div>
        <div class="detail-box">
          <h3>Pressure</h3>
          <p id="pressure">--</p>
        </div>
      </div>
    </section>

    <section class="forecast">
      <h2>5-Day Forecast</h2>
      <canvas id="forecastChart"></canvas>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>

