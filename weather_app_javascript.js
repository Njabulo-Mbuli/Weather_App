const WEATHER_ID='552802eea581e47f96b9fac00c543f8a';//API Key given to me by openweathermap.org
const UNITS='metric';//chose metric so temprature will be in degrees celsius

let search_method="q";
let city_name="";

/*This function tries to fetch the data for the city name provided,
if it fails to fetch data it provides an error message letting user know*/
function search_weather(searchTerm){
	
	city_name=searchTerm;

	fetch(`http://api.openweathermap.org/data/2.5/weather?${search_method}=${searchTerm}&APPID=${WEATHER_ID}&units=${UNITS}`).then(result=>{
		return result.json();
	}).then(result=>{
		DOM_Manipulations(result);
	}).catch(function(){
		alert("Had a problem loading your city's data. Please try again...");
	});
}

/*This funstions purpose is for updating the Items on the HTML page dynamically*/
function DOM_Manipulations(data){
	console.log(data);
	document.getElementById("icon").innerHTML=data.weather[0].icon;
	document.getElementById("city").innerHTML=city_name;
	document.getElementById("temp_value").innerHTML=Math.floor(data.main.temp);
	document.getElementById("symbol").style.display="block";
	document.getElementById("weather_description").innerHTML=data.weather[0].description;
	document.getElementById("icon").src="http://openweathermap.org/img/w/" +data.weather[0].icon+ ".png";
}

//Created this function just to make sure the field isn't empty
function check_City(){
	let temp=document.getElementById("search_input").value;
	if(temp!=""&&temp!=null){
		search_weather(temp);
	}else{
		alert("Please enter a valid City Name");
	}
}

/*checking for when enter is pressed instead of forcing
user to click search*/
function check_Enter(key){
	let keyCode = key.keyCode||key.which;
	if (keyCode==13) {
		check_City();
	}
}