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

interface ConvertedPath extends Weaken<Path, "d"> {
  d: number[][];
}

export type PenType = "Pen" | "Path" | "Partly";

export interface Config {
  pen: {
    color: string;
    width: number;
  };
  penType: PenType;
}

export interface CanvasState {
  config: Config;
  paths: Path[];
  eraserPath: Path | null;
}

const initialState: CanvasState = {
  config: {
    pen: {
      color: "rgba(0, 0, 0, 0.3)",
      width: 2
    },
    penType: "Pen"
  },
  paths: [],
  eraserPath: null
};

// ToDo: refactor
const converterPath = (array: Path[]) => {
  const splited = array.map(v => ({ ...v, d: v.d.split(" ") }));

  const coord = splited.map(x => ({
    ...x,
    d: x.d
      .map((_v, i, arr) =>
        i % 2 === 1 ? [arr[i - 1].slice(1), arr[i]].map(Number) : null
      )
      .filter(v => v)
  })) as ConvertedPath[];
  return coord;
};

const converterEraser = (path: Path) => {
  const coord = {
    ...path,
    d: path.d
      .split(" ")
      .map((_v, i, arr) =>
        i % 2 === 1 ? [arr[i - 1].slice(1), arr[i]].map(Number) : null
      )
      .filter(v => v)
  } as ConvertedPath;

  return coord;
};

export const canvasModule = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    penType: (state, action: PayloadAction<PenType>) => {
      state.config.penType = action.payload;
    },
    penColor: (state, action: PayloadAction<string>) => {
      state.config.pen.color = action.payload;
    },
    penWidth: (state, action: PayloadAction<number>) => {
      state.config.pen.width = action.payload;
    },
    addPath: (state, action: PayloadAction<Path>) => {
      state.paths.push(action.payload);
    },
    allClearPath: (state, _action: PayloadAction<void>) => {
      state.paths = [];
    },
    // ToDo: refactor
    PathClear: (state, _action: PayloadAction<void>) => {
      if (!state.eraserPath) return;
      const target = converterPath(state.paths);
      const eraser = converterEraser(state.eraserPath);
      const r = Number(eraser.strokeWidth);
      const result = Array.from(
        new Set(
          eraser.d
            .map(e =>
              target.find(x => {
                const w = Number(x.strokeWidth);
                return x.d.find(
                  v =>
                    v[0] + w >= e[0] - r &&
                    v[0] - w <= e[0] + r &&
                    v[1] + w >= e[1] - r &&
                    v[1] - w <= e[1] + r
                );
              })
            )
            .filter(v => v)
        )
      );

      if (!result) return;
      result.forEach(path => {
        if (!path) return;
        state.paths = state.paths.filter(v => v.id !== path.id);
      });
    },
    addEraserPath: (state, action: PayloadAction<Path>) => {
      state.eraserPath = action.payload;
    }
  }
});
