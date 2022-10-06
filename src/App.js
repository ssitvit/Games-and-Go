import React from "react";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./Homepage/Homepage/Navbar";
import Footer from "./Homepage/Homepage/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <AllRoutes />
      <hr className="line" style={{color:'lightblue',width:"103.5%"}}/>
      <Footer/>
    </div>
  );
}
export default App;
