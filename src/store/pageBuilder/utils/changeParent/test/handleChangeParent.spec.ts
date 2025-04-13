// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// utils
import { handleChangeParent } from '../handleChangeParent';

describe('handleChangeParent', () => {
  beforeEach(() => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    // before
    el1.setAttribute('id', selectedElementMock.id);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', '2');
    el2.style.height = '100px';
    el2.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
  });

  it(`should not change parent when possible parent is null`, () => {
    // mock
    const payload = {
      draggableElements: ['1'],
      possibleIndexPosition: null,
      possibleParent: null,
    };

    // before
    const result = handleChangeParent(
      payload,
      pageBuilderStateMock[PAGE_BUILDER],
    );

    // result
    expect(result).toStrictEqual(pageBuilderStateMock[PAGE_BUILDER]);
  });

  it(`should change parent`, () => {
    // mock
    const payload = {
      draggableElements: ['2'],
      possibleIndexPosition: null,
      possibleParent: '-1',
    };

    // before
    const result = handleChangeParent(payload, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
            children: [elementAllDataMock.id],
          },
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            children: ['2'],
          },
          ['2']: {
            ...elementAllDataMock,
            id: '2',
            parentId: elementStaticDataMock.id,
          },
        },
        dynamicData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
          },
          ['2']: {
            ...elementDynamicDataMock,
            id: '2',
          },
        },
        staticData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
            children: [elementAllDataMock.id],
          },
          [elementStaticDataMock.id]: {
            ...elementStaticDataMock,
            children: ['2'],
          },
          ['2']: {
            ...elementStaticDataMock,
            id: '2',
            parentId: elementStaticDataMock.id,
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
            children: [elementAllDataMock.id, '2'],
          },
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            children: [],
          },
          ['2']: {
            ...elementAllDataMock,
            id: '2',
            parentId: '-1',
          },
        },
        dynamicData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
          },
          ['2']: {
            ...elementDynamicDataMock,
            id: '2',
          },
        },
        staticData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
            children: [elementAllDataMock.id, '2'],
          },
          [elementStaticDataMock.id]: {
            ...elementStaticDataMock,
            children: [],
          },
          ['2']: {
            ...elementStaticDataMock,
            id: '2',
            parentId: '-1',
          },
        },
      },
    });
  });
});
