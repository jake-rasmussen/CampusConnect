import { ClubApplicationQuestionType } from "@prisma/client";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DotsVertical, X } from "tabler-icons-react";
import { twMerge } from "tailwind-merge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shadcn_ui/select";
import { clubApplicationMemberTypeToString } from "~/utils/helpers";
import { Input } from "../../shadcn_ui/input";

import type {
  ClubApplicationAnswerChoice,
  ClubApplicationQuestion,
} from "@prisma/client";
import type { Identifier, XYCoord } from "dnd-core";

type PropType = {
  question: ClubApplicationQuestion & {
    clubApplicationAnswers: ClubApplicationAnswerChoice[];
  };
  index: number;
  updateQuestionsState: (
    field: string,
    value:
      | boolean
      | string
      | ClubApplicationAnswerChoice[]
      | ClubApplicationQuestionType,
    index: number,
    question: ClubApplicationQuestion & {
      clubApplicationAnswers: ClubApplicationAnswerChoice[];
    },
  ) => void;
  deleteQuestion: (index: number) => void;
};

const QuestionCard = (props: PropType) => {
  const { question, index, updateQuestionsState, deleteQuestion } = props;

  return (
    <section className="flex flex-row items-center gap-4">
      <div className="text-gray hover:cursor-pointer hover:text-white">
        <DotsVertical className="h-20 w-8 object-none" />
      </div>
      <div className="grow">
        <span className="font-semibold text-white">Question</span>
        <Input
          className="h-[3rem]"
          placeholder="Enter the Question"
          defaultValue={question.question}
          onBlur={(e) => {
            updateQuestionsState(
              "question",
              e.currentTarget.value,
              index,
              question,
            );
          }}
        />
      </div>

      <div>
        <span className="font-semibold text-white">Type</span>
        <Select
          defaultValue={question.type}
          onValueChange={(input: ClubApplicationQuestionType) => {
            updateQuestionsState("type", input, index, question);
          }}
        >
          <SelectTrigger className="col-span-3 h-[3rem] w-[10rem] rounded-xl bg-white">
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
            updateQuestionsState("required", isRequired, index, question);
          }}
        >
          <SelectTrigger className="col-span-3 h-[3rem] w-[5rem] rounded-xl bg-white">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button
        className="flex items-end justify-end"
        onClick={() => {
          deleteQuestion(index);
        }}
      >
        <X className="h-[3rem] w-auto text-white transition duration-500 ease-in-out hover:rotate-90 hover:scale-110 hover:text-red-600" />
      </button>
    </section>
  );
};

export default QuestionCard;
