import React from 'react';

import {
  GameMenuCtxWrapper,
  GameMenuButtonsWrapper,
  GameMenuHeader,
  GameMenuBtnText,
} from './GameMenuContextStyles';
import { MenuButton } from '../../UI/menuButton/MenuButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { setModal, toggleModal } from '../../../store/modalSlice';
import { continueGame, quitGame, restartGame } from '../../../store/gameSlice';

const GameMenuContext: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Quit Game button handler
  const quitGameHandler = () => {
    navigate('/');
    dispatch(setModal({ modal: 'gameMenu', status: false }));
    dispatch(quitGame());
  };
  // Continue button handler
  const continueHandler = () => {
    dispatch(toggleModal('gameMenu'));
    dispatch(continueGame());
  };
  // restart button handler
  const restartHandler = () => {
    dispatch(toggleModal('gameMenu'));
    dispatch(restartGame());
  };

  return (
    <GameMenuCtxWrapper>
      <GameMenuHeader>pause</GameMenuHeader>
      <GameMenuButtonsWrapper>
        <MenuButton bgColor="white" textcolor="black" onClick={continueHandler}>
          <GameMenuBtnText>continue game</GameMenuBtnText>
        </MenuButton>
        <MenuButton bgColor="white" textcolor="black" onClick={restartHandler}>
          <GameMenuBtnText>restart</GameMenuBtnText>
        </MenuButton>
        <MenuButton bgColor="red" textcolor="white" onClick={quitGameHandler}>
          <GameMenuBtnText>quit game</GameMenuBtnText>
        </MenuButton>
      </GameMenuButtonsWrapper>
    </GameMenuCtxWrapper>
  );
};

export default GameMenuContext;
