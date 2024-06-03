const API_key = "979813dc6c134dfe9ae130434243105";
const url = `https://api.weatherapi.com/v1/current.json?key=${API_key}&q=`;

const getWeather = async (location) => {
  const response = await fetch(`${url}${location}`);
  const weatherData = await response.json();
  return weatherData;
};

const getIconUrl = (iconUrl) => {
  if (iconUrl.includes("day")) {
    return `./images/weather/day/${iconUrl.split("day/")[1]}`;
  } else if (iconUrl.includes("night")) {
    return `./images/weather/night/${iconUrl.split("night/")[1]}`;
  }
};

const display = (weatherData) => {
  const weatherDiv = document.querySelector(".weatherDiv");

  const tempC = document.createElement("h3");
  tempC.innerText = `Temperature in ${weatherData.location.name} is : ${weatherData.current.temp_c} Celsius`;

  const tempF = document.createElement("h3");
  tempF.innerText = `Temperature in ${weatherData.location.name} is : ${weatherData.current.temp_f} Fahrenheit`;

  const time = document.createElement("h3");
  time.innerText = `Local Time: ${
    weatherData.location.localtime.split(" ")[1]
  } \n Last Updated: ${weatherData.current.last_updated.split(" ")[1]}`;

  const img = document.createElement("img");
  //   img.src = `https:${weatherData.current.condition.icon}`;
  img.src = getIconUrl(weatherData.current.condition.icon);

  const weatherCondition = document.createElement("h3");
  weatherCondition.innerText = `${weatherData.current.condition.text}`;

  weatherDiv.appendChild(tempC);
  weatherDiv.appendChild(tempF);
  weatherDiv.appendChild(time);

  weatherDiv.appendChild(weatherCondition);
  weatherDiv.appendChild(img);
};

const findWeatherBtn = document.querySelector(".findWeather");
findWeatherBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const currentLocation = document.querySelector("#locationInput");
  const weather = await getWeather(currentLocation.value);
  display(weather);
  console.log(weather);
});

// Example of getting the forecast data for 3 days look at data.forecast.forecastday array
/*
async function getForecast3Days() {
  let z = await fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=979813dc6c134dfe9ae130434243105&q=london&days=3"
  );
  let g = await z.json();
  return g;
}
*/
