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
let descriptionEl = document.querySelector(".description");
let precipitationEl = document.querySelector(".precipitation");
let windEl = document.querySelector(".wind");
let formEl = document.querySelector("form");
let search = document.querySelector("#button-addon2");
let btn = document.querySelector(".current-button");
const tempEl = document.querySelector(".temperature");
let weatherEl = document.querySelector(".weather-main");
let temperatureEl = document.querySelector(".link-c");
let faringateEl = document.querySelector(".link-f");
let imageEl = document.querySelector(".sunny-icon");
let dataTemp = null;


navigator.geolocation.getCurrentPosition(handlePosition);


function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  dataTemp = temperature;

  if (response.data.weather[0].main === "Clear") {
    imageEl.src = "images/sunny.png";
  }
  if (response.data.weather[0].main === "Clouds") {
    imageEl.src = "images/cloudy.png";
  }
  if (response.data.weather[0].main === "Rain") {
    if (
      response.data.weather[0].description === "light intensity shower rain"
    ) {
      imageEl.src = "images/rain_light.png";
    } else {
      imageEl.src = "images/rain.png";
    }
  }
  if (response.data.weather[0].main === "Thunderstorm") {
    imageEl.src = "images/thunderstorms.png";
  }

  tempEl.innerHTML = `${temperature}°C`;
  weatherEl.innerHTML = response.data.weather[0].main;

  city.innerHTML = response.data.name;
  descriptionEl.innerHTML = `${response.data.weather[0].description}`;
  precipitationEl.innerHTML = `${response.data.main.humidity}%`;
  windEl.innerHTML = `${response.data.wind.speed}km/h`;


  getForecast(response.data.coord)
  
  
}


function displayForecast(response) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ` <div class="row row-cols-1 row-cols-md-5 g-4">`;
  let indexCurrentDay = currentDate.getDay();
  forecast.forEach(function (forecastDay, index) {
    
        if (index < 5) {
    let currentDay = indexCurrentDay + index; 
        
    if(currentDay > 5)
    {
       indexCurrentDay = -1;
    }
  
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
            <div class="card h-100">
             
              <div class="card-body center">
                <h5 class="card-title temperature">${days[currentDay]}</h5>
              <img src=${getAddressImage(forecastDay.weather[0].main, forecastDay.weather[0].description)} />

              <div class="card-text temperature">
                <span class="forecast-temperature-max">
                ${Math.round(
                  response.data.daily[index].temp.max
                )}°
                </span>
                <span class="forecast-temperature-min">
                ${Math.round(
                  response.data.daily[index].temp.min
                )}°
                </span>
              </div>
              </div>
            </div>
          </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getAddressImage(weather, description){

if (weather === "Clear") {
  return "images/sunny.png";
}
if (weather === "Clouds") {
  return "images/cloudy.png";
}
if (weather === "Rain") {
  if (
    description === "light intensity shower rain"
  ) {
    return "images/rain_light.png";
  } else {
    return "images/rain.png";
  }
}
if (weather === "Thunderstorm") {
  return "images/thunderstorms.png";
}
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
    changeEl.innerHTML = `${dataTemp ? dataTemp : 33}°C`;
    
  } else {
    changeEl.innerHTML = `${dataTemp ? Math.round((dataTemp*9)/5+32) : 66}°F`;
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



 async function getForecast(coordinates){
  let apiKeyFor = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeyFor}&units=metric`;

  await axios.get(apiUrl).then(displayForecast);
}




formEl.addEventListener("submit", searchCity);
search.addEventListener("click", searchCity);
temperatureEl.addEventListener("click", switchTemperature);
faringateEl.addEventListener("click", switchTemperature);
btn.addEventListener("click", showCurrentPosition);

