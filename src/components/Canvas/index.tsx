import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
  PointerEvent
} from "react";
import styled from "styled-components";
import { ulid } from "ulid";
import { canvasContext } from "@/contexts/canvasContext";

interface Props {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

interface Path {
  fill: string;
  stroke: string;
  strokeWidth: string;
  d: string;
  id: string;
}

const bufferSize = 4;
let drawingPathElement: SVGPathElement | null = null;
let drawingPath: Path | null = null;
let buffer: Point[] = [];
let strPath: string = "";

// based on https://stackoverflow.com/a/40700068
export const Canvas: FC<Props> = ({ width, height }) => {
  const { pen } = useContext(canvasContext);
  const canvasRef = useRef<SVGSVGElement>(null);
  const [rect, setRect] = useState<DOMRectReadOnly>();
  const [paths, setPaths] = useState<Path[]>([]);

  useEffect(() => {
    canvasRef.current && setRect(canvasRef.current!.getBoundingClientRect());
  }, [canvasRef.current]);

  const handlePointerdown = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      drawingPathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      drawingPathElement.setAttribute("fill", "none");
      drawingPathElement.setAttribute("stroke", pen.color);
      drawingPathElement.setAttribute("stroke-width", String(pen.width));
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
        stroke: pen.color,
        strokeWidth: String(pen.width),
        d: strPath,
        id: ulid()
      };
    },
    [canvasRef.current, rect, pen.color, pen.width]
  );

  const handlePointermove = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      if (e.pointerType === "mouse" && !drawingPathElement) return;
      // if (!path) return;

      const pt = getMousePosition(e);
      if (!pt) return;
      appendToBuffer(pt);
      updateSvgPath();
    },
    [canvasRef.current, rect]
  );

  const handlePointerup = useCallback(
    (_e: PointerEvent<SVGSVGElement>) => {
      // canvasRef.current &&
      //   canvasRef.current.removeChild(canvasRef.current.lastElementChild!);
      drawingPath && setPaths([...paths, drawingPath]);
      drawingPath = null;
      drawingPathElement = null;
      const removableDomPath = document.getElementById("removableDom");
      canvasRef.current &&
        removableDomPath &&
        canvasRef.current.removeChild(removableDomPath);
    },
    [canvasRef.current, paths, rect]
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
    </StyledCanvas>
  );
};

const StyledCanvas = styled.svg`
  border: 1px solid;
  margin-top: 4px;
  margin-left: 4px;
  cursor: default;
`;
