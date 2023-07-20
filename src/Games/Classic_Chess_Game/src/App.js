import './App.css';
import React from 'react';
import { useState } from 'react';
import Chessboard from 'chessboardjsx';
import {Chess} from 'chess.js'
import { useEffect } from 'react';
import { useRef } from 'react';



function App() {

  const [fen, setFen] = useState("start");

  let game = useRef(null); // we'll be using this to store our instance of chess.js

  useEffect(() => {
    game.current = new Chess();

  },[])

  const onDrop = ({sourceSquare, targetSquare}) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" 
    });
      console.log(game)
    if(move == null){
      console.log("wrong move");
      return false;
    }
    setFen(game.current.fen());

  }
  
  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setFen("start");
  }

 
  return (
    <div>
      <div className="header"><h1 className="heading">Chess Game</h1></div>
      <div className="App">
        
        <Chessboard className="chessBoard" position={fen} onDrop={onDrop}/>

      </div>
      {
        game.current && game.current.isGameOver() ? <div className='gameOverHeading'><h1>Game Over</h1><button className='playAgainBtm' onClick={resetGame}>Play Again</button></div> : <span></span>
      }
      <div className="footer"><p>&copy; made by Mahendra Dewangan</p></div>
    </div>
    
  );
}

export default App;
