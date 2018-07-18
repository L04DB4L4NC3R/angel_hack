const router = require("express").Router();
const verify=require('../helpers/cache_request');
//const client=require('../config/redis_config');
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
 * 
 * @description post to get data of available properties in a place and their data
 *
 * {
 *    place:String
 * }
 */

 router.get("/search/place/:place",async (req,res,next)=>{

    //TODO use redis here
    let props = await getProperties(req.params.place);
    //setting cache
//     //looping through array for creating pusing it
//     for(var property of props){
//     var arr=["name",property['name'],'contact',property['contact'],
//     "email",property['email'],"location",["lat",property["location"]["lat"],
//     "long",property["location"]["long"]],
//     "description",property["description"],
//     "address",property["address"]];
//   }
//   //TODO  to use hmset fucntion to set
//     client.hmset(req.params.place,arr,(err,result)=>{
        
        res.json(props);
//     });

 });


 router.get("/search/weather/:place",async (req,res,next)=>{
    let weather = await getWeather(req.params.place);
    res.json({weather});
 });




 router.get("/both/:place",async (req,res,next)=>{
    let props = await getProperties(req.params.place);
    let weather = await getWeather(req.params.place);
    res.json([{place:props,weather}]);
 });


 module.exports = router;
