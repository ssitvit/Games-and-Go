import styled from 'styled-components';

export const WinneroWrapper = styled.div`
  width: 28.5rem;
  height: 16rem;
  border: solid 3px var(--color-black);

  box-shadow: 0px 1rem 0px var(--color-black);
  border-radius: 2rem;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 5;
`;

export const WinnerName = styled.h4`
  font-size: var(--font-size-heading-xs);
  line-height: var(--font-line-heading-xs);
  font-weight: bold;
  text-transform: uppercase;
`;
export const WinnerText = styled.h2`
  font-size: var(--font-size-heading-l);
  line-height: var(--font-line-heading-l);
  text-transform: uppercase;
`;
