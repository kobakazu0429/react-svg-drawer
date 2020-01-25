import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  useRef,
  PointerEvent,
  Dispatch,
  SetStateAction
} from "react";
import styled from "styled-components";
import { ulid } from "ulid";

import { Path, Point, PenType } from "@/modules/canvasModule";

interface Eraser {
  x: number;
  y: number;
  enabled: boolean;
}

interface Props {
  width: number;
  height: number;
  penColor: string;
  penWidth: string;
  paths: Path[];
  addPath: (path: Path) => void;
  penType: PenType;
  eraserConfig: Eraser;
  setEraserConfig: Dispatch<SetStateAction<Eraser>>;
  addEraserPath: (path: Path) => void;
  PathClear: () => void;
}

const bufferSize = 4;
let drawingPathElement: SVGPathElement | null = null;
let drawingPath: Path | null = null;
let buffer: Point[] = [];
let strPath: string = "";

// based on https://stackoverflow.com/a/40700068
export const Canvas: FC<Props> = ({
  width,
  height,
  penColor,
  penWidth,
  paths,
  addPath,
  penType,
  eraserConfig,
  setEraserConfig,
  addEraserPath,
  PathClear
}) => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [rect, setRect] = useState<DOMRectReadOnly>();

  useEffect(() => {
    canvasRef.current && setRect(canvasRef.current!.getBoundingClientRect());
  }, [canvasRef.current]);

  const handlePointerdown = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      drawingPathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      const _penColor =
        penType !== "Pen" ? "rgba(255, 255, 255, 0.8)" : penColor;

      drawingPathElement.setAttribute("fill", "none");
      drawingPathElement.setAttribute("stroke", _penColor);
      drawingPathElement.setAttribute("stroke-width", penWidth);
      buffer = [];
      const pt = getMousePosition(e);
      if (!pt) return;
      appendToBuffer(pt);
      strPath = `M${pt.x} ${pt.y}`;
      drawingPathElement.setAttribute("d", strPath);
      drawingPathElement.setAttribute("id", "removableDom");
      canvasRef.current!.appendChild(drawingPathElement);
      drawingPath = {
        fill: "none",
        stroke: _penColor,
        strokeWidth: penWidth,
        d: strPath,
        id: ulid()
      };
    },
    [canvasRef.current, rect, penType, penColor, penWidth]
  );

  const handlePointermove = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      const pt = getMousePosition(e);
      if (!pt) return;
      if (penType !== "Pen") {
        setEraserConfig(_prev => ({ x: pt.x, y: pt.y, enabled: true }));
      }
      if (e.pointerType === "mouse" && !drawingPathElement) return;
      // if (!path) return;

      appendToBuffer(pt);
      updateSvgPath();
    },
    [canvasRef.current, rect, penType]
  );

  const handlePointerup = useCallback(
    (_e: PointerEvent<SVGSVGElement>) => {
      // canvasRef.current &&
      //   canvasRef.current.removeChild(canvasRef.current.lastElementChild!);
      if (penType !== "Pen") {
        drawingPath && addEraserPath(drawingPath);
        PathClear();
      }
      if (penType === "Pen") {
        drawingPath && addPath(drawingPath);
      }
      setEraserConfig(prev => ({ ...prev, enabled: false }));
      drawingPath = null;
      drawingPathElement = null;
      const removableDomPath = document.getElementById("removableDom");
      canvasRef.current &&
        removableDomPath &&
        canvasRef.current.removeChild(removableDomPath);
    },
    [canvasRef.current, rect, penType, addPath, addEraserPath]
  );

  const getMousePosition = useCallback(
    (e: PointerEvent<SVGSVGElement>): Point | undefined => {
      if (!rect) return;

      return {
        x: e.pageX - rect.left,
        y: e.pageY - rect.top
      };
    },
    [rect]
  );

  const appendToBuffer = useCallback((pt: Point) => {
    buffer.push(pt);

    while (buffer.length > bufferSize) {
      buffer.shift();
    }
  }, []);

  const getAveragePoint = useCallback((offset: number) => {
    const len = buffer.length;
    if (len % 2 === 1 || len >= bufferSize) {
      let totalX = 0;
      let totalY = 0;
      let count = 0;
      for (let i = offset; i < len; i++) {
        const pt = buffer[i];
        totalX += pt.x;
        totalY += pt.y;
        count++;
      }
      return {
        x: totalX / count,
        y: totalY / count
      };
    }
    return null;
  }, []);

  const updateSvgPath = useCallback(() => {
    let pt = getAveragePoint(0);
    if (!pt) return;

    // Get the smoothed part of the path that will not change
    strPath += ` L${pt.x} ${pt.y}`;

    // Get the last part of the path (close to the current mouse position)
    // This part will change if the mouse moves again
    let tmpPath = "";
    for (let offset = 2; offset < buffer.length; offset += 2) {
      pt = getAveragePoint(offset);
      if (!pt) return;
      tmpPath += ` L${pt.x} ${pt.y}`;
    }

    // Set the complete current path coordinates
    if (!drawingPathElement || !drawingPath) return;
    drawingPathElement.setAttribute("d", strPath + tmpPath);
    drawingPath = { ...drawingPath, d: strPath + tmpPath };
  }, []);

  return (
    <StyledCanvas
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      width={`${width}px`}
      height={`${height}px`}
      viewBox={`0 0 ${width} ${height}`}
      enableBackground={`new 0 0 ${width} ${height}`}
      xmlSpace="preserve"
      ref={canvasRef}
      onPointerDown={handlePointerdown}
      onPointerMove={handlePointermove}
      onPointerUp={handlePointerup}
    >
      {paths && paths.map(p => <path {...p} key={p.id} />)}
      {eraserConfig.enabled && (
        <Eraser cx={eraserConfig.x} cy={eraserConfig.y} r={penWidth} />
      )}
    </StyledCanvas>
  );
};

const StyledCanvas = styled.svg`
  border: 1px solid;
  margin-top: 4px;
  margin-left: 4px;
  cursor: default;
`;

const Eraser = styled.circle`
  fill: rgba(255, 255, 255, 0.4);
  stroke: ${({ theme }) => theme.color.divider};
  stroke-width: 1.5;
`;
