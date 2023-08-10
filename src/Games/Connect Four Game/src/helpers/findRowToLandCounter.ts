import { counter } from './helpers';

export const findRowToLandCounter = (
  grid: counter[][],
  column: number
): number => {
  let row: number = 0;
  // from top to bottom we search for occupied cell
  while (row < 5 && !grid[row + 1][column]) {
    row++;
  }

  return row;
};
