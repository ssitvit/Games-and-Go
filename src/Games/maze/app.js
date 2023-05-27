import React, { useState } from "react";
import "./maze.css";

const MazePuzzle = () => {
  const [maze, setMaze] = useState(null);
  const [playerPos, setPlayerPos] = useState(null);
  const [moves, setMoves] = useState(0);

  const generateMaze = () => {
    const x = Math.floor(Math.random() * 2);
    const y = Math.floor(Math.random() * 2);
    const mazeData = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, x, 1, 1, x, 0, 1],
      [1, y, 0, x, 1, 0, 0, 1],
      [1, 1, x, 0, 1, x, 0, 1],
      [1, x, y, 0, y, x, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const startCoord = { row: 1, col: 1 }; // Starting position
    const endCoord = { row: 5, col: 6 }; // Ending position

    setMaze({
      data: mazeData,
      startCoord: () => startCoord,
      endCoord: () => endCoord,
    });

    setPlayerPos(startCoord);
    setMoves(0);
  };

  const handleMove = (direction) => {
    const newPos = { ...playerPos };

    switch (direction) {
      case "up":
        newPos.row--;
        break;
      case "down":
        newPos.row++;
        break;
      case "left":
        newPos.col--;
        break;
      case "right":
        newPos.col++;
        break;
      default:
        return;
    }

    if (isValidMove(newPos)) {
      setPlayerPos(newPos);
      setMoves((prevMoves) => prevMoves + 1);

      if (isGameComplete(newPos)) {
        alert("Congratulations! You completed the maze!");
      }
    }
  };

  const isValidMove = (pos) => {
    const { row, col } = pos;
    const { data } = maze;

    if (row < 0 || row >= data.length || col < 0 || col >= data[0].length) {
      return false; // Move outside the maze boundaries
    }

    return data[row][col] === 0; // Valid move if the cell is empty (0)
  };

  const isGameComplete = (pos) => {
    const { row, col } = pos;
    const { endCoord } = maze;

    const end = endCoord();
    return row === end.row && col === end.col;
  };

  return (
    <div className="maze-puzzle-container">
      {maze ? (
        <div>
          <div className="moves">number of Moves made: {moves}</div>
          <div className="maze-container">
            {maze.data.map((row, rowIndex) => (
              <div key={rowIndex} className="maze-row">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`maze-cell ${
                      cell === 1 ? "wall" : ""
                    } ${playerPos.row === rowIndex &&
                    playerPos.col === colIndex
                      ? "player"
                      : ""}`}
                  >
                    {playerPos.row === rowIndex &&
                    playerPos.col === colIndex ? (
                      <span role="img" aria-label="player">
                        ⚡️
                      </span>
                    ) : cell === 1 ? (
                      <span role="img" aria-label="wall">
                        🧱
                      </span>
                    ) : null}
                    {maze.startCoord().row === rowIndex &&
                    maze.startCoord().col === colIndex ? (
                      <span role="img" aria-label="start">
                        🗝️
                      </span>
                    ) : null}
                    {maze.endCoord().row === rowIndex &&
                    maze.endCoord().col === colIndex ? (
                      <span role="img" aria-label="end">
                        🏠
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="arrow-buttons">
            <button onClick={() => handleMove("up")}>Up</button>
            <button onClick={() => handleMove("down")}>Down</button>
            <button onClick={() => handleMove("left")}>Left</button>
            <button onClick={() => handleMove("right")}>Right</button>
          </div>
        </div>
      ) : (
        <div className="maze-initial">
          <p className="instructions">
            <h3>You have to reach home in minimum moves.</h3>
           <br></br> 
           <h4>this problem can be solved by dfs</h4>
          </p>
          <button className="generate-button" onClick={generateMaze}>
            Generate Maze
          </button>
        </div>
      )}
    </div>
  );
};

export default MazePuzzle;
