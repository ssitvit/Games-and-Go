import { boardScore, scorePosition } from '../boardScore';
import { counter } from '../helpers';

const randomGrid1: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', null, null, 'yellow', null, null, null],
  ['red', null, null, 'yellow', null, null, null],
  ['red', null, null, 'yellow', 'yellow', null, null],
];
const randomGrid2: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, 'yellow', 'yellow', 'yellow', null, null],
];

const playerWinVerticalyyGrid: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
];
const cpuWinVerticalyyGrid: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['yellow', null, null, null, null, null, null],
  ['yellow', null, null, null, null, null, null],
  ['yellow', null, null, null, null, null, null],
  ['yellow', null, null, null, null, null, null],
];
const cpuWinHorizontalyGrid: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, 'yellow', 'yellow', 'yellow', 'yellow', null],
];
const playerWinHorizontalyGrid: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, 'red', 'red', 'red', 'red', null],
];

const playerWinDiagnal1yGrid: counter[][] = [
  ['red', null, null, null, null, null, null],
  [null, 'red', null, null, null, null, null],
  [null, null, 'red', null, null, null, null],
  [null, null, null, 'red', null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];
const cpuWinDiagnal1yGrid: counter[][] = [
  ['yellow', null, null, null, null, null, null],
  [null, 'yellow', null, null, null, null, null],
  [null, null, 'yellow', null, null, null, null],
  [null, null, null, 'yellow', null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];
const playerWinDiagnal2yGrid: counter[][] = [
  [null, null, null, null, null, null, 'red'],
  [null, null, null, null, null, 'red', null],
  [null, null, null, null, 'red', null, null],
  [null, null, null, 'red', null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];
const cpuWinDiagnal2yGrid: counter[][] = [
  [null, null, null, null, null, null, 'yellow'],
  [null, null, null, null, null, 'yellow', null],
  [null, null, null, null, 'yellow', null, null],
  [null, null, null, 'yellow', null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

describe('board score testing', () => {
  test('boardScore should return 35', () => {
    const points = boardScore(randomGrid1, 100000);
    expect(points).toBe(35);
  });

  test('boardScore should return 17', () => {
    const points = boardScore(randomGrid2, 100000);
    expect(points).toBe(17);
  });
  test('boardScore should return 100000 when cpu wins verticaly', () => {
    const points = boardScore(cpuWinVerticalyyGrid, 100000);
    expect(points).toBe(100000);
  });
  test('boardScore should return -100000 when player wins verticaly', () => {
    const points = boardScore(playerWinVerticalyyGrid, 100000);
    expect(points).toBe(-100000);
  });

  test('boardScore should return 100000 when cpu wins horizontaly', () => {
    const points = boardScore(cpuWinHorizontalyGrid, 100000);
    expect(points).toBe(100000);
  });

  test('boardScore should return -100000 when player wins horizontaly', () => {
    const points = boardScore(playerWinHorizontalyGrid, 100000);
    expect(points).toBe(-100000);
  });
  test('boardScore should return 100000 when cpu wins diagonal1', () => {
    const points = boardScore(cpuWinDiagnal1yGrid, 100000);
    expect(points).toBe(100000);
  });

  test('boardScore should return -100000 when player wins diagonal1', () => {
    const points = boardScore(playerWinDiagnal1yGrid, 100000);
    expect(points).toBe(-100000);
  });
  test('boardScore should return 100000 when cpu wins diagonal2', () => {
    const points = boardScore(cpuWinDiagnal2yGrid, 100000);
    expect(points).toBe(100000);
  });

  test('boardScore should return -100000 when player wins diagonal2', () => {
    const points = boardScore(playerWinDiagnal2yGrid, 100000);
    expect(points).toBe(-100000);
  });

  test('scorePosition should return 3', () => {
    const points = scorePosition(5, 2, 0, 1, randomGrid2, 100000);
    expect(points).toBe(3);
  });
  test('scorePosition should return -100000', () => {
    const points = scorePosition(2, 0, 1, 0, playerWinVerticalyyGrid, 100000);
    expect(points).toBe(-100000);
  });
  test('scorePosition should return 100000', () => {
    const points = scorePosition(5, 2, 0, 1, cpuWinHorizontalyGrid, 100000);
    expect(points).toBe(100000);
  });
});
