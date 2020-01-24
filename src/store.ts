import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "@/modules/rootState";

export const setupStore = () => {
  const middlewares = [...getDefaultMiddleware()];
  let devTools = false;

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
    devTools = true;
  }

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools
  });
};
