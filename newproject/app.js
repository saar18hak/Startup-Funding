const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/project-routes")
const cors = require("cors")
const app = express()
const userRoutes = require("./routes/user-routes");
// const backerRoutes = require('./routes/backers-routes');
// const session = require('express-session');
// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// const passport = require('passport');
app.use(express.json())
app.use(cors())
app.use(express.urlencoded())
// require('./passport-config');
// app.use(
//     session({
//       secret: 'your-secret-key',
//       resave: false,
//       saveUninitialized: true,
//     })
//   );
  
  // app.use(passport.initialize());
  // app.use(passport.session());
 
app.use('/projects',router)
app.use('/users',userRoutes)
// app.use('/backers', backerRoutes);
// const userSchema = new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String
// })

// const User = new mongoose.model("User",userSchema)

// app.get("/",(req,res)=>{
//     res.send("MY API")
// })

// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email: email });
//         if (user) {
//             if (password === user.password) {
//                 res.send({ message: "Login Successfully", user: user });
//             } else {
//                 res.send({ message: "Password didn't match" });
//             }
//         } else {
//             res.send({ message: "User not registered" });
//         }
//     } catch (err) {
//         console.error("Error while logging in:", err);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });



// app.post("/register", async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const existingUser = await User.findOne({ email: email });
//         if (existingUser) {
//             res.send({ message: "User already registered" });
//         } else {
//             const newUser = new User({
//                 name,
//                 email,
//                 password
//             });
//             await newUser.save();
//             res.send({ message: "Successfully registered,Please Login now" });
//         }
//     } catch (err) {
//         console.error("Error while registering user:", err);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });



mongoose.connect(
    "mongodb+srv://kumarsaarthak916:4IUu1e55OrMKkYR7@cluster0.x3uyebm.mongodb.net/startupDB?retryWrites=true&w=majority"
).then(()=>console.log("Connected to Database"))
.then(()=>{
    app.listen(5000)
})
.catch((err)=>console.log(err))



//4IUu1e55OrMKkYR7 