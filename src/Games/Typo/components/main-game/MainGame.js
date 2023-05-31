import React, { useEffect, useRef, useState } from "react";
import "./main-game.css";
import { AiFillClockCircle } from "react-icons/ai";
import { RiNumbersFill } from "react-icons/ri";
import Confetti from "react-confetti";
import useTypo from "../../hooks/useTypo";
const MainGame = () => {
  const {
    inputRef,
    textChangeHandler,
    textInput,
    isStarted,
    isOver,
    startGameHandler,
    wordCount,
    timeRemaning,
  } = useTypo();
  return (
    <section>
      <textarea
        ref={inputRef}
        onChange={textChangeHandler}
        value={textInput}
        disabled={!isStarted}
      />
      <div className="main-box">
        <h1 className="main-h1">
          Timer <AiFillClockCircle /> : {timeRemaning} s
        </h1>
        <button
          className="btn-change"
          onClick={startGameHandler}
          disabled={isStarted}
        >
          Start Game
        </button>
        <h1 className="main-h1">
          Word Count <RiNumbersFill /> : {wordCount} w/m
        </h1>
      </div>

      {isOver && (
        <p className="result"> Your Speed is {wordCount} Words/Minute </p>
      )}
      {isOver && <Confetti></Confetti>}
    </section>
  );
};

export default MainGame;
