import { motion } from 'framer-motion';
import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

export const GameInfoWrapper = styled(motion.div)`
  grid-area: gameInfo;
  margin-top: -7rem;
  z-index: 5;
  justify-self: center;
  ${media.phone} {
    margin-top: -5rem;
  }
`;
