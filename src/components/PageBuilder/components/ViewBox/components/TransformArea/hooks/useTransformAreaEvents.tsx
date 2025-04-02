import { useRef } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// others
import { BASE_2D } from 'shared';

// types
import { Anchor } from 'store/pageBuilder/enums';
import { MouseMode } from 'components/PageBuilder/enums';
import { TElement } from 'types';

export type TUseTransformAreaEvents = {
  onMouseDown: (
    anchor: Anchor,
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
};

export const useTransformAreaEvents = (
  height: TElement['height'],
  id: TElement['id'],
  mouseMode: MouseMode,
  width: TElement['width'],
  x: TElement['position']['x'],
  y: TElement['position']['y'],
): TUseTransformAreaEvents => {
  const cursorPosition = useRef(BASE_2D);

  useMouseMoveEvent(cursorPosition, height, id, width, x, y);
  useMouseUpEvent();

  return {
    onMouseDown: useMouseDownEvent(cursorPosition, mouseMode),
  };
};
