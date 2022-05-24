'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');


const locationsRouter = require('./routes/locationRoutes');
const notesRouter = require('./routes/noteRoutes');

// const Location = require('./models/location/location.js');
// const Note = require('./models/notes/notes.js');

const app = express();




app.use(cors());
app.use(express.json());

app.get('/', (request, response, next) => {
  response.status(200).send('Welcome to the Oasis');
  console.log('Welcome to the Oasis');
});

app.use(locationsRouter);
app.use(notesRouter);


module.exports = {server: app,
start: (PORT) => {
  if(!PORT) { throw new Error('Port Not Available')}
  app.listen(PORT, () => {
    console.log(`Port started on: ${PORT}`);
  });
}}