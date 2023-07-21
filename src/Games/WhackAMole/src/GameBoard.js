import React, { useState, useEffect } from 'react';
import Mole from './Mole';

const GameBoard = () => {
  const [moles, setMoles] = useState([]);
  const [score, setScore] = useState(0);

  const randomTime = () => Math.floor(Math.random() * 1000) + 500;
  const randomHole = () => Math.floor(Math.random() * 9);

  const startGame = () => {
        setScore(0);
        setMoles(Array(9).fill(false));
  };

  const handleHit = (index) => {
    if (moles[index]) {
      setScore(score + 1);
      setMoles((prevMoles) => {
        const updatedMoles = [...prevMoles];
        updatedMoles[index] = false;
        return updatedMoles;
      });
    }
  };

  useEffect(() => {
    let timerId;

    const showMole = () => {
      const hole = randomHole();
      setMoles((prevMoles) => {
        const updatedMoles = [...prevMoles];
        updatedMoles[hole] = true;
        return updatedMoles;
      });
      timerId = setTimeout(hideMole, randomTime());
    };

    const hideMole = () => {
      setMoles((prevMoles) => {
        const updatedMoles = [...prevMoles];
        updatedMoles[randomHole()] = false;
        return updatedMoles;
      });
      timerId = setTimeout(showMole, randomTime());
    };

    showMole();

    return () => clearTimeout(timerId);
  }, []);

  return (
        <div className="game-board">
        <div className="holes">
            {moles.map((isVisible, index) => (
            <Mole key={index} isVisible={isVisible} onHit={() => handleHit(index)} />
            ))}
        </div>
        <div className="score">Score: {score}</div>
        <button onClick={startGame}>Start Game</button>
        </div>
  );
};

export default GameBoard;
