const form = document.querySelector('.weather-form');
const locationEl = form.elements['address'];
const unitEl = form.elements['unit'];
const infoEl = document.getElementById('weather-info');
const errorEl = document.getElementById('error');

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    console.log(data);

    const inHtml = `<h5>${data.place}</h5>
<h2>${data.description}.</h2>
<p>${data.forecast}</p>`;

    infoEl.innerHTML = inHtml;
  } catch (error) {
    console.log(error);
    errorEl.innerHTML = `<p>${error}</p>`;
    infoEl.innerHTML = '';
  }
};

form.addEventListener('submit', (e) => {
  infoEl.innerHTML = '<h1>LOADING...</h1>';
  errorEl.innerHTML = '';
  e.preventDefault();
  const unit = unitEl.value;
  const location = encodeURIComponent(locationEl.value.trim());
  const genURL = `/weather?address=${location}&unit=${unit}`;
  fetchData(genURL);
});
