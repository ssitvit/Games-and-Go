import React, { useEffect } from 'react';

import { TimerWrapper, PlayerName, Time } from './TimerStlyes';

import TurnRed from '../../../assets/images/turn-background-red.svg';
import TurnYellow from '../../../assets/images/turn-background-yellow.svg';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import {
  selectTurn,
  selectTimer,
  selectCurrentPlayer,
  selectIsGamePaused,
  updateTimer,
  changeTurn,
} from '../../../store/gameSlice';

const bgs: { [key: string]: string } = {
  red: TurnRed,
  yellow: TurnYellow,
};

const textColor: { [key: string]: string } = {
  red: 'var(--color-white)',
  yellow: 'var(--color-black)',
};

const Timer: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);
  const turn = useAppSelector(selectTurn);
  const timer = useAppSelector(selectTimer);
  const isGamePaused = useAppSelector(selectIsGamePaused);
  const currentPlayer = useAppSelector(selectCurrentPlayer);

  const dispatch = useAppDispatch();

  const player =
    game[currentPlayer].name === 'You'
      ? 'your'
      : `${game[currentPlayer].name}'s`;

  // keep tracking of current timer, not the best one but for 30s interval is enough
  useEffect(() => {
    if (isGamePaused) return;
    const timeout = setTimeout(function () {
      const newTime = timer - 1;
      dispatch(updateTimer(newTime));
    }, 1000);

    if (timer <= 0) {
      dispatch(changeTurn());
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, timer, isGamePaused]);

  return (
    <TimerWrapper
      bg={bgs[turn]}
      textcolor={textColor[turn]}
      data-testid="timer"
    >
      <PlayerName>{player} turn</PlayerName>
      <Time>{timer}s</Time>
    </TimerWrapper>
  );
};

export default Timer;
