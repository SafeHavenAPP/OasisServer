'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  noteName: {type: String, required: true},
  review: {type: String, required: true},
});

const NoteModel = mongoose.model('Notes', noteSchema);

module.exports = NoteModel;