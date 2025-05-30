// types
import { T2DCoordinates } from 'types';

export const handleUpdateMousePosition = (
  event: MouseEvent,
  mousePosition: T2DCoordinates | null,
  setMousePosition: (mousePosition: T2DCoordinates) => void,
): void => {
  switch (true) {
    case mousePosition.x < 0:
      setMousePosition({
        x: window.innerWidth,
        y: mousePosition.y,
      });
      break;
    case mousePosition.x > window.innerWidth:
      setMousePosition({
        x: 0,
        y: mousePosition.y,
      });
      break;
    default:
      setMousePosition({
        x: mousePosition.x + event.movementX,
        y: mousePosition.y,
      });
      break;
  }
};
