const mongoose = require("mongoose");       // 1. Import mongoose

const keySchema = new mongoose.Schema({     // 2. Create the schema
  key: {
    type: String,
    required: true,                          // key is mandatory
  },
});

const Key = mongoose.model("Key", keySchema);  // 3. model makes it usable + schema defines the shape
module.exports = Key;                         // 4. Export the model so we can use it in other files

//module.exports	Shares that model with other files,  "module.exports" is from Node.js, not Mongoose.