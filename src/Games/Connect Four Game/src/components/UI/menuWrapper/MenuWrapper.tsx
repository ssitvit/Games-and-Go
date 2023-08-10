import React from 'react';

import { MenuWrap } from './MenuWrapperStyles';
import {
  wrapperVariants,
  modalVariants,
} from '../../../frameMotinVariats/frameMotionVariants';

const MenuWrapper: React.FC<{ children?: JSX.Element; type: string }> = ({
  children,
  type,
}) => {
  return (
    <MenuWrap
      type={type} // @ts-ignore
      variants={type === 'gameMenu' ? modalVariants : wrapperVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </MenuWrap>
  );
};

export default MenuWrapper;
