const express=require('express');
const dfrouter=express.Router();
const dfff=require('dialogflow-fulfillment');
const Complaint=require('../models/complaint');

var admin = require("firebase-admin");

var serviceAccount = require('./chatbot-d47e6-firebase-adminsdk-ln4s2-6910e95720.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();



dfrouter.get('/', (req, res)=>{
    const response={statuscode:res.statusCode,message:"we are live!!!"} ;
        res.send(response);
});

dfrouter.post('/send', express.json(), (req, res)=>{
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    });

    function demo(agent){
        agent.add("Sending response from Webhook server as v1.1.11.1");
    }
    
    const complaint = Complaint({
        type:req.body.type,
        description:req.body.desc,
        room:req.body.room,
    })
    complaint.save()
    
    

    


    var intentMap = new Map();
   
    intentMap.set('demo',demo )

    

    agent.handleRequest(intentMap);
    return db.collection('meeting').add({
        name : "Neeraj",
        email : "email@gmail.com",
        time : Date.now()
      }).then(ref =>

        //fetching free slots from G-cal
        console.log("Meeting details added to DB")
        )

});
module.exports=dfrouter;