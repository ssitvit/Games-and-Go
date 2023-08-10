import React from 'react';

import { BoardWrapper } from './BoardStyles';

import useWindowWidth from '../../../hooks/useWindowWidth';

import { ReactComponent as WhiteLayoutLarge } from '../../../assets/images/board-layer-white-large.svg';
import { ReactComponent as BlackLayoutLarge } from '../../../assets/images/board-layer-black-large.svg';
import { ReactComponent as WhiteLayoutSmall } from '../../../assets/images/board-layer-white-small.svg';
import { ReactComponent as BlackLayoutSmall } from '../../../assets/images/board-layer-black-small.svg';
import { boardVariants } from '../../../frameMotinVariats/frameMotionVariants';

import CounterGrid from '../counterGrid/CounterGrid';
import ControlGrid from '../controlGrid/ControlGrid';

const Board: React.FC = () => {
  const windowWidth = useWindowWidth();

  return (
    <BoardWrapper
      // @ts-ignore
      variants={boardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-testid="board"
    >
      {windowWidth > 760 ? (
        <WhiteLayoutLarge className="white" data-testid="largeWhite" />
      ) : (
        <WhiteLayoutSmall className="white" data-testid="smallWhite" />
      )}
      <ControlGrid />
      <CounterGrid />
      {windowWidth > 760 ? (
        <BlackLayoutLarge className="black" data-testid="largeBlack" />
      ) : (
        <BlackLayoutSmall className="black" data-testid="smallBlack" />
      )}
    </BoardWrapper>
  );
};

export default Board;
