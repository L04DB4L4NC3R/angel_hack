const express = require("express");
const bp = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
mongoose.connection
.once("open",()=>console.log("Connection open"))
.catch(err=>console.log(err));

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended:false}));
app.use(require("morgan")('dev'));


app.use((err,req,res,next)=>{
    res.json({
        message:"Some error occurred",
        err
    });
});

app.listen(process.env.PORT || 3000,()=>console.log("Listening.."));