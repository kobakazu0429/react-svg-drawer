import React, { FC } from "react";
import styled from "styled-components";

import { AllClearButton } from "./AllClearButton";
import { DLButton } from "./DLButton";
import { SelectPenType } from "./SelectPenType";

export const Controller: FC = () => {
  return (
    <Wrapper>
      <SelectPenType />
      <AllClearButton />
      <div>
        <DLButton />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;
`;
