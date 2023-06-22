import React, { useState, useEffect } from "react";
import "./tangled-words.sass";

const WORDS = [
  "serendipity",
  "mellifluous",
  "ebullient",
  "epiphany",
  "ethereal",
  "resilience",
  "luminary",
  "serenity",
  "enigma",
  "jubilant",
  "euphoria",
  "solitude",
  "ineffable",
  "harmonious",
  "radiant",
  "zenith",
  "reverie",
  "tranquil",
  "resplendent",
  "elixir"
];

const TangledWords = () => {
  const [isPlayOn, setIsPlayOn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [correctWord, setCorrectWord] = useState("");
  const [tangledWord, setTangledWord] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [message, setMessage] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds

  const handleInputChange = (event) => {
    setInputValue(event.target.value.toUpperCase());
  };

  const selectWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const tempWord = WORDS[randomIndex];
    return tempWord;
  };

  const handleButtonClick = () => {
    if (inputValue !== "") {
      if (correctWord === inputValue) {
        setMessage("Correct Answer");
      } else {
        setMessage("Wrong Answer");
      }
    }
  };

  const handleHintClick = () => {
    if (!hintUsed) {
      const hintIndex = Math.floor(Math.random() * correctWord.length);
      const hintLetter = correctWord[hintIndex];
      const updatedInputValue = inputValue.split("");
      updatedInputValue[hintIndex] = hintLetter;
      setInputValue(updatedInputValue.join(""));
      setHintUsed(true);
    }
  };

  const handleStartGame = () => {
    setIsPlayOn(true);
    setInputValue("");
    setMessage("");
    setHintUsed(false);
    setTimeRemaining(60);

    const word = selectWord().toUpperCase();
    setCorrectWord(word);
    setTangledWord(constructTangledWord(word));
  };

  const constructTangledWord = (word) => {
    const shuffledArray = word.split("");
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray.join("");
  };

  useEffect(() => {
    let clearMessage;
    if (message === "Wrong Answer") {
      clearMessage = setTimeout(() => setMessage(""), 800);
    }

    return () => {
      if (clearMessage) {
        clearTimeout(clearMessage);
      }
    };
  }, [message]);

  useEffect(() => {
    let countdown;
    if (isPlayOn && timeRemaining > 0) {
      countdown = setTimeout(() => setTimeRemaining((prevTime) => prevTime - 1), 1000);
    } else if (timeRemaining === 0) {
      setMessage("Time's up!");
    }

    return () => {
      if (countdown) {
        clearTimeout(countdown);
      }
    };
  }, [isPlayOn, timeRemaining]);

  useEffect(() => {
    if (isPlayOn && message === "Correct Answer") {
      setTimeRemaining(0);
    }
  }, [isPlayOn, message]);

  return (
    <div className="tangled_words">
      {!!message && (
        <div className="message">
          <p> {message}</p>
        </div>
      )}

      <h1>Enjoy!</h1>
      <div className="content">
        {isPlayOn ? (
          <>
            <div className="board">
              {correctWord.split("").map((el, i) => (
                <span key={`${el}_${i}`} className="square_bg">
                  {inputValue[i]}
                </span>
              ))}
            </div>
            <p className="tangled_word">{tangledWord}</p>
            <div className="field">
              <input
                type="text"
                onChange={handleInputChange}
                value={inputValue}
              />
              <button type="button" onClick={handleButtonClick}>
                Enter
              </button>
            </div>
            <button
              className="hint_button"
              type="button"
              onClick={handleHintClick}
              disabled={hintUsed}
            >
              Hint
            </button>
			<p>(can be used only once)</p>
      <p>Click enter twice to submit answer~</p>
            <p className="timer">Time Remaining: {timeRemaining} seconds</p>
          </>
        ) : (
          <button
            className="start_game"
            type="button"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        )}

        {isPlayOn && (
          <button
            className="start_game new"
            type="button"
            onClick={handleStartGame}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default TangledWords;
