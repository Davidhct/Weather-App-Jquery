$(document).ready(function () {
  listenerSearchIcon();
});

function listenerSearchIcon() {
  $("#searchIcon").click(function () {
    const inputVal = $(".search-input").val();
    getWeatherRequest(inputVal);
  });
}

async function getWeatherRequest(inputVal) {
  const key = "789e6aefa7f26f60027ce65cd1d704de";
  const urlRequest = `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${key}`;

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${key}`
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Problem ${res.status}`);
      return res.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((err) => console.error(err));
}

function displayWeather(weatherData) {
  const daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log(weatherData);
  $(".city-name").append(`${weatherData.city.name}`);

  let daysWeatherHtml = "";
  let days = weatherData.list.filter(
    (item) => new Date(item.dt_txt).getHours() === 12
  );

  days.forEach((element) => {
    const day = new Date(element.dt_txt);
    daysWeatherHtml += `
      <div class="day-card">
      <div class="day">${daysInWeek[day.getDay()]}</div>
      <div class="date">${element.dt_txt}</div>
      <img src="http://openweathermap.org/img/wn/${
        element.weather[0].icon
      }@2x.png" class="icon"/>
      <div class="desc">${element.weather[0].description}</div>
      <div class="temp">${element.main.temp}</div>
      </div>
      `;
  });
  console.log(daysWeatherHtml);

  $(".cards").append(daysWeatherHtml);
  // $("main").append(cityHtml);
}
