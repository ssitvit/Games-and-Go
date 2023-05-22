import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../Homepage/Homepage/Homepage";
import Tictactoe from "../Games/Tictactoe/tictactoe";
import Ninetynine from "../Games/Ninetynine/ninetynine";
import Memory from "../Games/Memory/memory";
import TriviaGame from "../Games/Trivia/quiz";
<<<<<<< HEAD
import BrickBreakout from "../Games/BrickBreakout/BrickBreakout";
function AllRoutes(){
    return (
        <Routes>
          {/* Add all the routes with the right path here after importing them  */}
        <Route path="/" element={<Homepage />} />
        <Route path="/Tic" element={<Tictactoe />} />
        <Route path="/99" element={<Ninetynine />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/trivia" element={<TriviaGame />} />
        <Route path="/brick-breakout" element={<BrickBreakout />} />
      </Routes>
    )
=======
import Simonsays from "../Games/Simonsays/simon";
import Fifteenpuzzle from "../Games/15Puzzle/Fifteenpuzzle";

function AllRoutes() {
  return (
    <Routes>
      {/* Add all the routes with the right path here after importing them  */}
      <Route path="/" element={<Homepage />} />
      <Route path="/Tic" element={<Tictactoe />} />
      <Route path="/99" element={<Ninetynine />} />
      <Route path="/memory" element={<Memory />} />
      <Route path="/trivia" element={<TriviaGame />} />
      <Route path="15puzzle" element={<Fifteenpuzzle />} />
      <Route path="/simon" element={<Simonsays />} />
    </Routes>
  );
>>>>>>> 7b14512e830d41e63a96659148b1df8e10c0d3b6
}
export default AllRoutes;
