import React from 'react';

import { Header } from './GamePageStyles';
import { SmallButton } from '../../UI/smallButton/SmallButton';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { gameHeaderVariants } from '../../../frameMotinVariats/frameMotionVariants';
import { useAppDispatch } from '../../../store/hooks';
import { toggleModal } from '../../../store/modalSlice';
import { pauseGame, restartGame } from '../../../store/gameSlice';

const GamePageHeader: React.FC = () => {
  const dispatch = useAppDispatch();

  // Menu button handler
  const menuHandler = () => {
    dispatch(pauseGame());
    dispatch(toggleModal('gameMenu'));
  };
  // Restart button handler
  const restartHandler = () => {
    dispatch(restartGame());
  };

  return (
    <Header
      // @ts-ignore
      variants={gameHeaderVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div>
        <SmallButton isMenu={true} onClick={menuHandler}>
          Menu
        </SmallButton>
      </div>
      <Logo />
      <div>
        <SmallButton onClick={restartHandler}>Restart</SmallButton>
      </div>
    </Header>
  );
};

export default GamePageHeader;
