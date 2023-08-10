import { screen, render } from '@testing-library/react';

import CounterGrid from '../CounterGrid';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import { changeTurn, placeCounter } from '../../../../store/gameSlice';

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <CounterGrid />
    </Provider>
  );
};

describe('Counter grid component testing', () => {
  test('should render component', () => {
    renderComponent();
    const counterGrid = screen.getByTestId('counterGrid');
    expect(counterGrid).toBeInTheDocument();
  });
  test('should render right amount of red counters', () => {
    store.dispatch(placeCounter({ col: 0, row: 5 }));
    store.dispatch(placeCounter({ col: 1, row: 5 }));
    store.dispatch(placeCounter({ col: 2, row: 5 }));
    renderComponent();

    const redCounters = screen.getAllByTestId('red');
    expect(redCounters).toHaveLength(3);
  });
  test('should render right amount of yellow counters', () => {
    store.dispatch(changeTurn());
    store.dispatch(placeCounter({ col: 6, row: 5 }));
    store.dispatch(placeCounter({ col: 6, row: 4 }));
    store.dispatch(placeCounter({ col: 6, row: 3 }));
    store.dispatch(placeCounter({ col: 6, row: 2 }));
    renderComponent();
    const redCounters = screen.getAllByTestId('yellow');
    expect(redCounters).toHaveLength(4);
  });
  test('should render right amount of empty counters', () => {
    renderComponent();
    const redCounters = screen.getAllByTestId('empty');
    expect(redCounters).toHaveLength(35);
  });
});
