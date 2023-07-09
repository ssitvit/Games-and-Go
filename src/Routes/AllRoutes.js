import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import TypingMaster from "../Games/typingMaster/typing";

const Homepage = lazy(() => import("../Homepage/Homepage/Homepage"));
const Tictactoe = lazy(() => import("../Games/Tictactoe/tictactoe"));
const Ninetynine = lazy(() => import("../Games/Ninetynine/ninetynine"));
const Memory = lazy(() => import("../Games/Memory/memory"));
const TriviaGame = lazy(() => import("../Games/Trivia/quiz"));
const Fifteenpuzzle = lazy(() => import("../Games/15Puzzle/Fifteenpuzzle"));
const RockPaperScissors = lazy(() =>
  import("../Games/RockPaperScissors/RockPaperScissors")
);
const BrickBreakout = lazy(() =>
  import("../Games/BrickBreakout/BrickBreakout")
);
const Typo = lazy(() => import("../Games/Typo/Typo"));
const BallShooting = lazy(() => import("../Games/BallShooting/BallShooting"));
const MagicMatch = lazy(() => import("../Games/Magic-match/magic_match"));
const DiceThrow = lazy(() => import("../Games/DiceThrow/main"));
const Wordle = lazy(() => import("../Games/Wordle/Wordle"));
const SnakeGame = lazy(() => import("../Games/SnakeGame/SnakeGame"));
const Tetris = lazy(() => import("../Games/tetris/src/components/Tetris"));
const Battle = lazy(() => import("../Games/BattleShip/App"));
const App = lazy(() => import("../Games/DragAndDrop/App"));
const TicTacToeAI = lazy(() => import("../Games/TicTactoeAI/app"));
const Arkanoid = lazy(() => import("../Games/Arkanoid/App"));
const DrumKit = lazy(() => import("../Games/Drum-Kit/DrumKit"));
const ChessAI = lazy(() => import("../Games/ChessAI/appiz"));
const Minesweeper = lazy(() => import("../Games/Minesweeper/App"));
const TangledWords = lazy(() => import("../Games/TangledWords/src/App"));
const typingMaster = lazy(() => import("../Games/typingMaster/typing"));
const GuessTheColor = lazy(() => import("../Games/GuessTheColor/App"));

const doodlejump = lazy(() => import("../Games/doodle-jump/doodlejump"));

const Alphabet = lazy(() => import("../Games/Alphabet_Game/Alphabet"));


function AllRoutes() {
  return (
    <Suspense
      fallback={
        <div className="loading-animation">
          <PacmanLoader
            color={"#f1e702"}
            size={45}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="loader"
          />
        </div>
      }
    >
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
        <Route path="/Drum-Kit" element={<DrumKit />} />
        <Route path="/Chess" element={<ChessAI />} />
        <Route path="/Minesweeper" element={<Minesweeper />} />
        <Route path="/TangledWords" element={<TangledWords />} />
        <Route path="/TypingMaster" element={<TypingMaster />} />
        <Route path="/GuessTheColor" element={<GuessTheColor />} />

        <Route path="/doodle-jump" element={<doodle-jump />} />

        <Route path="/Alphabet_Game" element={<Alphabet />} />

      </Routes>
    </Suspense>
  );
}

export default AllRoutes;
