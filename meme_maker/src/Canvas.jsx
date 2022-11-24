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
  const [isFilling, setIsFilling] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [brushColor, setBrushColor] = useRecoilState(colorState);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 800;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 800;

    const context = canvas.getContext("2d");

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
        ctx.strokeStyle = isErasing ? "#ffffff" : brushColor;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  const onLineWidthChange = (event) => {
    ctx.lineWidth = event.target.value;
  };

  const onClickFillBtn = () => {
    setIsFilling(!isFilling);
    setIsErasing(false);
  };

  const onCanvasClick = () => {
    ctx.fillStyle = brushColor;
    //채우기 했을 때 지우개
    if (isFilling && !isErasing) {
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  };

  const onEraserClick = () => {
    setIsErasing(true);
  };

  const onResetCanvas = () => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
      <button onClick={onClickFillBtn}>{isFilling ? "stroke" : "fill"}</button>
      <button onClick={onEraserClick}>지우개</button>
      <button onClick={onResetCanvas}>reset</button>
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
        onClick={onCanvasClick}
      ></canvas>
    </div>
  );
};

export default Canvas;
