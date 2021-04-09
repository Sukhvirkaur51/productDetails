var express=require('express');
var bodyparser=require('body-parser');
var multer =require('multer');
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));



app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/product.html");
})



 var st=multer.diskStorage({
     destination:(req,file,cb)=>{
         cb(null,"./productImages")
     },
     filename:(req,file,cb)=>{
         cb(null,file.originalname);
     }
 })
    var fileup=multer({storage:st}).single('image');




app.post('/getData' ,(req,res)=>{
   
    
// res.send("ProductName: "+name+ " , Quantity: " +quantity+ " , Price: "+price+ ",bill: "+bill);

 fileup(req,res,(err)=>{
              if(err){
          console.log("file uploading failed"+err);
          res.send(err);
              }
             else{
                  console.log("file uploading successfully");
                  var name= req.body.pname;
                  var quantity= req.body.quantity;
                  var price= req.body.price;
                  var bill=quantity*price;
                //   res.send("file uploading successfully");
                  res.send("file uploading successfully  "+"ProductName: "+name+ " , Quantity: " +quantity+ " , Price: "+price+ ",bill: "+bill);
              }
          })
          
       


})





app.listen(3200,(err)=>{
    if(err)
   {
       console.log(err)

   } 
   else{
       console.log("server is running")
   }
})