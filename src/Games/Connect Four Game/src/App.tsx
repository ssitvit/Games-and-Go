import { Routes, Route, useLocation } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Rules from './pages/Rules';
import Game from './pages/Game';
import { AnimatePresence } from 'framer-motion';
import Modal from './components/UI/modal/Modal';
import MenuWrapper from './components/UI/menuWrapper/MenuWrapper';
import GameMenuContext from './components/game/gameMenuContext/GameMenuContext';
import { useAppSelector } from './store/hooks';
import { selectIsModalOpened } from './store/modalSlice';
import { selectGameIsRunning } from './store/gameSlice';
import DifficaltyGameModalContent from './components/UI/difficultyModalContent/DifficultyGameModalContent';

function App() {
  const location = useLocation();
  const isOpenModal = useAppSelector(selectIsModalOpened);
  const gameIsRunning = useAppSelector(selectGameIsRunning);

  return (
    <div className="app">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainMenu />} />
          <Route path="/rules" element={<Rules />} />
          <Route
            path="/game"
            element={gameIsRunning ? <Game /> : <MainMenu />}
          />
          <Route path="*" element={gameIsRunning ? <Game /> : <MainMenu />} />
        </Routes>
      </AnimatePresence>
      <AnimatePresence>
        {isOpenModal.gameMenu && (
          <Modal key="gameMenuModal">
            <MenuWrapper type="gameMenu">
              <GameMenuContext />
            </MenuWrapper>
          </Modal>
        )}
        {isOpenModal.mainMenu && (
          <Modal key="mainMenuModal">
            <DifficaltyGameModalContent />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
