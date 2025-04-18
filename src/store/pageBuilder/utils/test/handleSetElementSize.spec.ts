// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// types
import { Anchor } from 'store/pageBuilder/enums';

// utils
import { handleSetElementSizes } from '../handleSetElementSize';

const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
const mouseCoordinates = { x: 200, y: 100 };

describe('handleSetElementSizes', () => {
  it(`should handle set element sizes`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementSizes(
      baseCoordinates,
      100,
      100,
      selectedElementMock.id,
      mouseCoordinates,
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...pageBuilderStateMock[PAGE_BUILDER].events,
          selectedAnchor: Anchor.east,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                [elementAllDataMock.id]: elementAllDataMock,
              },
              dynamicData: {
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...pageBuilderStateMock[PAGE_BUILDER].events,
        selectedAnchor: Anchor.east,
      },
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,

        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                height: 100,
                position: 'absolute',
                width: 300,
              },
            },
            dynamicData: {
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                height: 100,
                position: 'absolute',
                width: 300,
              },
            },
            staticData: {
              [elementStaticDataMock.id]: elementStaticDataMock,
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
