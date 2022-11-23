import { atom } from "recoil";

const canvasState = atom({
  key: "canvasState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
