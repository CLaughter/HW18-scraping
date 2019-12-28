const mongoose = require("mongoose");
// const mongojs = require("mongojs");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
const NoteSchema = new Schema({
  // notes is an array that stores ObjectIds
// The ref property links these ObjectIds to the Note model
// This allows us to populate the User with any associated Notes
notes: [
  {
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the Note model
    ref: "Note"
  }
],
  // title and body must be of type String
  title: String,
  body: String
});

// This creates our model from the above schema, using mongoose's model method
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;