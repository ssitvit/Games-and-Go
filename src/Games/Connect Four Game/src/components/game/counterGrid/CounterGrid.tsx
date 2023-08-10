import React from 'react';

import { GameGrid, GridCell } from './GridStyles';
import useWindowWidth from '../../../hooks/useWindowWidth';
import CounterRedLarge from '../../../assets/images/counter-red-large.svg';
import CounterYellowLarge from '../../../assets/images/counter-yellow-large.svg';
import CounterRedSmall from '../../../assets/images/counter-red-small.svg';
import CounterYellowSmall from '../../../assets/images/counter-yellow-small.svg';
import { AnimatePresence } from 'framer-motion';

import Counter from '../../UI/counter/Counter';
import { useAppSelector } from '../../../store/hooks';
import {
  selectWinnigCombination,
  selectGameBoard,
} from '../../../store/gameSlice';

type countersType = {
  [key: string]: {
    [key: string]: string;
  };
};

const counters: countersType = {
  red: {
    large: CounterRedLarge,
    small: CounterRedSmall,
  },
  yellow: {
    large: CounterYellowLarge,
    small: CounterYellowSmall,
  },
};

const CounterGrid: React.FC = () => {
  const windowWidth = useWindowWidth();
  const winningCobination = useAppSelector(selectWinnigCombination);
  const gameGrid = useAppSelector(selectGameBoard);

  // to render needed size of svg
  const size = windowWidth > 760 ? 'large' : 'small';

  return (
    <AnimatePresence>
      <GameGrid data-testid="counterGrid">
        {gameGrid.map((row, i) =>
          row.map((counter, j) => (
            <GridCell key={`${i}${j}`} data-testid={counter || 'empty'}>
              {counter && (
                <Counter
                  // @ts-ignore
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 4 }}
                  // bg based on size and color
                  bg={counter && counters[counter][size]}
                  isWin={winningCobination[`${i}${j}`]}
                  row={i}
                />
              )}
            </GridCell>
          ))
        )}
      </GameGrid>
    </AnimatePresence>
  );
};

export default CounterGrid;
