import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
function Navbargo() {
  return (
    <React.Fragment>
      <div className="body_navbar center">
        <div className="video-game-button">A</div>
        <div className="start-btn">
          <Link to="/">HOME</Link>
        </div>
        <div className="video-game-button">B</div>
      </div>

      <br />
    </React.Fragment>
  );
}

export default Navbargo;
