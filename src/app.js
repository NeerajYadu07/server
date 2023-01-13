const express= require('express');
const app=express();
const mongoose=require('mongoose');
const Note=require('./models/note')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const mongodbPath="mongodb+srv://Neeraj:rr12@cluster0.a5mxi6b.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongodbPath).then(function(){

    app.get('/',function(req,res){
        const response={message:"API Works!!!"} ;
        res.send(response);
    });
    const noteRouter=require('./routes/Note');
    app.use("/notes",noteRouter);
    
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,function(){
    console.log("Server started at "+ PORT);
});
