const weather_api_key = '6114d42376ed119c231d04ac3693de09';
const open_weather_api_key = '9a80c04c91325b8fba16eb19c88a32d2';

const coords_api_key =
  'pk.eyJ1Ijoic2hpa2hhcm1pc2hyYTczMCIsImEiOiJja3o0Z2pndGkwZzl4MnZtemo1NzN0aXZsIn0.u_y4H3Y4UL-1Lgh1yV0MTw';

const units = {
  f: {
    name: 'fahrenheit',
    symbol: 'F',
    api_unit: 'imperial',
  },
  c: {
    name: 'celsius',
    symbol: 'C',
    api_unit: 'metric',
  },
};

const setWeatherUrl = (api_key, coords, unit) =>
  `http://api.weatherstack.com/current?access_key=${api_key}&query=${coords.lat},${coords.lon}&units=${unit}`;

const setWeatherUrl2 = (api_key, coords, unit) =>
  `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${api_key}&units=${unit}`;

const setCoordsUrl = (api_key, location, limit) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=${api_key}&limit=${limit}`;

module.exports = {
  open_weather_api_key,
  coords_api_key,
  units,
  setWeatherUrl2,
  setCoordsUrl,
};
