const mongoose = require("mongoose");

const seller_schema = new mongoose.Schema({
    name:String,
    contact:String,
    email:String,
    
    property:{
        location:{
            lat:Number,
            lng:Number
        },
        description:String,
        address:String
    }
});

const seller_model = mongoose.model("seller",seller_schema);