// mocks
import {
  allDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handlSetElementCoordinates } from '../handlSetElementCoordinates';

describe('handlSetElementCoordinates', () => {
  it(`should return data with changed element coordinates`, () => {
    // mock
    const positionAbsolute = { x: 100, y: 100 };

    // before
    const result = handlSetElementCoordinates(
      allDataMock.id,
      positionAbsolute,
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        elements: {
          allData: {
            [allDataMock.id]: allDataMock,
          },
          dynamicData: {
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: {
            [elementStaticDataMock.id]: elementStaticDataMock,
          },
        },
      },
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          [allDataMock.id]: {
            ...allDataMock,
            positionAbsolute,
          },
        },
        dynamicData: {
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
            positionAbsolute,
          },
        },
        staticData: {
          [elementStaticDataMock.id]: elementStaticDataMock,
        },
      },
    });
  });
});
