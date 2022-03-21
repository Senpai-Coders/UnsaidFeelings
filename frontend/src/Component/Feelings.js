import React from "react";

import { motion } from "framer-motion";

import { api, apit } from "../Utils/index";

const Feelings = ({ data }) => {

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
      className={`duration-500 relative bg-cover p-2 mb-12 pb-5 shadow-2xl ${data.theme.holder_bg} `}
    >
      <div className={`duration-500 mt-9 mb-4 figure-content ${data.theme.holder_txt}`}>
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
        className={`duration-500 bg-repeat drop-shadow-lg mx-3 px-4 pt-4 pb-16 ${data.theme.content_bg}  ${data.theme.content_txt}`}
        style={{ backgroundImage: `url('${data.theme.content_pattern}')` }}
      >
          <>
            <p className="text-lg leading-7 indent-8 tracking-wider font-Yomogi mb-4 text-justify text">
              {">"} {data.to}
            </p>
            <p
              className={`${
                data.message.length >= 130 ? "mb-36" : "mb-72"
              } text-lg leading-10 indent-8 tracking-wider font-TheGirlNextDoor max-w-full md:font-semibold text-justify break-words`}
            >
              {data.message}
            </p>
            <p className="text-lg absolute bottom-12 right-5 font-Yomogi">
              ~ {data.from}
            </p>
          </>
      </div>
    </motion.div>
  );
};

export default Feelings;
