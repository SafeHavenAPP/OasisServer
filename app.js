'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const yelpRoutes = require('./routes/yelpRoutes.js')
const locationsRouter = require('./routes/locationRoutes');
const notesRouter = require('./routes/noteRoutes');
const routes = require('./routes/userRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (request, response, next) => {
  response.status(200).send('Welcome to the Oasis');
  console.log('Welcome to the Oasis');
});

app.get('/v3/businesses/search', yelpRoutes.getAllLocations);


app.use(function (request, response, next) {
  if (
    request.headers &&
    request.headers.authorization &&
    request.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jwt.verify(
      request.headers.authorization.split(
        ' ')[1],
      'RESTFULAPIs',
      function (error, decode) {
        if (error) request.user = undefined;
        request.user = decode;
        next();
      },
    );
  } else {
    request.user = undefined;
    next();
  }
});
app.use(locationsRouter);
app.use(notesRouter);

routes(app);

console.log('TESTING SERVER APPLICATION')

module.exports = {
  server: app,
  start: (PORT) => {
    if (!PORT) {
      throw new Error('Port Not Available');
    }
    app.listen(PORT, () => {
      console.log(`Port started on: ${PORT}`);
    });
  },
};
