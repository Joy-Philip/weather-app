const apiKey = "d700eb1511c86fc96fe0f4b276e7878e"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=&appid=d700eb1511c86fc96fe0f4b276e7878e&units=metric"

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-img")



async function checkWeather(city){
    const url = await fetch(apiUrl + city + `appid=${apiKey}`)
    var data = await url.json()
    console.log(data)

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#8451"
    document.querySelector(".humidityyy").innerHTML = Math.round(data.main.humidity) + "%"
    document.querySelector(".windSpeed").innerHTML = Math.round(data.wind.speed) + "km/hr"

    if(data.weather[0].main == "sunny"){
        weatherIcon.src = "images/1530392_weather_sun_sunny_temperature_icon.png"
    }
    else if(data.weather[0].main == "clouds"){
        weatherIcon.src = "images/1530391_weather_clouds_sun_sunny_icon.png"
    }
    else if(data.weather[0].main == "rain"){
        weatherIcon.src = "images/1530362_weather_clouds_cloudy_forecast_rain_icon.png"
    }

    document.querySelector(".weather").style.display = "block"
    document.querySelector(".other-details").style.display = "block"
}

searchBtn.addEventListener("click", async () => {
    const city = searchBox.value
    await checkWeather(city)
})
