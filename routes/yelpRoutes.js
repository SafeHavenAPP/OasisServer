'use strict';

const axios = require('axios');

async function getAllLocations( request, response)  {
  try{
  //TODO: Dynamically enter the query based on user input, can hard code location query for now
  const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants`;
  const config = {
    headers: { Authorization: `Bearer ${process.env.API_KEY}` },
  }
  
  const factData = await axios(yelpUrl, config)
  .then((res) => res.data.businesses) //this works full business body
  
  response.status(200).send(factData);
} catch (e) {
  console.log(e);
}
}

module.exports = {
  getAllLocations: getAllLocations
};