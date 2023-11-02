const zipCodeInput = document.getElementById("zipCodeInput");
const searchButton = document.getElementById("searchButton");
const weatherLocation = document.querySelector(".temps__wrapper");
const loadingData = document.querySelector(".loading")
const zipCodeSuccess = document.querySelector(".temp__card")
const localWeatherLocation = document.querySelector(".location__header")

//showing temps when data loads
function showTempCards() {
  const tempCards = document.querySelectorAll(".temp__card");
  tempCards.forEach((card) => {
    card.style.display = "block";
  });
}

//Fetching Data from API
async function getLocationData(zipCode) {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=jzepoFpxGnzzlfOpukbXNpWnkrmplkKD&q=${zipCode}`
    );
    const data = await response.json();

    // localWeatherLocation.innerHTML = data.ParentCity[{1}]
    //   .map((LocalizedName) => localWeather(LocalizedName))
    //   .join("");


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
    weatherLocation.innerHTML = data.DailyForecasts.map((DailyForecasts) =>
      tempsHtml(DailyForecasts)
    ).join("");


    console.log(data);
    showTempCards();
    return data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    return null;
  }
}

async function main() {
  const zipCode = zipCodeInput.value; // Get ZIP code from user input
  if (zipCode) {
    loadingData.style.display = "block"; 
    const locationData = await getLocationData(zipCode);

    if (locationData) {
      const locationKey = locationData[0]?.Key;
      await getWeatherForecast(locationKey);
    }
  } else {
    loadingData.style.display = "none";

  }
}


main();

// listener for fetch button
searchButton.addEventListener("click", async () => {
  const zipCode = zipCodeInput.value;
  if (zipCode) {
    loadingData.style.display = "block"
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const locationData = await getLocationData(zipCode);
      if (locationData) {
        const locationKey = locationData[0]?.Key;
        await getWeatherForecast(locationKey);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally{
      loadingData.style.display = "none"
    }
  }
});



//Placing data in htlm form
function tempsHtml(DailyForecasts) {
  const IconPhrase = DailyForecasts.Day.IconPhrase;
  //Showing Icons for corresponding weather 
   const iconMap = {
     Rain: "./images/rain.png",
     "Intermittent clouds": "./images/clouds.png",
     "Mostly cloudy": "./images/clouds.png",
     "Partly sunny": "./images/clouds.png",
     Sunny: "./images/clear.png",
     "Mostly sunny": "./images/clear.png",
     Wind: "./images/wind.png",
     Mist: "./images/mist.png",
     Snow: "./images/snow.png",
     Cloudy: "./images/clouds.png",
   };

   const iconSrc = iconMap[IconPhrase] 

  return `<div class="temp__card">
          
            <h1 class="weekly--para"></h1>
            <img class="temp__img" src="${iconSrc}" alt="">
            <h1 class="weekly--para--location">${DailyForecasts.Day.IconPhrase}</h1>
            <div class="card__split"></div>
            <p class="high">High: ${DailyForecasts.Temperature.Maximum.Value}&deg ${DailyForecasts.Temperature.Maximum.Unit} </p>
            <p class="low">Low: ${DailyForecasts.Temperature.Minimum.Value}&deg ${DailyForecasts.Temperature.Minimum.Unit}</p>
        </div>`;
}

//  <h1 class="weekly--para">${ParentCity.LocalizedName}</h1>

function localWeather(ParentCity) {
  return `<h1 class="location__header">${ParentCity.LocalizedName}</h1>`;
}