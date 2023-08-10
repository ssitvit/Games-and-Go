import styled from 'styled-components';

import { media } from '../../styles/GlobalStyles';

export const MenuCtxWrapper = styled.div`
  margin: 7rem 4rem 6rem 4rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7rem;

  svg {
    margin: 0 auto;
  }

  ${media.phone} {
    margin-right: 0;
    margin-left: 0;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const ButtonCtxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  width: 100%;

  svg {
    margin: 0;
  }
`;

export const BtnText = styled.h2`
  font-size: var(--font-size-heading-m);
  line-height: var(--font-line-heading-m);
  text-transform: uppercase;
  text-align: left;
`;
