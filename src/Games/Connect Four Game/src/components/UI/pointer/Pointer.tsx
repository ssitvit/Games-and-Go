import React from 'react';

import { PointerWrapper, Pointer } from './PointerStyles';
import { useAppSelector } from '../../../store/hooks';
import { selectPointerColumn, selectTurn } from '../../../store/gameSlice';

import { ReactComponent as PointerRed } from '../../../assets/images/marker-red.svg';
import { ReactComponent as PointerYellow } from '../../../assets/images/marker-yellow.svg';

const GamePointer: React.FC = () => {
  const columnNumber = useAppSelector(selectPointerColumn);
  const turn = useAppSelector(selectTurn);
  // current turn defines color of pointer
  const PointerIcon = turn === 'red' ? PointerRed : PointerYellow;
  return (
    <PointerWrapper>
      <Pointer columnnumber={columnNumber} data-testid="pointer">
        <PointerIcon data-testid={`color-${turn}`} />
      </Pointer>
    </PointerWrapper>
  );
};

export default GamePointer;
