const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    
},{timestamp:true});

module.exports = mongoose.model("User", userSchema);