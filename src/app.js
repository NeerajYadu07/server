const express= require('express');
const app=express();
const mongoose=require('mongoose');
const Note=require('./models/note')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const dfff=require('dialogflow-fulfillment');
let db;
const mongodbPath="mongodb+srv://Neeraj:rr12@cluster0.a5mxi6b.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongodbPath).then(function(){

    app.get('/',function(req,res){
        const response={statuscode:res.statusCode,message:"API Works!!!"} ;
        res.send(response);
    });
    const noteRouter=require('./routes/Note');
    app.use("/notes",noteRouter);
    const authRouter=require('./routes/auth');
    app.use("/auth",authRouter);
    const dfRouter=require('./routes/dialogflow');
    app.use("/df",dfRouter);
    
    
});
// let db;
const PORT=process.env.PORT || 5000;
app.listen(PORT,function(){
    console.log("Server started at "+ PORT);
    
});
// module.exports=db;

