import {
  ClubApplicationQuestion,
  ClubApplicationQuestionType,
} from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { Circle, SquarePlus, X } from "tabler-icons-react";

import { Input } from "~/components/shadcn_ui/input";

type PropType = {
  question: ClubApplicationQuestion;
  questionIndex: number;
  updateQuestionsState: (
    field: string,
    value: boolean | string | string[] | ClubApplicationQuestionType,
    index: number,
    question: ClubApplicationQuestion,
  ) => void;
};

const AnswerChoicesEditor = (props: PropType) => {
  const { question, questionIndex, updateQuestionsState } = props;

  const createAnswerChoice = () => {
    const newClubApplicationAnswerChoices: string[] =
      question.clubApplicationAnswerChoices.concat([""]);
    updateQuestionsState(
      "clubApplicationAnswerChoices",
      newClubApplicationAnswerChoices,
      questionIndex,
      question,
    );
  };

  const deleteAnswerChoice = (answerChoiceIndex: number) => {
    const newAnswerChocies = question.clubApplicationAnswerChoices;
    newAnswerChocies.splice(answerChoiceIndex, 1);

    updateQuestionsState(
      "clubApplicationAnswerChoices",
      newAnswerChocies,
      questionIndex,
      question,
    );
  };

  const updateAnswerChoice = (answerChoiceIndex: number, value: string) => {
    const newAnswerChocies = question.clubApplicationAnswerChoices;
    newAnswerChocies[answerChoiceIndex] = value;
    updateQuestionsState(
      "clubApplicationAnswerChoices",
      newAnswerChocies,
      questionIndex,
      question,
    );
  };

  return (
    <section className="my-4">
      <div className="flex flex-col gap-y-2">
        {question.clubApplicationAnswerChoices &&
          question.clubApplicationAnswerChoices.map(
            (answerChoice: string, index: number) => (
              <div
                className="flex flex-row items-center"
                key={`answerChoice${answerChoice}${index}`}
              >
                <Circle className="mr-2 h-2 w-2 rounded-full bg-white/10 text-white backdrop-invert" />
                <Input
                  className="h-[3rem] max-w-lg"
                  placeholder={"Answer Choice"}
                  defaultValue={answerChoice}
                  onBlur={(e) => {
                    updateAnswerChoice(index, e.currentTarget.value);
                  }}
                />
                <button
                  className="flex items-end justify-end"
                  onClick={() => deleteAnswerChoice(index)}
                >
                  <X className="h-[2rem] w-auto text-white transition duration-500 ease-in-out hover:rotate-90 hover:scale-110 hover:text-red-600" />
                </button>
              </div>
            ),
          )}
        <div>
          <button
            className="group flex shrink flex-row items-center"
            onClick={() => createAnswerChoice()}
          >
            <SquarePlus className="h-10 w-10 text-white duration-300 group-hover:rotate-90 group-hover:cursor-pointer group-hover:text-secondary" />
            <h1 className="tracking-none whitespace-nowrap text-xl font-black uppercase text-white group-hover:cursor-pointer group-hover:text-gray">
              Create Answer Choice
            </h1>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnswerChoicesEditor;
