require("dotenv").config();
require("../config/database").connect();

const express = require("express");
const router = express.Router();
const unsentFeelings = require("../models/unsentFeelings");
const AppOptions = require("../models/AppOptions")
const mongoose = require("mongoose");
const { count } = require("../models/unsentFeelings");
const { auth } = require('../middleware/authAdmin');

// Kunware slow internet (slow server response)
const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fakeDelay = async (req, res, next) => {
    await snooze(2000);
    next();
  };

const internalServerError = (e, res) => {
  console.log(e)
  res.status(500).json({
    code: 500,
    message: "Something's wrong with the server",
    solution: "Try again later",
    e,
  });
};

router.post("/updateAppSettings", auth , async (req, res) => {
  try{
    const { mode, criteria, setting } = req.body
    
    let dbResponse = null


    if(!mode && mode !== 0) return res.status(400).json({
        message : "Please provide a mode, 👉(0=create, 1=update, -1=Delete )"
    })

    if(mode === 0) {
        // create new settings
        dbResponse = await AppOptions.create({ ...setting } )
    }else if(mode === 1){
        // update a settings
        if( !criteria ) return res.status(400).json({
            message : "criteria is missing, criteria is used to identify the app option you wan't to update"
        })
        dbResponse = await AppOptions.updateOne({ criteria }, { $set : { ...setting }} )
    }else if(mode === -1){
        // delete a settings
        dbResponse = await AppOptions.deleteOne({ criteria })
    }
        
    res.status(201).json({
        message : "Ok! Noice 👌",
        dbResponse
    })
  }catch(e){
      internalServerError(e,res)
  }
});

router.post("/getAppSettings",  fakeDelay , async(req,res)=>{
    try{

        const appOption = await AppOptions.find(req.body.criteria)
        res.status(200).json({
            message : "ok 👌",   
            appOption
        })
    }catch(e){
        internalServerError(e,res)
    }
})

router.post("/create_message", async (req, res) => {
  try {
    const content = req.body;
    const message = await unsentFeelings.create({ ...content });
    return res.status(201).json({
      message: "Your feelings where written",
      content: message,
    });
  } catch (e) {
    return res.status(500).json({
      message: "",
    });
  }
});

router.post(`/update_message`, (req, res) => {
  const { id, message } = req.body;
  run();
  async function run() {
    try {
      const user = await unsentFeelings.findByIdAndUpdate(
        { _id: `${id}` },
        { message: `${message}` }
      );
      return res.status(401).json({ message: "Message has been changed" });
    } catch (e) {
      return res.status(401).json({ message: "unsentFeelings not found" });
    }
  }
});

router.post(`/delete_message`, (req, res) => {
  const { id } = req.body;
  run();
  async function run() {
    try {
      const user = await unsentFeelings.findByIdAndDelete(`${id}`);
      return res.status(401).json({ message: "Message has been deleted" });
    } catch (e) {
      return res.status(401).json({
        message: "unsentFeelings not found",
      });
    }
  }
});

router.post("/count_all", (req, res, next) => {
  const user = unsentFeelings.find();
  user.count((err, count) => {
    if (err) {
      console.log(err);
      return res.status(201).json({
        message: "Something's wrong",
      });
    } else {
      console.log("total_messages:", count);
      return res.status(201).json({
        total_messages: count,
      });
    }
  });
});

router.post("/select_message", (req, res, next) => {
  const { id } = req.body;
  run();
  async function run() {
    try {
      const user = await unsentFeelings
        .where("_id")
        .equals(`${id}`)
        .select("to")
        .select("message");
      const countMessage = await unsentFeelings
        .where("_id")
        .equals(`${id}`)
        .select("to")
        .select("message")
        .count();
      console.log(user);
      return res
        .status(401)
        .json({ message: "Success", result: user, count: countMessage });
    } catch (e) {
      return res.status(401).json({
        message: e,
      });
    }
  }
});

router.post("/search", fakeDelay, async (req, res) => {
  try {
    let { currentIds, limit, what } = req.body;

    let finalSearch = {
      to: { $regex: ".*" + what.search + ".*", $options: "i" },
    };
    //let what = { mode : filterValue , search : toFind };

    finalSearch = what.mode === "to" ? finalSearch : finalSearch;
    finalSearch =
      what.mode === "from"
        ? { from: { $regex: ".*" + what.search + ".*", $options: "i" } }
        : finalSearch;
    finalSearch =
      what.mode === "written"
        ? { message: { $regex: ".*" + what.search + ".*", $options: "i" } }
        : finalSearch;

    const result = await unsentFeelings
      .find(finalSearch)
      .sort({ cat: -1 })
      .limit(limit);

    res.status(200).json({
      status: "ok",
      result,
    });
  } catch (e) {
    internalServerError(e, res);
  }
});

module.exports = router;
