import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../Homepage/Homepage/Homepage";
import Tictactoe from "../Games/Tictactoe/tictactoe";
import SnakeGame from "../Games/Snake-Game";
function AllRoutes(){
    return (
        <Routes>
          {/* Add all the routes with the right path here after importing them  */}
        <Route path="/" element={<Homepage />} />
        <Route path="/Tic" element={<Tictactoe />} />
        <Route path="/Snake" element={<SnakeGame />} />
      </Routes>
    )
}
export default AllRoutes;