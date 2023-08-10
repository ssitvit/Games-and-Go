import { store } from './store';
import { wrap } from 'comlink';
import { makeMove } from './gameSlice';

import { getWebWorker } from '../helpers/getWorker';

const worker = getWebWorker();

const { maximizePlay } =
  wrap<import('../helpers/worker.js').AiMoveWorker>(worker);

export const aiMove = () => {
  return async (
    dispatch: typeof store.dispatch,
    getState: typeof store.getState
  ) => {
    // getting current game settings
    const { game } = getState();
    // run simulation and getting the best possible move
    let aiMove = await maximizePlay(game.gameBoard, game.CPULevel, Infinity);

    if (typeof aiMove !== 'undefined' && aiMove[0] !== null) {
      // call for making ai move
      dispatch(makeMove(aiMove[0]));
    }
  };
};
