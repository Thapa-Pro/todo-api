const mongoose = require("mongoose");              

const userSchema = new mongoose.Schema({           //  Create the schema for user
  username: {
    type: String,
    required: true,                           // user must enter a username
    unique: true                              // no duplicate usernames allowed
  },
  password: {
    type: String,
    required: true        // password is mandatory
  },
  userId: {
    type: String,
    required: true        // short ID we generate with uuid
  }
});


const User = mongoose.model("User", userSchema); // Create the model from the schema


module.exports = User;                   // Export it to use in other files
