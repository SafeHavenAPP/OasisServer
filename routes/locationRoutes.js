'use strict';

const express = require('express');
const loginRequired = require('../controllers/userController.js')

const Location = require('../models/location/location.js');

const router = express.Router();

router.get('/locations', getAllLocations);
router.get('/locations/:id', getOneLocation);
router.delete('/locations/:id', loginRequired, deleteLocation);
router.post('/locations', loginRequired, createLocation);
router.put('/locations/:id', loginRequired, updateLocation);

async function getAllLocations(request, response) {
  try{
    let allLocations = {};
    let results = await Location.find(allLocations);
    response.status(200).send(results);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function createLocation (request, response){
  if (typeof request.body.locationName === 'string' && typeof request.body.address === 'string') {
    try{
      const newLocation = await Location.create({ ...request.body});
      response.status(200).send(newLocation);
    }catch(e){
      console.error(e);
      response.status(500).send('server error cannot access');
    }
  } else {
    response.status(400).send('Invalid Request');
  }
}

async function getOneLocation(request, response) {
  try{
    let id = request.params.id;
    let results = await Location.findById(id);
    response.status(200).send(results);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function updateLocation(request, response) {
  try {
    let id = request.params.id;
    let data = request.body;
    let updatedLocation = await Location.findByIdAndUpdate(id, data, {new: true, overwrite: true});
    response.status(200).send(updatedLocation);
  } catch (e) {
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function deleteLocation(request, response) {
  try{
    let id = request.params.id;
    let results = await Location.findByIdAndDelete(id);
    response.status(200).send(results);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

module.exports = router;