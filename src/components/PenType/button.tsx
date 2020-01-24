import React, { FC } from "react";
import styled from "styled-components";
import { CanvasState } from "@/modules/canvasModule";

interface Props {
  width: CanvasState["config"]["pen"]["width"];
  changeWidth: (width: number) => any;
}

export const WidthButton: FC<Props> = ({ width, changeWidth }) => {
  return <Button onClick={_e => changeWidth(width)}>{width}</Button>;
};

const Button = styled.div`
  height: 100%;
  border-radius: 50%;
  border: ${({ theme }) => `1px solid ${theme.color.divider}`};
  display: flex;
  justify-content: center;
  align-items: center;
`;
