'use strict';
const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/notes/notes.js');

const router = express.Router();


router.get('/notes', getAllNotes);
router.get('/notes/:id', getOneNote);
router.delete('/notes/:id', deleteNote);
router.post('/notes', createNote);
router.put('/notes/:id', updateNote);

async function getAllNotes(request, response) {
  try{
    let allNotes = {};
    let results = await Note.find(allNotes);
    response.status(200).send(results);
    console.log(results);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function createNote (request, response){
  try{
  
    const newNote = await Note.create({ ...request.body});
    response.status(200).send(newNote);
    console.log(newNote);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function getOneNote(request, response) {
  try{
    let id = request.params.id;
    let results = await Note.findById(id);
    response.status(200).send(results);
    console.log(results);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function updateNote(request, response) {
  try {
    let id = request.params.id;
    let data = request.body;
    let updatedNote = await Note.findByIdAndUpdate(id, data, {new: true, overwrite: true});
    response.status(200).send(updatedNote);
  } catch (e) {
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function deleteNote(request, response) {
  try{
    let id = request.params.id;
    let results = await Note.findByIdAndDelete(id);
    response.status(200).send(results);
    console.log(results);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

module.exports = router;