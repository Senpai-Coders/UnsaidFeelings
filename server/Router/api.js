require("dotenv").config();
require("../config/database").connect();

const express = require('express');
const router = express.Router();
const User = require('../models/users');
const mongoose = require('mongoose');
const { count } = require('../models/users');

router.get('/', (req, res) => {res.send("From API router")});

router.post('/create_message', async(req,res)=>{
    try{
        const content = req.body

        console.log(content)
        
        const message = await User.create({...content})
        console.log("done creating")

        return res.status(201).json({
            message:"Pumasok na ang tt",
            content:message
        })
    }catch(e){
        return res.status(500).json({
            message:"Di pumasok si dick"
        })
    }
})

router.post(`/update_message`,(req,res)=>{
    const {id,message}=req.body
    run()
    async function run(){
        try{
            const user= await User.findByIdAndUpdate({_id:`${id}`},{message:`${message}`})
            return res.status(401).json({message:"Message has been changed"})
            }
        catch(e){
            return res.status(401).json({message:"User not found"})
            }
        }
})

router.post(`/delete_message`,(req,res)=>{
    const {id}=req.body
    run()
    async function run(){
        try{
            const user= await User.findByIdAndDelete(`${id}`)
            return res.status(401).json({message:"Message has been deleted"})
            }
        catch(e){
            return res.status(401).json({
                message:"User not found"
                })}
    }
})

router.post('/count_all',(req,res,next)=>{
    const user=User.find()
    user.count((err, count)=>{
        if (err){console.log(err)
            return res.status(201).json({
                message:"Something's wrong"
            })
        }
        else{console.log("total_messages:", count)
        return res.status(201).json({
            total_messages:count
        })
    }
    });
})

router.post('/select_message',(req,res,next)=>{
    const {id} = req.body
    run()
    async function run(){
        try{
        const user=await User.where("_id").equals(`${id}`).select("to").select("message")
        const countMessage=await User.where("_id").equals(`${id}`).select("to").select("message").count()
        console.log(user)
        return res.status(401).json({message:"Success",result:user,count:countMessage})
    }catch(e){
        return res.status(401).json({
            message:e
        })
    }
    }
})

router.post('/search_messages_to',(req,res,next)=>{
    const {to} = req.body
    run()
    async function run(){
        try{
            const user=await User.where("to").equals(`${to}`).select("to").select("message")
            const countMessage=await User.where("to").equals(`${to}`)
            console.log(user)
            return res.status(401).json({message:"Success",result:user,Messages_found:countMessage})
        }catch(e){
            return res.status(401).json({message:e})}
        }
    })
    
router.post('/search_messages_from',(req,res,next)=>{
    const {from} = req.body
    run()
    async function run(){
    try{
        const user=await User.where("from").equals(`${from}`).select("to").select("message")
        const countMessage=await User.where("from").equals(`${from}`)
        console.log(user)
        return res.status(401).json({message:"Success",result:user,Messages_found:countMessage})
    }catch(e){
        return res.status(401).json({message:e})}
        }
    })

router.post('/search_messages_message',(req,res,next)=>{
        const {message} = req.body
        run()
        async function run(){
        try{
            const user=await User.where("message").equals(`${message}`).select("to").select("from").select("message")
            const countMessage=await User.where("message").equals(`${message}`)
            console.log(user)
            return res.status(401).json({message:"Success",result:user,Messages_found:countMessage})
        }catch(e){
            return res.status(401).json({message:e})}
            }
        })


module.exports = router;