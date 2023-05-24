import React, { useState, useEffect } from "react";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./Homepage/Homepage/Navbar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import "./App.css";
function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      {loading ? (
        <PacmanLoader
          color={"#f1e702"}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loader"
        />
      ) : (
        <div>
          <Navbar />
          <AllRoutes />
        </div>
      )}
    </div>
  );
}
export default App;
