import React from "react";
import "./tictactoe.css";

// Initial State where all boxes are NULL in the tictactoe board
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
// To check with all the winning combinations and decide the winner
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
  const w=React.useRef();
  // for winning line 
  React.useEffect(()=>{
    if(state.winner!=null){
      w.current.style.display="block";
      if(state.boardSquares["1"] === state.winner &&
                state.boardSquares["2"] === state.winner &&
                state.boardSquares["3"] === state.winner){
                  w.current.style.display="block";
                  w.current.style.transform="translateY(-102px)";
                }
                else if
                (state.boardSquares["4"] === state.winner &&
                state.boardSquares["5"] === state.winner &&
                state.boardSquares["6"] === state.winner) {
                  w.current.style.transform="translateY(0px)";
                }
                else if
                (state.boardSquares["7"] === state.winner &&
                state.boardSquares["8"] === state.winner &&
                state.boardSquares["9"] === state.winner){
                  w.current.style.transform="translateY(+102px)";
                }
                else if
                (state.boardSquares["1"] === state.winner &&
                state.boardSquares["4"] === state.winner &&
                state.boardSquares["7"] === state.winner) {
                  w.current.style.transform="translateX(-102px) rotate(90deg)";              
                }
                else if
                (state.boardSquares["2"] === state.winner &&
                state.boardSquares["5"] === state.winner &&
                state.boardSquares["8"] === state.winner){
                  w.current.style.transform="rotate(90deg)";              
                  
                }
                else if
                (state.boardSquares["3"] === state.winner &&
                state.boardSquares["6"] === state.winner &&
                state.boardSquares["9"] === state.winner){
                  w.current.style.transform="translateX(102px) rotate(90deg)";              
                  
                }
                else if
                (state.boardSquares["1"] === state.winner &&
                state.boardSquares["5"] === state.winner &&
                state.boardSquares["9"] === state.winner) {
                  w.current.style.transform=" rotate(45deg)";              
                  
                }
                else if
                (state.boardSquares["3"] === state.winner &&
                state.boardSquares["5"] === state.winner &&
                state.boardSquares["7"] === state.winner){
                  w.current.style.transform=" rotate(-45deg)";              
                  
                }
    }
  },[state])
  return (
    
    <div className="pageWrapper">
      <h1 className="h1">Let's play Tic-tac-toe</h1>
      {/* Rules of the game  */}
      <details open="false">
        <summary >
          <h2 className="h2">Rules:</h2> 
        </summary>
        <p>
        <ul>
          <li>Player X always goes first</li>
          <li>Click any square to start game</li>
          <li>3 in a row in any direction wins</li>
        </ul>
        </p>
      </details>
      
     
      <h4 className="h4">Current player: {state.playerX ? "X" : "O"}</h4>
      
      
      <div className="boardWrapper">
      {state.winner && state.winner !== "Draw" && (     
         <div className="winningLine" ref={w}></div>
      )}
        {Object.keys(state.boardSquares).map(key => (
          <div
            className={state.winner ? "gameOverBoardSquare" : "boardSquare"}
            key={key}
            onClick={() => {
              if (state.boardSquares[key] === null) {
                dispatch({ type: "playerMove", squareNumber: key });
              }
            }}
            //For hover effect actions are dispatched
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
      {/* Conditional Rendering to see there is only one winner */}
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