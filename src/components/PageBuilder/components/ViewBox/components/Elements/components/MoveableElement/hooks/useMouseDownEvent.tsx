import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseButton } from 'types';
import { MouseMode } from '../../../../../../../../PageBuilder/enums';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { handleSelectElement } from '../utils/handleSelectElement';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  isSelected: boolean,
  mouseMode: MouseMode,
  selectedElement: TSelectedElement,
  setIsPressing: (isPressing: boolean) => void,
  setSelected: (flag: boolean) => void,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (event: MouseEvent): void => {
    if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
      setIsPressing(true);
      handleSelectElement(
        dispatch,
        event,
        isSelected,
        selectedElement,
        setSelected,
      );
    }
  };

  return handleMouseDown;
};
