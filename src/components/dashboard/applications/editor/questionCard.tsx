import {
  type ClubApplicationQuestion,
  ClubApplicationQuestionType,
} from "@prisma/client";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DotsVertical, X } from "tabler-icons-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shadcn_ui/select";
import { clubApplicationMemberTypeToString } from "~/utils/helpers";
import { Input } from "../../../shadcn_ui/input";

import type { Identifier, XYCoord } from "dnd-core";
import { twMerge } from "tailwind-merge";

type PropType = {
  question: ClubApplicationQuestion;
  index: number;
  updateQuestionsForm: (
    field: string,
    value: boolean | string | ClubApplicationQuestionType,
    index: number,
    question: ClubApplicationQuestion,
  ) => void;
  deleteQuestionFormElement: (index: number) => void;
  moveQuestions: (dragIndex: number, hoverIndex: number) => void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

const QuestionCard = (props: PropType) => {
  const {
    question,
    index,
    updateQuestionsForm,
    deleteQuestionFormElement,
    moveQuestions,
  } = props;

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

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveQuestions(dragIndex, hoverIndex);
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
      className={twMerge("border-1 my-4 flex flex-row gap-4 items-center rounded-xl border border-white p-4", isDragging ? "opacity-25" : "")}
      data-handler-id={handlerId}
      ref={ref}
    >
      <div className="text-gray hover:text-white hover:cursor-pointer">
        <DotsVertical className="object-none h-20 w-8" />
      </div>
      <div className="grow">
        <span className="font-semibold text-white">Question</span>
        <Input
          className="h-[3rem]"
          placeholder="Enter the Question"
          defaultValue={question.question}
          onChange={(e) => {
            updateQuestionsForm(
              "question",
              e.currentTarget.value,
              index,
              question,
            );
          }}
        />
        {/* {!isValid && <ErrorMessage message={errors[0]} />} */}
      </div>

      <div>
        <span className="font-semibold text-white">Type</span>
        <Select
          defaultValue={question.type}
          onValueChange={(input: ClubApplicationQuestionType) => {
            updateQuestionsForm(
              "type",
              input ,
              index,
              question,
            );
          }}
        >
          <SelectTrigger className="col-span-3 h-[3rem] rounded-xl bg-white w-[10rem]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {Object.values(ClubApplicationQuestionType).map(
              (type: ClubApplicationQuestionType, index: number) => {
                return (
                  <SelectItem value={type} key={`type${index}`}>
                    {clubApplicationMemberTypeToString(type)}
                  </SelectItem>
                );
              },
            )}
          </SelectContent>
        </Select>
        {/* {!isValid && <ErrorMessage message={errors[0]} />} */}
      </div>

      <div>
        <span className="whitespace-nowrap font-semibold text-white">
          Required?
        </span>
        <Select
          defaultValue={
            question.required
              ? "yes"
              : question.required !== undefined
              ? "no"
              : ""
          }
          onValueChange={(input) => {
            const isRequired = input === "yes";
            updateQuestionsForm("required", isRequired, index, question);
          }}
        >
          <SelectTrigger className="col-span-3 h-[3rem] rounded-xl bg-white w-[5rem]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
        {/* {!isValid && <ErrorMessage message={errors[0]} />} */}
      </div>
      <button
        className="flex items-end justify-end"
        onClick={() => {
          deleteQuestionFormElement(index);
        }}
      >
        <X className="h-[3rem] w-auto text-white transition duration-500 ease-in-out hover:rotate-90 hover:scale-110 hover:text-red-800" />
      </button>
    </section>
  );
};

export default QuestionCard;
