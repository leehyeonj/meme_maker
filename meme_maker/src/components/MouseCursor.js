import React from "react";
import useMousePosition from "../hooks/useMousePosition";
import "./DotRing.css";

const MouseCursor = () => {
  const { x, y } = useMousePosition();
  return (
    <>
      {/* 2. */}
      <div style={{ left: `${x}px`, top: `${y}px` }} className="ring"></div>
      {/* 3. */}
      <div className="dot" style={{ left: `${x}px`, top: `${y}px` }}>
        📌
      </div>
    </>
  );
};

export default MouseCursor;
