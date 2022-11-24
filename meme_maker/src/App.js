import "./App.css";
import Canvas from "./components/Canvas";
import { RecoilRoot } from "recoil";
import MouseCursor from "./components/MouseCursor";

function App() {
  return (
    <RecoilRoot>
      <Canvas />
    </RecoilRoot>
  );
}

export default App;
