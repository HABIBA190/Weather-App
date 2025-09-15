 let input = document.getElementById("userinput");
    let button = document.getElementById("searchBtn");
    let result = document.getElementById("result");
    let error = document.getElementById("error");
   
    function clearWeatherEffects() {
          document.querySelectorAll(".sun, .cloud, .drop, .snowflake").forEach(el => el.remove());
    }

function createWeatherEffect(condition) {
  clearWeatherEffects();

if (condition.includes("clear")) {
  document.body.className = "sunny-bg";
  let sun = document.createElement("div");
  sun.classList.add("sun");
  document.body.appendChild(sun);
  document.querySelector(".container").style.background = "linear-gradient(to bottom, #fff8e1, #ffe082)";
} else if (condition.includes("cloud")) {
  document.body.className = "cloudy-bg"; 
  for (let i = 0; i < 4; i++) { 
    let cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.top = `${50 + i * 100}px`;  
    cloud.style.left = `${50 + i * 150}px`; 
    document.body.appendChild(cloud);
      document.querySelector(".container").style.background = "";
  }
}

   else if (condition.includes("rain")) {
    document.body.className = "rainy-bg";
    for (let i = 0; i < 80; i++) {
      let drop = document.createElement("div");
      drop.classList.add("drop");
      drop.style.left = `${Math.random() * window.innerWidth}px`; 
      drop.style.animationDuration = `${0.5 + Math.random()}s`; 
      document.body.appendChild(drop);
       document.querySelector(".container").style.background = "";
    }

  } else if (condition.includes("snow")) {
    document.body.className = "snowy-bg";
    for (let i = 0; i < 40; i++) {
      let snowflake = document.createElement("span");
      snowflake.classList.add("snowflake");
      snowflake.innerText = "❄";
      snowflake.style.left = `${Math.random() * window.innerWidth}px`;
      snowflake.style.fontSize = `${12 + Math.random() * 24}px`;
      snowflake.style.animationDuration = `${5 + Math.random() * 5}s`;
      document.body.appendChild(snowflake);
       document.querySelector(".container").style.background = "";
    }
  }
}


    
button.addEventListener("click", async function() {
  let value = input.value.trim();
  if (!value) {
    alert("Enter your city or country");
    return;
  }

  try {
    let q = value;
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=88d82b0a752a687c37739c665bfe3705&units=metric`);
    let response = await data.json();
    let iconCode = response.weather[0].icon;

    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    let condition = response.weather[0].main.toLowerCase();
    createWeatherEffect(condition);


    let weatherInfo = `City: ${response.name}🌍 <br>
    Temperature: ${response.main.temp}°C 🌡️ <br>
    Condition: ${response.weather[0].description} ☁️ <br>
    Humidity: ${response.main.humidity}% 💧 <br>
    Wind Speed: ${response.wind.speed} m/s 💨`
  

    if (response.cod === "404") {
          document.getElementById("error").innerText = "❌ City not found";
          document.querySelector(".weather-card").classList.remove("hidden");
    } else {
          document.getElementById("error").innerText = "";
          document.getElementById("city").innerText = response.name + " 🌍";
          document.getElementById("icon").src = iconUrl;
          document.getElementById("temp").innerText = `🌡️ ${response.main.temp}°C`;
          document.getElementById("condition").innerText = `☁️ ${response.weather[0].description}`;
          document.getElementById("humidity").innerText = `💧 Humidity: ${response.main.humidity}%`;
          document.getElementById("wind").innerText = `💨 Wind: ${response.wind.speed} m/s`;
          document.querySelector(".weather-card").classList.remove("hidden");
        }    }
      catch (err) {
        console.log("Error fetching weather:", err);
        }
      });