import { useState, useMemo, useEffect } from "react";
import { generateMaze, solve } from "./util";
import "./styles.scss";

export default function App() {
  const [gameId, setGameId] = useState(1);
  const [status, setStatus] = useState("playing");

  const [size, setSize] = useState(10);
  const [cheatMode, setCheatMode] = useState(false);

  const [userPosition, setUserPosition] = useState([0, 0]);

  const maze = useMemo(() => generateMaze(size, size), [size, gameId]);
  const solution = useMemo(() => {
    const s = new Set();
    const solutionPath = solve(maze, userPosition[0], userPosition[1]);
    solutionPath.forEach((path) => {
      const [x, y] = path;
      s.add(String(x) + "-" + String(y));
    });
    return s;
  }, [size, userPosition[0], userPosition[1], gameId]);

  useEffect(() => {
    const lastRowIndex = maze.length - 1;
    const lastColIndex = maze[0].length - 1;
    if (userPosition[0] === lastRowIndex && userPosition[1] === lastColIndex) {
      setStatus("won");
    }
  }, [userPosition[0], userPosition[1]]);

  const makeClassName = (i, j) => {
    const rows = maze.length;
    const cols = maze[0].length;
    let arr = [];
    if (maze[i][j][0] === 0) {
      arr.push("topWall");
    }
    if (maze[i][j][1] === 0) {
      arr.push("rightWall");
    }
    if (maze[i][j][2] === 0) {
      arr.push("bottomWall");
    }
    if (maze[i][j][3] === 0) {
      arr.push("leftWall");
    }
    if (i === rows - 1 && j === cols - 1) {
      arr.push("destination");
    }
    if (i === userPosition[0] && j === userPosition[1]) {
      arr.push("currentPosition");
    }

    if (cheatMode && solution.has(String(i) + "-" + String(j))) {
      arr.push("sol");
    }
    return arr.join(" ");
  };

  const handleMove = (e) => {
    e.preventDefault();
    if (status !== "playing") {
      return;
    }
    const key = e.code;

    const [i, j] = userPosition;
    if ((key === "ArrowUp" || key === "KeyW") && maze[i][j][0] === 1) {
      setUserPosition([i - 1, j]);
    }
    if ((key === "ArrowRight" || key === "KeyD") && maze[i][j][1] === 1) {
      setUserPosition([i, j + 1]);
    }
    if ((key === "ArrowDown" || key === "KeyS") && maze[i][j][2] === 1) {
      setUserPosition([i + 1, j]);
    }
    if ((key === "ArrowLeft" || key === "KeyA") && maze[i][j][3] === 1) {
      setUserPosition([i, j - 1]);
    }
  };

  const handleUpdateSettings = () => {
    setSize(Number(document.querySelector("input[name='mazeSize']").value));
    setUserPosition([0, 0]);
    setStatus("playing");
    setGameId(gameId + 1);
  };

  return (
    <div className="App" onKeyDown={handleMove} tabIndex={-1}>
      <div className="setting">
        <label htmlFor="mazeSize">Size of maze (5-40):</label>
        <input
          type="number"
          name="mazeSize"
          min="5"
          max="40"
          defaultValue="10"
        />
      </div>
      <div className="setting">
        <button onClick={handleUpdateSettings}>
          Restart game with new settings
        </button>
      </div>
      <p className="instruction">use WSAD or Arrow Keys to move</p>
      <div>
        <label className="instruction" htmlFor="cheatMode">Cheat mode</label>
        <input
          type="checkbox"
          name="cheatMode"
          onChange={(e) => setCheatMode(e.target.checked)}
        />
      </div>

      <table id="maze">
        <tbody>
          {maze.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => (
                <td key={`cell-${i}-${j}`} className={makeClassName(i, j)}>
                  <div />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {status !== "playing" && (
        <div className="info" onClick={handleUpdateSettings}>
          <p>you won (click here to play again)</p>
        </div>
      )}
    </div>
  );
}
