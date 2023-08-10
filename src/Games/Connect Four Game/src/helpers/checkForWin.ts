import { counter } from './helpers';
import { getCounter } from './helpers';

type coordinates = {
  focalRow: number;
  focalCol: number;
  minRow: number;
  minCol: number;
  maxRow: number;
  maxCol: number;
};

type winComb = {
  winner: string | null;
  segments: number[][];
};

const min = (num: number): number => Math.max(num - 3, 0);
const max = (num: number, max: number): number => Math.min(num + 3, max);

// chek for win inspired by https://stackoverflow.com/questions/32770321/connect-4-check-for-a-win-algorithm

const getWinner = (
  firstSegment: number[],
  secondSegment: number[],
  thirdegment: number[],
  fourthSegment: number[],
  gameGrid: counter[][],
  turn: string
): boolean | winComb => {
  const segments = [firstSegment, secondSegment, thirdegment, fourthSegment];
  // check if where is more then 4 coutners in segement
  if (segments.length !== 4) return false;
  let counters = segments.map(([row, col]) => {
    // get counter from game board
    return getCounter(row, col, gameGrid);
  });

  // get color
  const color = counters[0];
  // if there is no color --> segment is not completed
  if (!color) return false;
  // if every color in segment is the same is win retrun
  // winner color and win combo segemnts
  if (counters.every((c) => c === turn)) {
    return { winner: turn, segments };
  }

  return false;
};

// Check for all possible horizontal segmetns near counter that were places
const checkHorizontalSegments = (
  { focalRow, minCol, maxCol, focalCol }: coordinates,
  gameGrid: counter[][],
  turn: string
) => {
  for (let row = focalRow, col = minCol; col <= maxCol; col++) {
    // Check segment for win
    const winner = getWinner(
      [row, col],
      [row, col + 1],
      [row, col + 2],
      [row, col + 3],
      gameGrid,
      turn
    );

    if (winner) return winner;
  }
  return false;
};

// Check for all possible vertical segmetns near counter that were places

const checkVerticalSegments = (
  { focalRow, focalCol, minRow, maxRow }: coordinates,
  gameGrid: counter[][],
  turn: string
) => {
  for (let col = focalCol, row = minRow; row <= focalRow; row++) {
    const winner = getWinner(
      [row, col],
      [row + 1, col],
      [row + 2, col],
      [row + 3, col],
      gameGrid,
      turn
    );
    if (winner) return winner;
  }
  return false;
};
// Check for all possible diagonal \ near counter that were places
const checkForwardSlashSegments = (
  { focalRow, focalCol, minRow, minCol, maxRow, maxCol }: coordinates,
  gameGrid: counter[][],
  turn: string
) => {
  const startForwardSlash = (row: number, col: number) => {
    while (row > minRow && col > minCol) {
      row--;
      col--;
    }
    return [row, col];
  };

  for (
    let [row, col] = startForwardSlash(focalRow, focalCol);
    row <= maxRow && col <= maxCol;
    row++, col++
  ) {
    const winner = getWinner(
      [row, col],
      [row + 1, col + 1],
      [row + 2, col + 2],
      [row + 3, col + 3],
      gameGrid,
      turn
    );
    if (winner) return winner;
  }
  return false;
};
// Check for all possible diagonal / near counter that were places
const checkBackwardSlashSegments = (
  { focalRow, focalCol, minRow, minCol, maxRow, maxCol }: coordinates,
  gameGrid: counter[][],
  turn: string
) => {
  const startBackwardSlash = (row: number, col: number) => {
    while (row < maxRow && col > minCol) {
      row++;
      col--;
    }
    return [row, col];
  };
  for (
    let [row, col] = startBackwardSlash(focalRow, focalCol);
    row >= minRow && col <= maxCol;
    row--, col++
  ) {
    const winner = getWinner(
      [row, col],
      [row - 1, col + 1],
      [row - 2, col + 2],
      [row - 3, col + 3],
      gameGrid,
      turn
    );
    if (winner) return winner;
  }
  return false;
};

export const checkForWin = (
  focalRow: number,
  focalCol: number,
  gameGrid: counter[][],
  turn: string
) => {
  // difenes min and max columns and rows for particular counter
  //  0  1  2  3  4  5  6
  // [ ][ ][ ][ ][ ][ ][ ] 0
  // [x][our counter][x][x][ ][ ][ ] 1
  // [ ][ ][ ][ ][ ][ ][ ] 2
  // [ ][ ][ ][ ][ ][ ][ ] 3
  // [ ][ ][ ][ ][ ][ ][ ] 4
  // [ ][ ][ ][ ][ ][ ][ ] 5
  const minCol = min(focalCol);
  const maxCol = max(focalCol, 6);
  const minRow = min(focalRow);
  const maxRow = max(focalRow, 5);
  const coords: coordinates = {
    focalRow,
    focalCol,
    minRow,
    minCol,
    maxRow,
    maxCol,
  };

  return (
    checkHorizontalSegments(coords, gameGrid, turn) ||
    checkVerticalSegments(coords, gameGrid, turn) ||
    checkForwardSlashSegments(coords, gameGrid, turn) ||
    checkBackwardSlashSegments(coords, gameGrid, turn)
  );
};
