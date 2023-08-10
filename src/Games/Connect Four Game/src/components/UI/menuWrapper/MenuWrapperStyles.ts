import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from '../../../styles/GlobalStyles';

type props = {
  type: string;
};

type MenuProperties = {
  color: string;
};

type MenuTypes = {
  [key: string]: MenuProperties;
};

const menuTypes: MenuTypes = {
  mainMenu: {
    color: 'var(--color-purple)',
  },
  gameMenu: {
    color: 'var(--color-purple)',
  },
  rules: {
    color: 'var(--color-white)',
  },
};

export const MenuWrap = styled(motion.section)<props>`
  max-width: 48rem;
  width: 100%;

  background-color: ${({ type }) =>
    menuTypes[type].color || 'var(--color-purple)'};
  border: 3px solid var(--color-black);
  border-radius: 4rem;

  box-shadow: 0px 1rem 0px var(--color-black);

  ${media.phone} {
    border: ${({ type }) => type === 'mainMenu' && 'none'};
    box-shadow: ${({ type }) => type === 'mainMenu' && 'none'};
  }
`;
