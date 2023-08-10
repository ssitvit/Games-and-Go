import styled from 'styled-components';
type props = {
  bgColor: string;
  textcolor: string;
};

type colorsType = {
  [key: string]: string;
};
const bgColors: colorsType = {
  red: 'var(--color-red)',
  yellow: 'var(--color-yellow)',
  white: 'var(--color-white)',
};

const textColors: colorsType = {
  black: 'var(--color-black)',
  white: 'var(--color-white)',
};

export const MenuButton = styled.button<props>`
  background-color: ${({ bgColor }) => bgColors[bgColor]};
  width: 100%;
  color: ${({ textcolor }) => textColors[textcolor]};
  border: 3px solid var(--color-black);
  box-shadow: 0px 1rem 0px var(--color-black);
  outline: none;
  cursor: pointer;
  height: 7.2rem;
  border-radius: 2rem;
  padding: 0 1.6rem;
  font-family: inherit;

  transition: all 0.2s ease-in;

  &:hover {
    box-shadow: 0px 1rem 0px var(--color-dark-purple);
  }
  &:active {
    transform: translateY(3px);
    box-shadow: 0px 7px 0px var(--color-dark-purple);
  }
`;
