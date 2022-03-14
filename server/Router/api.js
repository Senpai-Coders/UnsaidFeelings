require("dotenv").config();
require("../config/database").connect();

const express = require('express');
const router = express.Router();
const unsentFeelings = require('../models/unsentFeelings');
const mongoose = require('mongoose');
const { count } = require('../models/unsentFeelings');

const internalServerError = (e,res) => {

    console.log(e)

    res.status(500).json({
        code : 500,
        message : "Something's wrong with the server",
        solution : "Try again later",
        e
    })
}

router.get('/', (req, res) => {res.send("From API router")});

router.post('/create_message', async(req,res)=>{
    try{
        const content = req.body
        const message = await unsentFeelings.create({...content})
        return res.status(201).json({
            message:"Your feelings where written",
            content: message
        })
    }catch(e){
        return res.status(500).json({
            message:""
        })
    }
})

router.post(`/update_message`,(req,res)=>{
    const {id,message}=req.body
    run()
    async function run(){
        try{
            const user= await unsentFeelings.findByIdAndUpdate({_id:`${id}`},{message:`${message}`})
            return res.status(401).json({message:"Message has been changed"})
            }
        catch(e){
            return res.status(401).json({message:"unsentFeelings not found"})
            }
        }
})

router.post(`/delete_message`,(req,res)=>{
    const {id}=req.body
    run()
    async function run(){
        try{
            const user= await unsentFeelings.findByIdAndDelete(`${id}`)
            return res.status(401).json({message:"Message has been deleted"})
            }
        catch(e){
            return res.status(401).json({
                message:"unsentFeelings not found"
                })}
    }
})

router.post('/count_all',(req,res,next)=>{
    const user=unsentFeelings.find()
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
        const user=await unsentFeelings.where("_id").equals(`${id}`).select("to").select("message")
        const countMessage=await unsentFeelings.where("_id").equals(`${id}`).select("to").select("message").count()
        console.log(user)
        return res.status(401).json({message:"Success",result:user,count:countMessage})
    }catch(e){
        return res.status(401).json({
            message:e
        })
    }
    }
})

router.post("/search", async (req,res) => {
    try{
        let { currentIds, limit, what } = req.body

    let finalSearch = { to : { $regex: ".*" + what.search + ".*", $options: "i" } }
//        let what = { mode : filterValue , search : toFind };

        finalSearch = what.mode === 'to' ? finalSearch : finalSearch
        finalSearch = what.mode === 'from' ? {  to : { $regex: ".*" + what.search + ".*", $options: "i" } } : finalSearch
        finalSearch = what.mode === 'letter' ? {  message : { $regex: ".*" + what.search + ".*", $options: "i" } } : finalSearch

        const result = await unsentFeelings.find( finalSearch ).sort({cat : 1}).limit(limit);
        
        res.status(200).json({
            status : "ok",
            result
        })
    }catch(e){
        internalServerError(e,res)
    }
})

router.post('/search_messages_to',(req,res,next)=>{
    const {to} = req.body
    run()
    async function run(){
        try{
            const user=await unsentFeelings.where("to").equals(`${to}`).select("to").select("message")
            const countMessage=await unsentFeelings.where("to").equals(`${to}`)
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
        const user=await unsentFeelings.where("from").equals(`${from}`).select("to").select("message")
        const countMessage=await unsentFeelings.where("from").equals(`${from}`)
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
            const user=await unsentFeelings.where("message").equals(`${message}`).select("to").select("from").select("message")
            const countMessage=await unsentFeelings.where("message").equals(`${message}`)
            console.log(user)
            return res.status(401).json({message:"Success",result:user,Messages_found:countMessage})
        }catch(e){
            return res.status(401).json({message:e})}
            }
})


module.exports = router;