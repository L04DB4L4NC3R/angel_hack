const redis=require('redis');
const client=require('../config/redis_config');


module.exports=(req,res,next)=>{

//fetching object
client.hgetall(req.body.place,(err,data)=>{
    if(data)
    console.log(data);
    else
    next();
});

}
