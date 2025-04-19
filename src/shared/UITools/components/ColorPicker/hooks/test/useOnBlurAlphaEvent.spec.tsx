import { renderHook } from '@testing-library/react';

// hooks
import { useOnBlurAlphaEvent } from '../useOnBlurAlphaEvent';

const mockCallBack = jest.fn();

describe('useOnBlurAlphaEvent', () => {
  it(`should trigger on change when current value is valid`, () => {
    // before
    const { result } = renderHook(() =>
      useOnBlurAlphaEvent('100', '50', mockCallBack, mockCallBack),
    );

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('50');
  });

  it(`should change on default value`, () => {
    // before
    const { result } = renderHook(() =>
      useOnBlurAlphaEvent('100', '', mockCallBack, mockCallBack),
    );

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });
});
