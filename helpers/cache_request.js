const redis=require('redis');
const client=require('../config/redis_config');


module.exports=(req,res,next)=>{

//fetching object
client.hgetall(req.params.place,(err,data)=>{
    console.log(data);
    if(data)
    console.log("test");
    else
    next();
});

}
