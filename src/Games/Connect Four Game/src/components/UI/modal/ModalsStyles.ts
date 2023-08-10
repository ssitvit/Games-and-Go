import styled from 'styled-components';
import { motion } from 'framer-motion';

type props = {
  variants: any;
  initial: string;
  animate: string;
  exit: string;
};

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  max-width: 51.8rem;
  width: 100%;
  padding: 0 1.6rem;
  outline: 0;
`;

export const Backdrop = styled(motion.div)<props>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`;

export const StyledModal = styled.div`
  z-index: 100;
  position: relative;
  margin: auto;
  border-radius: 8px;
`;
