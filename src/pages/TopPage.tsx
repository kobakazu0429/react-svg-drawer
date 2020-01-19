import React, { FC } from "react";
import { Canvas } from "@/components/Canvas";

const TopPage: FC = () => (
  <div>
    <p>This is Top Page</p>
    <Canvas width={1100} height={600} />
  </div>
);

export default TopPage;
