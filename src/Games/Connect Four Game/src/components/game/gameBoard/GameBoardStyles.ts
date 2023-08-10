import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

export const GameBoardWrapper = styled.section`
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-template-rows: max-content max-content;
  grid-template-areas: 'player1 board player2' 'gameInfo gameInfo gameInfo';
  gap: 6rem;
  position: relative;

  ${media.desktopS} {
    gap: 1rem;
  }

  ${media.tabletL} {
    gap: 3.4rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr max-content max-content;
    grid-template-areas: 'player1 player2' 'board board' 'gameInfo gameInfo';
    margin-top: 1.6rem;
  }

  ${media.phone} {
    column-gap: 1.6rem;
  }
`;
