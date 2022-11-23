import React from "react";
import Color from "./Color";
import { colorSet, colorState } from "../recoil/color";
import { useSetRecoilState } from "recoil";

const ColorSet = () => {
  const setBrushColor = useSetRecoilState(colorState);
  const onColorChange = (event) => {
    setBrushColor(event.target.value);
  };
  return (
    <div className="color-options">
      <input type="color" id="color" onChange={onColorChange} />
      {colorSet.map((p) => {
        return <Color color={p} key={p} />;
      })}
    </div>
  );
};

export default ColorSet;
