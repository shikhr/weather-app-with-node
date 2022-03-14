const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weatherApp = require('./utils/weatherApp.js');

const app = express();

// paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Shikhar',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Shikhar',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help for you',
    message: 'This is a help message.',
    name: 'Shikhar',
  });
});

app.get('/weather', (req, res) => {
  let unit = 'c';
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }
  if (req.query.unit === 'c' || req.query.unit === 'f') unit = req.query.unit;

  weatherApp(
    req.query.address,
    unit,
    (data) => {
      return res.send(data);
    },
    (error) => {
      return res.send({
        error,
      });
    }
  );
});

app.get('/products', (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search message.',
    });
  }

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    name: 'Shikhar',
    message: 'THE HELP ARTICLE COULD NOT BE FOUND!',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    name: 'Shikhar',
    message: 'THE PAGE YOU ARE LOOKING FOR COULD NOT BE FOUND!',
  });
});

app.listen(3000, () => {
  console.log('Server on port 3000');
});
