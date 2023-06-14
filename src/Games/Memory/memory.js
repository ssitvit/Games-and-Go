import React, { useEffect, useState } from "react";
import "./memory.css";

export default function Memory() {
  const [turn, setTurn] = useState(null);
  const [active, setActive] = useState(0);
  const [level, setLevel] = useState(1);
  const [pos, setPos] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [status, setStatus] = useState("playing");
  const [startbtn,setStartButton] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    if(startbtn)startGame();
  }, [level]);

  const handleClick = async (x) => {
    if (turn != "user" || status != "playing") return;
    if (x != sequence[pos]) {
      setStatus("Wrong !!!");
      await setLevel(1);
      return;
    }
    setActive(x);
    if (pos === level + 1) {
      setStatus("Right !!!");
      await setLevel(level + 1);
      return;
    }
    setPos(pos + 1);
  };

  const startGame = async () => {
    await delay(1000);
    setStatus("playing");
    setTurn("computer");
    setActive(0);
    await delay(2000);
    var pattern = [];
    for (let i = 0; i < level + 2; ++i) {
      var cell = Math.floor(Math.random() * 16) + 1;
      pattern.push(cell);
      setActive(cell);
      await delay(600);
      setActive(0);
      await delay(200);
    }
    setSequence(pattern);
    setPos(0);
    setTurn("user");
  };

  if (turn === null) {
    return (
      <div className="fancy">
        <h1 className="h">Memory Game</h1>
        <button
          className="start-btn"
          onClick={()=>{
            startGame();
            setStartButton(true);
          }}
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="fancy">
      <h1 className="h">Memory Game</h1>
      <div>Level: {level}</div>
      <div className="board">
        <div
          className={"box " + (active == 1 ? "active" : "")}
          onClick={() => handleClick(1)}
        ></div>
        <div
          className={"box " + (active == 2 ? "active" : "")}
          onClick={() => handleClick(2)}
        ></div>
        <div
          className={"box " + (active == 3 ? "active" : "")}
          onClick={() => handleClick(3)}
        ></div>
        <div
          className={"box " + (active == 4 ? "active" : "")}
          onClick={() => handleClick(4)}
        ></div>
        <div
          className={"box " + (active == 5 ? "active" : "")}
          onClick={() => handleClick(5)}
        ></div>
        <div
          className={"box " + (active == 6 ? "active" : "")}
          onClick={() => handleClick(6)}
        ></div>
        <div
          className={"box " + (active == 7 ? "active" : "")}
          onClick={() => handleClick(7)}
        ></div>
        <div
          className={"box " + (active == 8 ? "active" : "")}
          onClick={() => handleClick(8)}
        ></div>
        <div
          className={"box " + (active == 9 ? "active" : "")}
          onClick={() => handleClick(9)}
        ></div>
        <div
          className={"box " + (active == 10 ? "active" : "")}
          onClick={() => handleClick(10)}
        ></div>
        <div
          className={"box " + (active == 11 ? "active" : "")}
          onClick={() => handleClick(11)}
        ></div>
        <div
          className={"box " + (active == 12 ? "active" : "")}
          onClick={() => handleClick(12)}
        ></div>
        <div
          className={"box " + (active == 13 ? "active" : "")}
          onClick={() => handleClick(13)}
        ></div>
        <div
          className={"box " + (active == 14 ? "active" : "")}
          onClick={() => handleClick(14)}
        ></div>
        <div
          className={"box " + (active == 15 ? "active" : "")}
          onClick={() => handleClick(15)}
        ></div>
        <div
          className={"box " + (active == 16 ? "active" : "")}
          onClick={() => handleClick(16)}
        ></div>
      </div>
      {turn == "computer" ? <div>Ready ???</div> : <div>Your turn!!!</div>}
      {status != "playing" && <div className="modal">{status}</div>}
    </div>
  );
}
