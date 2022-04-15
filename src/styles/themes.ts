import { DefaultTheme } from "styled-components";
import bgLightDesktop from "../assets/bg-desktop-light.jpg";
import bgDarkDesktop from "../assets/bg-desktop-dark.jpg";
import sunIcon from "../assets/icon-sun.svg";
import moonIcon from "../assets/icon-moon.svg";

export const LightTheme: DefaultTheme = {
  color: "hsl(235, 19%, 35%)",
  checkedColor: "hsl(236, 33%, 92%)",
  secondColor: "hsl(234, 11%, 52%)",
  borderColor: "hsl(233, 11%, 84%)",
  bkColor: "hsl(0, 0%, 98%)",
  itemBkColor: "#fff",
  bkImg: bgLightDesktop,
  weatherIcon: moonIcon,
};

export const DarkTheme: DefaultTheme = {
  color: "hsl(234, 39%, 85%)",
  checkedColor: "hsl(233, 14%, 35%)",
  secondColor: "hsl(234, 11%, 52%)",
  borderColor: "hsl(234, 11%, 52%)",
  bkColor: "hsl(235, 21%, 11%)",
  itemBkColor: "hsl(235, 24%, 19%)",
  bkImg: bgDarkDesktop,
  weatherIcon: sunIcon,
};
