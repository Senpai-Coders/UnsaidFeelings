import React, { useEffect } from "react";

import { motion } from "framer-motion";

import { api, apit } from "../Utils/index";

const Feelings = ({ data, mode }) => {
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
      content_bg: "bg-[#A4756A]",
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
      content_bg: "bg-[#C17F6D]",
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      className={`relative bg-cover p-2 mb-12 pb-5 shadow-2xl ${data.theme.holder_bg} ${data.theme.holder_txt}`}
    >
      <div className="mt-9 mb-4 figure-content">
        <p className=" tracking-wide font-Yomogi text-lg text-center">
          {" "}
          Unsaid{" "}
        </p>
        <p className=" tracking-wide font-Yomogi text-lg text-center">
          {" "}
          Feelings{" "}
        </p>
        <p className=" tracking-wider font-Yomogi mt-4 mb-6 text-xs text-center">
          feelings that are left unsaid
        </p>
      </div>
      <div className="bg-neutral-500 absolute left-0 top-3/4 h-8 w-full"></div>
      <div
        className={`relative bg-repeat drop-shadow-lg mx-3 px-4 pt-4 pb-16 ${data.theme.content_bg}  ${data.theme.content_txt}`}
        style={{ backgroundImage: `url('${data.theme.content_pattern}')` }}
      >
        {mode !== 0 ? (
          <>
            <p className="text-lg leading-7 indent-8 tracking-wider font-Yomogi mb-4 text-justify text">
              {">"} {data.to}
            </p>
            <p
              className={`${
                data.message.length >= 130 ? "mb-28" : "mb-80"
              } text-lg leading-10 indent-8 tracking-wider font-TheGirlNextDoor md:font-semibold text-justify`}
            >
              {data.message}
            </p>
            <p className="text-lg absolute bottom-12 right-5 font-Yomogi">
              ~ {data.from}
            </p>
          </>
        ) : 
        (
            <input className="text-lg leading-7 indent-8 tracking-wider font-Yomogi mb-4 text-justify bg-transparent outline-none" type="text" placeholder="> to" />
        )
        }
      </div>
    </motion.div>
  );
};

export default Feelings;
