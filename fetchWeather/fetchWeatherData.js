const axios = require('axios');
const apiKey = '80197c0f80914ee889e122458232808';
const apiUrl = 'http://api.weatherapi.com/v1/current.json';
// Get weather 
function getWeather(cityName) {
  const params = {
    key: apiKey,
    q: cityName,
  };
  return axios.get(apiUrl, { params })
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Error fetching weather data');
      }
      return response.data;
    })
    .catch(error => {
      throw new Error('Error fetching weather data');
    });
}
module.exports.getWeather = getWeather;