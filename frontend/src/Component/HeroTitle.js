import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { randomTime } from "../Utils/";

const HeroTitle = ({ title, mode, duration, styleclass}) => {
  const [_title, setTitle] = useState([...""]);

  const delay = (ms) =>
    new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });

  useEffect(() => {
    if(mode === 0) {
        setTitle([...title])
        return 
    }
    (async function () {
      for (var x = 0; x <= title.length; x++) {
        await delay(100);
        setTitle([...title.slice(0, x)])
      }
    })();
  }, [mode, title]);

  return (
    <div className="flex items-center justify-evenly h-full  m-auto">
      <AnimatePresence>
        {_title.map((char, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: randomTime(duration.start, duration.end) }}
            className={styleclass}
          >
            {char === " " ? <p>&nbsp;</p> : <p>{char}</p>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeroTitle;
