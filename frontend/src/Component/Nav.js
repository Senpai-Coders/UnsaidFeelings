import React from "react";
import { useThemeState } from "../Hooks/useTheme";

import { MdWbSunny } from "react-icons/md";
import { RiMoonClearFill } from "react-icons/ri";
import { motion } from "framer-motion";

const Nav = () => {
  const [colorTheme, setTheme] = useThemeState();

  return (
    <nav className="sticky top-0 w-full duration-500 bg-gray-50 dark:bg-neutral-900 bg-opacity-70 backdrop-blur-md border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-transparent z-10">
      <div className="relative h-8 container flex flex-wrap justify-between items-center mx-auto">
        <button
          onClick={() => {
            if (colorTheme === "light") {
              setTheme("dark");
              localStorage.setItem("theme", "dark");
              return;
            }
            setTheme("light");
            localStorage.setItem("theme", "light");
          }}
          className="absolute rounded-full bg-gray-50 dark:bg-neutral-900 p-1 border-2 border-gray-200 dark:border-gray-700 right-5 text-gray-500 hover:text-gray-700 duration-300"
        >
          {colorTheme === "light" ? (
            <motion.div>
              <RiMoonClearFill className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div>
              <MdWbSunny className="w-5 h-5" />
            </motion.div>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
