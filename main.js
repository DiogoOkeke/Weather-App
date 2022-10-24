// Getting access to the DOM

let timeText = document.querySelector('.time-text');
let dateText = document.querySelector('.date-text');
let locationCity = document.querySelector('.location-city');
let locationRegion = document.querySelector('.location-region');
let locationCountry = document.querySelector('.location-country');
let weatherTempEmoji = document.querySelector('.weather-temp-emoji');
let weatherReport = document.querySelector('.weather-report');
let weatherTemp = document.querySelector('.weather-temp');
let sunrise = document.querySelector('.sunrise');
let sunset = document.querySelector('.sunset');
let userInput = document.querySelector('.search-input');
let searchIcon = document.querySelector('.search-icon');
let humidity = document.querySelector('.humidity');
let pressure = document.querySelector('.pressure');
let latitude = document.querySelector('.latitude');
let longitude = document.querySelector('.longitude');
let timeZone = document.querySelector('.timezone');
let body = document.querySelector('body');



// Input value check

let inputFormat = /^[A-Za-z ]+$/;

let inputCheckFunc = () => {
 
 if(userInput.value.match(inputFormat)){
  userInput.style.borderColor = 'white';
  searchIcon.style.borderColor = 'white';
  searchIcon.style.color = 'white';
 }
 else{
  userInput.style.borderColor = 'red';
  searchIcon.style.borderColor = 'red';
  searchIcon.style.color = 'red';
 }
 
}

userInput.onkeyup = () => inputCheckFunc();



// Render Date & Time

let time = () =>  {

let dateTime = new Date();
let day = dateTime.getDate();
let hours = dateTime.getHours(); 
let mins = dateTime.getMinutes();
let sec = dateTime.getSeconds();
let meridian = '';

if(hours >= 12){
 hours -= 12;
 meridian = 'PM';
}
else{
 meridian = 'AM';
}

if(hours == 00 && meridian == 'PM'){
 hours = 12;
}
else{
 hours = 00;
}

/*if(hours < 10){
 hours = '0' + hours;
}*/
hours = hours < 10 ? `0${hours}` : hours;

/*if(mins < 10){
 mins = '0' + mins;
}*/
mins = mins < 10 ? `0${mins}` : mins;

/*if(secs < 10){
 secs = '0' + secs;
}*/
sec = sec < 10 ? `0${sec}` : sec;

timeText.textContent = `${hours}:${mins}:${sec} ${meridian}`;
dateText.textContent = dateTime.toJSON().slice(0, 10);
}

time();
setInterval(time, 1000);



// Weather emoji function

let weatherEmoji = () => {
 
 
	 if(weatherReport.textContent == 'Partly Cloudy' || weatherReport.textContent == 'Cloudy' || weatherReport.textContent == 'Mostly Cloudy' || weatherReport.textContent == 'Haze'){
	  
	  weatherTempEmoji.textContent = '☁️';
	  body.style.background = 'linear-gradient(to bottom, #B2BEB5, #36454F)';
	 }
	 
	 else if (weatherReport.textContent == 'Sunny' || weatherReport.textContent == 'Mostly Sunny' || weatherReport.textContent == 'Partly Sunny' || weatherReport.textContent == 'Sunshine'){
	  
	  weatherTempEmoji.textContent = '☀️';
	  body.style.background = 'linear-gradient( to top right, #FFBC11, #FF9D1F, #FF7E2E, #FF6352)';
	 }
	 
	 else if(weatherReport.textContent == 'Showers' || weatherReport.textContent == 'Rainfall' || weatherReport.textContent == 'Rainy' || weatherReport.textContent == 'Thunderstorms' || weatherReport.textContent == 'Drizzle' || weatherReport.textContent == 'Rainstorm') {
	  
	  weatherTempEmoji.textContent = '🌧️';
	  body.style.background = 'linear-gradient(to bottom left, #B2BEB5, #36454F)';
	 }
	 
	 else{
	  
	  weatherTempEmoji.textContent = '🌤️';
	  body.style.background = 'linear-gradient(to top left, #5800FF, #0096FF, #00D7FF)';
	 }
 
}


// API FETCH FUNCTION

let weatherFunc = () => {

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '63a5ca8177mshe35b8b09a578154p1baf0ajsn23156b929798',
		'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
	}
};

fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${userInput.value}&format=json&u=f`, options)
	.then(response => response.json())
	.then(response => { 
	 console.log(response);
	 
	 // The weather info in the API were stored as objects in an array. The various info are extracted from the object key-value pair...Eg...The 'sunrise' data is gotten from the object key-value pair current_observation >> astronomy >> sunrise...
	 
	 
//	 console.log(response.current_observation.astronomy.sunrise);
	 sunrise.textContent = response.current_observation.astronomy.sunrise;
	 
//	 console.log(response.current_observation.astronomy.sunset);
	 sunset.textContent = response.current_observation.astronomy.sunset;
	 
//	 console.log(response.current_observation.condition.temperature);
	 weatherTemp.textContent = `${response.current_observation.condition.temperature}°c`;
	 
//	 console.log(response.current_observation.condition.text);
	 weatherReport.textContent = response.current_observation.condition.text;
	 
// console.log(response.current_observation.atmosphere.pressure);
	 pressure.textContent = response.current_observation.atmosphere.pressure;
	 
	// console.log(response.current_observation.atmosphere.humidity);
	 humidity.textContent = response.current_observation.atmosphere.humidity;
	 
//	 console.log(response.location.timezone_id);
	 timeZone.textContent = response.location.timezone_id;
	 
//	 console.log(response.location.lat);
	 latitude.textContent = response.location.lat;
	 
//	 console.log(response.location.long);
	 longitude.textContent = response.location.long;
	 
	// console.log(response.location.country);
	 locationCountry.textContent = response.location.country;
	 
//	 console.log(response.location.region);
	 locationRegion.textContent = response.location.region;
	 
	// console.log(response.location.city);
	 locationCity.textContent = response.location.city;
	 
	 weatherEmoji();
	 
	})
	
	.catch(err => console.error(err));

}


// Search Icon Onclick

searchIcon.onclick = () => weatherFunc();



// Updating the DOM with the weather report of the user's location.

let userLocationSuccess = (position) => {
 
 //console.log(position.coords.latitude);
// console.log(navigator.geolocation);
 
 const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '63a5ca8177mshe35b8b09a578154p1baf0ajsn23156b929798',
		'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
	}
};

fetch(`https://yahoo-weather5.p.rapidapi.com/weather?lat=${position.coords.latitude}&long=${position.coords.longitude}&format=json&u=f`, options)
	.then(response => response.json())
	.then(response => {
	 
	 console.log(response)
	 
	 locationCity.textContent = response.location.city;
	 locationRegion.textContent = response.location.region;
	 locationCountry.textContent = response.location.country;
	 weatherTemp.textContent = `${response.current_observation.condition.temperature}°c`;
	 weatherReport.textContent = response.current_observation.condition.text;
	 sunset.textContent = response.current_observation.astronomy.sunset;
	 sunrise.textContent = response.current_observation.astronomy.sunrise;
	 longitude.textContent = response.location.long;
	 latitude.textContent = response.location.lat;
	 humidity.textContent = response.current_observation.atmosphere.humidity;
	 timeZone.textContent = response.location.timezone_id;
	 pressure.textContent = response.current_observation.atmosphere.pressure;
	 
	 weatherEmoji();
	 
	})
	.catch(err => console.error(err));
 
}

let userLocationError = (error) => {
 console.log(error);
}

body.onload = () => {
 
navigator.geolocation.getCurrentPosition(userLocationSuccess, userLocationError);
}
