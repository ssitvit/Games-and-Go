import styled from 'styled-components';
import { media } from '../../../styles/GlobalStyles';
import { motion } from 'framer-motion';

export const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  padding: 1.7rem 1.7rem 0 1.7rem;
  gap: 1.8rem;
  position: absolute;
  z-index: 3;

  ${media.phone} {
    padding: 0.8rem 0.8rem 0 0.8rem;
    gap: 0.55rem;
  }
`;

export const GridCell = styled(motion.div)`
  width: 7rem;
  height: 7rem;
  cursor: pointer;

  ${media.phone} {
    width: 4.1rem;
    height: 4.1rem;
  }
`;
