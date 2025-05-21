
//=============Import express and the Key model=========//

const Key = require("../models/keyModel");
const express = require("express");
const router = express.Router();


//========= GET /api/keys → return a random API key =========//

router.get("/", async (req, res, next) => {
  try { 
    const keys = await Key.find();                    // Get all keys from the database

    const randomKey = keys[Math.floor(Math.random() * keys.length)];    // Pick one at random

    res.status(200).json({                          // Return it
      success: true,
      key: randomKey.key,
    });
  } catch (err) {
    next(err);                                        // Pass errors to the errorHandler middleware
  }
});

module.exports = router;      
