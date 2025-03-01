import { RefObject, useRef, useState, WheelEvent } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';
import { useWheelEvent } from './useWheelEvent';

// others
import { BASE_2D } from '../constants';
import { CURSOR_STATES } from 'constant/constants';

// types
import { T3DCoordinates } from 'types';

export type TUseZoomBoxEvents = {
  cursorState: string;
  onMouseDown: (event: React.MouseEvent) => void;
  onWheel: (event: WheelEvent) => void;
};

export const useZoomBoxEvents = (
  coordinates: T3DCoordinates,
  onMouseDown: (event: React.MouseEvent) => void,
  onMouseMove: (event: MouseEvent) => void,
  onMouseMoveDepedencies: Array<any>,
  onMouseUp: (event: MouseEvent) => void,
  onMouseUpDepedencies: Array<any>,
  setCoordinates: (coordinates: T3DCoordinates) => void,
  zoomBoxRef: RefObject<HTMLDivElement>,
): TUseZoomBoxEvents => {
  const cursorPosition = useRef(BASE_2D);
  const [cursorState, setCursorState] = useState<string>(CURSOR_STATES[0]);

  useMouseMoveEvent(
    coordinates,
    cursorPosition,
    cursorState,
    onMouseMoveDepedencies,
    onMouseMove,
    setCoordinates,
  );
  useMouseUpEvent(onMouseUpDepedencies, onMouseUp, setCursorState);

  return {
    cursorState,
    onMouseDown: useMouseDownEvent(
      coordinates,
      cursorPosition,
      onMouseDown,
      setCursorState,
    ),
    onWheel: useWheelEvent(coordinates, setCoordinates, zoomBoxRef),
  };
};
