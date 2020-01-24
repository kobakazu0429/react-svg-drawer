import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Point {
  x: number;
  y: number;
}

export interface Path {
  fill: string;
  stroke: string;
  strokeWidth: string;
  d: string;
  id: string;
}

export interface Config {
  pen: {
    color: string;
    width: number;
  };
}

export interface CanvasState {
  config: Config;
  paths: Path[];
}

const initialState: CanvasState = {
  config: {
    pen: {
      color: "rgba(0, 0, 0, 0.3)",
      width: 2
    }
  },
  paths: []
};

export const canvasModule = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    penColor: (state, action: PayloadAction<string>) => {
      state.config.pen.color = action.payload;
    }
  }
});
