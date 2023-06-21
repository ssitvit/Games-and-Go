import React, { useState } from "react";
import "./src/App.css";
import Timer from "react-compound-timer";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

const paddingStyle = {
  padding: 5
};

const marginStyle = {
  margin: 5
};

const App = () => {
  const [chess] = useState(new Chess());

  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();
        if (moves.length > 0) {
          const computerMove =
            moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);
      setFen(chess.fen());
    }
  };

  return (
    <div className="flex-center">
      <h1>Random Chess Game</h1>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q"
          })
        }
      />
      <Timer initialTime={0} startImmediately={false}>
        {({ start, resume, pause, stop, reset, timerState }) => (
          <>
            <div>
              <span style={paddingStyle}>
                <Timer.Minutes /> minutes
              </span>
              <span style={paddingStyle}>
                <Timer.Seconds /> seconds
              </span>
              <span style={paddingStyle}>
                <Timer.Milliseconds /> milliseconds
              </span>
            </div>
            <div style={paddingStyle}>{timerState}</div>
            <br />
            <div>
              <button style={marginStyle} onClick={start}>
                Start
              </button>
              <button style={marginStyle} onClick={pause}>
                Pause
              </button>
              <button style={marginStyle} onClick={resume}>
                Resume
              </button>
              <button style={marginStyle} onClick={stop}>
                Stop
              </button>
              <button style={marginStyle} onClick={reset}>
                Reset
              </button>
            </div>
          </>
        )}
      </Timer>
    </div>
  );
};

export default App;
