import { createContext, Dispatch, SetStateAction } from "react";

type SetState<T> = Dispatch<SetStateAction<T>>;

export interface CanvasContext {
  pen: {
    color: string;
    changeColor: SetState<string>;
  };
}

export const canvasContext = createContext<CanvasContext>({} as CanvasContext);
