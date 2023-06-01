import React from "react";
import CanvasComponent from "./CanvasComponent";

function BallShooting() {
  return (
    <>
      <div style={{position:"absolute",left:250,top:150,color:"#fff"}}>
        <span>Score: </span>
        <span id="scoreEl">0</span>
      </div>
      <div style={{position:"absolute",left:850,top:400,backgroundColor:"#fff",padding:"10px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}} id="modalEl">
        <div>
          <h1 id="bigScoreEl">
            0
          </h1>
          <p class="text-sm text-gray-700 mb-4">Points</p>
          <div>
            <button
              id="startGamebtn"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
      <CanvasComponent />
    </>
  );
}

export default BallShooting;
