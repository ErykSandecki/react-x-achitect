// types
import { MouseMode } from 'types/enums/mouseMode';
import { TElement } from 'types';

export type TElementProps = {
  className: string;
  id: TElement['id'];
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
  type: TElement['type'];
};
