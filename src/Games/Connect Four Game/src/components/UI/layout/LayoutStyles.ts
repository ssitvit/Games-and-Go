import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

type props = {
  color: string;
  isGamePage?: boolean;
};

type colorsType = {
  [key: string]: string;
};

const colors: colorsType = {
  purple: 'var(--color-purple)',
  darkPurple: 'var(--color-dark-puprle)',
};

export const LayoutWrapper = styled.div<props>`
  background-color: ${({ color }) => colors[color]};
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;

  align-items: center;
  justify-content: ${({ isGamePage }) => (isGamePage ? 'normal' : 'center')};

  position: relative;

  @media (min-height: 1000px) {
    justify-content: center;
  }

  ${media.phone} {
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
`;
