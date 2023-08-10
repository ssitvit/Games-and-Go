import { screen, render, fireEvent } from '@testing-library/react';

import DifficaltyGameModalContent from '../DifficultyGameModalContent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store';

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <DifficaltyGameModalContent />
      </Provider>
    </BrowserRouter>
  );
};

describe('difficulty selection component', () => {
  test('should render component', () => {
    renderComponent();
    const component = screen.getByText('Select difficulty');
    expect(component).toBeInTheDocument();
  });

  test('should render all three buttons', () => {
    renderComponent();
    const easy = screen.getByText('easy');
    const normal = screen.getByText('normal');
    const hard = screen.getByText('hard');
    expect(easy).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(hard).toBeInTheDocument();
  });

  test('should set difficulty to 2 after clicking on easy', () => {
    renderComponent();
    const easy = screen.getByText('easy');
    fireEvent.click(easy);
    const difficultyLevel = store.getState().game.CPULevel;
    expect(difficultyLevel).toBe(2);
  });
  test('should set difficulty to 4 after clicking on easy', () => {
    renderComponent();
    const normal = screen.getByText('normal');
    fireEvent.click(normal);
    const difficultyLevel = store.getState().game.CPULevel;
    expect(difficultyLevel).toBe(6);
  });
  test('should set difficulty to 6 after clicking on easy', () => {
    renderComponent();
    const hard = screen.getByText('hard');
    fireEvent.click(hard);
    const difficultyLevel = store.getState().game.CPULevel;
    expect(difficultyLevel).toBe(8);
  });
});
