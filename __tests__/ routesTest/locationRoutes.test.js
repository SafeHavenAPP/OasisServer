
const supertest = require('supertest');
const mongoose = require('mongoose');
const locationRouter = require('../../routes/locationRoutes')

// app.use('/', locationRouter)
const { server } = require('../../app.js')
const request = supertest(server);


// beforeAll( async() => {
//   const url = `mongodb://127.0.0.1/locations`;
//   await mongoose.connect(url, { useNewUrlParser: true })
// });

describe('Testing CRUD capabilities of Location', () => {
  // jest.setTimeout(60000)

  test('Can Create a Location on /location route', async () => {

    let response = await request.post('/locations').send({
      locationName: 'test name',
      address: 'test address',
      status: 'test status',
      username: 'test username'
    })


    console.log(response)
    expect(response.status).toEqual(200);
  }, 60000)

})