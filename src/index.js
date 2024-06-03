const API_key = "979813dc6c134dfe9ae130434243105";
const url = `https://api.weatherapi.com/v1/current.json?key=${API_key}&q=`;

const getWeather = async (location) => {
  const response = await fetch(`${url}${location}`);
  const weatherData = await response.json();
  return weatherData;
};

const display = (weatherData) => {
  const weatherDiv = document.querySelector(".weatherDiv");
  const tempC = document.createElement("p");
  tempC.innerText = `Temperature in ${weatherData.location.name} is : ${weatherData.current.temp_c} Celsius`;
  weatherDiv.appendChild(tempC);
};

const findWeatherBtn = document.querySelector(".findWeather");
findWeatherBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const currentLocation = document.querySelector("#locationInput");
  const weather = await getWeather(currentLocation.value);
  display(weather);
  console.log(weather);
});
