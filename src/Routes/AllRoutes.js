import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "../Homepage/Homepage/Homepage";
import Tictactoe from "../Games/Tictactoe/tictactoe";
import Ninetynine from "../Games/Ninetynine/ninetynine";
import Memory from "../Games/Memory/memory";
import TriviaGame from "../Games/Trivia/quiz";
import Fifteenpuzzle from "../Games/15Puzzle/Fifteenpuzzle";
import RockPaperScissors from "../Games/RockPaperScissors/RockPaperScissors";
import BrickBreakout from "../Games/BrickBreakout/BrickBreakout";
import Typo from "../Games/Typo/Typo";
import BallShooting from "../Games/BallShooting/BallShooting";
import MagicMatch from "../Games/Magic-match/magic_match";
import DiceThrow from "../Games/DiceThrow/main";
import Wordle from "../Games/Wordle/Wordle";
import SnakeGame from "../Games/SnakeGame/SnakeGame";
import Tetris from "../Games/tetris/src/components/Tetris";
import Battle from "../Games/BattleShip/App"
import App from "../Games/DragAndDrop/App"
import TicTacToeAI from "../Games/TicTactoeAI/app";
import Arkanoid from "../Games/Arkanoid/App";
import DrumKit from "../Games/Drum-Kit/DrumKit";
import ChessAI from '../Games/ChessAI/appiz';
import Minesweeper from "../Games/Minesweeper/App";
import TangledWords from "../Games/TangledWords/src/App"

function AllRoutes() {
  return (
    <Routes>
      {/* Add all the routes with the right path here after importing them  */}
      <Route path="/" element={<Homepage />} />
      <Route path="/Tic" element={<Tictactoe />} />
      <Route path="/99" element={<Ninetynine />} />
      <Route path="/memory" element={<Memory />} />
      <Route path="/trivia" element={<TriviaGame />} />
      <Route path="15puzzle" element={<Fifteenpuzzle />} />
      <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
      <Route path="/brick-breakout" element={<BrickBreakout />} />
      <Route path="/typo" element={<Typo />} />
      <Route path="/BallShooting" element={<BallShooting />} />
      <Route path="/MagicMatch" element={<MagicMatch />} />
      <Route path="/DiceThrow" element={<DiceThrow />} />
      <Route path="/Wordle" element={<Wordle />} />
      <Route path="/SnakeGame" element={<SnakeGame />} />
      <Route path="/tetris" element={<Tetris />} />
      <Route path="/Battle" element={<Battle />} />
      <Route path="/DragAndDrop" element={<App />} />
      <Route path="/Tictac" element={<TicTacToeAI />} />
      <Route path="/Arkanoid" element={<Arkanoid />} />
      <Route path="/Drum-Kit" element={<DrumKit/>} />
      <Route path="/Chess" element={<ChessAI />} />
      <Route path="/Minesweeper" element={<Minesweeper/>}/>
      <Route path="/TangledWords" element={<TangledWords />}/>
    </Routes>
  );
}

export default AllRoutes;
