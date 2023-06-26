import Player from "./player";

export default class ThisTurn {
  private _rolledDice: boolean = false;
  private _maxMoves: number = 0;
  private _movesMade: number = 0;

  constructor(
    private readonly _turnPlayer: Player,
    private readonly _opponentPlayer: Player,
    private _dices: number[],
    private _beginning: boolean
  ) {
    if (_beginning && _dices.length === 2) {
      if (this._maxMoves === 0 && this.dices[0] === this.dices[1]) {
        this.dices.push(this.dices[0]);
        this.dices.push(this.dices[0]);
      }
      this._beginning = false;
      this._rolledDice = true;
      this._maxMoves = this._dices.reduce((a, b) => a + b, 0);
      this._movesMade = 0;
    } else {
      this._rolledDice = false;
      this._maxMoves = 0;
      this._movesMade = 0;
    }
  }

  public static new = () => new ThisTurn(Player.new(), Player.new(), [], false);

  public get turnPlayer(): Player {
    return this._turnPlayer;
  }

  public get opponentPlayer(): Player {
    return this._opponentPlayer;
  }

  public get rolledDice(): boolean {
    return this._rolledDice;
  }
  public set rolledDice(value: boolean) {
    this._rolledDice = value;
  }

  public get dices(): number[] {
    return this._dices;
  }
  public set dices(value: number[]) {
    this._dices = value;
  }

  public get movesMade(): number {
    return this._movesMade;
  }
  public set movesMade(value: number) {
    this._movesMade = value;
  }

  public get maxMoves(): number {
    return this._maxMoves;
  }
  public set maxMoves(value: number) {
    this._maxMoves = value;
  }

  public clone() {
    const newThisTurn = new ThisTurn(
      this._turnPlayer,
      this._opponentPlayer,
      this._dices,
      false
    );

    newThisTurn.rolledDice = this._rolledDice;
    newThisTurn.maxMoves = this._maxMoves;
    newThisTurn.movesMade = this._movesMade;

    return newThisTurn;
  }
}
