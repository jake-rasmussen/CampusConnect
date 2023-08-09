import {
  ClubApplicationQuestion,
  ClubApplicationQuestionType,
} from "@prisma/client";

import MultipleChoice from "../multipleChoice";
import { Input } from "../shadcn_ui/input";
import { Textarea } from "../shadcn_ui/textarea";

type PropType = {
  questions: ClubApplicationQuestion[];
};

const Application = (props: PropType) => {
  const { questions } = props;

  return (
    <>
      <div className="border-1 flex flex-col gap-y-8 rounded-2xl border border-black bg-gradient-to-r from-primary to-secondary p-10">
        {questions.map((question: ClubApplicationQuestion, index: number) => {
          return (
            <div key={`question${index}`} className="">
              <div className="flex flex-row items-start">
                {question.required && <h1 className="text-red-500 font-black mx-1 my-0.5">*</h1>}
                <h2 className="max-w-2xl capitalize text-white">
                  {question.question}
                </h2>
              </div>

              {question.type === ClubApplicationQuestionType.TEXT_INPUT && (
                <Input />
              )}
              {question.type === ClubApplicationQuestionType.TEXT_FIELD && (
                <Textarea
                  className="h-[3rem] rounded-xl bg-white p-4"
                  rows={4}
                />
              )}
              {question.type ===
                ClubApplicationQuestionType.MULTIPLE_CHOICE && (
                  <MultipleChoice />
                )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Application;
