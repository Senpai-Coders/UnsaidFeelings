import React, { useState, useEffect } from "react";

import Feelings from "../Component/Feelings";
import { api } from "../Utils";

const Submit = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [chosenTheme, setChosenTheme] = useState();
  const [chosenHolderTexture, setChosenHolderTexture] = useState();
  const [chosenContentPattern, setChosenContentPattern] = useState();

  const [themes, setThemes] = useState([
    {
      theme_name: "CreamyWhite",
      holder_txt: "text-neutral-600",
      holder_bg: "bg-zinc-100",
      holder_texture: "",
      content_bg: "bg-stone-50",
      content_txt: "text-neutral-600",
      content_pattern:
        "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
    },
    {
      theme_name: "DarkVoid",
      holder_txt: "text-neutral-50",
      holder_bg: "bg-neutral-900",
      holder_texture: "",
      content_bg: "bg-black",
      content_txt: "text-neutral-50",
      content_pattern:
        "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
    },
  ]);
  const [holderTextures, setHolderTextures] = useState([]);
  const [contentPatterns, setContentPatterns] = useState([]);

  const init = async () => {
    try {
      const THEMES = await api.get("/getAppSettings", { criteria: { key: "Themes" } });
      const TEXTURE = await api.get("/getAppSettings", { criteria: { key: "Textures" } });
      const PATTERNS = await api.get("/getAppSettings", { criteria: { key: "Patterns" } });

      setThemes(THEMES.data.appOption)
      setHolderTextures(TEXTURE.data.appOption)
      setContentPatterns(PATTERNS.data.appOption)

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
      init()
  }, []);

  return (
    <div className="mt-16 w-full flex h-screen  text-gray-800 dark:text-gray-300">
      <div className="w-full mt-8 md:mt-0 sm:w-1/2 md:4/6 lg:w-1/2 h-full flex items-center justify-center mx-auto">
          <div className="mt-8 md:mt-0 w-full mx-4 sm:1/2 md:3/4 lg:w-4/6">
            <Feelings mode={0} setTo={ setTo } setFrom={ setFrom } setMessage={ setMessage } data={{to, from, message, theme : themes[0]}} />
          </div>
      </div>
    </div>
  );
};

export default Submit;
