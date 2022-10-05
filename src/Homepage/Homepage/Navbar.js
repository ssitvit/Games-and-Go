import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
function Navbargo() {
  return (
    <React.Fragment>
      <div class="body_navbar center">
        <div class="start-btn">
          <h2><Link to="/" className="link">HOME</Link></h2>
        </div>
      </div>

      <br />
    </React.Fragment>
  );
}

export default Navbargo;
