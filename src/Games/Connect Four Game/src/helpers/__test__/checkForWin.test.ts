import { checkForWin } from '../checkForWin';
import { counter } from '../helpers';

const winGridVertical: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
];
const winGridHorizontal: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', 'red', 'red', 'red', null, null, null],
];
const winGridkForwardSlash: counter[][] = [
  [null, 'red', null, null, null, null, null],
  [null, null, 'red', null, null, null, null],
  [null, null, null, 'red', null, null, null],
  [null, null, null, null, 'red', null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];
const notwinGrid: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
];

describe('checkForWin testting', () => {
  test('should return false for not win grid', () => {
    const isWin = checkForWin(0, 3, notwinGrid, 'red');
    expect(isWin).toBeFalsy();
  });

  test('should return winCombo there is win combo in vertical', () => {
    const win = checkForWin(3, 0, winGridVertical, 'red');

    // @ts-ignore
    const { winner, segments } = win;

    expect(winner).toBe('red');
    expect(segments[0][0]).toBe(2);
    expect(segments[0][1]).toBe(0);
    expect(segments[1][0]).toBe(3);
    expect(segments[1][1]).toBe(0);
    expect(segments[2][0]).toBe(4);
    expect(segments[2][1]).toBe(0);
    expect(segments[3][0]).toBe(5);
    expect(segments[3][1]).toBe(0);
  });
  test('should return winCombo there is win combo in horizontal', () => {
    const win = checkForWin(5, 0, winGridHorizontal, 'red');

    // @ts-ignore
    const { winner } = win;

    expect(winner).toBe('red');
  });
  test('should return winCombo there is win combo in forwardslash', () => {
    const win = checkForWin(0, 1, winGridkForwardSlash, 'red');

    // @ts-ignore
    const { winner } = win;

    expect(winner).toBe('red');
  });
});
