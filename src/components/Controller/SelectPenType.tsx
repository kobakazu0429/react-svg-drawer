import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/rootState";
import { canvasModule, PenType } from "@/modules/canvasModule";

const erasers: PenType[] = ["Pen", "Path" /*, "Partly" */];

export const SelectPenType: FC = () => {
  const dispatch = useDispatch();
  const changePenType = useCallback(
    (type: PenType) => dispatch(canvasModule.actions.penType(type)),
    []
  );
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      changePenType(e.target.value as PenType);
    },
    []
  );
  const penTypeSelector = useSelector<RootState, PenType>(
    state => state.canvas.config.penType
  );

  return (
    <Wrapper>
      <select value={penTypeSelector} onChange={handleChange}>
        {erasers.map(v => (
          <option value={v} key={`eraser-key-${v}`}>
            {v}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
`;
