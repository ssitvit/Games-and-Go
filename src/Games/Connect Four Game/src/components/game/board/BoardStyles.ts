import styled from 'styled-components';
import { media } from '../../../styles/GlobalStyles';
import { motion } from 'framer-motion';

export const BoardWrapper = styled(motion.div)`
  position: relative;
  width: 63.2rem;
  height: 58.4rem;
  grid-area: board;

  svg {
    position: absolute;
  }

  .white {
    z-index: 4;
  }

  .black {
    z-index: 2;
    top: 1rem;
  }

  ${media.phone} {
    width: 33.5rem;
    height: 31rem;
  }
`;
