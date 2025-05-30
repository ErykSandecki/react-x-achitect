import { cloneDeep } from 'lodash';
import { RefObject } from 'react';

// mocks
import {
  elementAllDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// types
import { MouseButton, TObject, TRectCoordinates } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { calculateAbsolutePositions } from '../calculateAbsolutePositions';

const element = document.createElement('div');
const currentPage =
  pageBuilderStateMock[PAGE_BUILDER].pages[
    pageBuilderStateMock[PAGE_BUILDER].currentPage
  ];
const sharedRefs = {
  [elementAllDataMock.id]: element,
  ['2']: element,
};
const rectCoordinates = {
  current: {
    [elementAllDataMock.id]: {
      x1: elementAllDataMock.coordinates.x,
      x2: elementAllDataMock.width,
      y1: elementAllDataMock.coordinates.y,
      y2: elementAllDataMock.height,
    },
  },
} as RefObject<TObject<TRectCoordinates>>;

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  defer: (callback: any) => callback(),
}));

describe('calculateAbsolutePositions', () => {
  beforeAll(() => {
    // mock
    element.style.height = '500px';
    element.style.width = '500px';
    storeToMock.getState = () =>
      ({
        ...wholeStateMock,
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          pages: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages,
            [currentPage.id]: {
              ...currentPage,
              elements: {
                ...currentPage.elements,
                allData: {
                  ...currentPage.elements.allData,
                  [selectedElementMock.id]: {
                    ...elementAllDataMock,
                  },
                  ['2']: {
                    ...elementAllDataMock,
                    id: '2',
                  },
                },
              },
            },
          },
        },
      }) as any;
  });

  it(`should change coordinates`, () => {
    // mock
    const clonedRectCoordinates = cloneDeep(rectCoordinates);

    // before
    calculateAbsolutePositions(
      { buttons: MouseButton.lmb } as MouseEvent,
      MouseMode.default,
      clonedRectCoordinates,
      sharedRefs,
    );

    // result
    expect(clonedRectCoordinates.current).toStrictEqual({
      '1': { x1: 0, x2: 500, y1: 0, y2: 500 },
      '2': { x1: 0, x2: 500, y1: 0, y2: 500 },
    });
  });

  it(`should not change coordinates`, () => {
    // mock
    const clonedRectCoordinates = cloneDeep(rectCoordinates);

    // before
    calculateAbsolutePositions(
      { buttons: MouseButton.lmb } as MouseEvent,
      MouseMode.comment,
      clonedRectCoordinates,
      sharedRefs,
    );

    // result
    expect(clonedRectCoordinates.current).toStrictEqual({
      '1': { x1: 0, x2: 100, y1: 0, y2: 100 },
    });
  });
});
