import "./NewGame.css";

const NewGame = ({ reset }) => (
  <div className="fifpuzzle-button-wrapper">
    <button classsName="fifpuzzle-button" onClick={reset}>
      New Game
    </button>
  </div>
);

export default NewGame;
