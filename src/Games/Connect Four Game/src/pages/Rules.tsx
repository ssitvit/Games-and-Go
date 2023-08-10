import React from 'react';
import RulesContext from '../components/rulesContext/RulesContext';
import MenuWrapper from '../components/UI/menuWrapper/MenuWrapper';
import Layout from '../components/UI/layout/Layout';

const Rules: React.FC = () => {
  return (
    <Layout color="purple">
      <MenuWrapper type="rules">
        <RulesContext />
      </MenuWrapper>
    </Layout>
  );
};

export default Rules;
