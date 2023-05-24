import ImportedText from "./components/imported-text/ImportedText";
import MainGame from "./components/main-game/MainGame";
import "./typo.css";
import { FaHandRock } from "react-icons/fa";

function Typo() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="heading">
          TYPO <FaHandRock />
        </h1>
        <ImportedText />
        <MainGame />
      </div>
    </div>
  );
}

export default Typo;
