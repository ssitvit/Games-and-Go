import "./App.css";
import Board from "./components/board/Board";
import Game from "../pause_resume"

const App = () => (
  <div className="fifpuzzle-App">
    <Board />
    <Game/>
  </div>
);

export default App;
