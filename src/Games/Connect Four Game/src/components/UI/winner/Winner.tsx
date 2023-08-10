import React from 'react';

import { WinneroWrapper, WinnerName, WinnerText } from './WinnerStyles';
import { SmallButton } from '../smallButton/SmallButton';
import { useAppDispatch } from '../../../store/hooks';
import { playAgain } from '../../../store/gameSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const Winner: React.FC = () => {
  const dispatch = useAppDispatch();
  const game = useSelector((state: RootState) => state.game);

  // if it is tie we render no name and status tie
  // it there is a winner we render correct player name and status wins
  let name = '';
  let status = 'tie';
  if (game.winner && game.winner !== 'tie') {
    name = game[game.winner].name;
    // check for gramma
    status = name === 'You' ? 'win' : 'wins';
  }

  // Play again button handler
  const playAgainHandler = () => {
    dispatch(playAgain());
  };

  return (
    <WinneroWrapper data-testid="winner">
      <WinnerName data-testid="winner-name">{name}</WinnerName>
      <WinnerText data-testid="game-status">{status}</WinnerText>
      <SmallButton onClick={playAgainHandler}>Play Again</SmallButton>
    </WinneroWrapper>
  );
};

export default Winner;
