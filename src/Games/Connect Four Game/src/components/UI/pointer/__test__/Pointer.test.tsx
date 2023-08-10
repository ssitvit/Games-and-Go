import { render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import { changeTurn, setPointercolumn } from '../../../../store/gameSlice';
import GamePointer from '../Pointer';
const renderComponent = () => {
  return render(
    <Provider store={store}>
      <GamePointer />
    </Provider>
  );
};

describe('GamePointer component testing', () => {
  test('pointer should move on based on colunm number', async () => {
    store.dispatch(setPointercolumn('3'));
    renderComponent();

    const pointer = screen.getByTestId('pointer');

    expect(pointer).toHaveStyle('grid-area: d');
  });

  test('color of pointer should be red initaly', () => {
    renderComponent();

    const pointerColor = screen.getByTestId('color-red');
    expect(pointerColor).toBeInTheDocument();
  });
  test('color of pointer should be yellow after changing turn', async () => {
    renderComponent();
    await waitFor(() => {
      store.dispatch(changeTurn());
    });
    const pointerColor = screen.getByTestId('color-yellow');
    expect(pointerColor).toBeInTheDocument();
    await waitFor(() => {
      store.dispatch(changeTurn());
    });
  });
});
