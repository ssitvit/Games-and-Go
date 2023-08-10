import styled from 'styled-components';

import { media } from '../../styles/GlobalStyles';

export const RulesCtxWrapper = styled.div`
  margin: 3rem 3.4rem 5.4rem 3.4rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;

  svg {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -9.5rem;
    &:hover {
      cursor: pointer;

      #Oval-Copy-37 {
        fill: #5c2dd5;
      }

      #Oval-Copy-38 {
        fill: #5c2dd5;
      }
    }
  }

  ${media.phone} {
    margin-right: 2rem;
    margin-left: 2rem;
  }
`;

export const RulesHeader = styled.h1`
  color: var(--color-black);
  font-size: var(--font-size-heading-l);
  line-height: var(--font-line-heading-l);
  text-transform: uppercase;
  text-align: center;
`;

export const RulesTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  p,
  span {
    opacity: 0.66;
  }
`;

export const RulesItem = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 1rem;

  h4 {
    font-size: var(--font-size-heading-xs);
    line-height: var(--font-line-heading-xs);
    text-transform: uppercase;
    text-align: left;
  }
`;

export const RulesSubHeader = styled.h3`
  font-size: var(--font-size-heading-s);
  line-height: var(--font-line-heading-s);
  text-transform: uppercase;
  text-align: left;
  color: var(--color-purple);
  margin-bottom: 1.6rem;
`;
