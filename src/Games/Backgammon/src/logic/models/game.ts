import Player from "./player";

export default class Game {
  private _gameOn: boolean;
  private _board: string[][];
  private _whitePlayer: Player;
  private _blackPlayer: Player;

  constructor() {
    this._gameOn = false;
    this._board = Game.initialState();
    this._whitePlayer = new Player(
      "White",
      "⚪ WHITE ⚪",
      "WhiteOutBar",
      "WhiteEndBar",
      "White",
      "1px solid black"
    );
    this._blackPlayer = new Player(
      "Black",
      "⚫ BLACK ⚫",
      "BlackOutBar",
      "BlackEndBar",
      "Black",
      "1px solid #e9e2d6"
    );
  }

  public static new = () => new Game();

  public static initialState = () => [
    ["White", "White", "White", "White", "White"],
    [],
    [],
    [],
    ["Black", "Black", "Black"],
    [],
    ["Black", "Black", "Black", "Black", "Black"],
    [],
    [],
    [],
    [],
    ["White", "White"],
    ["Black", "Black", "Black", "Black", "Black"],
    [],
    [],
    [],
    ["White", "White", "White"],
    [],
    ["White", "White", "White", "White", "White"],
    [],
    [],
    [],
    [],
    ["Black", "Black"],
  ];

  public get gameOn(): boolean {
    return this._gameOn;
  }
  public set gameOn(value: boolean) {
    this._gameOn = value;
  }

  public get board(): string[][] {
    return this._board;
  }
  public set board(value: string[][]) {
    this._board = value;
  }

  public get whitePlayer(): Player {
    return this._whitePlayer;
  }
  public set whitePlayer(value: Player) {
    this._whitePlayer = value;
  }

  public get blackPlayer(): Player {
    return this._blackPlayer;
  }
  public set blackPlayer(value: Player) {
    this._blackPlayer = value;
  }

  public clone() {
    const newGame = new Game();
    newGame.gameOn = this._gameOn;
    newGame.board = [...this._board];
    newGame.whitePlayer = this._whitePlayer.clone();
    newGame.blackPlayer = this.blackPlayer.clone();

    return newGame;
  }
}
