import React from "react";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./Homepage/Homepage/Navbar";
import Preloaderr from "./componenet/Preloader";
function App() {
  return (
    <>
      <Preloaderr />
      <div>
        <Navbar />
        <AllRoutes />
      </div>{" "}
    </>
  );
}
export default App;
