import { toggleModal, setModal } from '../modalSlice';
import { store } from '../store';

const initialState = {
  isModalOpened: {
    gameMenu: false,
    mainMenu: false,
  },
};

describe('modalSlice testing', () => {
  test('shold have right initial state', () => {
    const modalState = store.getState().modal;
    expect(JSON.stringify(modalState)).toBe(JSON.stringify(initialState));
  });

  test('toggleModal should toggle states', () => {
    let state = store.getState().modal;
    expect(state.isModalOpened.gameMenu).toBeFalsy();
    expect(state.isModalOpened.mainMenu).toBeFalsy();
    store.dispatch(toggleModal('gameMenu'));
    store.dispatch(toggleModal('mainMenu'));
    state = store.getState().modal;
    expect(state.isModalOpened.gameMenu).toBeTruthy();
    expect(state.isModalOpened.mainMenu).toBeTruthy();
    store.dispatch(toggleModal('gameMenu'));
    store.dispatch(toggleModal('mainMenu'));
    state = store.getState().modal;
    expect(state.isModalOpened.gameMenu).toBeFalsy();
    expect(state.isModalOpened.mainMenu).toBeFalsy();
  });

  test('setModal should set states', () => {
    let state = store.getState().modal;
    expect(state.isModalOpened.gameMenu).toBeFalsy();
    expect(state.isModalOpened.mainMenu).toBeFalsy();
    store.dispatch(setModal({ modal: 'gameMenu', status: true }));
    store.dispatch(setModal({ modal: 'mainMenu', status: true }));
    state = store.getState().modal;
    expect(state.isModalOpened.gameMenu).toBeTruthy();
    expect(state.isModalOpened.mainMenu).toBeTruthy();
    store.dispatch(setModal({ modal: 'gameMenu', status: false }));
    store.dispatch(setModal({ modal: 'mainMenu', status: false }));
    state = store.getState().modal;
    expect(state.isModalOpened.gameMenu).toBeFalsy();
    expect(state.isModalOpened.mainMenu).toBeFalsy();
  });
});
