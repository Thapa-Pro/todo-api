const authorizeUser = (req, res, next) => {      // Middleware to check if a user is logged in 
  if (!global.user) {                           // We’ll store the logged-in user in global.user
    return res.status(401).json({
      success: false,
      message: "Unauthorized user"
    });
  }
  next();                                       // If user is logged in, continue
};

module.exports = authorizeUser;                 // Export the middleware
