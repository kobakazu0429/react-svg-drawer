import React, { FC } from "react";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { createRouter } from "@/routes";
import TopPage from "@/pages/TopPage";

const routes = [
  {
    exact: true,
    path: "/",
    component: TopPage
  }
];

const Router = createRouter({ routes });

const App: FC = () => {
  return <ThemeProvider themeName="default">{Router}</ThemeProvider>;
};

export default App;
