import { RefObject, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// store
import { eventSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { Anchor } from 'store/pageBuilder/enums';
import { T2DCoordinates, TElement } from 'types';
import { handleResizeElement } from '../utils/handleResizeElement';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  height: TElement['height'],
  id: TElement['id'],
  width: TElement['width'],
  x: TElement['position']['x'],
  y: TElement['position']['y'],
): TUseMouseMoveEvent => {
  const anchor = useSelector(eventSelectorCreator('selectedAnchor'));
  const dispatch = useDispatch();

  const handleMouseMove = (event: MouseEvent): void => {
    event.stopPropagation();
    handleResizeElement(
      cursorPosition,
      dispatch,
      event,
      height,
      id,
      width,
      x,
      y,
    );
  };

  useEffect(() => {
    if (anchor !== Anchor.none) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [anchor, cursorPosition.current.x, cursorPosition.current.y]);
};
