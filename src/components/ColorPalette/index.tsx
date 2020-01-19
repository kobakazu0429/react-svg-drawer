import React, { FC, useContext } from "react";
import styled from "styled-components";
import { ColorButton } from "./button";
import { canvasContext } from "@/contexts/canvasContext";

const colorList = [
  { id: 1, color: "rgba(0, 0, 0, 0.3)" },
  { id: 2, color: "rgba(255, 255, 255, 0.3)" },
  { id: 3, color: "rgba(255, 0, 0, 0.3)" },
  { id: 4, color: "rgba(0, 255, 0, 0.3)" },
  { id: 5, color: "rgba(0, 0, 255, 0.3)" }
];

export const ColorPalette: FC = ({}) => {
  const { pen } = useContext(canvasContext);
  console.log(pen.color);

  return (
    <Wrapper>
      {colorList.map(({ color, id }) => (
        <ColorButton colorCode={color} key={id} changeColor={pen.changeColor} />
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
