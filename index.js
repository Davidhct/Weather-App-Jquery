$(document).ready(function () {
  listenerSearchIcon();
});

const globalVal = {
  wetherTime: undefined,
  inputCount: 0,
};

function listenerSearchIcon() {
  $("#searchIcon").click(function () {
    const inputVal = $(".search-input").val().trim();
    if (inputVal === "") {
      alert(new Error(`You did not enter nothing! 🧨`));
    } else {
      if (globalVal.inputCount === 1) {
        $(".cards").empty();
        $(".city-name").empty();
        globalVal.inputCount === 0;
      }
      getWeatherRequest(inputVal);
      $(".search-input").val("");
      // clockDisplay();
      globalVal.inputCount = globalVal.inputCount + 1;
    }
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
    (item) => new Date(item.dt_txt).getHours() === globalVal.wetherTime
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

  $(".cards").append(daysWeatherHtml);
}

function modifyDate(dt) {
  let [date, _] = dt.split(" ");
  date = date.replaceAll("-", ".");

  return date;
}

setInterval(() => {
  const time = new Date();
  // const month = time.getMonth();
  // const date = time.getDate();
  const hours = time.getHours();
  hours % 3 === 0
    ? (globalVal.wetherTime = hours)
    : (globalVal.wetherTime = 15);

  // const hoursIn2hrFormat = hours >= 13 ? hours % 12 : hours;
  let minutes = time.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  minutes = minutes < 9 && minutes >= 0 ? "0".concat(minutes) : minutes;
  let clock = hours + ":" + minutes + " " + ampm;
  $(".clock").html(clock);
  //   console.log(month);
}, 1000);
