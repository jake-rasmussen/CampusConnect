import { ApplicationQuestionType } from "@prisma/client";
import { DotsVertical, X } from "tabler-icons-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shadcn_ui/select";
import { applicationMemberTypeToString } from "~/utils/helpers";
import { Input } from "../../shadcn_ui/input";

import type { ApplicationQuestion } from "@prisma/client";

type PropType = {
  question: ApplicationQuestion;
  index: number;
  updateQuestion: (
    field: string,
    value: boolean | string | ApplicationQuestionType,
    index: number,
    question: ApplicationQuestion,
  ) => void;
  deleteQuestion: (index: number) => void;
};

const QuestionCard = (props: PropType) => {
  const { question, index, updateQuestion, deleteQuestion } = props;

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
            updateQuestion("question", e.currentTarget.value, index, question);
          }}
        />
      </div>

      <div>
        <span className="font-semibold text-white">Type</span>
        <Select
          defaultValue={question.type}
          onValueChange={(input: ApplicationQuestionType) => {
            updateQuestion("type", input, index, question);
          }}
        >
          <SelectTrigger className="col-span-3 h-[3rem] w-[10rem] rounded-xl bg-white">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {Object.values(ApplicationQuestionType).map(
              (type: ApplicationQuestionType, index: number) => {
                return (
                  <SelectItem value={type} key={`type${index}`}>
                    {applicationMemberTypeToString(type)}
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
            updateQuestion("required", isRequired, index, question);
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
