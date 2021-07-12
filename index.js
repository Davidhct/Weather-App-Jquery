$(document).ready(function () {
  listenerSearchIcon();
});

$(document).keypress((event) => {
  if (event.which === 13) {
    event.preventDefault();
    $("#searchIcon").click();
  }
});

const globalVal = {
  wetherTime: undefined,
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  daysInWeek: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

function listenerSearchIcon() {
  $("#searchIcon").click(function () {
    const inputVal = $(".search-input").val().trim();
    if (inputVal === "") {
      alert(new Error(`You did not enter nothing! 🧨`));
    } else {
      $(".cards").empty();
      $(".city-name").empty();
      $(".date-name").empty();

      getWeatherRequest(inputVal);
      $(".search-input").val("");
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
    console.error(alert(`${err.message} 🧨`));
  }
}

function renderWeather(weatherData) {
  console.log(weatherData);

  $(".city-name").append(
    `${weatherData.city.name}, ${weatherData.city.country}   `
  );

  clockDisplay();
  let daysWeatherHtml = "";

  let days = weatherData.list.filter(
    (item) => new Date(item.dt_txt).getHours() === 15
  );
  toDayDate(days[0]);
  days.forEach((element, index) => {
    const day = new Date(element.dt_txt);
    let date = modifyDate(element.dt_txt);

    let className = "hidden";
    if (index === 0) className = "to-day";

    daysWeatherHtml += `
      <div class="day-card ${className}">
      <div class="day">${globalVal.daysInWeek[day.getDay()]}</div>
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
  const [year, month, day] = date.split("-");

  if (month[0] === "0") tmpMonth = month[1];
  else tmpMonth = month;

  date = ` ${day}.${month}.${year}`;

  return date;
}

function toDayDate(toDay) {
  const day = new Date(toDay.dt_txt);

  $(".date-name").append(
    `${globalVal.daysInWeek[day.getDay()]} ${
      globalVal.monthNames[day.getMonth()]
    }, ${day.getFullYear()}`
  );
}

function clockDisplay() {
  setInterval(() => {
    const time = new Date();
    const hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    minutes = minutes >= 0 && minutes <= 9 ? `0${minutes}` : minutes;
    let clock = hours + ":" + minutes + " " + ampm;
    $(".clock").html(clock);
  }, 1000);
}
