'use strict';
const mongoose = require('mongoose');
const Note = require('../models/notes/notes.js')

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
    console.log(newNote)
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function getOneNote(request, response) {
  try{
    let id = request.params._id;
    let results = await Note.findById(id);
    response.status(200).send(results);
    console.log(results);
  }catch(e){
    console.error(e);
    response.status(500).send('server error cannot access');
  }
}

async function deleteNote(request, response) {
  try{
    let id = request.params._id;
    let results = await Note.findByIdAndDelete(id);
    response.status(200).send(results);
    console.log(results);
  }catch(e){
    console.error(e)
    response.status(500).send('server error cannot access');
  }
}