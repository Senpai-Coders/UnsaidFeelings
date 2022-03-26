require("dotenv").config();
require("../config/database").connect();

const express = require("express");
const router = express.Router();
const unsentFeelings = require("../models/unsentFeelings");
const AppOptions = require("../models/AppOptions")
const mongoose = require("mongoose");
const { count, update } = require("../models/unsentFeelings");
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

router.get("/", (req, res)=>{
    res.status(200).json({
        message : "You are viewing this",
        from : "SenpaiDevs ✨"
    })
})

router.post("/initOptions", async(req,res)=>{
    try{
        const theme = [
            {
              theme_name: "CreamyWhite",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-zinc-100",
              holder_texture: "",
              content_bg: "bg-stone-50",
              content_txt: "text-neutral-600",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "CreamyRose",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-zinc-100",
              holder_texture: "",
              content_bg: "bg-rose-200",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "CreamyToast",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-zinc-100",
              holder_texture: "",
              content_bg: "bg-brown-500",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "CreamyGray",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-zinc-100",
              holder_texture: "",
              content_bg: "bg-gray-400",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "CreamyBrandyRose",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-zinc-100",
              holder_texture: "",
              content_bg: "bg-rose-500",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "CreamyCoal",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-zinc-100",
              holder_texture: "",
              content_bg: "bg-stone-700",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "CreamyDark",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-zinc-100",
              holder_texture: "",
              content_bg: "bg-stone-800",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "WhiteStone",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-white",
              holder_texture: "",
              content_bg: "bg-stone-50",
              content_txt: "text-neutral-700",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "WhiteRose",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-white",
              holder_texture: "",
              content_bg: "bg-rose-200",
              content_txt: "text-neutral-700",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "WhiteToast",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-white",
              holder_texture: "",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
              content_bg: "bg-[#A4756A]",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "WhiteGray",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-white",
              holder_texture: "",
              content_bg: "bg-gray-400",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "WhiteBrandyRose",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-white",
              holder_texture: "",
              content_bg: "bg-[#C17F6D]",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "WhiteCoal",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-white",
              holder_texture: "",
              content_bg: "bg-stone-700",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "WhiteDark",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-white",
              holder_texture: "",
              content_bg: "bg-stone-800",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "WhiteEerie",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-white",
              holder_texture: "",
              content_bg: "bg-red-500",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "DarkWhite",
              holder_txt: "text-neutral-50",
              holder_bg: "bg-stone-800",
              holder_texture: "",
              content_bg: "bg-white",
              content_txt: "text-neutral-700",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "DarkEerie",
              holder_txt: "text-neutral-50",
              holder_bg: "bg-stone-800",
              holder_texture: "",
              content_bg: "bg-red-500",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "EerieTorch",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-red-300",
              holder_texture: "",
              content_bg: "bg-red-500",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "OceaWhite",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-sky-200",
              holder_texture: "",
              content_bg: "bg-sky-50",
              content_txt: "text-neutral-700",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "SkyAsh",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-sky-200",
              holder_texture: "",
              content_bg: "bg-[#F1F1F1]",
              content_txt: "text-neutral-700",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "Turqouise",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-teal-100",
              holder_texture: "",
              content_bg: "bg-teal-500",
              content_txt: "text-white",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "AmberSupernova",
              holder_txt: "text-neutral-50",
              holder_bg: "bg-amber-100",
              holder_texture: "",
              content_bg: "bg-amber-300",
              content_txt: "text-neutral-700",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "SkyCornField",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-cyan-50",
              holder_texture: "",
              content_bg: "bg-[#FFF1D4]",
              content_txt: "text-neutral-700",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "GreenHaze",
              holder_txt: "text-neutral-600",
              holder_bg: "bg-[#00A46C]",
              holder_texture: "",
              content_bg: "bg-emerald-100",
              content_txt: "text-neutral-700",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "DarkCoal",
              holder_txt: "text-neutral-50",
              holder_bg: "bg-neutral-900",
              holder_texture: "",
              content_bg: "bg-neutral-500",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "DarkVoid",
              holder_txt: "text-neutral-50",
              holder_bg: "bg-neutral-900",
              holder_texture: "",
              content_bg: "bg-black",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
            {
              theme_name: "CompleteVoid",
              holder_txt: "text-neutral-50",
              holder_bg: "bg-black",
              holder_texture: "",
              content_bg: "bg-black",
              content_txt: "text-neutral-50",
              content_pattern:
                "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
            },
          ];

        theme.forEach(async(t, i)=>{
            await AppOptions.create({
                key: "Themes",
                name: t.theme_name,
                value: t,
                whoAreYou: "Jerbee"
            })
        })
        res.status(201).json({
            message : "AppOption Has been created, don't request to this link again"
        })

    }catch(e){
        internalServerError(e,res)
    }
})

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
        console.log("Update App Option", criteria, setting)
        dbResponse = await AppOptions.updateOne( criteria, { $set : { ...setting }} )
    }else if(mode === -1){
        // delete a settings
        dbResponse = await AppOptions.deleteOne( criteria )
    }
        
    res.status(201).json({
        message : "Ok! Noice 👌",
        dbResponse
    })
  }catch(e){
      internalServerError(e,res)
  }
});

router.post("/getAppSettings" , async(req,res)=>{
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

    const canSave = await AppOptions.findOne({ key : 'AppState' , name : 'CanSubmit'})

    if(!canSave.value) return internalServerError({},res)

    const updateTotalSub = await AppOptions.updateOne({
        key : "AppState",
        name : "TotalSubmissions"
    }, {$inc : { value : 1 }})

    return res.status(201).json({
      message: "Your feelings where written",
      content: message,
    });
  } catch (e) {
      internalServerError(e,res)
  }
});

router.get("/feelings_details/:id", async (req, res)=>{
    try{
        const id = req.params.id

        const resp = await unsentFeelings.findOne({ _id : id })

        if(!resp) return res.status(404).json({
            message : "NotFound"
        })

        const update_views = await unsentFeelings.updateOne({ _id : id }, { $inc : { views : 1}})

        return res.status(200).json({
            message : "Found 👌",
            details : resp
        })
    }catch(e){
        internalServerError(e,res)
    }
})

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

router.post("/search", fakeDelay,async (req, res) => {
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
      .find({ ...finalSearch, _id : { $nin : currentIds }})
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
