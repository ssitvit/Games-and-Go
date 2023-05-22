import React, { useEffect, useState } from 'react';
import './simon.css';

export default function Memory() {
  const [turn, setTurn] = useState(null);
  const [active, setActive] = useState(0);
  const [level, setLevel] = useState(1);
  const [pos, setPos] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [status, setStatus] = useState('playing');

  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    startGame();
  }, [level]);

  const handleClick = async (x) => {
    console.log(turn, status);
    if (turn !== 'user' || status !== 'playing') return;
    if (x !== sequence[pos]) {
      setStatus('Wrong !!!');
      await setLevel(1);
      return;
    }
    setActive(x);
    if (pos === level + 1) {
      setStatus('Right !!!');
      await setLevel(level + 1);
      return;
    }
    setPos(pos + 1);
  };

  const startGame = async () => {
    await delay(1000);
    setStatus('playing');
    setTurn('computer');
    setActive(0);
    await delay(2000);
    const pattern = [];
    for (let i = 0; i < level + 2; i++) {
      const cell = Math.floor(Math.random() * 16) + 1;
      pattern.push(cell);
      setActive(cell);
      await delay(600);
      setActive(0);
      await delay(200);
    }
    console.log(pattern);
    setSequence(pattern);
    setPos(0);
    setTurn('user');
  };

  if (turn === null) {
    return (
      <div className="fancy">
        <h1 className="h">Memory Game</h1>
        <button className="start-btn" onClick={startGame}>Start</button>
      </div>
    );
  }

  return (
    <div className="fancy">
      <h1 className="h">Memory Game</h1>
      <div>Level: {level}</div>
      <div className="board">
        {[...Array(16)].map((_, index) => (
          <div
            key={index + 1}
            className={`box ${active === index + 1 ? 'active' : ''}`}
            onClick={() => handleClick(index + 1)}
          ></div>
        ))}
      </div>
      {turn === 'computer' ? <div>Ready ???</div> : <div>Your turn!!!</div>}
      {status !== 'playing' && <div className="modal">{status}</div>}
    </div>
  );
}
