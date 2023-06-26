import { toast } from "react-hot-toast";
import { toastStyle } from "../../App";
import ThisTurn from "../models/this-turn";

export function dice(): number[] {
  const first = Math.floor(Math.random() * 6) + 1;
  const second = Math.floor(Math.random() * 6) + 1;

  return [first, second];
}

export function rollingDice(tempTurn: ThisTurn) {
  const thisTurn = new ThisTurn(
    tempTurn.turnPlayer,
    tempTurn.opponentPlayer,
    dice(),
    true
  );

  if (thisTurn.dices[0] === thisTurn.dices[1]) {
    toast.success(
      `${thisTurn.turnPlayer.icon}
      🎲 Rolled a double ${thisTurn.dices} 🎲`,
      toastStyle(thisTurn)
    );
  } else {
    toast.success(
      `${thisTurn.turnPlayer.icon}
      🎲 Rolled ${thisTurn.dices} 🎲`,
      toastStyle(thisTurn)
    );
  }

  return thisTurn;
}
