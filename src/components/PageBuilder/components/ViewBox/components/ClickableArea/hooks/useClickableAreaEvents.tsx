import { MouseEvent, useRef, useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// others
import { BASE_2D } from 'shared';

export type TUseClickableAreaEvents = {
  onMouseDown: (event: MouseEvent) => void;
};

export const useClickableAreaEvents = (): TUseClickableAreaEvents => {
  const cursorPosition = useRef(BASE_2D);
  const [isPressing, setIsPressing] = useState(false);

  useMouseMoveEvent(cursorPosition, isPressing);
  useMouseUpEvent(setIsPressing);

  return {
    onMouseDown: useMouseDownEvent(cursorPosition, setIsPressing),
  };
};
