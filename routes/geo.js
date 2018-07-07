const router = require("express").Router();
const verify=require('../helpers/cache_request');
const client=require('../config/redis_config');
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

 router.post("/search/place",verify,async (req,res,next)=>{

    //TODO use redis here
    let props = await getProperties(req.body.place);

    //setting cache
    var arr=["name",props['name'],'contact',props['contact'],
    "email",props['email'],"location",
    ["lat",props["lat"],"long",props["long"]],"description",props["description"],"address",props["address"]];
    client.hmset(req.body.place,arr,(err,result)=>{

        res.json(props);
    });

 });




 router.post("/search/weather",async (req,res,next)=>{
    let weather = await getWeather(req.body.place);
    res.json({weather});
 });

 module.exports = router;
