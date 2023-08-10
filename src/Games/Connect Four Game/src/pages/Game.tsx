import React from 'react';

import Layout from '../components/UI/layout/Layout';
import GamePageHeader from '../components/game/gamePageHeader/GamePageHeader';
import GameBoard from '../components/game/gameBoard/GameBoard';
import { Footer } from '../components/UI/footer/Footer';

import { footerVariants } from '../frameMotinVariats/frameMotionVariants';

const Game: React.FC = () => {
  return (
    <>
      <Layout color="purple" isGamePage={true}>
        <GamePageHeader />
        <GameBoard />
      </Layout>
      <Footer // @ts-ignore
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      />
    </>
  );
};

export default Game;
