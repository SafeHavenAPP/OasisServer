'use strict';

const supertest = require('supertest');
const { server } = require('../../app.js');
const request = supertest(server);


jest.mock('../../models/location/location', () => {
  return { 
    create: function(param) {
      return param;},
  };
});


describe('Testing CRUD capabilities of Location', () => {

  test('Can Create a Location on /location route', async () => {

    let response = await request.post('/locations').send({
      locationName: 'test name',
      address: 'test address',
      status: 'test status',
      username: 'test username',
    });
    
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('test status');
  });

  test('Should return an error and status of 400', async () =>{
    let response = await request.post('/locations').send({
      locationName: 'test-location',
      address: 1234,
    });
    
    expect(response.status).toEqual(400);
    expect(response.text).toEqual('Invalid Request');
  }); 

});