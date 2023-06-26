import Game from "../models/game";
import ThisMove from "../models/this-move";
import ThisTurn from "../models/this-turn";
import { celebrateGameEnd } from "./end-game";

export function movingPiece(
  game: Game,
  thisTurn: ThisTurn,
  thisMove: ThisMove
): Game {
  const [fromBarIdx, toBarIdx] = [thisMove.fromBarIdx, thisMove.toBarIdx];

  // Throwing opponent piece out
  if (game.board[toBarIdx as number].includes(thisTurn.opponentPlayer.name)) {
    thisTurn.opponentPlayer.outBar.push(
      game.board[toBarIdx as number].pop() as string
    );

    thisTurn.opponentPlayer.inTheEnd = false;

    thisTurn.opponentPlayer.name === game.whitePlayer.name
      ? (game.whitePlayer = thisTurn.opponentPlayer)
      : (game.blackPlayer = thisTurn.opponentPlayer);
  }

  // Returning an out piece
  if (fromBarIdx === thisTurn.turnPlayer.outBarIdx) {
    game.board[toBarIdx as number].push(
      thisTurn.turnPlayer.outBar.pop() as string
    );

    thisTurn.turnPlayer.name === game.whitePlayer.name
      ? (game.whitePlayer = thisTurn.turnPlayer)
      : (game.blackPlayer = thisTurn.turnPlayer);

    return game;
  }

  // Taking a piece out to end bar
  if (fromBarIdx === thisTurn.turnPlayer.endBarIdx) {
    thisTurn.turnPlayer.endBar.push(
      game.board[toBarIdx as number].pop() as string
    );

    thisTurn.turnPlayer.name === game.whitePlayer.name
      ? (game.whitePlayer = thisTurn.turnPlayer)
      : (game.blackPlayer = thisTurn.turnPlayer);

    if (thisTurn.turnPlayer.endBar.length === 15) {
      game.gameOn = false;
      celebrateGameEnd(thisTurn);
    }

    return game;
  }

  // Moving from 'from' to 'to'
  game.board[toBarIdx as number].push(
    game.board[fromBarIdx as number].pop() as string
  );

  return game;
}
