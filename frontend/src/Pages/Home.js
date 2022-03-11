import React, { useState, useEffect } from "react";
import HeroTitle from "../Component/HeroTitle";
import { motion } from "framer-motion";

import { VscSearch } from "react-icons/vsc";

const Home = () => {
  const [doneAnimating, setDoneAnimating] = useState(false);

  return (
    <>
      <section className="flex items-center h-2/6 md:h-1/2 ">
        <HeroTitle
          title={"Unsaid Feelings"}
          styleclass={
            "font-MajorMonoDisplay text-xl sm:text-2xl md:text-3xl lg:text-5xl text-gray-800 dark:text-gray-200"
          }
          mode={0}
          duration={{ start: 2, end: 3 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        />
      </section>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4 }}
        className="flex justify-center items-center my-4"
      >
        <div className="flex items-center  w-4/6 md:w-1/3 relative">
          <input
            type="text"
            placeholder="to"
            className="mr-2 px-4 py-2 w-full tracking-widest outline-none text-gray-800 dark:text-gray-300 font-TheGirlNextDoor text-lg bg-transparent border-b-2 border-gray-600 dark:border-gray-400"
          ></input>
          <button>
            <VscSearch className=" h-4 w-4 text-gray-500 dark:text-gray-300" />
          </button>
          <p className="text-sm absolute -bottom-8 text-center text-gray-800 dark:text-gray-300 font-Yomogi">
            Did someone wrote for you?
          </p>
        </div>
      </motion.section>
    </>
  );
};

export default Home;
