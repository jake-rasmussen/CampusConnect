import { Input, Select, SelectItem } from "@heroui/react";
import { ApplicationQuestionType } from "@prisma/client";
import { DotsVertical, X } from "tabler-icons-react";

import { applicationMemberTypeToString } from "~/utils/helpers";

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

      <div className="grid grow grid-cols-8 gap-4">
        <Input
          className="col-span-4"
          label="Question"
          defaultValue={question.question}
          onBlur={(e) => {
            const value = (e.target as HTMLInputElement).value;
            updateQuestion("question", value, index, question);
          }}
          isRequired
        />

        <Select
          className="col-span-2"
          label="Type"
          defaultSelectedKeys={[question.type]}
          onChange={(e) => {
            updateQuestion("type", e.target.value, index, question);
          }}
          isRequired
        >
          {Object.values(ApplicationQuestionType).map(
            (type: ApplicationQuestionType, index: number) => {
              return (
                <SelectItem value={type} key={type}>
                  {applicationMemberTypeToString(type)}
                </SelectItem>
              );
            },
          )}
        </Select>

        <Select
          className="col-span-2"
          label="Is Required?"
          defaultSelectedKeys={
            question.required
              ? ["YES"]
              : question.required !== undefined
              ? ["NO"]
              : [""]
          }
          onChange={(e) => {
            const isRequired = e.target.value === "YES";
            updateQuestion("required", isRequired, index, question);
          }}
          isRequired
        >
          <SelectItem key="YES">Yes</SelectItem>
          <SelectItem key="NO">No</SelectItem>
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
