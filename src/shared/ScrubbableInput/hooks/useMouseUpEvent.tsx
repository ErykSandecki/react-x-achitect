// types
import { T2DCoordinates } from 'types';

export type TUseMouseUpEvent = () => void;

export const useMouseUpEvent = (
  onMouseUp: () => void,
  setMousePosition: (mousePosition: T2DCoordinates) => void,
): TUseMouseUpEvent => {
  const handleMouseUp = (): void => {
    setMousePosition(null);
    onMouseUp();
    document.exitPointerLock?.();
  };

  return handleMouseUp;
};
