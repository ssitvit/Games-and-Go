import React from 'react';
import MenuWrapper from '../components/UI/menuWrapper/MenuWrapper';
import MainMenuContext from '../components/mainMenuContext/MainMenuContext';
import Layout from '../components/UI/layout/Layout';

const MainMenu: React.FC = () => {
  return (
    <Layout color="darkPurple">
      <MenuWrapper type="mainMenu">
        <MainMenuContext />
      </MenuWrapper>
    </Layout>
  );
};

export default MainMenu;
