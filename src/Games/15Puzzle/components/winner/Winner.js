import NewGame from "../new-game/NewGame";
import "./Winner.css";

const Winner = ({ numbers, reset }) => {
  if (!numbers.every((n) => n.value === n.index + 1)) return null;

  return (
    <div className="fifpuzzle-winner">
      <p>You win!</p>
      <NewGame reset={reset} />
    </div>
  );
};

export default Winner;
