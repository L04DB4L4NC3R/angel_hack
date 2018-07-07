const express = require("express");
const bp = require("body-parser");

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended:false}));
app.use(require("morgan")('dev'));


app.listen(process.env.PORT || 3000,()=>console.log("Listening.."));