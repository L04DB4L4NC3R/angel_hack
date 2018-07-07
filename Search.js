var request=require('request');
const util=require('util');
request=util.promisify(request);


function getProperties(place){
return new Promise((resolve,reject)=>{

//fetching properties
request("https://api.nestoria.in/api?encoding=json&pretty=1&action=search_listings&country=in&listing_type=buy&place_name="+place+"&number_of_results=5")
.then((res)=>{
  var data=JSON.parse(res.body);
  console.log(data.response.listings);
  var arr=[];
  for(var prop of data.response.listings)
  arr.push({name:prop.keywords,contact:"",email:"",location:{lat:prop.latitude,long:prop.longitude},description:prop.summary,address:prop.title});
  resolve(arr);
  console.log(arr);
})
.catch((err)=>reject(err));

});
}
getProperties('gurgaon').then((res)=>console.log(res)).catch((err)=>console.log(err));

module.exports=getProperties;
