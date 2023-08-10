import { maximizePlay } from '../aiMove';
import { counter } from '../helpers';

const grid1: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['yellow', null, null, null, null, null, null],
  ['yellow', null, null, null, null, null, null],
  ['yellow', null, null, null, null, null, null],
];
const grid2: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, 'red', null],
  [null, null, null, null, null, 'red', null],
  [null, null, null, null, null, 'red', null],
];
const grid3: counter[][] = [
  ['yellow', 'red', 'yellow', null, null, null, null],
  ['red', 'yellow', 'red', null, null, null, null],
  ['yellow', 'red', 'yellow', null, null, null, null],
  ['red', 'yellow', 'red', null, null, null, null],
  ['yellow', 'red', 'yellow', null, null, 'red', null],
  ['red', 'yellow', 'red', null, null, 'red', null],
];

describe('aiMove testting', () => {
  test('should place counter in 0 column for grid 1', () => {
    const move = maximizePlay(grid1, 2, 100000, 0);
    expect(move[0]).toBe(0);
  });
  test('should place counter in 5 column for grid 2', () => {
    const move = maximizePlay(grid2, 2, 100000, 0);
    expect(move[0]).toBe(5);
  });
  test('should place counter in 5 column for grid 3', () => {
    const move = maximizePlay(grid3, 2, 100000, 0);
    expect(move[0]).toBe(3);
  });
});
