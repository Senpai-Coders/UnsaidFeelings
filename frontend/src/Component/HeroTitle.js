import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { randomTime } from "../Utils/";

const HeroTitle = ({ title, mode, duration, styleclass, initial, animate, onComplete }) => {
  const [_title, setTitle] = useState([...""]);

  const delay = (ms) =>
    new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });

  useEffect(() => {
    if (mode === 0) {
      setTitle([...title]);
      return;
    }
    (async function () {
      for (var x = 0; x <= title.length; x++) {
        await delay(100);
        setTitle([...title.slice(0, x)]);
      }
    })();
  }, [mode, title]);

  return (
    <div className="relative flex items-center justify-evenly h-full m-auto">
      <motion.hr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="duration-500 border w-full absolute border-neutral-100 dark:border-neutral-700"
      />
      <AnimatePresence>
        {_title.map((char, idx) => (
          <motion.div
            key={idx}
            initial={initial}
            animate={animate}
            transition={{ duration: randomTime(duration.start, duration.end) }}
            className={styleclass}
            onAnimationComplete={() => {
              
            }}
          >
            {char === " " ? <p>&nbsp;</p> : <p>{char}</p>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeroTitle;
