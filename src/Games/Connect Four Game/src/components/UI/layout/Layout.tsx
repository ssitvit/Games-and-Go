import React from 'react';

import { LayoutWrapper } from './LayoutStyles';

const Layout: React.FC<{
  color: string;
  children?: JSX.Element | JSX.Element[];
  isGamePage?: boolean;
}> = ({ color, children, isGamePage = false }) => {
  return (
    <LayoutWrapper color={color} isGamePage={isGamePage}>
      {[children]}
    </LayoutWrapper>
  );
};

export default Layout;
