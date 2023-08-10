import { useEffect, useState } from "react";
import { createContext } from "react";
import { gameLetters } from "../utils/letters";
import { gameWords } from "../utils/words";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [matchLetters, setMatchLetters] = useState([]);
  const [matchWords, setMatchWords] = useState([]);

  const [selectedLetters, setSelectedLetters] = useState([]);

  const [guessedWords, setGuessedWords] = useState([]);

  const [percentCompleted, setPercentCompleted] = useState(0);

  const [clueCounter, setClueCounter] = useState(3);
  const [clueWord, setClueWord] = useState(null);

  const [guessingAttempts, setGuessingAttempts] = useState(0);
  const [error, setError] = useState(null);

  const setMatch = () => {
    setMatchLetters([]);
    setMatchWords([]);
    setGuessedWords([]);
    setSelectedLetters([]);
    setGuessingAttempts(0);
    setClueCounter(3);
    setClueWord(null);
    setError(null);
    setPercentCompleted(0);

    const randInt = Math.floor(Math.random() * 5);
    let objectLetters = [];
    gameLetters[randInt].forEach((letter, index) => {
      objectLetters.push({ id: index, value: letter });
    });

    setMatchLetters(objectLetters);

    let upperCasedWords = [];
    gameWords[randInt].forEach((word) => {
      upperCasedWords.push(word.toUpperCase());
    });

    setMatchWords(upperCasedWords);
  };

  const resetError = () => {
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  useEffect(() => {
    setMatch();
  }, []);

  useEffect(() => {}, [error]);

  const handleClickLetterBtn = (e) => {
    const id = Number(e.target.value);
    let letter = matchLetters.find((letter) => letter.id === id);
    console.log(letter);
    if (!selectedLetters.includes(letter)) {
      setSelectedLetters([...selectedLetters, letter]);
    } else {
      const index = selectedLetters.findIndex((letter) => letter.id === id);
      const updatedSelectedLetters = [...selectedLetters];
      updatedSelectedLetters.splice(index, 1);
      setSelectedLetters(updatedSelectedLetters);
    }
  };
  const handleClickMergeLetters = () => {
    let lettersValues = [];
    selectedLetters.forEach((letter) => lettersValues.push(letter.value));
    console.log(lettersValues);
    let formedWord = lettersValues.join("");
    console.log(formedWord);
    if (matchWords.includes(formedWord)) {
      if (guessedWords.includes(formedWord)) {
        setSelectedLetters([]);
        setError("Word already guessed!");
        resetError();
        setGuessingAttempts(guessingAttempts + 1);
      } else {
        setError(null);
        setSelectedLetters([]);
        setGuessedWords([...guessedWords, formedWord]);
        setPercentCompleted(percentCompleted + 5);
      }
    } else {
      setSelectedLetters([]);
      setError("Incorrect word!");
      resetError();
      setGuessingAttempts(guessingAttempts + 1);
    }
  };

  const handleClickClueBtn = () => {
    if (clueCounter > 0) {
      let randInt = Math.floor(Math.random() * matchWords.length);

      if (guessedWords.includes(matchWords[randInt])) {
        randInt -= 1;
        setClueWord(matchWords[randInt]);
      } else {
        setClueWord(matchWords[randInt]);
      }

      setClueCounter(clueCounter - 1);
    }
  };

  return (
    <GameContext.Provider
      value={{
        setMatch,
        matchLetters,
        matchWords,
        selectedLetters,
        guessedWords,
        clueCounter,
        clueWord,
        guessingAttempts,
        percentCompleted,
        handleClickLetterBtn,
        handleClickMergeLetters,
        handleClickClueBtn,
        error,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
