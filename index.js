//AccuWeather API Key: jzepoFpxGnzzlfOpukbXNpWnkrmplkKD
//get location: "http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=jzepoFpxGnzzlfOpukbXNpWnkrmplkKD&q=78227";
//5 day forcast: "http://dataservice.accuweather.com/forecasts/v1/daily/5day/34150_PC?apikey=jzepoFpxGnzzlfOpukbXNpWnkrmplkKD"
console.log("hello world");

// async function zipCode (){
//   const response = await fetch(
//     "http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=jzepoFpxGnzzlfOpukbXNpWnkrmplkKD&q="
//   );
//   const data = await response.json();
//   console.log(data);
// }

// zipCode()

// async function main (){
//     const response = await fetch(
//       "http://dataservice.accuweather.com/forecasts/v1/daily/5day/34150_PC?apikey=jzepoFpxGnzzlfOpukbXNpWnkrmplkKD"
//     );
//     const data = await response.json()
//     console.log(data)
// }

// main()


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
  const zipCode = "34150_PC"; // Replace with the actual ZIP code you want to use.

  // Get location data
  const locationData = await getLocationData(zipCode);
  if (locationData) {
    // Extract the location key from the location data
    const locationKey = locationData[0]?.Key;

    // Get weather forecast using the location key
    await getWeatherForecast(locationKey);
  }
}

main();
