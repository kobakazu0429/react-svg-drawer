import React, { FC, useState } from "react";
import { canvasContext } from "@/contexts/canvasContext";
import { Canvas } from "@/components/Canvas";
import { ColorPalette } from "@/components/ColorPalette";
import { PenType } from "@/components/PenType";

const TopPage: FC = () => {
  const [penColor, setPenColor] = useState("rgba(0, 0, 0, 0.3)");
  const [penWidth, setPenWidth] = useState(2);
  return (
    <div>
      <p>This is Top Page</p>
      <canvasContext.Provider
        value={{
          pen: {
            color: penColor,
            changeColor: setPenColor,
            width: penWidth,
            changeWidth: setPenWidth
          }
        }}
      >
        <ColorPalette />
        <PenType />
        <Canvas width={1100} height={600} />
      </canvasContext.Provider>
    </div>
  );
};

export default TopPage;
