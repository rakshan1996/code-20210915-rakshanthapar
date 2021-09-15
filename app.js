//middleware required
const express = require('express');
const multer =require('multer');
const data = require('./processData');


//initialized Middleware
const app =express();
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./public");
    },
    filename:function(req,file,cb){
        cb(null,`${file.fieldname}.json`);
    }
});

const upload =multer({storage});



app.post('/processJson', upload.single("health"),(req,res)=>{
    

   var overWeight= data.processData();

res.send(`There are ${overWeight} overweight people in the provided data.`);
});


app.listen(5000,()=>{
    console.log("listening on port 5000");
});







