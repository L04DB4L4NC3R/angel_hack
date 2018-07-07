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


// Routes

app.use('/seller',require("./routes/seller"));
app.post("/",(req,res,next)=>{
    console.log(req.body);
    res.json({message:`Hello ${req.body.name} your age is ${req.body.age}`});
});
app.use("/user",require("./routes/user"));
// Routes



app.use((err,req,res,next)=>{
    res.json({
        message:"Some error occurred",
        err
    });
});

app.listen(process.env.PORT || 3000,()=>console.log("Listening.."));