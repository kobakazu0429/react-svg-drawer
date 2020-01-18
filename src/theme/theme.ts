import { DefaultTheme } from "styled-components";

export type ThemeName = "default";

const theme: DefaultTheme = {
  color: {
    brand: "#0F4C81",
    text: {
      primary: "#212121",
      secondary: "#fefefe"
    },
    accent: "#7fffd4",
    divider: "#BDBDBD"
  }
};

export const themes = {
  default: theme
};
