const router=require('express').Router();
const authentication=require('../config/spread_sheet');

const bl=require('../helpers/spreadsheet');



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

        }).catch(next);
    }).catch(next)
 });



 module.exports = router;