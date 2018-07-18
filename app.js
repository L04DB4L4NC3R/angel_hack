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

app.use(express.static('frontend'));
app.use('/doc',express.static('doc'));
// Routes

app.use('/seller',require("./routes/seller"));

app.get("/",(req,res,next)=>{
    res.sendFile(__dirname +  "/frontend/index.html");
});

app.get('/sheet',(req,res,next)=>{
    res.redirect("https://docs.google.com/spreadsheets/d/1e27OIX-r0NyMUkckjPxu9n62DvHSIRE7nEgcW2sZWw0/edit#gid=0");
})
app.post("/",(req,res,next)=>{
    console.log(req.body);
    res.json({message:`Hello ${req.body.name} your age is ${req.body.age}`});
});


app.get("/sheet/upload",(req,res,next)=>{
    res.send("Your response has been recorded. ")
});

app.use("/geo",require("./routes/geo"));
app.use('/seller',require('./routes/uploading'));
app.use("/blockchain",require("./routes/Blockchain"));
app.use("/visualize",require("./routes/visualize_chain"));
// Routes




app.use((err,req,res,next)=>{
  res.send(err);
});

app.listen(process.env.PORT || 3000,()=>console.log("Listening.."));
