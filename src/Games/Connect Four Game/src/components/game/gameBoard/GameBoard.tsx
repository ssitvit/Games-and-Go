import React from 'react';

import { GameBoardWrapper } from './GameBoardStyles';
import PlayerInfo from '../playerInfo/PlayerInfo';
import Board from '../board/Board';
import GameInfo from '../gameInfo/GameInfo';

const GameBoard: React.FC = () => {
  return (
    <GameBoardWrapper data-testid="gameBoard">
      <PlayerInfo player="player1" key={'left'} />
      <Board />
      <PlayerInfo player="player2" key={'rigth'} />
      <GameInfo />
    </GameBoardWrapper>
  );
};

export default GameBoard;
