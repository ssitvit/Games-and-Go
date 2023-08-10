import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from './store';
import { boardIsFull, createGrid } from '../helpers/helpers';
import { findRowToLandCounter } from '../helpers/findRowToLandCounter';
import { counter } from '../helpers/helpers';
import { store } from './store';
import { checkForWin } from '../helpers/checkForWin';

type player = {
  name: string;
  color: string;
  score: number;
};

type inintialStateType = {
  [key: string]: any;
  gameIsRunning: boolean;
  gameMode: string;
  p1: player;
  p2: player;
  turn: string;
  gameBoard: counter[][];
  winner: string | null;
  timer: number;
  currentPlayer: string;
  isGamePaused: boolean;
  starterColor: string;
  isTimeForNextTurn: boolean;
  CPULevel: number;
  winnigComb: {
    [key: string]: boolean;
  };
  pointerColumn: string;
};

const initialState: inintialStateType = {
  gameIsRunning: false,
  gameMode: '',
  p1: {
    name: '',
    color: 'red',
    score: 0,
  },
  p2: {
    name: '',
    color: 'yellow',
    score: 0,
  },
  turn: 'red',
  gameBoard: createGrid(),
  winner: null,
  timer: 30,
  currentPlayer: 'p1',
  isGamePaused: false,
  starterColor: 'red',
  isTimeForNextTurn: true,
  winnigComb: {},
  CPULevel: 4,
  pointerColumn: '0',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<string>) {
      state.gameMode = action.payload;
      state.p1.name = action.payload === 'PvP' ? 'Player 1' : 'You';
      state.p2.name = action.payload === 'PvP' ? 'Player 2' : 'CPU';
      state.currentPlayer = state.p1.color === state.turn ? 'p1' : 'p2';
      state.gameIsRunning = true;
    },
    placeCounter(state, action: PayloadAction<{ col: number; row: number }>) {
      const col = action.payload.col;
      const row = action.payload.row;

      state.gameBoard[row][col] = state.turn;
    },
    changeTurn(state) {
      state.turn = state.turn === 'red' ? 'yellow' : 'red';
      state.timer = 30;
      state.currentPlayer = state.p1.color === state.turn ? 'p1' : 'p2';
    },

    checkForWinner(state, action: PayloadAction<{ col: number; row: number }>) {
      const { gameBoard } = current(state);
      const col = action.payload.col;
      const row = action.payload.row;

      const winnerComb = checkForWin(row, col, gameBoard, state.turn);
      if (typeof winnerComb !== 'boolean' && winnerComb.winner) {
        const { winner, segments } = winnerComb;
        state.winner = state.p1.color === winner ? 'p1' : 'p2';
        state[state.winner].score++;
        segments.forEach(
          (seg) => (state.winnigComb[`${seg[0]}${seg[1]}`] = true)
        );
        state.isGamePaused = true;
      }
    },
    updateTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },

    playAgain(state) {
      state.gameBoard = createGrid();
      state.timer = 30;
      state.isGamePaused = false;
      state.winnigComb = {};
      // change turn color to color that was second in previous round
      state.turn = state.starterColor === 'red' ? 'yellow' : 'red';
      state.starterColor = state.starterColor === 'red' ? 'yellow' : 'red';
      state.currentPlayer = state.p1.color === state.turn ? 'p1' : 'p2';
      state.winner = null;
    },

    restartGame(state) {
      state.gameBoard = createGrid();
      state.timer = 30;
      state.isGamePaused = false;
      state.winnigComb = {};
      // return initial turn color
      state.turn = state.starterColor;

      state.currentPlayer = state.p1.color === state.turn ? 'p1' : 'p2';
      state.winner = null;
    },

    quitGame: () => initialState,

    pauseGame(state) {
      state.isGamePaused = true;
    },
    continueGame(state) {
      state.isGamePaused = false;
    },
    setIsTimeToNextTurn(state, action: PayloadAction<boolean>) {
      state.isTimeForNextTurn = action.payload;
    },
    setCPULevel(state, action: PayloadAction<number>) {
      state.CPULevel = action.payload;
    },
    setWinner(state, action: PayloadAction<string>) {
      state.winner = action.payload;
    },
    checkForTie(state) {
      if (boardIsFull(state.gameBoard)) {
        state.winner = 'tie';
      }
    },
    setPointercolumn(state, action: PayloadAction<string>) {
      state.pointerColumn = action.payload;
    },
  },
});

// exporting all actions that we need
export const {
  startGame,
  placeCounter,
  changeTurn,
  checkForWinner,
  updateTimer,
  playAgain,
  pauseGame,
  continueGame,
  restartGame,
  quitGame,
  setIsTimeToNextTurn,
  setCPULevel,
  setWinner,
  checkForTie,
  setPointercolumn,
} = gameSlice.actions;

// exporting all states that we need
export const selectGameIsRunning = (state: RootState) =>
  state.game.gameIsRunning;
export const selectPlayer1 = (state: RootState) => state.game.p1;
export const selectPlayer2 = (state: RootState) => state.game.p2;
export const selectTurn = (state: RootState) => state.game.turn;
export const selectGameBoard = (state: RootState) => state.game.gameBoard;
export const selectWinner = (state: RootState) => state.game.winner;
export const selectGameMode = (state: RootState) => state.game.gameMode;
export const selectTimer = (state: RootState) => state.game.timer;
export const selectPointerColumn = (state: RootState) =>
  state.game.pointerColumn;
export const selectIsTimeForNextTurn = (state: RootState) =>
  state.game.isTimeForNextTurn;
export const selectWinnigCombination = (state: RootState) =>
  state.game.winnigComb;
export const selectIsGamePaused = (state: RootState) => state.game.isGamePaused;
export const selectCurrentPlayer = (state: RootState) =>
  state.game.currentPlayer;

// exporting reducer
export const gameReducer = gameSlice.reducer;

export const makeMove = (col: number) => {
  return (
    dispatch: typeof store.dispatch,
    getState: typeof store.getState
  ): boolean => {
    // getting current game settings
    const { game } = getState();
    const gameBoard = game.gameBoard;
    // if column is full or there is a winner or animation is in process when return false
    if (gameBoard[0][col] || game.winner || !game.isTimeForNextTurn)
      return false;
    // set time to next turn to false to prevent amking move before end of animation
    dispatch(setIsTimeToNextTurn(false));
    // getting row in column with empty cell
    const row = findRowToLandCounter(gameBoard, col);
    // place counter
    dispatch(placeCounter({ col, row }));
    // checkforwin
    dispatch(checkForWinner({ col, row }));
    // checking for tie
    dispatch(checkForTie());
    // change turn
    dispatch(changeTurn());
    // after 0.4s we set time to next turn to true
    // we need this time to make sure that counter animation is finished
    setTimeout(() => {
      dispatch(setIsTimeToNextTurn(true));
    }, 400);
    return true;
  };
};
