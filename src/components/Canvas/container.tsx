import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/rootState";
import { canvasModule, Path } from "@/modules/canvasModule";
import { Canvas } from "@/components/Canvas";

const CanvasContainer: FC = () => {
  const dispatch = useDispatch();
  const addPath = useCallback(
    (path: Path) => dispatch(canvasModule.actions.addPath(path)),
    []
  );

  const penColorSelector = useSelector<RootState, string>(
    state => state.canvas.config.pen.color
  );
  const penWidthSelector = useSelector<RootState, number>(
    state => state.canvas.config.pen.width
  );
  const pathsSelector = useSelector<RootState, Path[]>(
    state => state.canvas.paths
  );

  return (
    <Canvas
      width={1100}
      height={600}
      penColor={penColorSelector}
      penWidth={String(penWidthSelector)}
      paths={pathsSelector}
      addPath={addPath}
    />
  );
};

export default CanvasContainer;
