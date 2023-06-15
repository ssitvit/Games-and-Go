import React from "react";
import CanvasComponent from "./CanvasComponent";
import "./BallShooting.css";

function BallShooting() {
  return (
    <>
      <div className="BallShootingScore">
        <span>Score: </span>
        <span id="scoreEl">0</span>
      </div>
      <div id="modalEl">
        <div className="BallShootingStats">
          <h1 id="bigScoreEl">0</h1>
          <p className="text-sm text-gray-700 mb-4">Points</p>
          <div>
            <button id="startGamebtn">Start Game</button>
          </div>
        </div>
      </div>
      <CanvasComponent />
    </>
  );
}

export default BallShooting;
