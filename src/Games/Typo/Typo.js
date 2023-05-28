import ImportedText from "./components/imported-text/ImportedText";
import MainGame from "./components/main-game/MainGame";
import "./typo.css";
import { FaHandRock } from "react-icons/fa";
import Game from "../pause_resume"

function Typo() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="heading">
          TYPO <FaHandRock />
        </h1>
        <ImportedText />
        <MainGame />
        <Game />
      </div>
    </div>
  );
}

export default Typo;
