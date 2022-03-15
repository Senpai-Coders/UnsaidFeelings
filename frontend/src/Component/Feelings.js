import React from "react";

import { motion } from "framer-motion";
import { randomTime } from "../Utils/"

const Feelings = ({ data }) => {

  const bg_url = 'https://cdn.discordapp.com/attachments/912411399458795593/953255922195656724/unsaid-grid.png'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration : 1 }}
      exit={{ opacity: 0 }}
      className="bg-slate-100 text-slate-700 p-2 mb-7 break-inside drop-shadow-lg"
    >
      <div className="mt-16 mb-4">
        <p className=" tracking-widest font-bold font-MajorMonoDisplay line-through text-2xl text-center">Unsaid</p>
        <p className=" tracking-widest font-bold font-MajorMonoDisplay line-through text-xl text-center">Feelings</p>
        <p className=" tracking-wider text-slate-600 font-SpecialElite mt-6 mb-8 text-sm text-center">feelings that are left unsaid</p>
      </div>
      <div className=" bg-slate-50 bg-opacity-95 bg-repeat drop-shadow-lg m-3 px-4 py-4" style={{backgroundImage : `url('${bg_url}')`}}>
        <p className="leading-7 indent-8 text-lg tracking-wider md:text-xl font-Yomogi font-semibold text-justify">{ data.message }</p>
      </div>
    </motion.div>
  );
};

export default Feelings;
