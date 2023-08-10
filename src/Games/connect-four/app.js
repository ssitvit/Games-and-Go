import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [grid, setGrid] = useState([]);
  const [mouseX, setMouseX] = useState(0);
  const [currSide, setCurrSide] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const cols = 7;
  const rows = 6;
  const sides = ["blue", "darkred"];
  const cellSize = 60;
  const cellGap = 10;
  const borderGap = 30;
  const borderWidth = 10;
  const winningLength = 4;
  const backColor = "black";

  useEffect(() => {
    init();
  }, []);

  function createBoard() {
    const newGrid = new Array(cols);
    for (let i = 0; i < newGrid.length; i++) newGrid[i] = new Array(rows).fill(undefined);
    setGrid(newGrid);
  }

  function init() {
    document.getElementById("pageTitle").innerHTML = `CONNECT ${winningLength} - ${cols} x ${rows}`;
    document.getElementById("tabTitle").innerHTML = `Connect ${winningLength}`;
    document.querySelector("canvas").style.borderRadius = `${cellSize / 2 + borderGap + borderWidth}px`;
    document.querySelector("canvas").style.borderWidth = `${borderWidth}px`;
    createBoard();
  }

  function place(x, color) {
    if (!gameOver) {
      const col = Math.floor((x / canvas.width) * cols);
      const newRow = getLowestAvailableRow(col);
      if (newRow !== -1) {
        const newGrid = grid.map(rowArr => [...rowArr]);
        newGrid[col][newRow] = color;
        setGrid(newGrid);
        checkAndRender(col, newRow, color);
      }
    }
  }

  function getLowestAvailableRow(col) {
    for (let row = rows - 1; row >= 0; row--) {
      if (grid[col][row] === undefined) {
        return row;
      }
    }
    return -1;
  }

  function checkAndRender(col, row, color) {
    checkChainPositions(col, row, color);
    checkVertical(col, row, color);
    checkHorizontal(col, row, color);
    checkDiagonalNegative(col, row, color);
    checkDiagonalPositive(col, row, color);
  }

  function checkChainPositions(col, row, color) {
    const chainPositions = [[col, row]];
    setChainPositions(chainPositions);
  }

  function setChainPositions(chainPositions) {
    checkChainPositions(chainPositions);
  }

  function checkChainPositions(chainPositions) {
    if (chainPositions.length >= winningLength) {
      renderChain();
      alert(`${winningLength} IN A ROW!\n${color.toUpperCase()} WINS!`);
      setGameOver(true);
    }
  }

  function checkVertical(col, row, color) {
    let chainPositions = getChainPositions();
    for (let i = 1; i < winningLength; i++) {
      if (row + i <= rows - 1) {
        if (grid[col][row + i] === color) chainPositions.push([col, row + i]);
        else break;
      }
    }
    for (let i = 1; i < winningLength; i++) {
      if (row - i >= 0) {
        if (grid[col][row - i] === color) chainPositions.push([col, row - i]);
        else break;
      }
    }
    setChainPositions(chainPositions);
  }

  function checkHorizontal(col, row, color) {
    let chainPositions = getChainPositions();
    for (let i = 1; i < winningLength; i++) {
      if (col + i <= cols - 1) {
        if (grid[col + i][row] === color) chainPositions.push([col + i, row]);
        else break;
      }
    }
    for (let i = 1; i < winningLength; i++) {
      if (col - i >= 0) {
        if (grid[col - i][row] === color) chainPositions.push([col - i, row]);
        else break;
      }
    }
    setChainPositions(chainPositions);
  }

  function checkDiagonalNegative(col, row, color) {
    let chainPositions = getChainPositions();
    for (let i = 1; i < winningLength; i++) {
      if (col + i <= cols - 1 && row + i <= rows - 1) {
        if (grid[col + i][row + i] === color) chainPositions.push([col + i, row + i]);
        else break;
      }
    }
    for (let i = 1; i < winningLength; i++) {
      if (col - i >= 0 && row - i >= 0) {
        if (grid[col - i][row - i] === color) chainPositions.push([col - i, row - i]);
        else break;
      }
    }
    setChainPositions(chainPositions);
  }

  function checkDiagonalPositive(col, row, color) {
    let chainPositions = getChainPositions();
    for (let i = 1; i < winningLength; i++) {
      if (col + i <= cols - 1 && row - i >= 0) {
        if (grid[col + i][row - i] === color) chainPositions.push([col + i, row - i]);
        else break;
      }
    }
    for (let i = 1; i < winningLength; i++) {
      if (col - i >= 0 && row + i <= rows - 1) {
        if (grid[col - i][row + i] === color) chainPositions.push([col - i, row + i]);
        else break;
      }
    }
    setChainPositions(chainPositions);
  }

  function renderChain() {
    // Implementation of renderChain function goes here...
  }

  function handleCanvasClick(e) {
    setMouseX(e.clientX - canvas.offsetLeft);
    place(mouseX, sides[currSide]);
    setCurrSide(currSide === 0 ? 1 : 0);
  }

  function resetGame() {
    createBoard();
    setCurrSide(0);
    setGameOver(false);
  }

  return (
    <div className="App">
      <h1 id="pageTitle"></h1>
      <div id="container">
        <h1 id="pageTitle"></h1>
        <canvas id="canvas" onClick={handleCanvasClick}>
          <span>Please install Google Chrome.</span>
        </canvas>
      </div>
      {gameOver && <button onClick={resetGame}>Play Again</button>}
    </div>
  );
};

export default App;
