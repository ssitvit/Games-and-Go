import React, { useState, useEffect } from "react";
import dice1 from "./assets/dice1.png";
import dice2 from "./assets/dice2.png";
import dice3 from "./assets/dice3.png";
import dice4 from "./assets/dice4.png";
import dice5 from "./assets/dice5.png";
import dice6 from "./assets/dice6.png";
import "./styles.css"

const Game = (props) => {

  let [init, funct] = useState(0);
  let [turn, setTurn] = useState(2);
  let [score1, setScore1] = useState(0);
  let [score2, setScore2] = useState(0);
  let [rand, setRandom] = useState(0);
  let [res, setRes] = useState("Roll");
  let [imageSource, setImage] = useState(dice1);
  let [target, setTarget] = useState(100);
  function num() {
    let x = Math.floor(Math.random() * 6 + 1);

    if (rand === 1) {
      setImage(dice1);
    } else if (rand === 2) {
      setImage(dice2);
    } else if (rand === 3) {
      setImage(dice3);
    } else if (rand === 4) {
      setImage(dice4);
    } else if (rand === 5) {
      setImage(dice5);
    } else if (rand === 6) {
      setImage(dice6);
    }
    setTimeout(() => {
      setRandom(x);
    }, 3000);
  }
  function increase1() {
    num();
    if (turn === 1) {
      setScore1((prev) => {
        return prev + rand;
      });
    } else if (turn === 2) {
      setScore1((prev) => {
        return prev + rand;
      });
    }
  }
  function increase2() {
    num();
    if (turn === 1) {
      setScore2((prev) => {
        return prev + rand;
      });
    } else if (turn === 2) {
      setScore2((prev) => {
        return prev + rand;
      });
    }
  }

  function play() {
    if (turn === 1) {
      increase1();
      setTurn(2);
    } else if (turn === 2) {
      increase2();
      setTurn(1);
    }
    if (turn === 1) {
    } else if (turn === 2) {
    }

    console.log(turn);
  }
  useEffect(() => {
    if (score1 >= target) {
      setRes("Player 1 Wins");
      setTimeout(() => {
        setScore1(0);
        setScore2(0);
        setRes("Roll");
      }, 5000);
    }
    if (score2 >= target) {
      setRes("Player 2 Wins");
      setTimeout(() => {
        setScore1(0);
        setScore2(0);
        setRes("Roll");
      }, 5000);
    }
  }, [score1, score2]);

  function inputHandler(e) {
    setTarget(e.target.value);
  }
  return (
    <div className="container">
      <h2> Set target: </h2>
      <input value={target} onChange={inputHandler} style={{ width: "30%" }} />
      <h2> Turn: Player {turn}</h2>
      <h1>{score1}</h1>
      <span>&ensp; &ensp; &ensp; &ensp;</span>
      <h1>{score2}</h1>
      <img  src={imageSource} />
      <button onClick={play} style={{ width: "200px" }}>
        {res}
      </button>
    </div>
  )
};

export default Game;
