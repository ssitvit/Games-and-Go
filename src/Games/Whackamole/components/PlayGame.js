import React, { useState, useEffect } from 'react'
import '../Whackamole.css'
import { useContext} from 'react'
import { GameContext } from '../Helpers/Context'

export const PlayGame = () => {

  const {gameState, setgameState, score, setScore}= useContext(GameContext)

  const [squares, setSquares] = useState([]);
  const [moleIndex, setMoleIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hitPosition, setHitPosition] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [countDownTimerId, setCountDownTimerId] = useState(null);

  useEffect(() => {
    const squares = Array.from(document.querySelectorAll('.square'));
    setSquares(squares);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(countDownTimerId);
      clearInterval(timerId);
      setgameState('endscreen')
    }
  }, [timeLeft, countDownTimerId, timerId, score]);

  function randomSquare() {
    setMoleIndex(Math.floor(Math.random() * 9));
  }

  function handleSquareClick(index) {
    if (index === moleIndex) {
      setScore(score + 1);
      setHitPosition(index);
    }
  }

  useEffect(() => {
    const timerId = setInterval(randomSquare, 1500);
    setTimerId(timerId);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (hitPosition !== null) {
      const hitTimerId = setTimeout(() => {
        setHitPosition(null);
      }, 500);
      return () => {
        clearTimeout(hitTimerId);
      };
    }
  }, [hitPosition]);

  function countDown() {
    setTimeLeft((prevScore) => prevScore - 1);
  }

  useEffect(() => {
    const countDownTimerId = setInterval(countDown, 1000);
    setCountDownTimerId(countDownTimerId);

    return () => {
      clearInterval(countDownTimerId);
    };
  }, []);

  return (
   
    <div>
    <button id="stop-btn" onClick={() => setgameState('endscreen')}>Stop</button>
    <div>
     <span id="time-left"> Time left: {timeLeft}</span>
    </div>
    <div> 
      <span id="points">Score: {score}</span>
    </div>
    <div className='grid'>
      <div
        className={`square ${0 === moleIndex ? 'mole' : ''} ${
          0 === hitPosition ? 'hit' : ''
        }`}
        onClick={() => handleSquareClick(0)}
      ></div>
      <div
        className={`square ${1 === moleIndex ? 'mole' : ''} ${
          1 === hitPosition ? 'hit' : ''
        }`}
        onClick={() => handleSquareClick(1)}
      ></div>
      <div
        className={`square ${2 === moleIndex ? 'mole' : ''} ${
          2 === hitPosition ? 'hit' : ''
        }`}
        onClick={() => handleSquareClick(2)}
      ></div>
      <div
        className={`square ${3 === moleIndex ? 'mole' : ''} ${
          3 === hitPosition ? 'hit' : ''
        }`}
        onClick={() => handleSquareClick(3)}
      ></div>
      <div
        className={`square ${4 === moleIndex ? 'mole' : ''} ${
          4 === hitPosition ? 'hit' : ''
        }`}
        onClick={() => handleSquareClick(4)}
      ></div>
      <div
        className={`square ${5 === moleIndex ? 'mole' : ''} ${
          5 === hitPosition ? 'hit' : ''
        }`}
        onClick={() => handleSquareClick(5)}
      ></div>
      <div
        className={`square ${6 === moleIndex ? 'mole' : ''} ${
          6 === hitPosition ? 'hit' : ''
        }`}
        onClick={() => handleSquareClick(6)}
      ></div>
      <div
        className={`square ${7 === moleIndex ? 'mole' : ''} ${
          7 === hitPosition ? 'hit' : ''
        }`}
        onClick={() => handleSquareClick(7)}
      ></div>
      <div
        className={`square ${8 === moleIndex ? 'mole' : ''} ${
          8 === hitPosition ? 'hit' : ''
        }`}
        onClick={() => handleSquareClick(8)}
      ></div>
    </div>
  </div>


  );
}

export default PlayGame;