import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function StatsChart() {
  const { matchWords, guessedWords, percentCompleted, clueCounter, guessingAttempts } =
    useContext(GameContext);
  return (
    <>
      <figure className="animate__bounceIn flex flex-col bg-white p-3 rounded border-4 border-blue-400">
        <h1 className="mb-3 text-xl font-bold text-blue-900 text-center">Match Stats</h1>

        <section>

          <div className="flex flex-col text-center bg-slate-300 p-3 my-2 rounded">
            <h1 className="font-bold">Percent completed:</h1>
            <p>{percentCompleted}%</p>
          </div>

          <div className="flex flex-col text-center bg-slate-300 p-3 my-2 rounded">
            <h1 className="font-bold">Guessed words:</h1>
            <p>{guessedWords.length}/{matchWords.length}</p>
          </div>

          <div className="flex flex-col text-center bg-slate-300 p-3 my-2 rounded">
            <h1 className="font-bold">Guessing attempts:</h1>
            <p>{guessingAttempts}</p>
          </div>

          <div className="flex flex-col text-center bg-slate-300 p-3 my-2 rounded">
            <h1 className="font-bold">Remaining clues:</h1>
            <p>{clueCounter}/3</p>
          </div>
          

          

        </section>

      </figure>
    </>
  );
}
