'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const locationsRouter = require('./routes/locationRoutes');
const notesRouter = require('./routes/noteRoutes');

// const Location = require('./models/location/location.js');
// const Note = require('./models/notes/notes.js');

const app = express();

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connnection error'));
db.once('open', () => {
  console.log('Mongoose is Connected');
});

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get('/', (request, response, next) => {
  response.status(200).send('Welcome to the Oasis');
  console.log('Welcome to the Oasis');
});

app.use(locationsRouter);
app.use(notesRouter);

app.listen(PORT, () => {
  console.log(`Port started on: ${PORT}`);
});