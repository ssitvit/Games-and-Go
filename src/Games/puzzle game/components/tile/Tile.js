import "./Tile.css";

const Tile = ({ number, moveTile }) => (
  <div
    onClick={() => moveTile(number)}
    className={`fifpuzzle-number ${
      number.value === number.index + 1 ? "correct" : ""
    } ${number.value === 16 ? "disabled" : ""} slot--${number.index}`}
  >
    {number.value === 16 ? "" : number.value}
  </div>
);

export default Tile;
