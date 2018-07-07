var request=require('request');
const util=require('util');
request=util.promisify(request);


exports.getProperties =  (place)=>{
return new Promise((resolve,reject)=>{

//fetching properties
request('https://api.nestoria.in/api?encoding=json&pretty=1&action=search_listings&country=in&listing_type=buy&place_name='+place+'&number_of_results=5')
.then((res)=>{
  var data=JSON.parse(res.body);
  var arr=[];
  for(var prop of data.response.listings)
  arr.push({name:prop.keywords,contact:"",email:"",location:{lat:prop.latitude,long:prop.longitude}});
  console.log(arr)
  resolve(arr);
})
.catch((err)=>reject(err));

});
}

