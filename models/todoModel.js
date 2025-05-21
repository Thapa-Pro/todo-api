
const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({      //  Create the schema for todo items
  task: {
    type: String,
    required: true       // user must write what the task is
  },
  done: {
    type: Boolean,
    default: false       // tasks start as not done
  },
  userId: {
    type: String,
    required: true       // to link the todo to a user
  },
  createdAt: {
    type: Date,
    default: Date.now    // automatically set when todo is created
  },
  updatedAt: {
    type: Date,
    default: Date.now    // will update manually later
  }
});

const Todo = mongoose.model("Todo", todoSchema);  //  Create the model from the schema

module.exports = Todo;
