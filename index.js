const server = require('./app.js');

const PORT = process.env.PORT || 3002;
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Mongoose is Connected');
  server.start(PORT);
})


module.exports = db;