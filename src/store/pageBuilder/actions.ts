// others
import {
  ADD_ELEMENT,
  CHANGE_PARENT,
  ROTATE_ELEMENT,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  SET_ELEMENT_COORDINATES,
  SET_ELEMENT_SIZES,
  SET_ELEMENTS_COORDINATES,
  UNSELECT_ELEMENT,
  UPDATE_EVENTS_STATUS,
  UPDATE_PREV_STATE,
} from './actionsType';

// types
import {
  TAddELementAction,
  TAddELementActionPayload,
  TChangeParentAction,
  TRotateElementAction,
  TRotateElementActionPayload,
  TSelectElementAction,
  TSelectElementsAction,
  TSetAreaCoordinatesAction,
  TSetElementCoordinatesAction,
  TSetElementCoordinatesActionPayload,
  TSetElementsCoordinatesAction,
  TSetElementSizesAction,
  TSetElementSizesActionPayload,
  TUnselectElementAction,
  TUpdateEventsStatusAction,
  TUpdatePrevStateAction,
} from './types';

export const addElement = (
  payload: TAddELementActionPayload,
): TAddELementAction => ({
  payload,
  type: ADD_ELEMENT,
});

export const changeParent = (): TChangeParentAction => ({
  type: CHANGE_PARENT,
});

export const rotateElement = (
  id: TRotateElementActionPayload['id'],
  rotate: TRotateElementActionPayload['rotate'],
): TRotateElementAction => ({
  payload: { id, rotate },
  type: ROTATE_ELEMENT,
});

export const selectElement = (
  payload: TSelectElementAction['payload'],
): TSelectElementAction => ({
  payload,
  type: SELECT_ELEMENT,
});

export const selectElements = (
  payload: TSelectElementsAction['payload'],
): TSelectElementsAction => ({
  payload,
  type: SELECT_ELEMENTS,
});

export const setAreCoordinates = (
  payload: TSetAreaCoordinatesAction['payload'],
): TSetAreaCoordinatesAction => ({
  payload,
  type: SET_AREA_COORDINATES,
});

export const setElementCoordinates = (
  coordinates: TSetElementCoordinatesActionPayload['coordinates'],
  id: TSetElementCoordinatesActionPayload['id'],
): TSetElementCoordinatesAction => ({
  payload: { coordinates, id },
  type: SET_ELEMENT_COORDINATES,
});

export const setElementSizes = (
  baseCoordinates: TSetElementSizesActionPayload['baseCoordinates'],
  height: TSetElementSizesActionPayload['height'],
  id: TSetElementSizesActionPayload['id'],
  mouseCoordinates: TSetElementSizesActionPayload['mouseCoordinates'],
  width: TSetElementSizesActionPayload['width'],
): TSetElementSizesAction => ({
  payload: { baseCoordinates, height, id, mouseCoordinates, width },
  type: SET_ELEMENT_SIZES,
});

export const setElementsCoordinates = (
  payload: TSetElementsCoordinatesAction['payload'],
): TSetElementsCoordinatesAction => ({
  payload,
  type: SET_ELEMENTS_COORDINATES,
});

export const updateEventsStatus = (
  payload: TUpdateEventsStatusAction['payload'],
): TUpdateEventsStatusAction => ({
  payload,
  type: UPDATE_EVENTS_STATUS,
});

export const updatePrevState = (): TUpdatePrevStateAction => ({
  type: UPDATE_PREV_STATE,
});

export const unselectElement = (
  payload: TUnselectElementAction['payload'],
): TUnselectElementAction => ({
  payload,
  type: UNSELECT_ELEMENT,
});
