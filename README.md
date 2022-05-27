# Oasis

This is our back end server for our `Oasis` application.

Team:  
- Andres Mills Gallego
- Chattray Chea
- Tiara Brown

## Tools and Dependencies

We built this server using `Express.js` and utilized `mongoose` to communicate with our `MongoDB` database.  

Depencies:

- `express`
- `axios`
- `bcrypt`
- `jest`
- `jsonwebtoken`
- `supertest`
- `mockingoose`
- `mongodb`
- `mongoose`
- `heroku`

## How It Works

The server is built with `express` and the necessary dependencies.  We used `mongoose` to communicate with our `mongodb` database and allow for full CRUD capabilities.  Once we had our data models in place, and our functions to handle the CRUD requests, we set up routers using `express.Router` to actually make the http requests.

The server itself is hosted on `heroku` so that it can be used live by our front end app.

## Testing

To test our functionality we used a variety of methods.  

1. `thundeclient` proved extremely useful in providing proof of life that our routes were not only working, but that we were getting the appropriate reponses with each request.

2. `mockingoose` was a valuable tool that we used to mock our `mongoose` functionality and we could be assured that our data models were behaving as they should

3. `supertest` was used to mock our server so that we did not need to make actual calls to our database, but still confrim that our pure routes were working as intended.

4. `jest` was used on its own, and in conjunction with `mockingoose` and `supertest` to write our actual unit tests.  We used the built in `jest.mock()` function as well to mock the functions and models that we needed so as not make actual calls to our database.

5.  All of our unit tests are **passing** 
