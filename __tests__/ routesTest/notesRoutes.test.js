'use strict';

const { Test } = require('supertest');
const supertest = require('supertest');
const { server } = require('../../app.js')
const request = supertest(server);

jest.mock('../../models/notes/notes.js', () => {
  return {
    create: function(param) {
      return param;
    },
    find: function () {
      let noteObject = {
        noteName: "Test Note",
        review: "Test Review"
      };
      return noteObject
    },
    findById: function () {
      let noteObject = {
        noteName: "Test Note",
        review: "Test Review",
        id: 87
      };
      return noteObject
    },
    findByIdAndUpdate: function () {
      let noteObject = {
        noteName: "Test Note",
        review: "Test Review",
        id: 87
      };
      return noteObject
    },
    findByIdAndDelete: function () {
      let noteObject = {
        noteName: "Test Note",
        review: "Test Review",
        id: 87
      };
      return noteObject
    },
  };
});

describe("Testing CRUD capabilities of Notes", () => {
  test("Should be able to create a note on `createNote` function", async() => {
    let response = await request.post("/notes").send({
      noteName: "test name",
      review: "test review"
    });

    expect(response.status).toEqual(200);
    expect(response.body.review).toEqual("test review")
  });

  test("Should return an error and status of 400", async () => {
    let response = await request.post("/notes").send({
      noteName: 123456,
      review: 123456,
    });

    expect(response.status).toEqual(400);
    expect(response.text).toEqual("Invalid Request")
  });

  test("Should return all notes on `getAllNotes` function", async() => {
    let response = await request.get('/notes');

    expect(response.status).toEqual(200);
    expect(response.body.noteName).toEqual("Test Note");
    expect(response.body.review).toEqual("Test Review");
  });

  test("Should return a status of 404 on function `getAllNotes`", async() => {
    let response = await request.get('/note')

    expect(response.status).toEqual(404)
  });

  test("Should be able to return a single note on `getOneNote` function", async () => {
    let response = await request.get('/notes/:id')

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(87);
  });

  test("Should be able to update a note on `updateNote` function", async () => {
    let response = await request.put("/notes/:id").send({
      noteName: "Change Note",
      id: 87
    })

    expect(response.status).toEqual(200);
    expect(response.body.noteName).toEqual("Test Note")
  });

  test("Should be able to delete a note on `deleteNote` function", async () => {
    let response = await request.delete("/notes/:id").send({
      noteName: "Test Note",
      id: 87
    })
    expect(response.status).toEqual(200)
  })
})