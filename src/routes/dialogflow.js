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

    var complaint = agent.contexts.get("Customcomplaint-followup").parameters['complaint'];

    function demo(agent){
        agent.add("Your Message has been sent to admin");
    }
    var intentMap = new Map();
   
    intentMap.set('Custom complaint',demo )

    

    agent.handleRequest(intentMap);
    return db.collection('custom').add({
        desc:complaint,
        
      }).then(ref =>

        //fetching free slots from G-cal
        console.log("Meeting details added to DB")
        )

});
module.exports=dfrouter;