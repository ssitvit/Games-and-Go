import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function MatchLetterButton({ letter }) {
  const { selectedLetters, handleClickLetterBtn, error } =
    useContext(GameContext);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (selectedLetters.includes(letter)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedLetters]);

  return (
    <>
      <button
        value={letter.id}
        onClick={(e) => {
          handleClickLetterBtn(e);
        }}
        disabled={error ? true : false}
        className={`matchLetter animate__bounceIn transition ease-in-out text-white

        ${isSelected ? "bg-blue-800" : "bg-blue-500"}

        ${error ? "letterDisabled" : ""}
        
        `}
      >
        {letter.value}
      </button>
    </>
  );
}
