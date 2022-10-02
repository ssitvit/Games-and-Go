import React from "react";
import "./tictactoe.css";


const initialState = {
  boardSquares: {
    "1": null,
    "2": null,
    "3": null,
    "4": null,
    "5": null,
    "6": null,
    "7": null,
    "8": null,
    "9": null
  },
  playerX: true,
  numberOfMoves: 0,
  winner: null,
  hoverPreviewSquare: null
};

function determineWinner(player, boardSquares) {
  if (
    (boardSquares["1"] === player &&
      boardSquares["2"] === player &&
      boardSquares["3"] === player) ||
    (boardSquares["4"] === player &&
      boardSquares["5"] === player &&
      boardSquares["6"] === player) ||
    (boardSquares["7"] === player &&
      boardSquares["8"] === player &&
      boardSquares["9"] === player) ||
    (boardSquares["1"] === player &&
      boardSquares["4"] === player &&
      boardSquares["7"] === player) ||
    (boardSquares["2"] === player &&
      boardSquares["5"] === player &&
      boardSquares["8"] === player) ||
    (boardSquares["3"] === player &&
      boardSquares["6"] === player &&
      boardSquares["9"] === player) ||
    (boardSquares["1"] === player &&
      boardSquares["5"] === player &&
      boardSquares["9"] === player) ||
    (boardSquares["3"] === player &&
      boardSquares["5"] === player &&
      boardSquares["7"] === player)
  ) {
    return player;
  }
  return null;
}

function reducer(state, action) {
  switch (action.type) {
    case "playerMove":
      // if winner trigger reset
      if (state.winner === "X" || state.winner === "O") {
        return state;
      }
      const boardSquares = state.boardSquares;
      const player = state.playerX ? "X" : "O";
      boardSquares[action.squareNumber] = player;
      let winner = determineWinner(player, state.boardSquares);
      const numberOfMoves = (state.numberOfMoves += 1);
      if (state.numberOfMoves === 9 && winner === null) {
        winner = "Draw";
      }
      return {
        ...state,
        playerX: !state.playerX,
        boardSquares,
        winner,
        numberOfMoves
      };
    case "reset":
      return {
        boardSquares: {
          "1": null,
          "2": null,
          "3": null,
          "4": null,
          "5": null,
          "6": null,
          "7": null,
          "8": null,
          "9": null
        },
        playerX: true,
        numberOfMoves: 0,
        winner: null,
        hoverPreviewSquare: null
      };
    case "onMouseEnter":
      return {
        ...state,
        hoverPreviewSquare: action.key
      };
    case "onMouseLeave":
      return {
        ...state,
        hoverPreviewSquare: null
      };
    default:
      throw new Error();
  }
}

function Tictactoe() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <div className="pageWrapper">
      <h1>Tic-tac-toe</h1>
      <h5>Rules:</h5>
      <div>Player X always goes first</div>
      <div>Click any square to start game</div>
      <div>3 in a row in any direction wins</div>
      <div>
        <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">
          Full list of rules on Wikipedia
        </a>
      </div>
      <h4>Current player: {state.playerX ? "X" : "O"}</h4>
      <div className="boardWrapper">
        {Object.keys(state.boardSquares).map(key => (
          <div
            className={state.winner ? "gameOverBoardSquare" : "boardSquare"}
            key={key}
            onClick={() => {
              if (state.boardSquares[key] === null) {
                dispatch({ type: "playerMove", squareNumber: key });
              }
            }}
            onMouseEnter={() => {
              dispatch({
                type: "onMouseEnter",
                key
              });
            }}
            onMouseLeave={() => {
              dispatch({
                type: "onMouseLeave",
                key
              });
            }}
          >
            {state.boardSquares[key]}
            {state.hoverPreviewSquare === key &&
              state.boardSquares[key] === null &&
              (state.playerX ? "X" : "O")}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => dispatch({ type: "reset" })}
        className="resetButton"
      >
        Reset
      </button>
      {state.winner && state.winner !== "Draw" && (
        <h2 className="gameOver">The winner is: {state.winner}</h2>
      )}
      {state.winner && state.winner === "Draw" && (
        <h2 className="gameOver">Game over: Draw</h2>
      )}
    </div>
  );
}

export default Tictactoe;