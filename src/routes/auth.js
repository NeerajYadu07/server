const express = require('express')
const User = require('../models/user')
const Admin = require('../models/admin')

const { default: mongoose } = require('mongoose');
const authRouter = express.Router()


authRouter.post('/signup/user',(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            if(user==null){
                const user = User({
                    email:req.body.email,
                    password:req.body.password
                })
                user.save()
                .then((err)=>{
                    if(err){
                        console.log(err)
                        res.json(err)
                    }else{
                        console.log(user)
                        res.status(202).json(user)
                    }
                    
                })
            }else{

            res.json({
                message:'email is not avilable'
            })   
            }
        }
    })
    
})

authRouter.post('/signin/user',(req,res)=>{
    User.findOne({email:req.body.email,password:req.body.password},(err,user)=>{
        if(err){
            console.log(err)
            res.json(err)
        }
        else if (user==null){
            res.json({message:"No user found"}) ;  
        }    
        else{
            
            res.status(202).json(user)   
        }
    })
})
authRouter.post('/signup/admin',(req,res)=>{
    Admin.findOne({email:req.body.email},(err,admin)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            if(admin==null){
                const admin = Admin({
                    email:req.body.email,
                    password:req.body.password
                })
                admin.save()
                .then((err)=>{
                    if(err){
                        console.log(err)
                        res.json(err)
                    }else{
                        console.log(admin)
                        res.status(202).json(admin)
                    }
                    
                })
            }else{

            res.json({
                message:'email is not avilable'
            })   
            }
        }
    })
    
})

authRouter.post('/signin/admin',(req,res)=>{
    Admin.findOne({email:req.body.email,password:req.body.password},(err,admin)=>{
        if(err){
            console.log(err)
            res.json(err)
        }
        else if (admin==null){
            res.json({message:"No user found"}) ;  
        }    
        else{
            
            res.status(202).json(admin) ;  
        }
    })
})
module.exports = authRouter

