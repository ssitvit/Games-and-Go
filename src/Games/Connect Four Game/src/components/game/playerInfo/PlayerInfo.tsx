import React from 'react';

import { PlayerInfoWrapper, PlayerName, Score } from './PlayerInfoStyles';
import { ReactComponent as YouIcon } from '../../../assets/images/you.svg';
import { ReactComponent as CPUIcon } from '../../../assets/images/cpu.svg';
import { ReactComponent as Player1 } from '../../../assets/images/player-one.svg';
import { ReactComponent as Player2 } from '../../../assets/images/player-two.svg';
import {
  playerInfoLeftVariants,
  playerInfoRigthVariants,
} from '../../../frameMotinVariats/frameMotionVariants';
import { useAppSelector } from '../../../store/hooks';
import {
  selectGameMode,
  selectPlayer1,
  selectPlayer2,
} from '../../../store/gameSlice';

type icons = {
  [key: string]: React.FunctionComponent;
};

const iconsPVP: icons = {
  player1: Player1,
  player2: Player2,
};

const iconsPVCPU: icons = {
  player1: YouIcon,
  player2: CPUIcon,
};

const PlayerInfo: React.FC<{ player: string }> = ({ player }) => {
  const gameMode = useAppSelector(selectGameMode);
  const p1 = useAppSelector(selectPlayer1);
  const p2 = useAppSelector(selectPlayer2);
  // render needed svg base on player name and game mode
  const PalyerIcon = gameMode === 'PvP' ? iconsPVP[player] : iconsPVCPU[player];

  return (
    <PlayerInfoWrapper
      player={player}
      // @ts-ignore
      variants={
        player === 'player1' ? playerInfoLeftVariants : playerInfoRigthVariants
      }
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* depenends on if it player1 or player2 we render different data */}
      <PlayerName>{player === 'player1' ? p1.name : p2.name}</PlayerName>

      <Score data-testid={`${player}-score`}>
        {player === 'player1' ? p1.score : p2.score}
      </Score>
      <PalyerIcon data-testid="icon" />
    </PlayerInfoWrapper>
  );
};

export default PlayerInfo;
