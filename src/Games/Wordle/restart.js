import React from "react";

const RestartButton = ({ onClick }) => {
    return (
      <button className="wordle-game-submit-btn" onClick={onClick}>
        Restart
      </button>
    );
  };
  
  export default RestartButton;