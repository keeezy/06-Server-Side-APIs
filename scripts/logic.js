// Variables
var citySearchInputEl = document.querySelector('#city-search-input');
var citySearchInput;
var citySearchHistory = [];
var citySearchHistoryBtnEl;
var citySearchHistoryBtnContainerEl = document.querySelector('#btnList')
var apiKey = 'a46fae6c97cce84840e8dfd333cdaca5';
var latLonApiUrl;
var tempK;
var tempF;

// Current Day
var todayCardHeaderEl = document.querySelector('#todayCardHeader');
var todayIconEl = document.querySelector('#todayIcon');
var currentTempEl = document.querySelector('#currentTemp');
var currentHumidityEl = document.querySelector('#currentHumidity');
var currentWindSpeedEl = document.querySelector('#currentWindSpeed');
var currentUVIndexEl = document.querySelector('#currentUV');
var currentUVIndex;
var weatherTodayIcon;
var weatherTodayIconSource;
var weatherTodayDescription;

// Day 1
var day1CardHeaderEl = document.querySelector('#day1CardHeader');
var day1IconEl = document.querySelector('#day1Icon');
var day1Icon;
var day1IconSource;
var day1IconDescription;
var day1TempEl = document.querySelector('#day1Temp');
var day1WindEl = document.querySelector('#day1Wind');
var day1HumidityEl = document.querySelector('#day1Humidity');

// Day 2
var day2CardHeaderEl = document.querySelector('#day2CardHeader');
var day2Icon;
var day2IconSource;
var day2IconDescription;
var day2IconEl = document.querySelector('#day2Icon');
var day2TempEl = document.querySelector('#day2Temp');
var day2WindEl = document.querySelector('#day2Wind');
var day2HumidityEl = document.querySelector('#day2Humidity');

// Day 3
var day3CardHeaderEl = document.querySelector('#day3CardHeader');
var day3Icon;
var day3IconSource;
var day3IconDescription;
var day3IconEl = document.querySelector('#day3Icon');
var day3TempEl = document.querySelector('#day3Temp');
var day3WindEl = document.querySelector('#day3Wind');
var day3HumidityEl = document.querySelector('#day3Humidity');

// Day 4
var day4CardHeaderEl = document.querySelector('#day4CardHeader');
var day4Icon;
var day4IconSource;
var day4IconDescription;
var day4IconEl = document.querySelector('#day4Icon');
var day4TempEl = document.querySelector('#day4Temp');
var day4WindEl = document.querySelector('#day4Wind');
var day4HumidityEl = document.querySelector('#day4Humidity');

// Day 5
var day5CardHeaderEl = document.querySelector('#day5CardHeader');
var day5Icon;
var day5IconSource;
var day5IconDescription;
var day5IconEl = document.querySelector('#day5Icon');
var day5TempEl = document.querySelector('#day5Temp');
var day5WindEl = document.querySelector('#day5Wind');
var day5HumidityEl = document.querySelector('#day5Humidity');

// Button
var searchButton = document.getElementById('search-button');

// Handler for Search Button
var searchButtonHandler = function (event) {
    event.preventDefault();
    citySearchInput = citySearchInputEl.value.trim(); //TO DO: How to adjust for space/no space, comma, no comma, etc. Start with City, for now...
    if (citySearchInput) {
        getLatLon(citySearchInput);
        createSearchHistory(citySearchInput);
    } else {
        alert('Please enter a City');
    }
};

// Renders Search History to Buttons
function renderHistory() {
    var retrievedHistory = localStorage.getItem('searchHistory');
    var searchHistoryParse = JSON.parse(retrievedHistory);

    // Creates Button
    citySearchHistoryBtnEl = document.createElement("button");
    citySearchHistoryBtnEl.innerHTML = searchHistoryParse[0];
    citySearchHistoryBtnEl.setAttribute('type', 'submit');
    citySearchHistoryBtnEl.setAttribute('class', 'btn btn-secondary btn-block custom-btn');
    citySearchHistoryBtnEl.setAttribute('display', 'block');

    // Appends Button to Page
    citySearchHistoryBtnContainerEl.appendChild(citySearchHistoryBtnEl);

    // Adds Event Handler to Button
    citySearchHistoryBtnEl.addEventListener("click", function (event) {
        citySearchInputEl.value = $(this).html();
        searchButtonHandler(event);
    })
};

renderHistory();

function getWeatherData(citySearchInput) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=' + apiKey;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                // Current City and Date
                todayCardHeader.textContent = (citySearchInputEl.value.trim() + ' (' + date + ')');

                // Current Weather Icon
                weatherTodayIcon = data.current.weather[0].icon;
                weatherTodayIconSource = ('https://openweathermap.org/img/wn/' + weatherTodayIcon + '@2x.png')
                weatherTodayDescription = data.current.weather[0].description;
                todayIconEl.src = weatherTodayIconSource;
                todayIconEl.alt = weatherTodayDescription;

                // Current Temperature
                tempK = data.current.temp;
                tempF = kToF(tempK) + " &#176F";
                currentTempEl.innerHTML = tempF;

                // Current Humidity
                currentHumidityEl.innerHTML = (data.current.humidity + "%");

                // Current Wind Speed
                currentWindSpeedEl.innerHTML = (data.current.wind_speed + " MPH");

                // Current UV Index
                currentUVIndex = (data.current.uvi);
                currentUVIndexEl.innerHTML = currentUVIndex;
                if (currentUVIndex < 2.99) {
                    currentUVIndexEl.classList.add('custom-favorable');
                    currentUVIndexEl.classList.remove('custom-moderate');
                    currentUVIndexEl.classList.remove('custom-severe');
                } else if (currentUVIndex > 3 && currentUVIndex < 5.99) {
                    currentUVIndexEl.classList.add('custom-moderate');
                    currentUVIndexEl.classList.remove('custom-favorable');
                    currentUVIndexEl.classList.remove('custom-severe');
                } else {
                    currentUVIndexEl.classList.add('custom-severe');
                    currentUVIndexEl.classList.remove('custom-favorable');
                    currentUVIndexEl.classList.remove('custom-moderate');
                };

                // Day 1
                day1CardHeaderEl.textContent = (date + 1); //Doesn't Work
                // Day 1 Icon
                day1Icon = data.daily[0].weather[0].icon;
                day1IconSource = ('https://openweathermap.org/img/wn/' + day1Icon + '@2x.png')
                day1IconDescription = data.daily[0].weather[0].description;
                day1IconEl.src = day1IconSource;
                day1IconEl.alt = day1IconDescription;
                // Day 1 Temp
                tempK = data.daily[0].temp.day;
                tempF = kToF(tempK) + " &#176F";
                day1TempEl.innerHTML = tempF;
                // Day 1 Wind Speed
                day1WindEl.innerHTML = (data.daily[0].wind_speed + " MPH");
                // Day 1 Humidity
                day1HumidityEl.innerHTML = (data.daily[0].humidity + "%");

                // Day 3
                day3CardHeaderEl.textContent = (date + 3); //Doesn't Work
                // Day 3 Icon
                day3Icon = data.daily[2].weather[0].icon;
                day3IconSource = ('https://openweathermap.org/img/wn/' + day3Icon + '@2x.png')
                day3IconDescription = data.daily[2].weather[0].description;
                day3IconEl.src = day3IconSource;
                day3IconEl.alt = day3IconDescription;
                // Day 3 Temp
                tempK = data.daily[2].temp.day;
                tempF = kToF(tempK) + " &#176F";
                day3TempEl.innerHTML = tempF;
                // Day 3 Wind Speed
                day3WindEl.innerHTML = (data.daily[2].wind_speed + " MPH");
                // Day 3 Humidity
                day3HumidityEl.innerHTML = (data.daily[2].humidity + "%");

                // Day 4
                day4CardHeaderEl.textContent = (date + 4); //Doesn't Work
                // Day 4 Icon
                day4Icon = data.daily[3].weather[0].icon;
                day4IconSource = ('https://openweathermap.org/img/wn/' + day4Icon + '@2x.png')
                day4IconDescription = data.daily[3].weather[0].description;
                day4IconEl.src = day4IconSource;
                day4IconEl.alt = day4IconDescription;
                // Day 4 Temp
                tempK = data.daily[3].temp.day;
                tempF = kToF(tempK) + " &#176F";
                day4TempEl.innerHTML = tempF;
                // Day 4 Wind Speed
                day4WindEl.innerHTML = (data.daily[3].wind_speed + " MPH");
                // Day 4 Humidity
                day4HumidityEl.innerHTML = (data.daily[3].humidity + "%");

                // Day 5
                day5CardHeaderEl.textContent = (date + 5); //Doesn't Work
                // Day 5 Icon
                day5Icon = data.daily[4].weather[0].icon;
                day5IconSource = ('https://openweathermap.org/img/wn/' + day5Icon + '@2x.png')
                day5IconDescription = data.daily[4].weather[0].description;
                day5IconEl.src = day5IconSource;
                day5IconEl.alt = day5IconDescription;
                // Day 5 Temp
                tempK = data.daily[4].temp.day;
                tempF = kToF(tempK) + " &#176F";
                day5TempEl.innerHTML = tempF;
                // Day 5 Wind Speed
                day5WindEl.innerHTML = (data.daily[4].wind_speed + " MPH");
                // Day 5 Humidity
                day5HumidityEl.innerHTML = (data.daily[4].humidity + "%");
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
}

function kToF(tempK) {
    return Math.floor((tempK - 273.15) * 1.8 + 32);
}
