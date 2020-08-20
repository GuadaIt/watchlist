
const express = require('express');
const axios = require('axios');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const admin = require('firebase-admin');

require('dotenv').config();

const serviceAccount = require("./config/firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://screentime-6f6c0.firebaseio.com"
});

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

const checkAuth = (req, res, next) => {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then(() => {
        next()
      })
      .catch(() => {
        res.status(403).send('Unauthorized')
      })
  } else {
    res.status(403).send('Unauthorized')
    return
  };
};

// app.use('/', checkAuth);

const baseUrl = 'https://api.themoviedb.org/3';

app.get('/api', (req, res) => {
  Promise.all([
    axios.get(`${baseUrl}/trending/movie/week?api_key=${process.env.API_KEY}&language=en-US&page=1`),
    axios.get(`${baseUrl}/trending/tv/week?api_key=${process.env.API_KEY}&language=en-US&page=1`)
  ])  
  .then(result => {
    const data = {
      movies: result[0].data.results,
      tv: result[1].data.results
    };
    res.json(data);
  })
  .catch(err => {
    console.log(err)
  });
});

app.get('/home', checkAuth);

app.get('/:mediaType/:id', (req, res) => {
  axios.get(`${baseUrl}/${req.params.mediaType}/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
    .then(result => res.json(result.data))
    .catch(err => console.log(err))
});

app.post('/addToWatchlist', (req, res) => {
  res.status(200).send('Received')
});

app.get('/search/:keyword/:page', (req, res) => {
  const keyword = req.params.keyword;
  const page = req.params.page;

  axios.get(`${baseUrl}/search/multi?api_key=${process.env.API_KEY}&language=en-US&include_adult=false&page=${page}&query=${keyword}`)
    .then(result => res.json(result.data))
    .catch(err => console.log(err))
});

module.exports = app;