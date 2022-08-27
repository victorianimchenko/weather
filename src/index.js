let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let weekDayEl = document.querySelector("h2");
let city = document.querySelector(".city");
let timeEl = document.querySelector(".time");
weekDayEl.innerHTML = day;
timeEl.innerHTML = `${hours}:${minutes}`;
let apiKey = "0a3dadf18b515dd8ef455f89d6ea9344";
let units = "metric";
let precipitationEl = document.querySelector(".precipitation");
let windEl = document.querySelector(".wind");
let formEl = document.querySelector("form");
let search = document.querySelector("#button-addon2");
let btn = document.querySelector(".current-button");
const tempEl = document.querySelector(".temperature");
let weatherEl = document.querySelector(".weather-main");
let temperatureEl = document.querySelector(".link-c");
let faringateEl = document.querySelector(".link-f");

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  tempEl.innerHTML = `${temperature}°C`;
  weatherEl.innerHTML = response.data.weather[0].main;
  city.innerHTML = response.data.name;
  precipitationEl.innerHTML = `${response.data.main.humidity}%`;
  windEl.innerHTML = `${response.data.wind.speed}km/h`;
}

async function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector(".form-control");
  if (input.value) {
    city.innerHTML = input.value.trim();

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}`;

    await axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
  }
}

function switchTemperature(event) {
  event.preventDefault();

  let changeEl = document.querySelector(".temperature");
  if (event.target.classList[0] === "link-c") {
    changeEl.innerHTML = `${33}°C`;
  } else {
    changeEl.innerHTML = `${66}°F`;
  }
}

async function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  await axios.get(url).then(showTemp);
}

async function showCurrentPosition(event) {
  event.preventDefault();
  await navigator.geolocation.getCurrentPosition(handlePosition);
}

formEl.addEventListener("submit", searchCity);
search.addEventListener("click", searchCity);
temperatureEl.addEventListener("click", switchTemperature);
faringateEl.addEventListener("click", switchTemperature);
btn.addEventListener("click", showCurrentPosition);
