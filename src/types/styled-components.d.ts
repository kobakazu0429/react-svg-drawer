import "styled-components";

interface Theme {
  color: {
    brand: string;
    text: {
      primary: string;
      secondary: string;
    };
    accent: string;
    divider: string;
  };
}

declare module "styled-components" {
  interface DefaultTheme extends Theme {}
}
