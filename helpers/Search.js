var request=require('request');
const util=require('util');
request=util.promisify(request);


module.exports.getProperties =  (place)=>{
return new Promise((resolve,reject)=>{

//fetching properties

request("https://api.nestoria.in/api?encoding=json&pretty=1&action=search_listings&country=in&listing_type=buy&place_name="+place+"&number_of_results=5")

.then((res)=>{

  var data=JSON.parse(res.body);
  var arr=[];
  for(var prop of data.response.listings)
      arr.push({name:prop.keywords,contact:"",email:"",location:{lat:prop.latitude,long:prop.longitude},description:prop.summary,address:prop.title});
  let locs = [];
  for(prop of arr)
      locs.push(prop.location);
      resolve({data:arr,points:locs});
})
.catch((err)=>reject(err));

});
}




module.exports.weather = (place)=>{
  return new Promise((resolve,reject)=>{
    request("http://samples.openweathermap.org/data/2.5/history/city?q="+place+"&appid=b1b15e88fa797225412429c1c50c122a1")
    .then(d=>resolve(d))
    .catch(err=>reject(err));
  });
}