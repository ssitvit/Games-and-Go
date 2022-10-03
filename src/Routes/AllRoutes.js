import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../Homepage/Homepage/Homepage";
import Tictactoe from "../Games/Tictactoe/tictactoe";
function AllRoutes(){
    return (
        <Routes>
          {/* Add all the routes with the right path here after importing them  */}
        <Route path="/" element={<Homepage />} />
        <Route path="/Tic" element={<Tictactoe />} />
      </Routes>
    )
}
export default AllRoutes;