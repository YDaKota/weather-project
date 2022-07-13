/*
Your task
In your project, when a user searches for a city (example: New York), it should display: 
1) the name of the city on the result page 
2) and the current temperature of the city.

Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.

🙀 Bonus point:
Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display 
and the city and current temperature using the OpenWeather API.*/

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`; 
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp); 
  document.querySelector("#min_degrees").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#max_degrees").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "625025b7fba832849134c0f53ae6febc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "625025b7fba832849134c0f53ae6febc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 66;
  //Math.round((temperature * 9) / 5 + 32);
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 19;
} 

let dateElement = document.querySelector("#today");
console.log(dateElement);
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit); 

searchCity("Kyiv");

let cityElement = document.querySelector("#city");
let cityInput = document.querySelector("#city-input");

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


