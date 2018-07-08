const mongoose = require("mongoose");

const schema = new mongoose.Schema({
   data:{
    name:String,
    contact:String,
    email:String,
    location:{
        lat:Number,
        lng:Number
    },
    description:String,
    address:String,
    user:String
   },
   previousHash:String,
   hash:String,
   timestamp:String,
   index:Number
});

const model = mongoose.model("block",schema);




exports.addBlock = (datablock)=>{
    return new Promise((resolve,reject)=>{
        model.create(datablock)
        .then(resolve)
        .catch(reject);
    });
}



exports.getBlock = (query)=>{
    return new Promise((resolve,reject)=>{
        model.find(query)
        .then(resolve)
        .catch(reject);
    });
}