'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  locationName: {type: String, required: true},
  address: {type: String, required: true},
  status: {type: String, required: false},
  email: {type: String, required: false}
})

const LocationModel = mongoose.model('Locations', locationSchema);

module.exports = LocationModel;