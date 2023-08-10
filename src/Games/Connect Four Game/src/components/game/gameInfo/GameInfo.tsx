import React from 'react';
import Timer from '../../UI/timer/Timer';
import Winner from '../../UI/winner/Winner';
import { GameInfoWrapper } from './GameInfoStyles';
import { gameInfoLeftVariants } from '../../../frameMotinVariats/frameMotionVariants';
import { useAppSelector } from '../../../store/hooks';
import { selectWinner } from '../../../store/gameSlice';

const GameInfo: React.FC = () => {
  const winner = useAppSelector(selectWinner);
  return (
    <GameInfoWrapper
      // @ts-ignore
      variants={gameInfoLeftVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-testid="gameInfo"
    >
      {winner ? <Winner /> : <Timer />}
    </GameInfoWrapper>
  );
};

export default GameInfo;
