import { ColorFormatType } from 'antd/es/color-picker/interface';
import { CSSProperties } from 'react';

// types
import { ElementType } from './enums';
import { T2DCoordinates } from 'types/types';

export type TBackground = {
  alpha: string;
  format: ColorFormatType;
  value: string;
  visible: boolean;
};

export type TElement = {
  background: TBackground;
  children: Array<string>;
  coordinates: T2DCoordinates;
  height: number | CSSProperties['height'];
  id: string;
  parentId: TElement['id'] | '-1';
  position: CSSProperties['position'];
  rotate: number;
  type: ElementType;
  width: number | CSSProperties['width'];
};
