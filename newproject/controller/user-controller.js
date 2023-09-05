const bcrypt = require("bcrypt");
const User = require("../model/user-model");


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        console.error("Error while fetching users:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error("Error while fetching user by ID:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching users",
            error,
        });
    }
};

  
// Login route handler
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                res.send({ message: "Login Successfully", user: user });
                
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (err) {
        console.error("Error while logging in:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Registration route handler
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        console.log(existingUser)
        if (existingUser) {
            res.send({ message: "User already registered" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });
            await newUser.save();
            res.send({ message: "Successfully registered,Please Login now" });
        }
    } catch (err) {
        console.error("Error while registering user:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
