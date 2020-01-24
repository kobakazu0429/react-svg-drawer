import { combineReducers } from "@reduxjs/toolkit";

import { canvasModule, CanvasState } from "@/modules/canvasModule";

export interface RootState {
  canvas: CanvasState;
}

export const rootReducer = combineReducers({
  canvas: canvasModule.reducer
});
