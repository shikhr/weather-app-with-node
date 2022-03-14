const fetch = require('node-fetch');

const makeRequest = async (url, callback, error) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) throw data.error;
    callback(data);
  } catch (err) {
    error(err);
  }
};

module.exports = makeRequest;
