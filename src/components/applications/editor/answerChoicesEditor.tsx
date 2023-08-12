import {
  ClubApplicationAnswer,
  ClubApplicationQuestion,
  ClubApplicationQuestionType,
} from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Circle, SquarePlus, X } from "tabler-icons-react";

import { Input } from "~/components/shadcn_ui/input";
import { ClubApplicationQuestionForForm } from "./questionsEditor";

type PropType = {
  question: ClubApplicationQuestion & {
    clubApplicationAnswers: ClubApplicationAnswer[];
  };
  questinIndex: number;
  updateQuestionsForm: (
    field: string,
    value:
      | boolean
      | string
      | ClubApplicationAnswer[]
      | ClubApplicationQuestionType,
    index: number,
    question: ClubApplicationQuestionForForm,
  ) => void;
  setAnswerChoicesToDelete: Dispatch<
    SetStateAction<ClubApplicationAnswer[]>
  >;
};

const AnswerChoicesEditor = (props: PropType) => {
  const { question, questinIndex, updateQuestionsForm, setAnswerChoicesToDelete } = props;

  const createAnswerChoice = () => {
    updateQuestionsForm(
      "clubApplicationAnswers",
      [
        ...question.clubApplicationAnswers,
        {
          id: undefined,
          answerChoice: "",
          clubApplicationQuestionId: question.id,
        } as unknown as ClubApplicationAnswer,
      ],
      questinIndex,
      question,
    );
  };

  const deleteAnswerChoice = (answerChoiceIndex: number) => {
    const newAnswerChocies = question.clubApplicationAnswers;
    const answerChoiceToDelete = question.clubApplicationAnswers[answerChoiceIndex]!;
    newAnswerChocies.splice(answerChoiceIndex, 1);

    updateQuestionsForm(
      "clubApplicationAnswers",
      newAnswerChocies,
      questinIndex,
      question,
    );

    setAnswerChoicesToDelete((prev: ClubApplicationAnswer[]) => [
      ...prev,
      answerChoiceToDelete,
    ]);
  };

  const updateAnswerChoice = (
    answerChoiceIndex: number,
    value: string,
    answerChoice: ClubApplicationAnswer,
  ) => {
    const newAnswerChocies = question.clubApplicationAnswers;
    newAnswerChocies[answerChoiceIndex] = {
      id: answerChoice.id,
      answerChoice: value,
      clubApplicationQuestionId: answerChoice.clubApplicationQuestionId,
    };
    updateQuestionsForm(
      "clubApplicationAnswers",
      newAnswerChocies,
      questinIndex,
      question,
    );
  };

  return (
    <section className="my-4">
      <div className="flex flex-col gap-y-2">
        {question.clubApplicationAnswers.map((answerChoice, index: number) => (
          <div
            className="flex flex-row items-center"
            key={`answerChoice${index}${answerChoice.id}`}
          >
            <Circle className="mr-2 h-2 w-2 rounded-full bg-white/10 text-white backdrop-invert" />
            <Input
              className="h-[3rem] max-w-lg"
              placeholder={"Answer Choice"}
              defaultValue={answerChoice.answerChoice}
              onBlur={(e) => {
                updateAnswerChoice(index, e.currentTarget.value, answerChoice);
              }}
            />
            <button
              className="flex items-end justify-end"
              onClick={() => deleteAnswerChoice(index)}
            >
              <X className="h-[2rem] w-auto text-white transition duration-500 ease-in-out hover:rotate-90 hover:scale-110 hover:text-red-800" />
            </button>
          </div>
        ))}
        <button
          className="group flex flex-row items-center"
          onClick={() => createAnswerChoice()}
        >
          <SquarePlus className="h-10 w-10 text-white duration-300 group-hover:rotate-90 group-hover:cursor-pointer group-hover:text-secondary" />
          <h1 className="tracking-none whitespace-nowrap text-xl font-black uppercase text-white group-hover:cursor-pointer group-hover:text-gray">
            Create Answer Choice
          </h1>
        </button>
      </div>
    </section>
  );
};

export default AnswerChoicesEditor;
