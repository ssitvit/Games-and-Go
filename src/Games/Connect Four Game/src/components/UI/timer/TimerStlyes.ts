import styled from 'styled-components';
import { motion } from 'framer-motion';

type props = {
  bg: string;
  textcolor: string;
};

export const TimerWrapper = styled(motion.div)<props>`
  width: 19.4rem;
  height: 16.3rem;
  background-color: transparent;
  background-image: ${({ bg }) => `url(${bg})`};
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ textcolor }) => textcolor};
`;

export const PlayerName = styled.h4`
  font-size: var(--font-size-heading-xs);
  line-height: var(--font-line-heading-xs);
  text-transform: uppercase;
  margin-top: 2rem;
`;
export const Time = styled.h2`
  font-size: var(--font-size-heading-l);
  line-height: var(--font-line-heading-l);
`;
