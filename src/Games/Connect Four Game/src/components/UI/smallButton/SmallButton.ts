import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

type props = {
  isMenu?: boolean;
};

export const SmallButton = styled.button<props>`
  outline: none;
  font-family: inherit;
  background-color: var(--color-dark-purple);
  color: var(--color-white);
  padding: 0rem 2rem;
  border-radius: 3rem;
  font-size: var(--font-size-heading-xs);
  line-height: var(--font-line-heading-xs);
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: transfrom 0.3s ease;
  border: none;
  min-height: 3.9rem;
  max-height: 3.9rem;
  width: fit-content;
  min-width: 10rem;

  &:hover {
    background-color: var(--color-red);
  }

  &:active {
    transform: scale(0.98);
  }
  ${media.phone} {
    width: ${({ isMenu }) => isMenu && '100%'};
    color: white;
  }
`;
