// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event){
      // - Ignore the default behavior of the button
      event.preventDefault()
      // - Get a reference to the element containing the user-entered location
      let locationInput = document.querySelector(`#location`)
  
      // - Get the user-entered location from the element's value
      let location = locationInput.value
  
      // - Get a reference to the element containing the user-entered number of days
      let daysInput = document.querySelector(`#days`)

      // - Get the user-entered number of days from the element's value
      let days = daysInput.value

      // - Check to see if the user entered anything; if so:
      if (location.length>0 && days.length>0){
  
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=7506f13e3a674716b55154527212704&q=${location}&days=${days}`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the interpreted location, current weather conditions, the forecast as three separate variables
        let interpretedLocation = `${json.location.name}, ${json.location.region}`
        let weatherConditions = json.current.condition
        let currentTemp = json.current.temp_f
        let weatherForcast = json.forecast.forecastday

        // - Continue the recipe yourself!

      // Add in title based on user input

        // Create a variable for the current weather div we're going to add to
        let currentWeather = document.querySelector(`.current`)

        // Insert HTML into the current weather div, using the data from the weather api
        currentWeather.insertAdjacentHTML(`beforeend`,`
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${interpretedLocation}</div>
          <div class="font-bold">
            <img src=https:${weatherConditions.icon} class="inline-block">
            <span class="temperature">${currentTemp}</span>° 
            and
            <span class="conditions">${weatherConditions.text}</span>
          </div>
        </div>
        `)
      // Add in forecast section
        
          // Create a variable fo the forecast div we're going to add to
          let forecastList = document.querySelector(`.forecast`)

          // Add forecast title, using dynamic number of days variable 
          forecastList.insertAdjacentHTML(`beforeend`, `
          <div class="forecastSection text-center space-y-8">
            <div class="font-bold text-3xl">${days} Day Forecast</div>
            `)
            // For every day the the forecast object, display the general weather condition, the date, the temperature (high to low) and condition
            // Loop through the weather forecast object to display every day, but only display the forecast section title above once. 
            for (let i=0; i<weatherForcast.length; i++){
              forecastList.insertAdjacentHTML(`beforeend`, `
            <div class="text-center">
              <img src="https:${weatherForcast[i].day.condition.icon}" class="mx-auto">
              <h1 class="text-2xl text-bold text-gray-500">${weatherForcast[i].date}</h1>
              <h2 class="text-xl">High ${weatherForcast[i].day.maxtemp_f}° – Low ${weatherForcast[i].day.mintemp_f}°</h2>
              <p class="text-gray-500">${weatherForcast[i].day.condition.text}</h1>
            </div>
          `)
            }
          // Add in ending div for the forecast section
          forecastList.insertAdjacentHTML(`beforeend`,`</div>`)
      }
    })
  })