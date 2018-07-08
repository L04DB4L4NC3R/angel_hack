const router=require('express').Router();

const {
    genesisInit,
    createBlock,
    validateChain
} = require("../helpers/blockchain");

const {
    addBlock,
    getBlock
} = require("../schema/chain_schema");

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


 router.post("/transact",async (req,res,next)=>{
    
    let chain = await getBlock({});

    if(chain.length>=1){
        let arr =  createBlock(req.body,Date.now()/1000,chain[chain.length-1]);

        if(!validateChain(arr,chain[chain.length-1]))
            return res.json({message:"Error validating blockchain"});
        res.send(arr)
    
    } else{
        let arr = genesisInit(req.body);
        res.send(arr);
    }
     
 });



 router.get("/blocks",async (req,res,next)=>{
    res.json(await getBlock({}));
 });


 router.get("/",(req,res,next)=>{
   res.json(genesisInit())
 })



 module.exports = router;
