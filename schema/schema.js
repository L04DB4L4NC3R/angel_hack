const mongoose = require("mongoose");

const seller_schema = new mongoose.Schema({
    name:String,
    contact:String,
    email:String,
    
    property:[{
        location:{
            lat:Number,
            lng:Number
        },
        description:String,
        address:String
    }]
});

const seller_model = mongoose.model("seller",seller_schema);




exports.createProperty = (data)=>{
    return new Promise((resolve,reject)=>{

        var obj = new seller_model({
                name:data.name,
               contact:data.contact,
               email:data.email,
               property:[data.data]
        })

        obj.save()
        .then(d=>resolve(d))
        .catch(err=>reject(err))
    });
}



exports.getProperty = (query)=>{
    return new Promise((resolve,reject)=>{
        seller_model.find(query)
        .then(d=>resolve(d))
        .catch(err=>reject(err));
    });
}



exports.updateProperty = (query,update)=>{
    return new Promise((resolve,reject)=>{
        seller_model.update(query,update)
        .then(d=>resolve(d))
        .catch(err=>reject(err));
    })
}



exports.deleteProperty = (id)=>{
    return new Promise((resolve,reject)=>{
        seller_model.findOneAndRemove({_id:id})
        .then(d=>resolve(d))
        .catch(err=>reject(err));
    })
}