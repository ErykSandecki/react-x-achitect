import React, { FC, ReactNode, RefObject, useRef } from 'react';

// components
import Box from '../UI/components/Box/Box';

// hooks
import { useTheme } from 'hooks';
import { useZoomBoxEvents } from './hooks/useZoomBoxEvents';

// others
import { CURSOR_STATES } from 'constant/constants';
import { classes, className, classNames } from './classNames';

// styles
import styles from './zoom-box.scss';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T3DCoordinates, TBackground } from 'types';
import { hexToRgb } from 'utils';

export type TZoomBoxProps = {
  alpha: string;
  backgroundColor: TBackground['value'];
  backgroundVissible: boolean;
  children: ReactNode;
  classes?: typeof classes;
  coordinates: T3DCoordinates;
  mouseMode: MouseMode;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseMoveDepedencies?: Array<any>;
  onMouseUp: (event: MouseEvent) => void;
  onMouseUpDepedencies?: Array<any>;
  onUpdateCoordinates?: (coordinates: T3DCoordinates) => void;
  setCoordinates: (coordinates: T3DCoordinates) => void;
  zoomBoxRef: RefObject<HTMLDivElement>;
};

export const ZoomBox: FC<TZoomBoxProps> = ({
  alpha,
  backgroundColor,
  backgroundVissible,
  children,
  classes = { className: '' },
  coordinates,
  mouseMode,
  onMouseDown,
  onMouseMove,
  onMouseMoveDepedencies = [],
  onMouseUp,
  onMouseUpDepedencies = [],
  onUpdateCoordinates = null,
  setCoordinates,
  zoomBoxRef,
}) => {
  const zoomContentRef = useRef<HTMLDivElement>(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { cursorState, ...events } = useZoomBoxEvents(
    coordinates,
    mouseMode,
    onMouseDown,
    onMouseMove,
    onMouseMoveDepedencies,
    onMouseUp,
    onMouseUpDepedencies,
    onUpdateCoordinates,
    setCoordinates,
    zoomBoxRef,
  );

  return (
    <Box
      classes={{
        className: cx(
          classes.className,
          classNamesWithTheme[className].name,
          classNamesWithTheme[className].modificators[cursorState],
          classNamesWithTheme[className].modificators[mouseMode],
          [
            classNamesWithTheme[className].modificators.pressing,
            mouseMode === MouseMode.move && cursorState === CURSOR_STATES[1],
          ],
        ),
      }}
      e2eValue="zoom-box"
      ref={zoomBoxRef}
      sx={{
        height: '100%',
        overflow: 'hidden',
      }}
      {...events}
    >
      <Box
        classes={{ className: cx(classNamesWithTheme.backgroundMask) }}
        style={{
          backgroundColor: hexToRgb(backgroundColor, parseInt(alpha)),
          display: backgroundVissible ? 'initial' : 'none',
        }}
      />
      <Box
        classes={{ className: cx(classNamesWithTheme.textureBlank) }}
        style={{
          transform: `translate(${coordinates.x}px, ${coordinates.y}px) scale(${coordinates.z})`,
        }}
      />
      <Box
        classes={{ className: cx(classNamesWithTheme.zoomContent) }}
        ref={zoomContentRef}
        sx={{ height: '100vh', position: 'relative' }}
        style={{
          transform: `translate(${coordinates.x}px, ${coordinates.y}px) scale(${coordinates.z})`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ZoomBox;
