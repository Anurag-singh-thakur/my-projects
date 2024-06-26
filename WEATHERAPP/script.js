const apiKey = "b7b1a99ce8f4c3a0a712b3da7ea57295";

function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value.trim();

  if (cityName === "") {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const weatherCondition = data.weather[0].description;
      const weatherIconCode = data.weather[0].icon;

      const weatherIconUrl = `https://openweathermap.org/img/w/${weatherIconCode}.png`;

      document.querySelector(".weather-info").style.display = "block";

      document.getElementById("temperature").textContent = `${temperature}°C`;
      document.getElementById("weatherCondition").textContent =
        weatherCondition;
      document.getElementById("cityName").textContent = cityName;
      document.getElementById("weatherIcon").src = weatherIconUrl;

      cityInput.value = "";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Sorry, we couldn't find that city. Please try again.");
    });
}

function fetchWeatherByCoordinates(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const weatherCondition = data.weather[0].description;
      const weatherIconCode = data.weather[0].icon;

      const weatherIconUrl = `https://openweathermap.org/img/w/${weatherIconCode}.png`;

      document.querySelector(".weather-info").style.display = "block";

      document.getElementById("temperature").textContent = `${temperature}°C`;
      document.getElementById("weatherCondition").textContent =
        weatherCondition;
      document.getElementById("cityName").textContent = "Your Location";
      document.getElementById("weatherIcon").src = weatherIconUrl;
    })
    .catch((error) => {
      console.error("Error fetching weather data by coordinates:", error);
      alert(
        "Sorry, unable to retrieve the weather for your location. Please try again."
      );
    });
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetchWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        alert("Sorry, unable to retrieve your location. Please try again.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

//5 days forecast
function get5dayForecast() {
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value.trim();

  if (cityName === "") {
    alert("Please enter a city name.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      display5DayForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching 5-day forecast:", error);
      alert("Sorry, we couldn't fetch the 5-day forecast. Please try again.");
    });
}

function display5DayForecast(forecastData) {
  const forecastContainer = document.querySelector(".five-day-forecast");
  forecastContainer.innerHTML = "";

  for (let i = 0; i < forecastData.length && i < 40; i += 8) {
    const forecast = forecastData[i];
    const forecastElement = document.createElement("div");
    forecastElement.classList.add("forecast");

    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    forecastElement.innerHTML = `
      <h3>${day}, ${date.getDate()} ${date.getMonth() + 1}</h3>
      <img src="https://openweathermap.org/img/w/${
        forecast.weather[0].icon
      }.png" alt="${forecast.weather[0].description}">
      <h4>${forecast.main.temp}°C</h4>
      <p>${forecast.weather[0].description}</p>
    `;

    forecastContainer.appendChild(forecastElement);
  }

  forecastContainer.style.display = "block";
}