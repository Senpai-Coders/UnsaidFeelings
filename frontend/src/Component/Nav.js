import React from "react";
import { useThemeState } from "../Hooks/useTheme";

import { MdOutlineDarkMode, MdWbSunny } from "react-icons/md";

const Nav = () => {
  const [colorTheme, setTheme] = useThemeState();

  return (
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="relative h-8 container flex flex-wrap justify-between items-center mx-auto">
        <button onClick={
            () => {
                console.log(colorTheme)
                if(colorTheme === 'light'){
                    setTheme('dark')
                    return 
                }
                setTheme('light')
            }
        } className="absolute rounded-full bg-gray-50 dark:bg-transparent p-1 border-2 border-gray-100 dark:border-gray-900 right-5 text-gray-400 hover:text-gray-700 duration-300">
          {colorTheme === "dark" ? (
            <MdOutlineDarkMode className="w-8 h-8" />
          ) : (
            <MdWbSunny className="w-8 h-8" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
