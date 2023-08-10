import styled from 'styled-components';

export const GameMenuCtxWrapper = styled.div`
  margin: 5rem 4rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const GameMenuButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const GameMenuHeader = styled.h1`
  color: var(--color-white);
  font-size: var(--font-size-heading-l);
  line-height: var(--font-line-heading-l);
  text-transform: uppercase;
  text-align: center;
`;

export const GameMenuBtnText = styled.h2`
  font-size: var(--font-size-heading-m);
  line-height: var(--font-line-heading-m);
  text-transform: uppercase;
  text-align: center;
`;
