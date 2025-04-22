import { MouseEvent } from 'react';

// types
import { MouseButton, T3DCoordinates } from 'types';
import { MouseMode } from '../../../../../types/enums/mouseMode';
import { TRectArea } from '../../../../PageBuilder/types';

// utils
import { mousePoisitionRelative } from 'shared';

export const handleInitSelectableArea = (
  coordinates: T3DCoordinates,
  event: MouseEvent,
  mouseMode: MouseMode,
  setSelectableArea: (elementArea: TRectArea) => void,
): void => {
  if (
    !event.shiftKey &&
    event.buttons === MouseButton.lmb &&
    mouseMode === MouseMode.default
  ) {
    const { x, y } = mousePoisitionRelative(coordinates, event);
    setSelectableArea({ x1: x, x2: x, y1: y, y2: y });
  }
};
