import { useEffect, useState } from "react";

export const useThemeState = () => {
  const [theme, setTheme] = useState("light");
  useEffect(
    () => {
      const root = window.document.documentElement;
      root.classList.remove('light');
      root.classList.remove('dark')
      root.classList.add(theme);
    },
    [theme],
  );
  return [theme, setTheme];
};
