import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import MultipleElementsArea from './MultipleElementsArea';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

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
import { configureStore, store as storeToMock } from 'store/store';

const element = document.createElement('div');
const currentPage =
  pageBuilderStateMock[PAGE_BUILDER].pages[
    pageBuilderStateMock[PAGE_BUILDER].currentPage
  ];
const overlayContainer = document.createElement('div');

const sharedRefs = {
  [elementAllDataMock.id]: element,
  ['2']: element,
};

const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
        elements: {
          ...currentPage.elements,
          allData: {
            ...currentPage.elements.allData,
            [elementAllDataMock.id]: {
              ...elementAllDataMock,
            },
            ['2']: {
              ...elementAllDataMock,
              id: '2',
            },
          },
        },
        selectedElements: [
          selectedElementMock,
          {
            ...selectedElementMock,
            id: '2',
          },
        ],
      },
    },
  },
};

jest.mock('lodash', () => ({
  ...(jest.requireActual('lodash') as object),
  defer: (callback: any) => callback(),
}));

describe('MultipleElementsArea snapshots', () => {
  beforeAll(() => {
    // mock
    element.style.height = '100px';
    element.style.width = '100px';
    document.body.appendChild(overlayContainer);
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

  it('should render MultipleElementsArea', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider
          itemsRefs={sharedRefs}
          overlayContainerRefHtml={overlayContainer}
        >
          <MultipleElementsArea />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render MultipleElementsArea', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider
          itemsRefs={sharedRefs}
          overlayContainerRefHtml={overlayContainer}
        >
          <MultipleElementsArea />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
