import React, { useState, useEffect } from 'react';
import './Snake.css';

const Snake = () => {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState({});
  const [direction, setDirection] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  useEffect(() => {
    if (!gameOver) {
      const moveSnake = setInterval(() => {
        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP':
            head.y--;
            break;
          case 'DOWN':
            head.y++;
            break;
          case 'LEFT':
            head.x--;
            break;
          case 'RIGHT':
            head.x++;
            break;
          default:
            break;
        }

        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || checkCollision(head)) {
          setGameOver(true);
          clearInterval(moveSnake);
          return;
        }

        newSnake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          setFood(getRandomFoodPosition());
          setScore(score + 1);
        } else {
          newSnake.pop();
        }
        setSnake(newSnake);
      }, 200);

      return () => {
        clearInterval(moveSnake);
      };
    }
  }, [snake, food, direction, score, gameOver]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { keyCode } = event;
      if (keyCode === 38 && direction !== 'DOWN') {
        setDirection('UP');
      } else if (keyCode === 40 && direction !== 'UP') {
        setDirection('DOWN');
      } else if (keyCode === 37 && direction !== 'RIGHT') {
        setDirection('LEFT');
      } else if (keyCode === 39 && direction !== 'LEFT') {
        setDirection('RIGHT');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  const checkCollision = (head) => {
    return snake.some((part) => part.x === head.x && part.y === head.y);
  };

  const getRandomFoodPosition = () => {
    let newFoodPosition;
    while (!newFoodPosition || checkCollision(newFoodPosition)) {
      newFoodPosition = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      };
    }
    return newFoodPosition;
  };

  const handleStartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(getRandomFoodPosition());
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="snake-game" tabIndex="0">
      <div className={`grid ${gameOver ? 'game-over' : ''}`}>
        {snake.map((part, index) => (
          <div
            className="snake-part"
            key={index}
            style={{ left: `${part.x * 5}%`, top: `${part.y * 5}%` }}
          />
        ))}
        {!gameOver && (
          <div
            className="food"
            style={{ left: `${food.x * 5}%`, top: `${food.y * 5}%` }}
          />
        )}
      </div>
      {gameOver ? (
        <div className="game-over-container">
          <div className="game-over-text">Game Over!</div>
          <div className="score">Score: {score}</div>
          <button className="start-button" onClick={handleStartGame}>
            Play Again
          </button>
        </div>
      ) : (
        <div className="score">Score: {score}</div>
      )}
    </div>
  );
};

export default Snake;
