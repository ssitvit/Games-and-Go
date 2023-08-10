import React, { useState, useEffect } from "react";
import SingleDice from "./SingleDice";
import "./style.css";

const divStyle = {
  margin: "40px",
  border: "5px solid pink",
};

function Dice({ rollDiceFun, showDice, holdFun, resetGameFun }) {
  return (
    <div>
      <div className="new-game" onClick={() => resetGameFun()}>
        <i className="fa fa-plus-circle"></i>
        New Game
      </div>

      <div
        className="roll-dice"
        onClick={(e) => {
          rollDiceFun();
        }}
      >
        <i className="fa fa-circle"></i> ROLL DICE
      </div>
      <div
        className="hold"
        onClick={(e) => {
          holdFun();
        }}
      >
        <i className="fa fa-pause"></i>
        HOLD
      </div>
      <div>
        <SingleDice showDice={showDice} />
      </div>
    </div>
  );
}

export default Dice;
