function formatDate(date) {
  let now = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function formatHours(date) {
  return `${hours};${minutes}`;
}

function displayWeather(response) {
  console.log(response);
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");

  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let descriptionElemnet = document.querySelector("#description");

  celciusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celciusTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElemnet.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAtribute("atl", response.data.weather[0].description);
}

//function displayforecast(response) {
//let forecastElement = document.querySelector("#forecast");
//console.log(response.data);
//let forecast = response.data.list[0];
//forecastElement.innerHTML = ` <div class="col-sm-2">
// ${forecast.dt_txt}
// <div class="icon">
// <img
//src="http://openweathermap.org/img/wn/${
//forecast.weather[0].icon
// }@2x.png"
// atl=" "
// />
// </div>
//<div class="climate" id="temp">${Math.round(
///  forecast.main.temp_max
/// )}°</div>
////</div>`;
//}

function search(city) {
  let apiKey = "ebfabc5404a59f422c248844343ef151";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  //apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  //axios.get(apiUrl).then(displayforecast);
}

function handleSubmit(event) {
  event.preventDefault();
  // let city = document.querySelector("#city");
  //let citySearch = document.querySelector("#inside-input");
  //city.innerHTML = citySearch.value;
  let city = document.querySelector("#inside-input").value;
  search(city);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celciusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheiTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let dateElement = document.querySelector("#date");
let now = new Date();

let searchForm = document.querySelector("#inside");
searchForm.addEventListener("submit", handleSubmit);

dateElement.innerHTML = formatDate(now);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("France");
