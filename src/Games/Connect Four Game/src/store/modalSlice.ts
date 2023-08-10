import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

type initialStateType = {
  isModalOpened: {
    [key: string]: boolean;
    gameMenu: boolean;
    mainMenu: boolean;
  };
};

const initialState: initialStateType = {
  isModalOpened: {
    gameMenu: false,
    mainMenu: false,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal(state, action: PayloadAction<string>) {
      state.isModalOpened[action.payload] =
        !state.isModalOpened[action.payload];
    },

    setModal(state, action: PayloadAction<{ modal: string; status: boolean }>) {
      state.isModalOpened[action.payload.modal] = action.payload.status;
    },
  },
});

export const { toggleModal, setModal } = modalSlice.actions;
export const selectIsModalOpened = (state: RootState) =>
  state.modal.isModalOpened;

export const modalReducer = modalSlice.reducer;
