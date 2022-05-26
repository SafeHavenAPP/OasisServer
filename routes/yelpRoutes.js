'use strict';

const axios = require('axios');

async function getAllLocations( request, response)  {
  const config = {
    headers: { Authorization: `Bearer ${process.env.API_KEY}` },
    method: 'get',
    baseURL: `https://api.yelp.com`,
    url: '/v3/businesses/search'
  }
  
  const factData = await axios(config);
  console.log(factData.data);
  
  response.status(200).send(factData.data);
}

module.exports = {
  getAllLocations: getAllLocations
};