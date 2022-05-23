'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const Location = require('./models/location/location.js');
const Note = require('./models/notes/notes.js')

const app = express();

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connnection error'));
db.once('open', () => {
  console.log('Mongoose is Connected')
})

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Port start on: ${PORT}`)
});