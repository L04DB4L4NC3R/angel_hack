const router = require("express").Router();
const multer = require("multer");

const { 
    rm
 } = require("../helpers/processes");

/**
 * @description upload: {
 * 
 *  files:Array of multipart data,
 *  name: Name of person who is uploading
 *  
 * }
 */

router.post("/upload/files/:name",(req,res,next)=>{
    var uploads = multer({dest:`./uploads/${req.params.name}`}).fields([{name:"file",maxCount:10}]);

    uploads(req,res,(err)=>{
        if(err)
            next(err);
        else 
            res.json(req.files);
    });
});


/**
 * @description to remove files
 */
router.get("/upload/delete/:name",(req,res,next)=>{
    rm(__dirname.split('routes')[0] + 'uploads/' + req.params.name)
    .then(()=>res.json({message:"Deleted"}))
    .catch(next);
});


module.exports = router;