## API endpoints 
---

<br />
<br />


|    route     |   request   |  response  |
| ------------ |:------------:|:----------:|
| /seller/add  | POST seller object type  | seller object type |
| /seller/fetch | GET | gets an array of coordinates- {points:[ {lat:Number,lng:Number},.. ]} |
| /user/search/weather/{place} | GET place | response shown in weather.md |
| /user/search/place/{place}| GET place| response shown in place.md |
| /seller/upload/files | POST {files:Array of files,name:Name of person who is uploading} | filedata JSON (see files.md) |