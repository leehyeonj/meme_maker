import React, { useEffect, useRef, useState } from "react";
import Color from "./components/Color";
import "./canvas.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { colorState } from "./recoil/color";
import ColorSet from "./components/ColorSet";

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const brushColor = useRecoilValue(colorState);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 800;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 2.5;
    contextRef.current = context;
    setCtx(contextRef.current);
  }, []);

  const startDrawing = (event) => {
    event.persist();
    setIsDrawing(true);
  };
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.strokeStyle = brushColor;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  const onLineWidthChange = (event) => {
    ctx.lineWidth = event.target.value;
  };

  return (
    <div className="body">
      <ColorSet />
      <input
        id="line-width"
        type="range"
        min="1"
        max="10"
        step="0.1"
        onChange={onLineWidthChange}
      />
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
      ></canvas>
    </div>
  );
};

export default Canvas;
