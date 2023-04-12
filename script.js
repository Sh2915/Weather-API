
let result = document.getElementById("result");/*result from html */
let searchBtn = document.getElementById("search-btn"); /* search bar*/
let cityRef = document.getElementById("city"); /*input button with type text  */

//Function to fetch weather details from api and display them
let getWeather = () => {
  let cityValue = cityRef.value;
  //If input field is empty
  /*It checks the city value length and if its value is null then alerts by 
  saying enter city name */
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
  /*Above case is for if input is empty and below case is if input is not empty */
  //If input field is NOT empty
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    //Clear the input field
    /*In JavaScript, the fetch() method is used to make asynchronous requests to the server 
    and load the information that is returned by the server onto the web pages.
    fetch(url).then(function(response) */
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())   
      //If city name is valid
      /*by url its fetches information and perform data and catch operation
      data if city name is valid
      catch is if the city name is not valid
      from data it fetched icon , description. temp min and max city name*/
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);
        /*in the result section displayes the name , descption obtained from data.weather[0] 
        Another container is made to display the min and max temp.*/
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;</h4>
            </div>
        </div>
        `;
      })
      //If city name is NOT valid
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};
/*element.addEventListener(event, function, useCapture)
this is the html event used 
load just loads the content from function get weather
also in the search btn on click operation the get weather function is called  */
searchBtn.addEventListener("click", getWeather);

window.addEventListener("load", getWeather);