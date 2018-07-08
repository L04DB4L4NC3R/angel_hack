## API endpoints 
---

<br />
<br />


|    route     |   request   |  response  |
| ------------ |:------------:|:----------:|
| /seller/add  | POST seller object type  | seller object type |
| /seller/fetch | GET | gets an array of coordinates- {points:[ {lat:Number,lng:Number},.. ]} |
| /geo/search/weather/{place} | GET place | response shown in weather.md |
| /geo/search/place/{place}| GET place| response shown in place.md |
| /seller/upload/files/{username} | POST {files:Array of files} | filedata JSON (see files.md) |
| /seller/upload/delete/{username} | GET | {message:"Deleted"} |
| /geo/both/{place} | GET | {place:[seller object type],weather:Weather Object type} |
| /blockchain/blocks | GET | Gets all blockchain objects. see blockchain.md |
| /blockchain/transact | POST Seller object type with user instead of img | blockchain object |
| /visualize/blocks | GET | Blockchain (see blockchain.md) |
| /visualize/transact | POST Seller object type with user instead of img | blockchain object |
| / | GET | Google sheet |