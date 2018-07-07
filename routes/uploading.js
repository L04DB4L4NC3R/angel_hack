const router = require("express").Router();
const multer = require("multer");
const uploads = multer({dest:'./uploads'});

router.post("/upload/files",uploads.fields([{name:"file",maxCount:10}]),(req,res,next)=>{
    
    res.send(req.files)
});


module.exports = router;