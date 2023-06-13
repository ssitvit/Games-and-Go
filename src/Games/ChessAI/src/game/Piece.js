export class Piece {
    type = "";
    color = "";
    canMoveTo = [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
    ];
    numOfMoves = 0;
    turnsSinceLastMove = 0;
    importance = 0;
  
    constructor(type, color) {
      this.type = type;
      this.color = color;
      const multiplier = color === "W" ? 1 : -1;
      if (type === "King") this.importance = 10000 * multiplier;
      else if (type === "Queen") this.importance = 2000 * multiplier;
      else if (type === "Knight") this.importance = 200 * multiplier;
      else if (type === "Rook") this.importance = 150 * multiplier;
      else if (type === "Bishop") this.importance = 150 * multiplier;
      else this.importance = 50 * multiplier;
    }
  }
  