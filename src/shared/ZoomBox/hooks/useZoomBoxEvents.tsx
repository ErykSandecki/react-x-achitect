import { RefObject, WheelEvent } from 'react';

// hooks
import { useWheelEvent } from './useWheelEvent';

// types
import { T3DCoordinates } from 'types';

export type TUseZoomBoxEvents = {
  onWheel: (event: WheelEvent) => void;
};

export const useZoomBoxEvents = (
  coordinates: T3DCoordinates,
  setCoordinates: (coordinates: T3DCoordinates) => void,
  zoomBoxRef: RefObject<HTMLDivElement>,
): TUseZoomBoxEvents => ({
  onWheel: useWheelEvent(coordinates, setCoordinates, zoomBoxRef),
});
