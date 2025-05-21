const Key = require("../models/keyModel");  // 1. Import Key model as CommonJS with path NOT as package.json, "type":"module"

const authorizeKey = async (req, res, next) => {    // 2. Middleware function to check for a valid key
  const keyFromClient = req.query.key;

  if (!keyFromClient) {
    return res.status(400).json({ success: false, message: "API key is required" });
  }

  const foundKey = await Key.findOne({ key: keyFromClient });

  if (!foundKey) {
    return res.status(401).json({ success: false, message: "Invalid API key" });
  }
  
  next();                                    // Key is valid → move on
};

module.exports = authorizeKey;                // 3. Export the middleware
