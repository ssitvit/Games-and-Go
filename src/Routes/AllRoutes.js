import { Route, Routes } from "react-router-dom";
import Homepage from "../Homepage/Homepage/Homepage";
import { Suspense, lazy } from "react";
import Loader from "../Loader/Loader";

const Tictactoe = lazy(() => import("../Games/Tictactoe/tictactoe"));
const Ninetynine = lazy(() => import("../Games/Ninetynine/ninetynine"));
const Memory = lazy(() => import("../Games/Memory/memory"));
const Simonsays = lazy(() => import("../Games/Simonsays/simon"));
const TriviaGame = lazy(() => import("../Games/Trivia/quiz"));
const Fifteenpuzzle = lazy(() => import("../Games/15Puzzle/Fifteenpuzzle"));
const RockPaperScissors = lazy(() => import("../Games/RockPaperScissors/RockPaperScissors"));
const BrickBreakout = lazy(() => import("../Games/BrickBreakout/BrickBreakout"));
const Typo = lazy(() => import("../Games/Typo/Typo"));
const BallShooting = lazy(() => import("../Games/BallShooting/BallShooting"));

function AllRoutes() {
  return (
    <Routes>
      {/* Add all the routes with the right path here after importing them  */}
      <Route path="/" element={<Homepage />} />
      <Route path="/Tic" element={
        <Suspense fallback={<Loader />}>
          <Tictactoe />
        </Suspense>
      } />
      <Route path="/99" element={
        <Suspense fallback={<Loader />}>
          <Ninetynine />
        </Suspense>
      } />
      <Route path="/memory" element={
        <Suspense fallback={<Loader />}>
          <Memory />
        </Suspense>
      } />
      <Route path="/trivia" element={
        <Suspense fallback={<Loader />}>
          <TriviaGame />
        </Suspense>
      } />
      <Route path="15puzzle" element={
        <Suspense fallback={<Loader />}>
          <Fifteenpuzzle />
        </Suspense>
      } />
      <Route path="/simon" element={
        <Suspense fallback={<Loader />}>
          <Simonsays />
        </Suspense>
      } />
      <Route path="/rock-paper-scissors" element={
        <Suspense fallback={<Loader />}>
          <RockPaperScissors />
        </Suspense>} />
      <Route path="/brick-breakout" element={
        <Suspense fallback={<Loader />}>
          <BrickBreakout />
        </Suspense>
      } />
      <Route path="/typo" element={
        <Suspense fallback={<Loader />}>
          <Typo />
        </Suspense>
      } />
      <Route path="/BallShooting" element={
        <Suspense fallback={<Loader />}>
          <BallShooting />
        </Suspense>
      } />
    </Routes>
  );
}

export default AllRoutes;
