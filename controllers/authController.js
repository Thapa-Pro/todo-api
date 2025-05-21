
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");


//======================= REGISTER =====================//

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already taken" });
    }

    const newUser = new User({
      username,
      password,
      userId: uuidv4().slice(0, 5),  // Explanation at the bottom
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "🎉 Welcome to the Todo API! Your account was created.",
      userId: newUser.userId,
    });
  } catch (err) {
    next(err);
  }
};

//===================== LOGIN ============================//

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    global.user = user;

    res.status(200).json({
      success: true,
      message: `✅ Welcome back, ${user.username}`,
      userId: user.userId,
    });
  } catch (err) {
    next(err);
  }
};

//=================== LOGOUT ============================//

exports.logout = (req, res) => {
  global.user = null;
  res.status(200).json({ success: true, message: "👋 Logged out successfully" });
};

//  MongoDB’s default _id is very long and messy.
// For example, uuidv4() → generates "d2f6c210-1ab9-4e1a-bc62-f313d02a7f7a"
// .slice(0, 5) → takes just the first 5 "d2f6c".
