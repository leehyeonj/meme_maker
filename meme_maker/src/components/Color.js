import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { colorState } from "../recoil/color";

const Color = (props) => {
  const setBrushColor = useSetRecoilState(colorState);

  return (
    <div
      style={{
        backgroundColor: props.color,
        width: 30,
        height: 30,
        borderRadius: 30,
      }}
      onClick={() => {
        setBrushColor(props.color);
      }}
    ></div>
  );
};

export default Color;
