const mockingoose = require('mockingoose');
const Location = require('../../models/location/location');


beforeEach(() => {
  mockingoose.resetAll();
});



describe("Test mongoose notes model", () => {
  test('should create a note instance  ', async () =>{
    
    mockingoose(Location).toReturn({
      locationName: 'testName',
      address: 'test address',
      status: 'test status',
      username: 'username'
    }, 'save');
    const location = new Location({
      locationName: 'testName',
      address: 'test address',
      status: 'test status',
      username: 'username'
    });
     location.save();

    expect(location.locationName).toEqual('testName')
    console.log(location);
  })
})