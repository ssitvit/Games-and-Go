import styled from 'styled-components';

import { motion } from 'framer-motion';

export const Header = styled(motion.div)`
  max-width: 63.2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;

  div {
    width: 10.7rem;
  }
`;
