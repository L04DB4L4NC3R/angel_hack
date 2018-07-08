const router=require('express').Router();
const authentication=require('../config/spread_sheet');

const bl=require('../helpers/spreadsheet');

const {
    genesisInit,
    createBlock,
    validateChain
} = require("../helpers/blockchain");


/**
 * @description body-
 *
 * {
        "name": "Builder floor, Garden, Gated Community, Lift, Power Backup, Security",
        "contact": "",
        "email": "",
        "location": {
            "lat": 28.541492,
            "long": 77.25977
        },
        "description": "This is a 2 bhk independent floor at price rs. 12000000 located in ...",
        "address": "Kalkaji, Guru Ravi Das Marg, Near Dhiman Motor Driving School, G Block, New Delhi",
        "user":String
    }
 *
 */


 router.post("/transact",(req,res,next)=>{
    authentication.authenticate()
    .then((auth)=>{
        bl.readSheet(auth)
        .then((data)=>{
            if(!data["blockchain"][1]){

                let arr = genesisInit(req.body);

                bl.updateSheet(auth,[[arr.index,arr.timestamp,arr.hash,arr.previousHash,JSON.stringify(arr.data)]])
                .then(c=>res.json({c}))
                .catch(err=>next(err));
            }
            else{
                var arr = createBlock(req.body,Date.now()/1000,data["blockchain"][data["blockchain"].length-1]);
                if(!validateChain(arr,data["blockchain"][data["blockchain"].length-1]))
                    return res.json({message:"Error validating blockchain"});
                bl.updateSheet(auth,[[arr.index,arr.timestamp,arr.hash,arr.previousHash,JSON.stringify(arr.data)]])
                .then((c)=>res.json({c}))
                .catch((err)=>next(err));
            }
        }).catch(next);
    }).catch(next)
 });



 router.get("/blocks",(req,res,next)=>{
    authentication.authenticate()
    .then((auth)=>{
        bl.readSheet(auth)
        .then(res.json)
        .catch(next);
    }).catch(next);
 });


 router.get("/",(req,res,next)=>{
   res.send(genesisInit())
 })



 module.exports = router;
