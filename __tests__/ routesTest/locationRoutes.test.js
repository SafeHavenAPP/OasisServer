"use strict";

const supertest = require("supertest");
const { server } = require("../../app.js");
const request = supertest(server);

jest.mock("../../models/location/location", () => {
  return {
    create: function (param) {
      return param;
    },
    find: function () {
      let locationObject = {
        locationName: "Some Place",
        address: "Some Address",
      };
      return locationObject;
    },
    findById: function () {
      let locationObject = {
        locationName: "Some Place",
        address: "Some Address",
        id: 1235678
      };
      return locationObject;
    },
    findByIdAndUpdate: function () {
      let locationObject = {
        locationName: "Some Place",
        address: "Some Address",
        id: 1235678
      };
      return locationObject;
    },
    findByIdAndDelete: function () {
      let locationObject = {
        locationName: "Some Place",
        address: "Some Address",
        id: 1235678
      };
      return locationObject;
    }
  };
});

describe("Testing CRUD capabilities of Location", () => {
  test("Should be able to create a location on `createLocation` function", async () => {
    let response = await request.post("/locations").send({
      locationName: "test name",
      address: "test address",
      status: "test status",
      username: "test username",
    });

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual("test status");
  });

  test("Should return an error and status of 400", async () => {
    let response = await request.post("/locations").send({
      locationName: "test-location",
      address: 1234,
    });

    expect(response.status).toEqual(400);
    expect(response.text).toEqual("Invalid Request");
  });

  test("Should return all locations on `getAllLocations` function", async () => {
    let response = await request.get("/locations");

    expect(response.status).toEqual(200);
    expect(response.body.locationName).toEqual('Some Place');
    expect(response.body.address).toEqual('Some Address');
  });

  test("Should be able to return a single location on `getOneLocation` function", async () => {
    let response = await request.get("/locations/:id")

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1235678);
    expect(response.body.locationName).toEqual('Some Place');
    expect(response.body.address).toEqual('Some Address');
  });

  test("Should be able to update a location on `updateLocation` function", async() => {
    let response = await request.put("/locations/:id").send({
      locationName: "Change Location",
      id: 1235678
    });
    
    expect(response.status).toEqual(200);
  })

  test("Should be able to delete a location on `deleteLocation` function", async() => {
    let response = await request.delete("/locations/:id").send({
      locationName: "Some Place",
      id: 1235679
    });

    expect(response.status).toEqual(200);
  })
});
