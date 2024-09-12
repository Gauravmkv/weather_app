const apikey = "5eff3c7274ef945d89bb045f81c57c8d";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".Weather-icon");

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".Weather").style.display = "none";
    } else {
        const data = await response.json();
        
        console.log(data); // Check the data in the console to ensure correct retrieval

        // Update city name, temperature, humidity, and wind speed
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on weather condition
        const weatherCondition = data.weather[0].main.toLowerCase(); // Convert to lowercase to handle consistency
        switch (weatherCondition) {
            case "clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                weatherIcon.src = "images/mist.png"; // Fallback in case no match is found
                break;
        }
        document.querySelector(".Weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for button click
searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});

// Event listener for pressing 'Enter' key
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkweather(searchBox.value);
    }
});
