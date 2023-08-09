import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function FormingWordLettersRecipient() {
  const { selectedLetters, error } = useContext(GameContext);

  return (
    <div className="animate__bounceIn">
      <h1 className="mb-1 text-white font-bold text-center">Forming word:</h1>
      <div className="formingWordLettersRecipient flex items-center justify-center p-3 bg-white rounded text-center">
        {selectedLetters.map((letter, index) => (
          <span key={index} className="animate__bounceIn">{letter.value}</span>
        ))}

        {error !== null ? (
          <div className="animate__bounceIn flex bg-red-500 p-2 rounded text-white">
            <i className="bi bi-x-circle-fill mr-1 " />
            <p>{error}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
