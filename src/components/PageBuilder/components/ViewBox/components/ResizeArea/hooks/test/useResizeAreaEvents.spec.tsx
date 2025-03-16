import { renderHook } from '@testing-library/react';

// hooks
import { useResizeAreaEvents } from '../useResizeAreaEvents';

// mocks
import {
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// store
import { configureStore } from 'store';

// types
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { getProviderWrapper } from 'test';

const stateMock = {
  ...pageBuilderStateMock,
};

describe('useResizeAreaEvents', () => {
  it(`should return view moveable events and data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useResizeAreaEvents(
          100,
          selectedElementMock.id,
          MouseMode.default,
          100,
          100,
          100,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // result
    expect(result.current).toStrictEqual({
      onMouseDown: expect.any(Function),
    });
  });
});
