import { atom } from "recoil";

export const colorSet = [
  "#1abc9c",
  "#3498db",
  "#34495e",
  "#27ae60",
  "#8e44ad",
  "#f1c40f",
  "#e74c3c",
  "#95a5a6",
  "#d35400",
  "#2ecc71",
  "#e67e22",
];

export const colorState = atom({
  key: "colorState",
  default: "black",
});
