import { useEffect, useState } from "react";

export const useThemeState = () => {
  const getSavedTheme = () => {
      const theme = localStorage.getItem('theme')
      console.log("Owshit, it get's ", theme)
      if(!theme){
          localStorage.setItem('thene', 'light')
          return 'light'
      }
      return theme
  }

  const [theme, setTheme] = useState('light');
  useEffect(
    () => {
      const root = window.document.documentElement;
      root.classList.remove('light');
      root.classList.remove('dark')
      root.classList.add(theme);
      setTheme(getSavedTheme())
    },
    [theme],
  );
  return [theme, setTheme];
};