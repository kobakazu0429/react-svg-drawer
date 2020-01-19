import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  useRef,
  PointerEvent
} from "react";
import styled from "styled-components";

interface Props {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

const strokeWidth = "2";
const bufferSize = 4;
let path: SVGPathElement | null = null;
let buffer: Point[] = [];
let strPath = "";

export const Canvas: FC<Props> = ({ width, height }) => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [rect, setRect] = useState<any>();

  useEffect(() => {
    canvasRef.current && setRect(canvasRef.current!.getBoundingClientRect());
  }, [canvasRef.current]);

  const handlePointerdown = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#000");
      path.setAttribute("stroke-width", strokeWidth);
      buffer = [];
      const pt = getMousePosition(e);
      appendToBuffer(pt);
      strPath = `M${pt.x} ${pt.y}`;
      path.setAttribute("d", strPath);
      canvasRef.current!.appendChild(path);
    },
    [canvasRef.current, rect]
  );

  const handlePointermove = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      if (e.pointerType === "mouse" && !path) return;
      console.log("called handlePointermove");
      // if (!path) return;

      const pt = getMousePosition(e);
      appendToBuffer(pt);
      updateSvgPath();
    },
    [canvasRef.current, rect]
  );

  const handlePointerup = useCallback(
    (_e: PointerEvent<SVGSVGElement>) => {
      path = null;
    },
    [canvasRef.current, rect]
  );

  const getMousePosition = (e: PointerEvent<SVGSVGElement>): Point => ({
    x: e.pageX - rect.left,
    y: e.pageY - rect.top
  });

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

  const updateSvgPath = () => {
    let pt = getAveragePoint(0);
    if (!pt) return;

    // Get the smoothed part of the path that will not change
    strPath += ` L${pt.x} ${pt.y}`;

    // Get the last part of the path (close to the current mouse position)
    // This part will change if the mouse moves again
    let tmpPath = "";
    for (let offset = 2; offset < buffer.length; offset += 2) {
      pt = getAveragePoint(offset);
      tmpPath += ` L${pt!.x} ${pt!.y}`;
    }

    // Set the complete current path coordinates
    if (!path) return;
    path.setAttribute("d", strPath + tmpPath);
  };

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
    ></StyledCanvas>
  );
};

const StyledCanvas = styled.svg`
  border: 1px solid;
  margin-top: 4px;
  margin-left: 4px;
  cursor: default;
`;
