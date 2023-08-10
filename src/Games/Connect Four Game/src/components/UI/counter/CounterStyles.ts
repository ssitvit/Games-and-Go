import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from '../../../styles/GlobalStyles';

type props = {
  bg?: string | null;
};

export const CounterElement = styled(motion.div)<props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: ${({ bg }) => bg && `url(${bg})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

export const WhiteCircle = styled(motion.div)<props>`
  width: 3.4rem;
  height: 3.4rem;
  border: solid white 0.6rem;
  border-radius: 50%;

  ${media.phone} {
    width: 2rem;
    height: 2rem;
  }
`;
