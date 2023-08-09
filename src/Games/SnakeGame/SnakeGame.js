import React, { useEffect, useState } from "react";
import "./SnakeGame.css";

const Game = () => {
  const [score, setScore] = useState(0);
  const [snakeArr, setSnakeArr] = useState([{ x: 13, y: 15 }]);
  const [food, setFood] = useState({ x: 6, y: 7 });
  const [dir, setDir] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameOver) {
        switch (e.key) {
          case "ArrowUp":
            setDir({ x: 0, y: -1 });
            break;
  
          case "ArrowDown":
            setDir({ x: 0, y: 1 });
            break;
  
          case "ArrowLeft":
            setDir({ x: -1, y: 0 });
            break;
  
          case "ArrowRight":
            setDir({ x: 1, y: 0 });
            break;
  
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);

  useEffect(() => {
    const gameEngine = () => {
      if (!gameOver) {
        const newSnakePart = { x: snakeArr[0].x + dir.x, y: snakeArr[0].y + dir.y };
        const newSnakeArr = [newSnakePart, ...snakeArr];

        if (newSnakePart.x === food.x && newSnakePart.y === food.y) {
          setScore((prevScore) => prevScore + 1);
          generateFood();
        } else {
          newSnakeArr.pop();
        }

        if (
          newSnakePart.x >= 19 ||
          newSnakePart.x <= 0 ||
          newSnakePart.y >= 19 ||
          newSnakePart.y <= 0 ||
          isCollide(newSnakePart)
        ) {
          setGameOver(true);
        }

        setSnakeArr(newSnakeArr);
      }
    };

    const interval = setInterval(gameEngine, 100);

    return () => clearInterval(interval);
  }, [dir, snakeArr, food, gameOver]);

  useEffect(() => {
    if (gameOver) {
      alert(`Game Over! Your score: ${score}`);
      setScore(0);
      setSnakeArr([{ x: 13, y: 15 }]);
      setDir({ x: 0, y: 0 });
      generateFood();
      setGameOver(false);
    }
  }, [gameOver, score]);

  const isCollide = (newSnakePart) => {
    for (let i = 1; i < snakeArr.length; i++) {
      if (newSnakePart.x === snakeArr[i].x && newSnakePart.y === snakeArr[i].y) {
        return true;
      }
    }
    return false;
  };

  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * 18) + 1,
      y: Math.floor(Math.random() * 18) + 1,
    };
    setFood(newFood);
  };

  return (
    <div className="body">
      <div id="scoreBox">Score: {score}</div>
      <div id="board">
        {snakeArr.map((snakePart, index) => (
          <div
            className={index === 0 ? "head" : "snake"}
            key={index}
            style={{ gridRow: snakePart.y, gridColumn: snakePart.x }}
          ></div>
        ))}
        <div
          className="food"
          style={{ gridRow: food.y, gridColumn: food.x }}
        ></div>
      </div>
    </div>
  );
};

export default Game;
