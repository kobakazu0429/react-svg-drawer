import React, { FC } from "react";
import { ThemeProvider } from "@/theme/ThemeProvider";

const App: FC = () => {
  return (
    <ThemeProvider themeName="default">
      <p>Hello, React World !</p>
    </ThemeProvider>
  );
};

export default App;
