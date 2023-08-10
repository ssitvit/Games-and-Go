import { counter } from './helpers';
import { copyBoard } from './helpers';
import { boardScore } from './boardScore';
import { findRowToLandCounter } from './findRowToLandCounter';
import { boardIsFull } from './helpers';

export function maximizePlay(
  gameGrid: counter[][],
  depth: number,
  gameScore: number,
  alpha?: number,
  beta?: number
): [null | number, number] {
  let gameColumns = 7;
  //  check current board score for cpu
  const score = boardScore(gameGrid, gameScore);
  // stop calculation if
  // -we reached depth 0
  //  gameScore is Infinity cpu wins
  //  gameScore is -Infinity player wins
  //  there is no more space
  if (
    depth === 0 ||
    score === gameScore ||
    score === -gameScore ||
    boardIsFull(gameGrid)
  )
    return [null, score];

  // current best Column, Score
  let max: [null | number, number] = [null, -Infinity];

  //   For all possible moves
  for (let column = 0; column < gameColumns; column++) {
    let new_board = copyBoard(gameGrid); // Create new board
    const row = findRowToLandCounter(new_board, column);
    //  check if this place if empty
    if (!new_board[row][column]) {
      // plave counter in empty position
      new_board[row][column] = 'yellow';

      let next_move = minimizePlay(
        new_board,
        depth - 1,
        gameScore,
        alpha,
        beta
      ); // Recursive calling

      // Evaluate new move
      if (max[0] === null || next_move[1] > max[1]) {
        max[0] = column;
        max[1] = next_move[1];

        alpha = next_move[1];
      }
      // @ts-ignore
      if (alpha >= beta) return max;
    }
  }

  return max;
}

export function minimizePlay(
  gameGrid: counter[][],
  depth: number,
  gameScore: number,
  alpha?: number,
  beta?: number
): [null | number, number] {
  let gameColumns = 7;
  //  check current board score for cpu
  const score = boardScore(gameGrid, gameScore);
  // stop calculation if
  // -we reached depth 0
  //  gameScore is Infinity cpu wins
  //  gameScore is -Infinity player wins
  //  there is no more space
  if (
    depth === 0 ||
    score === gameScore ||
    score === -gameScore ||
    boardIsFull(gameGrid)
  )
    return [null, score];
  // current best Column, Score
  let min: [null | number, number] = [null, Infinity];
  //   For all possible moves
  for (let column = 0; column < gameColumns; column++) {
    // creating new board
    let new_board = copyBoard(gameGrid);
    // findig row to place counter
    const row = findRowToLandCounter(new_board, column);
    //  check if this place if empty
    if (!new_board[row][column]) {
      new_board[row][column] = 'red';

      let next_move = maximizePlay(
        new_board,
        depth - 1,
        gameScore,
        alpha,
        beta
      );
      // Evaluate new move
      if (min[0] == null || next_move[1] < min[1]) {
        min[0] = column;
        min[1] = next_move[1];

        beta = next_move[1];
      }
      // @ts-ignore
      if (alpha >= beta) return min;
    }
  }

  return min;
}
