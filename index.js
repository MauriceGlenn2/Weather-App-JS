//AccuWeather API Key: jzepoFpxGnzzlfOpukbXNpWnkrmplkKD
//get location: "http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=jzepoFpxGnzzlfOpukbXNpWnkrmplkKD&q=78227";
//5 day forcast: "http://dataservice.accuweather.com/forecasts/v1/daily/5day/34150_PC?apikey=jzepoFpxGnzzlfOpukbXNpWnkrmplkKD"

// Get a reference to the input field and the fetch button
const zipCodeInput = document.getElementById("zipCodeInput");
const searchButton = document.getElementById("searchButton");
const high = document.querySelector(".high")
const low = document.querySelector(".low")
// const location = document.querySelector(".weekly--para--location");
let temps;

async function getLocationData(zipCode) {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=jzepoFpxGnzzlfOpukbXNpWnkrmplkKD&q=${zipCode}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
}

async function getWeatherForecast(locationKey) {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=jzepoFpxGnzzlfOpukbXNpWnkrmplkKD`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    return null;
  }
}

async function main() {
  const zipCode = zipCodeInput.value; // Get ZIP code from user input
  if (zipCode) {
    const locationData = await getLocationData(zipCode);
    if (locationData) {
      const locationKey = locationData[0]?.Key;
      await getWeatherForecast(locationKey);
    }
  } else {
    console.log("Please enter a ZIP code.");
  }
}

main();

// Add an event listener to the fetch button
searchButton.addEventListener("click", async () => {
  const zipCode = zipCodeInput.value;
  console.log("Button Clicked");
  if (zipCode) {
    try {
      const locationData = await getLocationData(zipCode);
      if (locationData) {
        const locationKey = locationData[0]?.Key;
        await getWeatherForecast(locationKey);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  } else {
    console.log("Please enter a ZIP code.");
  }
});


//placing data in htlm
// const tempsHtml = temps.map(temp =>{
//     return `<div class="temp__card">
//             <img src="" alt="">
//             <h1 class="weekly--para">day 1 Temp</h1>
//             <h1 class="weekly--para--location">Location</h1>
//             <div class="card__split"></div>
//             <p class="high">High: </p>
//             <p class="low">Low: </p>
//         </div>`
// })

