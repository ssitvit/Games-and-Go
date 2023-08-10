import { act, waitFor } from '@testing-library/react';
import { counter } from '../../helpers/helpers';
import {
  startGame,
  placeCounter,
  changeTurn,
  checkForWinner,
  updateTimer,
  quitGame,
  setIsTimeToNextTurn,
  setWinner,
  makeMove,
} from '../gameSlice';

import { store } from '../store';
const emptyBoard: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

const winComb = { '20': true, '30': true, '40': true, '50': true };
const initialState = {
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
  gameBoard: emptyBoard,
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

describe('GameSlice testing', () => {
  test('should have right inital state', () => {
    const state = store.getState().game;

    expect(JSON.stringify(state)).toBe(JSON.stringify(initialState));
  });

  test('startGame reducer testing PvP mode', () => {
    store.dispatch(startGame('PvP'));
    const gameState = store.getState().game;
    expect(gameState.gameMode).toBe('PvP');
    expect(gameState.p1.name).toBe('Player 1');
    expect(gameState.p2.name).toBe('Player 2');
    expect(gameState.currentPlayer).toBe('p1');
    expect(gameState.gameIsRunning).toBeTruthy();
    store.dispatch(quitGame());
  });
  test('startGame reducer testing CPUvP mode', () => {
    store.dispatch(startGame('CPUvP'));
    const gameState = store.getState().game;
    expect(gameState.gameMode).toBe('CPUvP');
    expect(gameState.p1.name).toBe('You');
    expect(gameState.p2.name).toBe('CPU');
    expect(gameState.currentPlayer).toBe('p1');
    expect(gameState.gameIsRunning).toBeTruthy();
    store.dispatch(quitGame());
  });

  test('placeCounter testing', () => {
    store.dispatch(startGame('PvP'));
    store.dispatch(placeCounter({ col: 0, row: 5 }));
    const gameState = store.getState().game;
    expect(gameState.gameBoard[5][0]).toBe('red');
    store.dispatch(quitGame());
  });

  test('changeTurnTesting', async () => {
    store.dispatch(startGame('PvP'));
    const gameStateInitial = store.getState().game;
    expect(gameStateInitial.turn).toBe('red');
    expect(gameStateInitial.currentPlayer).toBe('p1');
    act(() => {
      store.dispatch(changeTurn());
    });
    const gameStateAfterCAll = store.getState().game;

    await waitFor(() => {
      expect(gameStateAfterCAll.turn).toBe('yellow');
    });
    expect(gameStateAfterCAll.currentPlayer).toBe('p2');

    store.dispatch(quitGame());
  });

  test('checkForWinner testing p1 wins', () => {
    store.dispatch(startGame('PvP'));
    store.dispatch(placeCounter({ col: 0, row: 5 }));
    store.dispatch(placeCounter({ col: 0, row: 4 }));
    store.dispatch(placeCounter({ col: 0, row: 3 }));
    store.dispatch(placeCounter({ col: 0, row: 2 }));
    store.dispatch(checkForWinner({ col: 0, row: 2 }));

    const gameState = store.getState().game;

    expect(gameState.winner).toBe('p1');
    expect(gameState.p1.score).toBe(1);
    expect(gameState.isGamePaused).toBe(true);

    store.dispatch(quitGame());
  });
  test('checkForWinner testing p2 wins', () => {
    store.dispatch(startGame('PvP'));
    store.dispatch(changeTurn());
    store.dispatch(placeCounter({ col: 0, row: 5 }));
    store.dispatch(placeCounter({ col: 0, row: 4 }));
    store.dispatch(placeCounter({ col: 0, row: 3 }));
    store.dispatch(placeCounter({ col: 0, row: 2 }));
    store.dispatch(checkForWinner({ col: 0, row: 2 }));

    const gameState = store.getState().game;

    expect(gameState.winner).toBe('p2');
    expect(gameState.p2.score).toBe(1);
    expect(gameState.isGamePaused).toBe(true);

    store.dispatch(quitGame());
  });

  test('updateTimer testing', () => {
    store.dispatch(startGame('PvP'));
    const gameStateInitial = store.getState().game;
    expect(gameStateInitial.timer).toBe(30);
    store.dispatch(updateTimer(29));
    const gameAfterCall = store.getState().game;
    expect(gameAfterCall.timer).toBe(29);
    store.dispatch(quitGame());
  });

  test('setIsTimeToNextTurn testing', async () => {
    store.dispatch(startGame('PvP'));
    const gameStateInitial = store.getState().game;
    expect(gameStateInitial.isTimeForNextTurn).toBe(true);
    act(() => {
      store.dispatch(setIsTimeToNextTurn(false));
    });
    const gameStateAfterCall = store.getState().game;
    await waitFor(() => {
      expect(gameStateAfterCall.isTimeForNextTurn).toBe(false);
    });
    store.dispatch(quitGame());
  });

  test('makeMove testing should return true and should set winner if theres is no winner', async () => {
    store.dispatch(startGame('PvP'));
    let move;
    act(() => {
      move = store.dispatch(makeMove(0));
    });
    expect(move).toBeTruthy();
    const storeState = store.getState().game;

    expect(storeState.winner).toBeNull();
    await waitFor(() => {
      expect(storeState.turn).toBe('yellow');
    });

    store.dispatch(quitGame());
  });
  test('makeMove testing should return true and set winner if there is a winner', () => {
    store.dispatch(startGame('PvP'));
    store.dispatch(placeCounter({ col: 0, row: 5 }));
    store.dispatch(placeCounter({ col: 0, row: 4 }));
    store.dispatch(placeCounter({ col: 0, row: 3 }));

    store.dispatch(makeMove(0));

    const storeState = store.getState().game;

    expect(storeState.winner).toBe('p1');
    expect(JSON.stringify(storeState.winnigComb)).toBe(JSON.stringify(winComb));
    store.dispatch(quitGame());
  });
  test('makeMove testing should return false if column is full', () => {
    store.dispatch(startGame('PvP'));
    store.dispatch(placeCounter({ col: 0, row: 5 }));
    store.dispatch(placeCounter({ col: 0, row: 4 }));
    store.dispatch(placeCounter({ col: 0, row: 3 }));
    store.dispatch(placeCounter({ col: 0, row: 2 }));
    store.dispatch(placeCounter({ col: 0, row: 1 }));
    store.dispatch(placeCounter({ col: 0, row: 0 }));

    const move = store.dispatch(makeMove(0));

    expect(move).toBeFalsy();
    store.dispatch(quitGame());
  });
  test('makeMove testing should return false if winner is set', () => {
    store.dispatch(startGame('PvP'));
    store.dispatch(setWinner('p1'));

    const move = store.dispatch(makeMove(0));

    expect(move).toBeFalsy();
    store.dispatch(quitGame());
  });
  test('makeMove testing should return false if isTimeForNextTrun is false', () => {
    store.dispatch(startGame('PvP'));
    store.dispatch(setIsTimeToNextTurn(false));

    const move = store.dispatch(makeMove(0));

    expect(move).toBeFalsy();
    store.dispatch(quitGame());
  });
});
