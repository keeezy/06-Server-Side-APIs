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