import { useCallback, useState } from "react";
import { DefaultTheme } from "styled-components";
import { DarkTheme, LightTheme } from "../styles/themes";

export default function useTheme(defaultTheme: DefaultTheme) {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const toggleTheme = useCallback(() => {
    if (currentTheme === LightTheme) setCurrentTheme(DarkTheme);
    else setCurrentTheme(LightTheme);
  }, [currentTheme]);

  const isLightTheme = useCallback(
    () => currentTheme === LightTheme,
    [currentTheme]
  );

  return { toggleTheme, currentTheme, isLightTheme };
}
