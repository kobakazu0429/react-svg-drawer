import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { canvasModule } from "@/modules/canvasModule";

import { ColorButton } from "./button";

const colorList = [
  { id: 1, color: "rgba(0, 0, 0, 0.3)" },
  { id: 2, color: "rgba(255, 255, 255, 0.3)" },
  { id: 3, color: "rgba(255, 0, 0, 0.3)" },
  { id: 4, color: "rgba(0, 255, 0, 0.3)" },
  { id: 5, color: "rgba(0, 0, 255, 0.3)" }
];

export const ColorPalette: FC = ({}) => {
  const dispatch = useDispatch();
  const changePenColor = useCallback(
    (color: string) => dispatch(canvasModule.actions.penColor(color)),
    []
  );

  return (
    <Wrapper>
      {colorList.map(({ color, id }) => (
        <ColorButton colorCode={color} key={id} changeColor={changePenColor} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  div {
    width: 50px;
  }
`;
