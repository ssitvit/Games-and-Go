import React, { useEffect } from 'react';

import { Control, Column } from './ControlGridStlyes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  makeMove,
  selectCurrentPlayer,
  selectGameMode,
  selectIsTimeForNextTurn,
  setPointercolumn,
} from '../../../store/gameSlice';

import { aiMove } from '../../../store/aiMove';
import GamePointer from '../../UI/pointer/Pointer';

const columns = Array(7).fill(null);

const ControlGrid: React.FC = () => {
  const isTimeForNextTurn = useAppSelector(selectIsTimeForNextTurn);
  const gameMode = useAppSelector(selectGameMode);
  const currentPlayer = useAppSelector(selectCurrentPlayer);

  const dispatch = useAppDispatch();
  // CPU move monitoring
  useEffect(() => {
    if (currentPlayer === 'p2' && gameMode === 'CPUvP' && isTimeForNextTurn) {
      dispatch(aiMove());
    }
  }, [dispatch, isTimeForNextTurn, currentPlayer, gameMode]);

  // Moving pointer
  const mouseHoverHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    dispatch(
      setPointercolumn(e.currentTarget.getAttribute('data-columnnum') || '0')
    );
  };

  // Player move handler
  const columnClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (currentPlayer === 'p2' && gameMode === 'CPUvP') return;
    const col = e.currentTarget.getAttribute('data-columnnum');
    if (col) {
      dispatch(makeMove(+col));
    }
  };

  return (
    <Control data-testid="control">
      <GamePointer />
      {columns.map((_, ind) => {
        return (
          <Column
            key={ind}
            data-columnnum={ind}
            onMouseEnter={mouseHoverHandler}
            onClick={columnClickHandler}
            data-testid={`column${ind}`}
          />
        );
      })}
    </Control>
  );
};

export default ControlGrid;
