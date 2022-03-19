import React from "react";

import { motion } from "framer-motion";

import { api, apit } from "../Utils/index";

const Feelings = ({ data, mode, setTo, setFrom, setMessage }) => {

  const getLines = () => {
    let text = document.getElementById("message").value;   
    let lines = text.split(/\r|\r\n|\n/);
    let count = lines.length;
    console.log(count)
    return count > 8
  }

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
        ) : (
          <>
            <input
              className="border-b w-3/4 text-lg leading-7 indent-8 tracking-wider font-Yomogi mb-4 text-justify bg-transparent outline-none"
              type="text"
              onChange={(e) => {
                setTo(e.target.value);
              }}
              placeholder="> to"
            />
            <textarea
              id={"message"}
              rows={8}
              className={`resize-none mb-28 bg-transparent outline-none w-full text-lg leading-10 indent-8 tracking-wider font-TheGirlNextDoor md:font-semibold text-justify`}
              value={ data.message }
              onChange={(e) => {
                if( getLines() ) return
                if( e.target.value.length >= 250 ) return
                setMessage(e.target.value);
              }}
              placeholder="Write your feelings here"
            />
            <input type='text' placeholder="from (optional)" className="border-b w-2/4 outline-none bg-transparent text-lg absolute bottom-12 right-5 font-Yomogi text-right" />
              
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Feelings;
