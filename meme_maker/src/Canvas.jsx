import React, { useEffect, useRef, useState } from "react";
import Color from "./components/Color";
import "./canvas.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { colorState } from "./recoil/color";
import ColorSet from "./components/ColorSet";
import { RGBToHex } from "./RGBToHex";

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [isColorpicker, setIsColorPicker] = useState(false);
  const [brushColor, setBrushColor] = useRecoilState(colorState);
  const textRef = useRef();

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

  const onCanvasClick = (e) => {
    if (isColorpicker) {
      const cv = document.querySelector(".canvas");
      const bounding = cv.getBoundingClientRect();
      const x = e.clientX - bounding.left;
      const y = e.clientY - bounding.top;
      const pixel = ctx.getImageData(x, y, 1, 1);
      const data = pixel.data;

      const rgb = RGBToHex(data[0], data[1], data[2]);

      setBrushColor(rgb);
      setIsColorPicker(false);
    }

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

  const onCanvasDoubleClick = (event) => {
    if (textRef.current.value) {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.font = "48px serif";
      ctx.fillText(
        textRef.current.value,
        event.nativeEvent.offsetX,
        event.nativeEvent.offsetY
      );
      ctx.restore();
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
      ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
  };

  const onSaveImage = () => {
    const cv = document.querySelector(".canvas");
    try {
      const url = cv.toDataURL();

      let a = document.createElement("a");
      a.href = url;
      a.download = "myDrawing.png";
      a.click();
    } catch (e) {
      console.log(e);
    }
  };

  const onClickColorPicker = () => {
    setIsColorPicker(true);
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
      <input
        ref={textRef}
        placeholder="텍스트를 입력하고 화면을 더블클릭하세요"
      ></input>
      <input type="file" onChange={onFileChange} accept="image/*"></input>
      <button onClick={onSaveImage}>사진 저장하기</button>
      <button onClick={onClickColorPicker}>스포이드</button>
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
        onClick={onCanvasClick}
        onDoubleClick={onCanvasDoubleClick}
      ></canvas>
    </div>
  );
};

export default Canvas;
