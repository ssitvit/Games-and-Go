export type counter = string | null;

export const getCounter = (
  row: number,
  col: number,
  gameGrid: counter[][]
): counter => {
  if (!gameGrid[row] || !gameGrid[row][col]) return null;
  return gameGrid[row][col];
};

export const copyBoard = (gameGrid: counter[][]) => {
  const copyBoard = gameGrid.map((row) => [...row]);
  return copyBoard;
};

export const boardIsFull = (gameGrid: counter[][]) => {
  for (let i = 0; i < 7; i++) {
    if (!gameGrid[0][i]) return false;
  }
  return true;
};

export const createGrid = () => {
  const grid: counter[][] = [...Array(6)].map(() => Array(7).fill(null));

  return grid;
};
