import "./App.css";
import Canvas from "./Canvas";
import { RecoilRoot } from "recoil";
import MouseCursor from "./MouseCursor";

function App() {
  return (
    <RecoilRoot>
      <MouseCursor />
      <Canvas />
    </RecoilRoot>
  );
}

export default App;
