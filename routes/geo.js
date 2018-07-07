const router = require("express").Router();

const {
    createProperty,
    getProperty,
    updateProperty,
    deleteProperty
} = require("../schema/schema");

const {
    getProperties,
    getWeather
} = require("../helpers/Search");




/**
 * @description post to get data of available properties in a place and their data
 * 
 * {
 *    place:String
 * }
 */

 router.get("/search/place/:place",async (req,res,next)=>{

    //TODO use redis here
    let props = await getProperties(req.params.place);

    res.json(props);
 });




 router.get("/search/weather/:place",async (req,res,next)=>{
    let weather = await getWeather(req.params.place);
    res.json({weather});
 });

 module.exports = router;