const mongoose = require("mongoose");
// const backerSchema = require('./backer-model');
const Schema  = mongoose.Schema

// const backerSchema = new mongoose.Schema({
//     projectId:{
//         type: mongoose.Schema.Types.ObjectId, ref: 'project' 
//     },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     amount: { type: Number, required: true },
//   });
  
const projectsSchema = new Schema({
    category:{
        type:String,
        required:true

    },
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    project_location:{
        type:String,
        required:true
    },
    project_image:{
        type:String
        
    },
    project_video:{
        type:String
    },
    funding_goal: {
        type: Number,  // Adding a numerical field
        required: true
    },
    date_and_time: {
        type: Date,  // Adding a date and time field
        required: true
    },
    user:{
        // mongoose.Schema.Types.ObjectId
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
   
    backers:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            backedAmount: {
                type: Number,
                default: 0, // Initialize the backed amount to 0
            },

        }
    ]

})

module.exports = mongoose.model("project",projectsSchema)     
