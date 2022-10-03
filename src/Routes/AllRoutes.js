import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../Homepage/Homepage/Homepage";
import Tictactoe from "../Tictactoe/tictactoe";
function AllRoutes(){
    return (
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Tic" element={<Tictactoe />} />
      </Routes>
    )
}
export default AllRoutes;