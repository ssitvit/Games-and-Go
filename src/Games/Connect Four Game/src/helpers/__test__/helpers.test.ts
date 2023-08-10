import { getCounter, copyBoard, boardIsFull, createGrid } from '../helpers';
import { counter } from '../helpers';

const grid: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
];
const emptyBoard: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

const fullBoard = [
  ['red', 'red', 'red', 'red', 'red', 'red', 'red'],
  ['red', 'red', 'red', 'red', 'red', 'red', 'red'],
  ['red', 'red', 'red', 'red', 'red', 'red', 'red'],
  ['red', 'red', 'red', 'red', 'red', 'red', 'red'],
  ['red', 'red', 'red', 'red', 'red', 'red', 'red'],
  ['red', 'red', 'red', 'red', 'red', 'red', 'red'],
];

describe('helpers testing', () => {
  test('getCounter should retern valid counter if cell is ocupied', () => {
    const counter = getCounter(5, 0, grid);
    expect(counter).toBe('red');
  });
  test('getCounter should retern null  if cell is empty', () => {
    const counter = getCounter(4, 0, grid);
    expect(counter).toBeNull();
  });
  test('getCounter should retern null  if cell is out boundary', () => {
    const counter = getCounter(7, 0, grid);
    expect(counter).toBeNull();
  });

  test('copuBoard should return valid copy', () => {
    const copiedGrid = copyBoard(grid);
    expect(JSON.stringify(copiedGrid)).toBe(JSON.stringify(grid));
  });
  test('boarIfFull should retern true if board is full', () => {
    const isFull = boardIsFull(fullBoard);
    expect(isFull).toBeTruthy();
  });
  test('boarIfFull should retern false if board is not full', () => {
    const isFull = boardIsFull(grid);
    expect(isFull).toBeFalsy();
  });

  test('createGrid should retern emty grid', () => {
    const board = createGrid();
    expect(JSON.stringify(board)).toBe(JSON.stringify(emptyBoard));
  });
});
