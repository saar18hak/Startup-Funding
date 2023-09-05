const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");
// const auth = require("../auth")
// Define your user-related routes here
// For example, login route, registration route, etc.
router.get("/:id", userController.getUserById);
router.get("/", userController.getUsers);
// Route: POST /users/login
router.post("/login", userController.login);
// router.get("/auth",auth.authMiddleware)
// Route: POST /users/register
router.post("/register", userController.register);

module.exports = router;


