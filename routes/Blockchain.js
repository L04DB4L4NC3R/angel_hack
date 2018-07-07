const router=require('express').Router();
const authentication=require('./config/spread_sheet');

const bl=require('../helpers/spreadsheet');


//route to add node in blockchain
 router.get('/add',(req,res,next)=>{
      authentication.authenticate()
   .then((auth)=>{
      return bl.updateSheet(auth,);
   })
   .then((msg)=>res.send(msg))
   .catch((err)=>console.log(err));
 });

 
