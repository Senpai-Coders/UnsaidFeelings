import React, { useState, useEffect } from "react";

import Loading from "../Component/Loading";
import Feelings from "../Component/Feelings";
import { api } from "../Utils";

const Submit = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [chosenTheme, setChosenTheme] = useState( {
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

  const [loading, setLoading] = useState(true);

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
      setLoading(false)
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const getLines = (id) => {
    let text = document.getElementById(id).value;
    let lines = text.split(/\r|\r\n|\n/);
    let count = lines.length;
    console.log(count);
    return count > 8;
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="w-full flex h-screen mt-12 ">
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
      <div className="relative w-1/2 h-full p-4 dark:text-gray-200 text-gray-700 font-Yomogi">
        <div className="">
          <p className="text-lg"></p>
          <div className="mt-4 mx-auto space-y-4 flex flex-col">
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
            <textarea
              id="feelingsInput"
              value={message}
              rows={8}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="say it here"
              className="indent-6 w-full px-4 py-2 bg-transparent border-b outline-none font-semibold"
            />
          </div>
          <p className="font-bold pt-8">Themes</p>
          {
              loading && <div className="">
                <Loading />
                <p className="text-xs text-center animate-pulse">Requesting more themes from database</p>
            </div>
          }
          <div className="space-y-2 max-h-72 p-8 mt-2 overflow-y-auto snap-y ">
            {themes.map((th, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setChosenTheme(th.value);
                }}
                className={`cursor-pointer w-full p-8 flex space-x-4 justify-between bg-neutral-100 hover:bg-zinc-200 dark:bg-stone-800`}
              >
                <p>{th.name}</p>
                <div className="flex items-center space-x-4">
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
                <p
                  className={`bg-neutral-100  dark:bg-neutral-800 hover:text-gray-900 dark:text-gray-400 px-4 py-1 rounded-md text-sm ${
                    chosenTheme.theme_name === th.name && "font-semibold"
                  }`}
                >
                  {chosenTheme.theme_name === th.name ? "Chosen" : "use"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
