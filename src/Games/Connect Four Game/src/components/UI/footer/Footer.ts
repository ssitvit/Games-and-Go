import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';
import { motion } from 'framer-motion';

export const Footer = styled(motion.div)`
  max-width: 100%;
  width: 100%;
  height: calc(50% - 250px);
  position: absolute;
  border-radius: 6rem 6rem 0 0;
  background-color: var(--color-dark-purple);
  z-index: 1;
  bottom: 0;

  ${media.tabletL} {
    height: calc(50% - 320px);
  }
  ${media.phone} {
    height: calc(100% - 515px);
  }
`;
