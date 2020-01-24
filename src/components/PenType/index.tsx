import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { canvasModule } from "@/modules/canvasModule";

import { WidthButton } from "./button";

const widthList = [
  { id: 1, width: 1 },
  { id: 2, width: 2 },
  { id: 3, width: 4 },
  { id: 4, width: 8 },
  { id: 5, width: 16 }
];

export const PenType: FC = ({}) => {
  const dispatch = useDispatch();
  const changePenWidth = useCallback(
    (width: number) => dispatch(canvasModule.actions.penWidth(width)),
    []
  );

  return (
    <Wrapper>
      {widthList.map(({ width, id }) => (
        <WidthButton width={width} key={id} changeWidth={changePenWidth} />
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
