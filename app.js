const express = require("express");
const bp = require("body-parser");

require('./helpers/spreadsheet.js');

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });
mongoose.connection
.once("open",()=>console.log("Connection open"))
.catch(err=>console.log(err));

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended:false}));
app.use(require("morgan")('dev'));


// Routes

app.use('/seller',require("./routes/seller"));

app.get('/',(req,res,next)=>{
    res.json({message:"hello"});
})
app.post("/",(req,res,next)=>{
    console.log(req.body);
    res.json({message:`Hello ${req.body.name} your age is ${req.body.age}`});
});

app.use("/geo",require("./routes/geo"));
app.use('/seller',require('./routes/uploading'));
//app.use("/blockchain",require("./routes/blockchain"));
// Routes



app.use((err,req,res,next)=>{
    res.json({
        message:"Some error occurred",
        err
    });
});

app.listen(process.env.PORT || 3000,()=>console.log("Listening.."));
