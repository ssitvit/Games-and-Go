import { Piece } from "./Piece";

export const initialBoard = [
  [
    new Piece("Rook", "B"),
    new Piece("Knight", "B"),
    new Piece("Bishop", "B"),
    new Piece("Queen", "B"),
    new Piece("King", "B"),
    new Piece("Bishop", "B"),
    new Piece("Knight", "B"),
    new Piece("Rook", "B"),
  ],
  [
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
    new Piece("Pawn", "B"),
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
    new Piece("Pawn", "W"),
  ],
  [
    new Piece("Rook", "W"),
    new Piece("Knight", "W"),
    new Piece("Bishop", "W"),
    new Piece("Queen", "W"),
    new Piece("King", "W"),
    new Piece("Bishop", "W"),
    new Piece("Knight", "W"),
    new Piece("Rook", "W"),
  ],
];

export const initiallyCanMoveTo = [
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
];
