const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    projects:[
        {
            type:mongoose.Types.ObjectId,
            ref:"project"
        }
    ],
    backedProjects:[
        {
            type:mongoose.Types.ObjectId,
            ref:"project"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
