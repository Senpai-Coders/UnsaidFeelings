import React, { useState, useEffect } from "react";

import Loading from "../Component/Loading";
import Feelings from "../Component/Feelings";
import { api } from "../Utils";

import { FiCheck } from "react-icons/fi";
import { RiBrush3Fill } from "react-icons/ri";
import { MdTexture } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const Submit = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [chosenTheme, setChosenTheme] = useState({
    theme_name: "CreamyWhite",
    holder_txt: "text-neutral-600",
    holder_bg: "bg-zinc-100",
    holder_texture: "",
    content_bg: "bg-stone-50",
    content_txt: "text-neutral-600",
    content_pattern:
      "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
  });
  const [chosenHolderTexture, setChosenHolderTexture] = useState();
  const [chosenContentPattern, setChosenContentPattern] = useState();

  const [showThemes, setShowTheme] = useState(false);
  const [showPattern, setShowPatterns] = useState(false);

  const [themes, setThemes] = useState([
    {
      key: "Themes",
      name: "CreamyWhite",
      value: {
        theme_name: "CreamyWhite",
        holder_txt: "text-neutral-600",
        holder_bg: "bg-zinc-100",
        holder_texture: "",
        content_bg: "bg-stone-50",
        content_txt: "text-neutral-600",
        content_pattern:
          "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
      },
      whoAreYou: "Jerbee",
    },
    {
      key: "Themes",
      name: "DarkVoid",
      value: {
        theme_name: "DarkVoid",
        holder_txt: "text-neutral-50",
        holder_bg: "bg-neutral-900",
        holder_texture: "",
        content_bg: "bg-black",
        content_txt: "text-neutral-50",
        content_pattern:
          "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
      },
      whoAreYou: "Jerbee",
    },
  ]);
  const [holderTextures, setHolderTextures] = useState([]);
  const [contentPatterns, setContentPatterns] = useState([]);

  const init = async () => {
    try {
      const THEMES = await api.post("/getAppSettings", {
        criteria: { key: "Themes" },
      });

      const TEXTURE = await api.post("/getAppSettings", {
        criteria: { key: "Textures" },
      });
      const PATTERNS = await api.post("/getAppSettings", {
        criteria: { key: "Patterns" },
      });

      setThemes(THEMES.data.appOption);
      setHolderTextures(TEXTURE.data.appOption);
      setContentPatterns(PATTERNS.data.appOption);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const chosePattern = (txture) => {
    let cpy = { ...chosenTheme };
    console.log(txture);
    cpy.content_pattern = txture;
    setChosenTheme(cpy);
  };

//   const getLines = (id) => {
//     let text = document.getElementById(id).value;
//     let lines = text.split(/\r|\r\n|\n/);
//     let count = lines.length;
//     console.log(count);
//     return count > 8;
//   };

  const submit = async() => {
      try{

        console.log("submitting")

        let model = {
            to,
            message,
            theme: !chosenTheme ? themes[0].value : chosenTheme,
          }

          if(from.length !== 0) model.from = from

        const response = await api.post("/create_message", model)

        console.log(response.data)
      }catch(e){
          console.log(e)
      }
  }

  const canSubmit = () => { 
    if(to.length === 0) return false
    if(message.length === 0) return false
    return true
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      onClick={() => {
        setShowTheme(false);
        setShowPatterns(false);
      }}
      className="w-full flex h-screen"
    >
      <div className="relative w-1/2 h-full flex items-center justify-center">
        <p className="absolute top-0 text-gray-700 animate-pulse dark:text-gray-200 text-center">
          Preview
        </p>
        <div className="w-2/4">
          <Feelings
            data={{
              to,
              from,
              message,
              theme: !chosenTheme ? themes[0].value : chosenTheme,
            }}
          />
        </div>
      </div>
      <div className="relative w-1/2 h-full p-4 bg-white dark:bg-transparent dark:text-gray-200 text-gray-700 font-Yomogi">
        <div
          className="px-4"
          onClick={() => {
            setShowTheme(false);
            setShowPatterns(false);
          }}
        >
          <p className="text-lg font-SpecialElite"></p>
          <div className="mt-4 mx-auto space-y-4 flex flex-col">
            <label />
            <input
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
              type="text"
              placeholder="To"
              className="outline-none px-4 py-1 bg-transparent border-b dark:border-neutral-600 font-semibold"
            />
            <input
              value={from}
              type="text"
              onChange={(e) => {
                setFrom(e.target.value);
              }}
              placeholder="From  ( Your name - optional)"
              className="outline-none bg-transparent dark:border-neutral-600 border-b px-4 py-1 font-semibold"
            />
            <div className="relative w-full">
              <textarea
                id="feelingsInput"
                value={message}
                rows={6}
                onChange={(e) => {
                  if (e.target.value.length >= 251) return;
                  setMessage(e.target.value);
                }}
                placeholder="Say it"
                className="indent-8 p-2 dark:bg-transparent mb-1 font-bold border border-neutral-400 outline-none resize-none rounded-md w-full"
              />
              <p
                className={`${
                  message.length >= 225
                    ? "text-rose-400 border-rose-400"
                    : message.length >= 200
                    ? "text-amber-500 border-amber-600"
                    : "text-sky-500 border-sky-400"
                } duration-1000 font-Inter rounded-lg border-b-4 pb-1 px-2 inline-block text-xs font-semibold`}
              >
                {250 - message.length}
              </p>
            </div>
          </div>

          <AnimatePresence>
            <div className=" relative flex space-x-7 mt-4 items-center w-full ">
              <div
                className="cursor-pointer flex items-center my-8 "
                onClick={(e) => {
                  setShowTheme(!showThemes);
                  e.stopPropagation();
                }}
              >
                <RiBrush3Fill className="h-4 w-4 mr-2 " />
                <p className=" text-lg font-Mali">Themes</p>
              </div>

              <div
                className="cursor-pointer  flex items-center my-8 "
                onClick={(e) => {
                  setShowPatterns(!showPattern);
                  e.stopPropagation();
                }}
              >
                <MdTexture className="h-4 w-4 mr-2 " />
                <p className=" text-lg font-Mali">Textures</p>
              </div>

              {showThemes && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute filter backdrop-blur-md -left-10 -top-5  max-h-96 w-full p-8 mt-2 overflow-y-auto snap-y "
                >
                  {themes.map((th, idx) => (
                    <div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setChosenTheme(th.value);
                      }}
                      className={`relative snap-center duration-200 cursor-pointer w-full p-8 flex justify-start filter hover:bg-zinc-200/90 dark:hover:bg-stone-800/80 ${
                        chosenTheme.theme_name === th.name
                          ? "bg-zinc-200/70 dark:bg-stone-800/80"
                          : "bg-neutral-100/70 dark:bg-stone-900/80"
                      }`}
                    >
                      <p>{th.name}</p>
                      <div className="ml-8 flex items-center space-x-4">
                        <p
                          className={`text-xs w-5 h-7 shadow-md rounded-lg ${th.value.holder_bg}`}
                        ></p>
                        <p
                          className={`text-xs w-5 h-7 shadow-md rounded-lg ${th.value.holder_txt.replace(
                            "text",
                            "bg"
                          )}`}
                        ></p>
                        <p
                          className={`text-xs w-5 h-7 shadow-md rounded-lg ${th.value.content_txt.replace(
                            "text",
                            "bg"
                          )}`}
                        ></p>
                        <p
                          className={`text-xs w-5 h-7 shadow-md rounded-lg ${th.value.content_bg}`}
                        ></p>
                      </div>
                      {chosenTheme.theme_name === th.name ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          exit={{ opacity: 0 }}
                          className="absolute right-28"
                        >
                          <FiCheck className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          exit={{ opacity: 0 }}
                          className="hover:text-gray-900 absolute right-28 dark:text-gray-400 rounded-md text-sm"
                        >
                          use
                        </motion.p>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {showPattern && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute filter backdrop-blur-md -left-10 -top-5  max-h-96 w-full p-8 mt-2 overflow-y-auto snap-y "
                >
                  {contentPatterns.map((pttrn, idx) => (
                    <div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setChosenContentPattern(pttrn.value);
                        chosePattern(pttrn.value);
                      }}
                      className={`relative snap-center duration-200 cursor-pointer p-8 flex justify-between filter hover:bg-zinc-200/90 dark:hover:bg-stone-800/80 ${
                        chosenContentPattern === pttrn.value
                          ? "bg-zinc-200/70 dark:bg-stone-800/80"
                          : "bg-neutral-100/70 dark:bg-stone-900/80"
                      }`}
                    >
                      <p className="w-1/2">{pttrn.name}</p>
                      <div
                        className="p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 object-none w-1/2"
                        style={{ backgroundImage: `url(${pttrn.value})` }}
                      >
                        { chosenContentPattern === pttrn.value ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            exit={{ opacity: 0 }}
                            className=""
                          >
                            <FiCheck className="h-5 w-5" />
                          </motion.div>
                        ) : (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            exit={{ opacity: 0 }}
                            className="hover:text-gray-900 h-5 absolute dark:text-gray-400 rounded-md text-sm"
                          >
                            use
                          </motion.p>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>
        <button disabled={canSubmit()} onClick={()=> submit()} className={`block px-8 py-4 w-full font-Inter text-lg mx-auto bg-neutral-700 hover:bg-neutral-800 text-gray-200 dark:text-gray-400 text-center rounded-md ${!canSubmit() && 'cursor-not-allowed'}`}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Submit;
