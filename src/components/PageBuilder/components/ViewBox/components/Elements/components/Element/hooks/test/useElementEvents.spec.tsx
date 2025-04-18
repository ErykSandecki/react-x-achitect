import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useElementEvents } from '../useElementEvents';

// mocks
import {
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_2D } from 'shared/ZoomBox/constants';

// store
import { configureStore } from 'store';

// types
import { ElementType } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { getProviderWrapper } from 'test';

const ref = { current: { contains: () => false } } as RefObject<any>;
const stateMock = {
  ...pageBuilderStateMock,
};

describe('useElementEvents', () => {
  it(`should return view moveable events and data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useElementEvents(
          BASE_2D,
          ref,
          100,
          selectedElementMock.id,
          false,
          true,
          MouseMode.default,
          selectedElementMock.parentId,
          ElementType.frame,
          100,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // result
    expect(result.current).toStrictEqual({
      isMoving: false,
      onMouseDown: expect.any(Function),
      onMouseEnter: expect.any(Function),
      onMouseLeave: expect.any(Function),
    });
  });
});
