import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// types
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { finishSetElementsCoordinates } from 'components/PageBuilder/components/ViewBox/utils/finishSetElementsCoordinates';
import { handleTrySelectElement } from '../utils/handleTrySelectElement';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (
  isMoving: boolean,
  isMultiple: boolean,
  isPressing: boolean,
  isSelected: boolean,
  selectedElement: TSelectedElement,
  setIsMoving: (isMoving: boolean) => void,
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseUpEvent => {
  const dispatch = useDispatch();

  const handleMouseUp = (event: MouseEvent): void => {
    handleTrySelectElement(
      dispatch,
      event,
      isMoving,
      isMultiple,
      isSelected,
      selectedElement,
    );
    setIsMoving(false);
    setIsPressing(false);
    finishSetElementsCoordinates(dispatch);
  };

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMoving, isPressing]);
};
