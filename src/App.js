
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";
import Homepage from './Homepage/Homepage';
import Tictactoe from './Tictactoe/tictactoe';

function App() {



  return (
 
    <div>
     

      <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/Tic" element={<Tictactoe/>}/>
        
      

      </Routes>
    </div>

  
  );
}
export default App;



