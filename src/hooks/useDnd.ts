import React, { useRef } from "react";

import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";

type DragItem = {
  index: number;
  id: string;
  type: string;
};

type TargetElement = HTMLLIElement;

const DragItemTypes = {
  Item: "item",
};

export default function useDnd(
  id: string,
  index: number,
  moveItem: (dragIndex: number, hoverIndex: number) => void
) {
  const ref = useRef<TargetElement>(
    null
  ) as React.MutableRefObject<TargetElement>;
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DragItemTypes.Item,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DragItemTypes.Item,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const dragStyle = isDragging ? { opacity: 0.4 } : { opacity: 1 };
  drag(drop(ref));

  return [ref, handlerId, dragStyle] as const;
}
