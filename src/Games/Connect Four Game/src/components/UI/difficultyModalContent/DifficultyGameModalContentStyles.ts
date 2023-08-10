import styled from 'styled-components';
import { motion } from 'framer-motion';
export const DifficultyWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: var(--color-purple);
  border-radius: 1rem;
`;

export const Header = styled.h2`
  font-size: var(--font-size-heading-m);
  font-weight: var(--font-size-heading-m);
  letter-spacing: var(--letter-spacing-heading-m);
  color: var(--color-white);

  text-transform: uppercase;
`;

export const DifficultyList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-transform: uppercase;
`;

export const DifficultyItem = styled.li`
  position: relative;
  width: fit-content;
  cursor: pointer;
  font-size: var(--font-size-heading-m);
  font-weight: var(--font-weight-heading);
  letter-spacing: var(--letter-spacing-heading-m);
  color: var(--color-white);
  font-weight: bold;
  opacity: 0.7;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 3px;
    bottom: -0.5rem;
    left: 0;

    transform-origin: center;
    transition: transform 0.4s ease-out;
  }
  &:hover {
    &:nth-child(1) {
      color: var(--color-white);
      opacity: 1;

      &::after {
        background-color: var(--color-white);
      }
    }
    &:nth-child(2) {
      color: var(--color-yellow);
      opacity: 1;

      &::after {
        background-color: var(--color-yellow);
      }
    }
    &:nth-child(3) {
      color: var(--color-red);
      opacity: 1;

      &::after {
        background-color: var(--color-red);
      }
    }
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;
