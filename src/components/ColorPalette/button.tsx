import React, { FC } from "react";
import styled from "styled-components";
import { CanvasContext } from "@/contexts/canvasContext";

interface Props {
  colorCode: string;
  changeColor: CanvasContext["pen"]["changeColor"];
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
