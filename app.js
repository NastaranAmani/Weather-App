let today = document.querySelector('.today');
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

if (hour < 10) {
    hour = `0${hour}`;
  }
if (minute < 10) {
    minute = `0${minute}`;
  }

today.innerHTML = `${day} ${hour}:${minute}`;


function updateCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector(".search-input");
    let searchBtn = document.querySelector(".search");
    let apiKey = "8161b4309ee03faae957729ba7104797";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
    let heading = document.querySelector("h1");

    heading.innerHTML = searchInput.value;
    axios.get(apiUrl).then(displayWeather);
    
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
      }
    });
}

let form = document.querySelector("form");
form.addEventListener("submit", updateCity);

function getForecast(coordinates) {
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
    
    let currentTemperature = document.querySelector(".temp");
    let weatherDescription = document.querySelector(".description");
    let windSpeed = document.querySelector(".wind");
    let humidity = document.querySelector(".humidity");
    let iconElement = document.querySelector('.icon');
    
    celciusTemperature = response.data.main.temp

    currentTemperature.innerHTML = `${Math.round(celciusTemperature)}`;
    weatherDescription.innerHTML = `, ${response.data.weather[0].description}`;
    windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
    humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

    iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute('alt', response.data.weather[0].description);
    
    getForecast(response.data.coord)
}
function displayForecast(response) {

    let forecastElement = document.querySelector('.forecast');
    let forecastHTML = "";
    let days1 = ['Thu', 'Fri', 'Sat', 'Sun'];

    days1.forEach(function (forecastDay) {
      forecastHTML = forecastHTML + `
      <div class="col-span-1">
          <span>${forecastDay.dt}</span>
          
          <span>${forecastDay.temp.max}</span>
          <span>${forecastDay.temp.min}</span>
      </div>
    `;
    })
    forecastElement.innerHTML = forecastHTML
}
// Fahrenheit Temperature
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('.temp');

  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature)
}

function displayCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active")
  fahrenheitLink.classList.remove("active")
  let temperatureElement = document.querySelector('.temp');
  temperatureElement.innerHTML = Math.round(celciusTemperature)
}

let celciusTemperature = null;

fahrenheitLink = document.querySelector('.fahrenheit')
fahrenheitLink.addEventListener('click', displayFahrenheit);

celciusLink = document.querySelector('.celcius')
celciusLink.addEventListener('click', displayCelcius);