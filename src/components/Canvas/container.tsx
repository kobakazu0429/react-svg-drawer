import React, { FC, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/rootState";
import { canvasModule, Path, PenType } from "@/modules/canvasModule";
import { Canvas } from "@/components/Canvas";

const CanvasContainer: FC = () => {
  const dispatch = useDispatch();
  const addPath = useCallback(
    (path: Path) => dispatch(canvasModule.actions.addPath(path)),
    []
  );
  const addEraserPath = useCallback(
    (path: Path) => dispatch(canvasModule.actions.addEraserPath(path)),
    []
  );
  const PathClear = useCallback(
    () => dispatch(canvasModule.actions.PathClear()),
    []
  );

  const penTypeSelector = useSelector<RootState, PenType>(
    state => state.canvas.config.penType
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
  const [eraserConfig, setEraserConfig] = useState({
    x: 10,
    y: 20,
    enabled: true
  });
  useEffect(() => {
    setEraserConfig(prev => ({ ...prev, enabled: penTypeSelector !== "Pen" }));
  }, [penTypeSelector]);

  return (
    <Canvas
      width={1100}
      height={600}
      penColor={penColorSelector}
      penWidth={String(penWidthSelector)}
      paths={pathsSelector}
      addPath={addPath}
      penType={penTypeSelector}
      eraserConfig={eraserConfig}
      setEraserConfig={setEraserConfig}
      addEraserPath={addEraserPath}
      PathClear={PathClear}
    />
  );
};

export default CanvasContainer;
