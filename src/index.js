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
function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");

  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celciusTemp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAtribute("atl", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "ebfabc5404a59f422c248844343ef151";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  // let city = document.querySelector("#city");
  //let citySearch = document.querySelector("#inside-input");
  //city.innerHTML = citySearch.value;
  let city = document.querySelector("#inside-input").value;
  search(city);
}

let dateElement = document.querySelector("#date");
let now = new Date();

let searchForm = document.querySelector("#inside");
searchForm.addEventListener("submit", handleSubmit);

dateElement.innerHTML = formatDate(now);

search("France");
