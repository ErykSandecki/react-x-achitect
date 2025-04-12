import { cloneDeep, first } from 'lodash';

// types
import { TElement } from 'types';
import {
  TElementsData,
  TEvents,
  TPageBuilderState,
} from 'store/pageBuilder/types';

export const getTargetIndex = (
  nextParent: TElement,
  parentHasChanged: boolean,
  possibleIndexPosition: TEvents['possibleIndexPosition'],
) => {
  const hasTargetIndex = possibleIndexPosition !== null;

  if (parentHasChanged) {
    return hasTargetIndex ? possibleIndexPosition : nextParent.children.length;
  }

  return hasTargetIndex ? possibleIndexPosition : -1;
};

export const replaceChildrenPosition = (
  draggableElements: TEvents['draggableElements'],
  nextParent: TElement,
  index: number,
  parentHasChanged: boolean,
  prevParent: TElement,
): void => {
  const prevParentChildren = prevParent.children.filter(
    (id) => !draggableElements.includes(id),
  );
  const nextParentChildren = parentHasChanged
    ? nextParent.children
    : nextParent.children.filter((id) => !draggableElements.includes(id));

  prevParent.children = prevParentChildren;
  nextParent.children =
    index !== -1
      ? [
          ...nextParentChildren.slice(0, index),
          ...draggableElements,
          ...nextParentChildren.slice(index),
        ]
      : nextParent.children;
};

export const getMappedParents = (
  parentHasChanged: boolean,
  state: TPageBuilderState,
): TElementsData => {
  const { elements, events } = state;
  const { allData, staticData } = elements;
  const { draggableElements, possibleIndexPosition, possibleParent } = events;
  const id = first(draggableElements);
  const prevParent = cloneDeep(allData[allData[id].parentId]);
  const nextParent = cloneDeep(allData[possibleParent]);
  const index = getTargetIndex(
    nextParent,
    parentHasChanged,
    possibleIndexPosition,
  );

  replaceChildrenPosition(
    draggableElements,
    nextParent,
    index,
    parentHasChanged,
    prevParent,
  );

  return {
    allData: {
      [prevParent.id]: prevParent,
      [nextParent.id]: nextParent,
    },
    dynamicData: {},
    staticData: {
      [prevParent.id]: {
        ...staticData[prevParent.id],
        children: prevParent.children,
      },
      [nextParent.id]: {
        ...staticData[nextParent.id],
        children: nextParent.children,
      },
    },
  };
};
