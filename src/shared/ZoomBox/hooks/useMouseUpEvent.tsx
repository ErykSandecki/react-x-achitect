import { useEffect } from 'react';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton } from 'types';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (
  depedencies: Array<any>,
  onMouseUp: (event: MouseEvent) => void,
  setCursorState: (cursorState: string) => void,
): TUseMouseUpEvent => {
  const handleMouseUp = (event: MouseEvent): void => {
    onMouseUp(event);
    setCursorState(CURSOR_STATES[MouseButton.idle]);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [setCursorState, ...depedencies]);
};
