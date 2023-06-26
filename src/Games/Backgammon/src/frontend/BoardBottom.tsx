import Game from "../logic/models/game";
import Player from "../logic/models/player";
import ThisMove from "../logic/models/this-move";
import OutBar from "./components/OutBar";
import Piece from "./components/Piece";

interface BoardProps {
  game: Game;
  thisMove: ThisMove;
  rollDice: any;
  startGame: any;
  select: any;
}

export default function BoardBottom(props: BoardProps) {
  return (
    <div className="board-bottom">
      <CreateOutBar
        player={props.game.whitePlayer}
        isLeft={true}
        fill={"#e0ded7"}
        {...props}
      />

      <CreateButton />

      <CreateOutBar
        player={props.game.blackPlayer}
        isLeft={false}
        fill={"#232937"}
        {...props}
      />
    </div>
  );

  function CreateButton() {
    return props.game.gameOn ? (
      <button onClick={props.rollDice}>🎲 roll Dice 🎲</button>
    ) : (
      <button onClick={props.startGame}>⚪ Begin Game ⚫</button>
    );
  }

  interface OutBarProps extends BoardProps {
    player: Player;
    isLeft: boolean;
    fill: string;
  }

  function CreateOutBar(props: OutBarProps) {
    return (
      <OutBar
        isLeft={props.isLeft}
        onClick={() => props.select(props.player.outBarIdx)}
        key={props.player.outBarIdx}
        fill={props.fill}
      >
        {props.player.outBar.map(
          (piece: string, pieceIdx: number) =>
            pieceIdx < 6 && (
              <CreatePiece
                key={`${props.player.outBarIdx}-${pieceIdx}-temp`}
                piece={piece}
                pieceIdx={pieceIdx}
                selectedPiece={
                  props.player.name === "White"
                    ? pieceIdx === props.player.outBar.length - 1
                    : pieceIdx === 0
                }
                {...props}
              />
            )
        )}
      </OutBar>
    );
  }

  interface PieceProps extends BoardProps {
    player: Player;
    piece: string;
    pieceIdx: number;
    selectedPiece: boolean;
  }

  function CreatePiece(props: PieceProps) {
    return (
      <Piece
        key={`${props.player.outBarIdx}-${props.pieceIdx}`}
        border={
          (props.thisMove.fromBarIdx === props.player.outBarIdx &&
            props.selectedPiece &&
            "3px solid #671010") ||
          props.player.pieceBorderColor
        }
        color={props.piece}
      >
        {props.player.outBar.length > 6 &&
          ((props.pieceIdx === 5 && props.player.name === "White") ||
            (props.pieceIdx === 0 && props.player.name === "Black")) && (
            <>{props.player.outBar.length - 6}</>
          )}
      </Piece>
    );
  }
}
