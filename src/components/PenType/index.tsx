import React, { FC, useContext } from "react";
import styled from "styled-components";
import { canvasContext } from "@/contexts/canvasContext";
import { WidthButton } from "./button";

const colorList = [
  { id: 1, width: 1 },
  { id: 2, width: 2 },
  { id: 3, width: 4 },
  { id: 4, width: 8 },
  { id: 5, width: 16 }
];

export const PenType: FC = ({}) => {
  const { pen } = useContext(canvasContext);
  console.log(pen.color);

  return (
    <Wrapper>
      {colorList.map(({ width, id }) => (
        <WidthButton width={width} key={id} changeWidth={pen.changeWidth} />
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
