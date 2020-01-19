import React, { FC, useState } from "react";
import { ColorPalette } from "@/components/ColorPalette";
import { Canvas } from "@/components/Canvas";
import { canvasContext } from "@/contexts/canvasContext";

const TopPage: FC = () => {
  const [penColor, setPenColor] = useState("rgba(0, 0, 0, 0.3)");
  return (
    <div>
      <p>This is Top Page</p>
      <canvasContext.Provider
        value={{ pen: { color: penColor, changeColor: setPenColor } }}
      >
        <ColorPalette />
        <Canvas width={1100} height={600} />
      </canvasContext.Provider>
    </div>
  );
};

export default TopPage;
