const router = require("express").Router();

const {
    createProperty,
    getProperty,
    updateProperty,
    deleteProperty
} = require("../schema/schema");

const {
    getProperties
} = require("../helpers/Search");




/**
 * @description post to get data of available properties in a place and their data
 * 
 * {
 *    place:String
 * }
 */

 router.post("/search",async (req,res,next)=>{
    let props = await getProperties(req.body.place);
    

    res.json(props.points);
 });


 module.exports = router;