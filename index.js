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
  try {
    const apiKey = "789e6aefa7f26f60027ce65cd1d704de";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&units=metric&appid=${apiKey}`
    );

    if (!res.ok) throw new Error(`Problem ${res.status}`);
    const weatherData = await res.json();

    renderWeather(weatherData);

    return `Weather data: ${weatherData}`;
  } catch (err) {
    console.error(`${err.message} 🧨`);
  }
}

function renderWeather(weatherData) {
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
    (item) => new Date(item.dt_txt).getHours() === 15
  );

  days.forEach((element) => {
    const day = new Date(element.dt_txt);
    let date = modifyDate(element.dt_txt);
    daysWeatherHtml += `
      <div class="day-card">
      <div class="day">${daysInWeek[day.getDay()]}</div>
      <div class="date">${date}</div>
      <div class="temp">${element.main.temp.toFixed(1)}9&#176C</div>
      <img src="http://openweathermap.org/img/wn/${
        element.weather[0].icon
      }@2x.png" class="icon"/>
      <div class="desc">${element.weather[0].description}</div>
      
      </div>
      `;
  });

  console.log(daysWeatherHtml);

  $(".cards").append(daysWeatherHtml);
  // $("main").append(cityHtml);
}

function modifyDate(dt) {
  let [date, _] = dt.split(" ");
  date = date.replaceAll("-", ".");

  return date;
}
