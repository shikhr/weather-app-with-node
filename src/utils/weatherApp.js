const makeRequest = require('./make-request.js');
const {
  open_weather_api_key,
  coords_api_key,
  units,
  setWeatherUrl2,
  setCoordsUrl,
} = require('./utils.js');

const app = async (address, unit = 'c', callback, error_fn) => {
  const currentCoords = {
    lat: '',
    lon: '',
  };

  const currentUnit = units[unit];

  const coords_url = setCoordsUrl(coords_api_key, address, '1');

  await makeRequest(
    coords_url,
    (data) => {
      const [info] = data.features;
      [currentCoords.lon, currentCoords.lat] = info.center;
    },
    (err) => {
      if (err.code === 'ENOTFOUND') {
        error_fn('Unable to connect to the network.');
        return;
      }
      error_fn('Unable to connect to the location services.');
    }
  );

  if (!currentCoords.lat || !currentCoords.lon) return;

  const weather_url = setWeatherUrl2(
    open_weather_api_key,
    currentCoords,
    currentUnit.api_unit
  );

  await makeRequest(
    weather_url,
    (data) => {
      console.log(data);
      const data1 = {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        description: data.weather[0].main,
        icon: data.weather[0].icon,
        id: data.weather[0].id,
        wind_speed: data.wind.speed,
        place: `${data.name}, ${data.sys.country}`,
      };
      const forecast = `<p>It is currently ${data1.temp} degree ${currentUnit.name}.</p>
<p>It feels like ${data1.feels_like} degree ${currentUnit.name} outside.</p>
<p>The humidity is ${data1.humidity}%.</p>`;
      callback({ ...data1, forecast });
    },
    (err) => {
      if (err.code === 'ENOTFOUND') {
        error_fn('Unable to connect to the network.');
        return;
      }
      error_fn(err.info);
    }
  );
};

module.exports = app;
