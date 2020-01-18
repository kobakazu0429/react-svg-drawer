import React, { FC } from "react";
import { ThemeProvider } from "@/theme/ThemeProvider";

const App: FC = () => {
  return <ThemeProvider themeName="default">{Router}</ThemeProvider>;
};

export default App;
