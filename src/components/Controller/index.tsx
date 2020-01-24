import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { canvasModule } from "@/modules/canvasModule";

export const AllClearButton: FC = () => {
  const dispatch = useDispatch();
  const allClear = useCallback(
    () => dispatch(canvasModule.actions.allClearPath()),
    []
  );

  return <button onClick={allClear}>全消し</button>;
};

export const Controller: FC = () => {
  return (
    <Wrapper>
      <AllClearButton />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
`;
