import React, { FC } from "react";
import styled from "styled-components";
import { CanvasState } from "@/modules/canvasModule";

interface Props {
  colorCode: CanvasState["config"]["pen"]["color"];
  changeColor: (color: string) => any;
}

export const ColorButton: FC<Props> = ({ colorCode, changeColor }) => {
  return (
    <Button colorCode={colorCode} onClick={_e => changeColor(colorCode)} />
  );
};

const Button = styled.div<{ colorCode: string }>`
  height: 100%;
  border-radius: 50%;
  background-color: ${({ colorCode }) => colorCode};
  border: ${({ theme }) => `1px solid ${theme.color.divider}`};
`;
