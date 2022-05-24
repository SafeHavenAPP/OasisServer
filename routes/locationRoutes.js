'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Location = require('../models/location/location.js');

const router = express.Router();

router.get('/locations', getAllLocations);
router.get('/locations/:id', getOneLocation);
router.delete('/locations/:id', deleteLocation);
router.post('/locations', createLocation);
router.put('/locations/:id', updateLocation);

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
  console.log('some string')
  try{
    const newLocation = await Location.create({ ...request.body});
    console.log(newLocation);
    response.status(200).send(newLocation);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function getOneLocation(request, response) {
  try{
    let id = request.params.id;
    let results = await Location.findById(id);
    response.status(200).send(results);
    console.log(results);
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
    console.log(results);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

module.exports = router;