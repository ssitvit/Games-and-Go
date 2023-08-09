import React, { useState, useEffect } from "react";
import "./style.css";

function SingleDice({ makeStyle, showDice }) {
  console.log(showDice, "showDiceshowDice");

  return (
    <>
      <div
        className="all-dice"
        style={{
          display: showDice === null ? "none" : "block",
        }}
      >
        <div
          className="dice1"
          style={{
            display: showDice === 1 ? "block" : "none",
          }}
        ></div>
        <div
          className="dice2"
          style={{ display: showDice === 2 ? "block" : "none" }}
        ></div>
        <div
          className="dice3"
          style={{
            display: showDice === 3 ? "block" : "none",
          }}
        ></div>
        <div
          className="dice4"
          style={{
            display: showDice === 4 ? "block" : "none",
          }}
        ></div>
        <div
          className="dice5"
          style={{
            display: showDice === 5 ? "block" : "none",
          }}
        ></div>
        <div
          className="dice6"
          style={{
            display: showDice === 6 ? "block" : "none",
          }}
        ></div>
      </div>
    </>
  );
}

export default SingleDice;
