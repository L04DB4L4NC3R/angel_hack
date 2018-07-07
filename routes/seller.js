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

    location:{
    lat:Number,
    lng:Number
    },
    description:String
    address:String
 */




router.post("/add",async (req,res,next)=>{
   let seller = await getProperty({name:req.body.name});
   
    if(!seller){
       let newProp = await createProperty(req.body);
       res.json([newProp]);
   } else{
       let dataa = await updateProperty({name:req.body.name},{$push:{property:{
           location:req.body.location,
           description:req.body.description,
           address:req.body.address
       }}});
       res.json([dataa]);
   }

});




/**
 * @description Get all pts
 */
router.get("/fetch",async (req,res,next)=>{
    
    let arr = await getProperty({});
    var points = [];
    for(i of arr){
        for(j of i.property)
            points.push(j.location);
    }
    res.json([{points}]);

});





module.exports = router;

