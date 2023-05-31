import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
function Navbargo() {
  return (
    <React.Fragment>
      <div class="body_navbar center">
        <div class="video-game-button">A</div>
        <div class="start-btn">
          <Link to="/">HOME</Link>
        </div>
        <div class="video-game-button">B</div>
      </div>

      <br />
    </React.Fragment>
  );
}

export default Navbargo;
