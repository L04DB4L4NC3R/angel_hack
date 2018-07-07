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

 router.post("/search",async (req,res,next)=>{
    let props = await getProperties(req.body.place);

    let weather = await getWeather(req.body.place);

    res.json(weather);
 });


 module.exports = router;