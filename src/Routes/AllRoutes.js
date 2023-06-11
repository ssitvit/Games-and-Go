import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../Homepage/Homepage/Homepage";
import Tictactoe from "../Games/Tictactoe/tictactoe";
import Ninetynine from "../Games/Ninetynine/ninetynine";
import Memory from "../Games/Memory/memory";
import TriviaGame from "../Games/Trivia/quiz";
import Dice_Game from "c:/Dice_Game/Games-and-Go/src/Games/Dice_Game";

function AllRoutes(){
    return (
        <Routes>
          {/* Add all the routes with the right path here after importing them  */}
        <Route path="/" element={<Homepage />} />
        <Route path="/Tic" element={<Tictactoe />} />
        <Route path="/99" element={<Ninetynine />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/trivia" element={<TriviaGame />} />
        <Route path="/Dice_Game" element={<Dice_Game />} />
      </Routes>
    )
}
export default AllRoutes;