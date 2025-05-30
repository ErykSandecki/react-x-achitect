import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// utils
import { handleTriggerEvents } from '../utils/handleTriggerEvents';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (
  isPressing: boolean,
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseUpEvent => {
  const dispatch = useDispatch();

  const handleMouseUp = (): void => {
    setIsPressing(false);
    handleTriggerEvents(dispatch);
  };

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPressing]);
};
