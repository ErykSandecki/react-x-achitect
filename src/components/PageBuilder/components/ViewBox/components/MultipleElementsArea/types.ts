// types
import { TElement, TRectCoordinates } from 'types';

export type TCoordinatesData = {
  elementsCordinates: Array<{
    coordinates: TRectCoordinates;
    id: TElement['id'];
  }>;
  outline: TRectCoordinates;
};
