import { findRowToLandCounter } from '../findRowToLandCounter';
import { counter } from '../helpers';
const grid1: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
];
const grid2: counter[][] = [
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
];

describe('findRowToLandCounter testing', () => {
  test('should return 3 for grid1', () => {
    const row = findRowToLandCounter(grid1, 0);
    expect(row).toBe(3);
  });
  test('should return 0 for grid2', () => {
    const row = findRowToLandCounter(grid2, 0);
    expect(row).toBe(0);
  });
});
