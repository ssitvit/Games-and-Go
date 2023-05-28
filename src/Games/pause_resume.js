import React, { useState, useEffect } from "react";
const Game = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [isRestarted, setIsRestarted] = useState(false);
  
    const handlePause = () => {
      setIsPaused(true);
      setIsRestarted(false);
    };
  
    const handleResume = () => {
      setIsPaused(false);
    };
  
    const handleRestart = () => {
      setIsPaused(false);
      setIsRestarted(true);
    };
  
    useEffect(() => {
      if (isPaused) {
        return () => {};
      }
    }, [isPaused]);
  
    return (
      <div>
        <div >
          <button id = "pause" style={{ margin: "10px 10px" }} onClick={handlePause}>Pause</button>
          <button style={{ margin: "10px 10px" }} onClick={handleResume}>Resume</button>
          <button onClick={handleRestart}>Restart</button>
        </div>

        {isPaused ? (
          <h2>Paused</h2>
        ) : (
          <h2>Playing</h2>
        )}
        {isRestarted ? (
          <h2>Restarted</h2>
        ) : (
          null
        )}
        
        
      </div>
    );
  };
  
  export default Game;
  
