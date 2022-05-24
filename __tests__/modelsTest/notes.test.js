const mockingoose = require('mockingoose');
const Note = require('../../models/notes/notes.js');


beforeEach(() => {
  mockingoose.resetAll();
});



describe("Test mongoose notes model", () => {
  test('should create a note instance  ', async () =>{
    
    mockingoose(Note).toReturn({ noteName: 'name1', review: "Test"}, 'save');
    const note = new Note({
      noteName: 'testName',
      review: 'testReview'
    });
     note.save();

    expect(note.noteName).toEqual('testName')
    expect(note.review).toEqual('testReview')
    console.log(note);
  })
})