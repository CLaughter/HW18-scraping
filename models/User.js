const mongoose = require("mongoose");
// const mongojs = require("mongojs");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const UserSchema = new Schema({
  // name must be unique and of type String
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },

  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },

  // date must be of type Date. The default value is the current date
  userCreated: {
    type: Date,
    default: Date.now
  }

});

// Custom method `lastUpdatedDate`
UserSchema.methods.lastUpdatedDate = function() {
  // Set the current user's `lastUpdated` property to the current date/time
  this.lastUpdated = Date.now();
  // Return this new date
  return this.lastUpdated;
};

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;