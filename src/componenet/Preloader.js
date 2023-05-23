import React, { useEffect } from "react";
import "./preloader.css";
import { preLoaderAnim } from "../animation";
const Preloaderr = () => {
  useEffect(() => preLoaderAnim(), []);
  return (
    <div className="preloader">
      <img
        src="https://technologyandsociety.org/wp-content/uploads/Logo-Color-1.jpg"
        className="img"
      />
      <div className="texts-container">
        <span>Games</span>
        <span>and</span>
        <span>Go</span>
      </div>
    </div>
  );
};
export default Preloaderr;
