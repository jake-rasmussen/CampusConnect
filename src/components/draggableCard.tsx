
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { twMerge } from "tailwind-merge";
import type { Identifier, XYCoord } from "dnd-core";

type PropType = {
  index: number;
  className: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  children: JSX.Element | JSX.Element[];
}

type DragItem = {
  index: number;
  id: string;
  type: string;
};


const DraggableCard = (props: PropType) => {
  const { index, className, children, moveCard, } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "question",
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

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "question",
    item: () => {
      return { id: index, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <section
      className={twMerge(
        isDragging ? "opacity-25" : "", className
      )}
      data-handler-id={handlerId}
      ref={ref}
    >
      {children}
    </section>
  )

}

export default DraggableCard;