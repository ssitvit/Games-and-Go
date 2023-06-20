import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
  };

  const handleDotClick = () => {
    setScore(score + 1);
  };

  const generateNewDotPosition = () => {
    const maxWidth = window.innerWidth - 150;
    const maxHeight = window.innerHeight - 150;
    const newX = Math.floor(Math.random() * maxWidth);
    const newY = Math.floor(Math.random() * maxHeight);
    setDotPosition({ x: newX, y: newY });
  };

  useEffect(() => {
    let timer = null;

    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      generateNewDotPosition();
      setTimeout(() => {
        setDotPosition({ x: -1000, y: -1000 }); // Move dot outside the box
      }, 1500);
    }
  }, [timeLeft]);

  return (
    <div className="app">
      <h1>Dot Clicker</h1>
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft}</p>
      {timeLeft === 0 ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <div className="game-container">
          <div className="box">
            {dotPosition && (
              <div
                className="dot"
                style={{
                  top: `${dotPosition.y}px`,
                  left: `${dotPosition.x}px`,
                }}
                onClick={handleDotClick}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
