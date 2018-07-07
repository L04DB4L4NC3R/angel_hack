const router = require("express").Router();

const {
    createProperty,
    getProperty,
    updateProperty,
    deleteProperty
} = require("../schema/schema");





/**
 * @description add property
 * 
 * {
 *  name:String,
    contact:String,
    email:String,

    data:{
        location:{
        lat:Number,
        lng:Number
        },
        description:String
        address:String
    
 * }
 */




router.post("/add",async (req,res,next)=>{
   let seller = getProperty({name:req.body.name});
   if(seller.length < 1){
       let newProp = createProperty(req.body);
       res.json(newProp);
   } else{
       updateProperty({name:req.body.name},{$push:{property:req.body.data}});
   }
});



module.exports = router;