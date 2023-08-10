import React from 'react';

import {
  RulesCtxWrapper,
  RulesHeader,
  RulesTextWrapper,
  RulesSubHeader,
  RulesItem,
} from './RulesContextStyles';

import { ReactComponent as ButtonIcon } from '../../assets/images/icon-check.svg';

import { useNavigate } from 'react-router-dom';

const RulesContext: React.FC = () => {
  const navigate = useNavigate();

  // Return button handler
  const clickHandler = () => {
    navigate('/');
  };

  return (
    <RulesCtxWrapper>
      <RulesHeader>Rules</RulesHeader>
      <RulesTextWrapper>
        <div>
          <RulesSubHeader>objective</RulesSubHeader>
          <p>
            Be the first player to connect 4 of the same colored discs in a row
            (either vertically, horizontally, or diagonally).
          </p>
        </div>
        <div>
          <RulesSubHeader>how to play</RulesSubHeader>

          <RulesItem>
            <h4>1</h4>
            <span>Red goes first in the first game.</span>
          </RulesItem>
          <RulesItem>
            <h4>2</h4>
            <span>
              Players must alternate turns, and only one disc can be dropped in
              each turn.
            </span>
          </RulesItem>
          <RulesItem>
            <h4>3</h4>
            <span>
              The game ends when there is a 4-in-a-row or a stalemate.
            </span>
          </RulesItem>
          <RulesItem>
            <h4>4</h4>
            <span>
              The starter of the previous game goes second on the next game.
            </span>
          </RulesItem>
        </div>
        <ButtonIcon onClick={clickHandler} data-testid="confirm-button" />
      </RulesTextWrapper>
    </RulesCtxWrapper>
  );
};

export default RulesContext;
