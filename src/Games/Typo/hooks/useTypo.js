import { useState, useRef, useEffect } from "react";

function useTypo() {
  const [isStarted, setIsStarted] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timeRemaning, setTimeRemaning] = useState(60);
  const [isOver, setIsOver] = useState(false);
  const inputRef = useRef();

  function textChangeHandler(event) {
    const { value } = event.target;
    setTextInput(value);
  }

  function countWords(text) {
    const totalWords = text.trim().split(" ").length;
    setWordCount(totalWords);
  }

  useEffect(() => {
    if (isStarted && timeRemaning > 0) {
      setTimeout(() => {
        setTimeRemaning((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaning === 0) {
      countWords(textInput);
      setIsStarted(false);
      setIsOver(true);
    }
  }, [timeRemaning, isStarted]);

  function startGameHandler() {
    setTimeRemaning(60);
    setIsStarted(true);
    setTextInput("");
    setWordCount(0);
    setIsOver(false);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }
  return {
    inputRef,
    textChangeHandler,
    textInput,
    isStarted,
    isOver,
    startGameHandler,
    wordCount,
    timeRemaning,
  };
}

export default useTypo;
