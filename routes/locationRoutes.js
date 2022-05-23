'use strict';
const mongoose = require('mongoose');

const Location = require('../models/location/location.js');

// mongoose.connect(process.env.DB_URL)
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connnection error'));
// db.once('open', () => {
//   console.log('Mongoose is Connected')
// })

async function getAllLocations(request, response) {
  try{
    let allLocations = {};
    let results = await Location.find(allLocations);
    response.status(200).send(results);
    console.log(results);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function createLocation (request, response){
  try{
  
    const newLocation = await Location.create({ ...request.body});
    response.status(200).send(newLocation);
    console.log(newLocation)
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function getOneLocation(request, response) {
  try{
    let id = request.params._id;
    let results = await Location.findById(id);
    response.status(200).send(results);
    console.log(results);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function deleteLocation(request, response) {
  try{
    let id = request.params._id;
    let results = await Location.findByIdAndDelete(id);
    response.status(200).send(results);
    console.log(results);
  }catch(e){
    console.error(e)
    response.status(500).send('server error cannot access');
  }
}