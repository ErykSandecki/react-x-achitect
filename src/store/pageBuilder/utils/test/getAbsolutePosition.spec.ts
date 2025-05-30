// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { getAbsolutePosition } from '../getAbsolutePosition';

describe('getAbsolutePosition', () => {
  beforeEach(() => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    // before
    el1.setAttribute('id', selectedElementMock.id);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', selectedElementMock.parentId);
    el2.style.height = '100px';
    el2.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
  });

  it(`should return position`, () => {
    // before
    const result = getAbsolutePosition(
      selectedElementMock.id,
      selectedElementMock.parentId,
      1,
    );

    // result
    expect(result).toStrictEqual({ x: 0, y: 0 });
  });
});
