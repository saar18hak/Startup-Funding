const bcrypt = require("bcrypt");
const User = require("./model/user-model");

exports.authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    // if (user) {
    //   const isPasswordMatch = await bcrypt.compare(password, user.password);
    //   if (isPasswordMatch) {
    //     return user;
    //   }
    // }
    return user;
  } catch (err) {
    console.error("Error while authenticating user:", err);
    throw err;
  }
};

exports.authMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body; // Assuming you send email and password in the request body
    console.log("Request Body:", req.body);
    const user = await exports.authenticateUser(email); // Use exports.authenticateUser
    console.log("Authenticated User:", user); 
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.user = user; // Attach user data to the request object
    next();
  } catch (err) {
    console.error("Error in auth middleware:", err);
    res.status(500).send("Server Error");
  }
};
