import React, { FC, useCallback } from "react";
import Canvg from "canvg";
import styled from "styled-components";

const convertCanvasToImage = (canvas: HTMLCanvasElement) => {
  const image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
};

export const DLButton: FC = () => {
  const handleClick = useCallback(() => {
    const svg = document.querySelector("svg");
    const canvas = document.querySelector("canvas");
    if (!svg || !canvas) {
      alert("現在ダウンロードできません");
      return;
    }
    const ctx = canvas.getContext("2d")!;
    const v = Canvg.fromString(ctx, svg.outerHTML);
    v.start();
    const image = convertCanvasToImage(canvas);
    const anchor = document.createElement("a");
    anchor.setAttribute("href", image.src);
    anchor.setAttribute("download", "image.png");
    anchor.click();
  }, []);

  return (
    <>
      <HiddenCanvas />
      <button onClick={handleClick}>DL</button>
    </>
  );
};

const HiddenCanvas = styled.canvas`
  display: none;
`;
