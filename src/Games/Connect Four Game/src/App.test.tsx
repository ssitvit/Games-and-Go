import { render, screen, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { setModal } from './store/modalSlice';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

jest.mock('../src/helpers/getWorker.ts', () => ({
  getWebWorker: jest.fn(),
}));

describe('app componnet testing', () => {
  test('should render main menu modal if it is opened', async () => {
    renderComponent();

    act(() => {
      store.dispatch(setModal({ modal: 'mainMenu', status: true }));
    });
    let modal;
    await waitFor(() => {
      modal = screen.getByText('Select difficulty');
    });
    expect(modal).toBeInTheDocument();
    act(() => {
      store.dispatch(setModal({ modal: 'mainMenu', status: false }));
    });
  });
  test('should render game menu modal if it is opened', async () => {
    renderComponent();
    act(() => {
      store.dispatch(setModal({ modal: 'gameMenu', status: true }));
    });
    let modal;
    await waitFor(() => {
      modal = screen.getByText('pause');
    });
    expect(modal).toBeInTheDocument();
    act(() => {
      store.dispatch(setModal({ modal: 'gameMenu', status: false }));
    });
  });
});
