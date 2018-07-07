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
      arr.push({name:prop.keywords,contact:"",email:"",location:{lat:prop.latitude,lng:prop.longitude},description:prop.summary,address:prop.title,image:prop.img_url});
    resolve(arr);
})
.catch((err)=>reject(err));

});
}




module.exports.getWeather = (place)=>{
  return new Promise((resolve,reject)=>{
    request("http://samples.openweathermap.org/data/2.5/history/city?q="+place+"&appid=b1b15e88fa797225412429c1c50c122a1")
    .then((data)=>{
      let d = JSON.parse(data.body);
      let dd = {};
      dd.temp_min = d.list[0].main.temp_min.toString();
      dd.temp_max = d.list[0].main.temp_max.toString();
      dd.sea_level = d.list[0].main.sea_level.toString();
      dd.pressure = d.list[0].main.pressure.toString();
      dd.humidity = d.list[0].main.humidity.toString();
      dd.wind = d.list[0].wind.speed.toString();

      resolve(dd)
    })
    .catch(err=>reject(err));
  });
}
