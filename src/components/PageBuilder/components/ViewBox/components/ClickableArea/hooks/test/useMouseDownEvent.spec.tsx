import { MouseEvent, RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// others
import { BASE_2D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store';

// types
import { MouseButton, T2DCoordinates } from 'types';
import { TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { getProviderWrapper } from 'test';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();
const prevState = {
  current: pageBuilderStateMock[PAGE_BUILDER],
} as RefObject<TPageBuilderState>;

const stateMock = {
  ...pageBuilderStateMock,
};

describe('useMouseMoveEvent', () => {
  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () => useMouseDownEvent(cursorPosition, prevState, mockCallBack),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current({
      buttons: MouseButton.lmb,
      stopPropagation: mockCallBack as any,
    } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should not trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () => useMouseDownEvent(cursorPosition, prevState, mockCallBack),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current({ stopPropagation: mockCallBack as any } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
