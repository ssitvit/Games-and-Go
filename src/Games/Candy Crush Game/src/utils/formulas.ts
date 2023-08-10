export const formulaForColumnOfFour = (boardSize: number) =>
  boardSize * boardSize - (boardSize + boardSize + boardSize) - 1;

export const formulaForColumnOfThree = (boardSize: number) =>
  boardSize * boardSize - (boardSize + boardSize) - 1;

export const formulaForMoveBelow = (boardSize: number) =>
  boardSize * boardSize - boardSize - 1;

export const generateInvalidMoves = (
  boardSize: number,
  isFour: boolean = false
) => {
  const invalidMoves: Array<number> = [];
  for (let i: number = boardSize; i <= boardSize * boardSize; i += boardSize) {
    if (isFour) invalidMoves.push(i - 3);
    invalidMoves.push(i - 2);
    invalidMoves.push(i - 1);
  }
  return invalidMoves;
};
