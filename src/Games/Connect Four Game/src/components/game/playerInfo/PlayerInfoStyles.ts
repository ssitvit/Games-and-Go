import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';
import { motion } from 'framer-motion';
type props = {
  player?: string;
};

export const PlayerInfoWrapper = styled(motion.div)<props>`
  width: 14rem;
  height: 16rem;
  border: solid 3px var(--color-black);
  box-shadow: 0px 1rem 0px var(--color-black);
  border-radius: 2rem;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-area: ${({ player }) => player};
  position: relative;
  align-self: center;

  svg {
    position: absolute;
    top: -3rem;
  }

  ${media.tabletL} {
    width: 100%;
    height: 10rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'first second';
    padding-left: 4.4rem;
    padding-right: 2rem;

    svg {
      top: 50%;
      left: ${({ player }) => player === 'player1' && '-3rem'};
      right: ${({ player }) => player === 'player2' && '-3rem'};
      transform: translateY(-50%);
    }

    h3,
    h2 {
      align-self: center;
    }

    h2 {
      grid-area: ${({ player }) =>
        player === 'player1' ? 'second' : ' first'};
    }

    h3 {
      margin-top: 0;
    }

    ${media.phone} {
      height: 8.1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0;

      svg {
        left: ${({ player }) => player === 'player1' && '-2rem'};
        right: ${({ player }) => player === 'player2' && '-2rem'};
      }
    }
  }
`;

export const PlayerName = styled.h3`
  font-size: var(--font-size-heading-s);
  line-height: var(--font-line-heading-s);
  margin-top: 3rem;
  text-transform: uppercase;

  ${media.phone} {
    font-size: var(--font-size-heading-xs);
    line-height: var(--font-line-heading-xs);
  }
`;

export const Score = styled.h2`
  font-size: var(--font-size-heading-l);
  line-height: var(--font-line-heading-l);

  ${media.phone} {
    font-size: var(--font-size-heading-m);
    line-height: var(--font-line-heading-m);
  }
`;
