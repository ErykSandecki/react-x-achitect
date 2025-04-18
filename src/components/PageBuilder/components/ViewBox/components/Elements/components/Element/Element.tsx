import { FC, memo, ReactNode, useRef } from 'react';
import { isNumber } from 'lodash';
import { useSelector } from 'react-redux';

// components
import Corners from '../../../Corners/Corners';
import TransformArea from '../../../TransformArea/TransformArea';
import { Box } from 'shared';

// hooks
import { useElementEvents } from './hooks/useElementEvents';
import { useTheme } from 'hooks';

// others
import {
  className as classNameMoveableELement,
  classNames,
  classes,
} from './classNames';
import { DATA_STATUS_ATTRIBUTE } from './constants';

// store
import {
  elementDynamicDataSelectorCreator,
  isHoverSelectorCreator,
  isSelectedElementSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// styles
import styles from './element.scss';

// types
import { ElementType, TElement } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { getCornersPosition } from './utils/getCornersPosition';

type TElementProps = {
  classes: typeof classes;
  children: (hover: boolean, selected: boolean) => ReactNode;
  id: string;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
  type: ElementType;
};

const Element: FC<TElementProps> = ({
  classes,
  children,
  id,
  mouseMode,
  parentId,
  type,
}) => {
  const isHover = useSelector(isHoverSelectorCreator(id));
  const isSelected = useSelector(isSelectedElementSelectorCreator(id));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const elementRef = useRef<HTMLDivElement>(null);
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const { coordinates } = elementDynamicData;
  const { background, height, position, rotate, width } = elementDynamicData;
  const { x, y } = coordinates;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const rectCoordinates = getCornersPosition(height, width);
  const displayElements = !isMultiple && isSelected;
  const { isMoving, ...events } = useElementEvents(
    coordinates,
    elementRef,
    height,
    id,
    isMultiple,
    isSelected,
    mouseMode,
    parentId,
    type,
    width,
  );

  return (
    <Box
      attributes={{ [DATA_STATUS_ATTRIBUTE]: isSelected ? 'true' : 'false' }}
      classes={{
        className: cx(
          classes.className,
          classNamesWithTheme[classNameMoveableELement].name,
          [
            classNamesWithTheme[classNameMoveableELement].modificators.hover,
            isHover,
          ],
          [
            classNamesWithTheme[classNameMoveableELement].modificators.moving,
            isMoving,
          ],
          [
            classNamesWithTheme[classNameMoveableELement].modificators.selected,
            isSelected,
          ],
        ),
      }}
      id={id}
      ref={elementRef}
      style={{
        backgroundColor: background.value,
        height: isNumber(height) ? `${height}px` : height,
        left: `${x}px`,
        position,
        top: `${y}px`,
        transform: `rotate(${rotate}deg)`,
        width: isNumber(width) ? `${width}px` : width,
      }}
      {...events}
    >
      {children(isHover, isSelected)}
      {displayElements && <Corners rectCoordinates={rectCoordinates} />}
      {displayElements && (
        <TransformArea
          height={height}
          id={id}
          moseMode={mouseMode}
          x={x}
          y={y}
          width={width}
        />
      )}
    </Box>
  );
};

export default memo(Element);
