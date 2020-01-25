import React, { FC, useCallback } from "react";
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
