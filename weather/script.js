// DOM elements
const cityElem = document.querySelector(".city");
const tempElem = document.querySelector(".temperature");
const conditionElem = document.querySelector(".condition");
const weekElem = document.querySelector(".week");
const dateElem = document.querySelector(".date");
const precipitationElem = document.querySelector(".one .percent");
const humidityElem = document.querySelector(".two .percent");
const windElem = document.querySelector(".three .percent");
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".searchBtn");
const imgWeather = document.querySelector(".imgWeather")
// API 
const apiKey = "d7d49a4790f93aa10ccd3e7b62fffd4f"; 
const apiBase = "https://api.openweathermap.org/data/2.5/weather";

//  weather data
async function getWeatherData(city) {
    try {
        const {data} = await axios.get(`${apiBase}?q=${city}&units=metric&appid=${apiKey}`);

        cityElem.textContent = `${data.name}, ${data.sys.country}`,
        tempElem.textContent = `${Math.round(data.main.temp)}°C`
        conditionElem.textContent = data.weather[0].main;
        precipitationElem.textContent = `${data.clouds.all}%`;
        humidityElem.textContent = `${data.main.humidity}%`;
        windElem.textContent = `${data.wind.speed} km/h`;


        if(data.weather[0].main === "Clouds"){
            imgWeather.src = "./image/cloud.svg";
        } else if(data.weather[0].main === "Clear"){
            imgWeather.src = "./image/sun.svg";
        } else if(data.weather[0].main === "Rain"){
            imgWeather.src = "./image/rain.svg";
        } else if(data.weather[0].main === "Snow"){
            imgWeather.src = "./image/snow.png";
        } else {
            imgWeather.src = "./image/sun.svg"; 
        }


        
        const today = new Date();
        weekElem.textContent = today.toLocaleDateString('en-EN', { weekday: 'long' });
        dateElem.textContent = today.toLocaleDateString('en-EN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (error) {
        alert("City not found!");
    }
}

// search button
searchBtn.onclick = () => {
    const city = searchInput.value
    if (city) {
        getWeatherData(city);
    }
}


getWeatherData("Dushanbe");
